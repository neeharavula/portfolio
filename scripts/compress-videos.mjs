#!/usr/bin/env node
/* Mirrors ~/neeharavula/assets/play/video/<name>/ (each folder = one video +
 * one thumbnail image) into ~/neeharavula/assets-compressed/play/video/<slug>/
 * as two files:
 *   - full.mp4     full-length with audio, capped at FULL_MAX_DIMENSION,
 *                  reasonable quality - played on click/tap
 *   - poster.jpg   compressed version of the folder's thumbnail image, shown
 *                  as the static grid thumbnail (with a play button overlay)
 *
 * Folder names are slugified for the output path (e.g. "rochelle jordan" ->
 * "rochelle-jordan"). Only reprocesses a video if the source is new or has
 * changed since the last run.
 */

import { readdir, stat, mkdir, utimes, rm, unlink } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { homedir } from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

const SOURCE_DIR = join(homedir(), "neeharavula/assets/play/video");
const OUTPUT_DIR = join(homedir(), "neeharavula/assets-compressed/play/video");

const FULL_MAX_DIMENSION = 1920;
const FULL_CRF = 23;
const POSTER_MAX_DIMENSION = 1920;
const POSTER_QUALITY = 80;

const VIDEO_EXTS = new Set([".mov", ".mp4", ".m4v"]);
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png"]);

// Resolve ffmpeg/ffprobe regardless of which Homebrew (arm64 vs Intel/
// Rosetta) or PATH setup is active in this shell.
async function resolveBinary(name) {
  for (const candidate of [`/opt/homebrew/bin/${name}`, `/usr/local/bin/${name}`, name]) {
    try {
      await execFileAsync(candidate, ["-version"]);
      return candidate;
    } catch {
      // try next candidate
    }
  }
  throw new Error(`Could not find ${name} - is it installed?`);
}

const ffmpeg = await resolveBinary("ffmpeg");

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function needsProcessing(srcPath, destPath) {
  try {
    const [srcStat, destStat] = await Promise.all([stat(srcPath), stat(destPath)]);
    return srcStat.mtimeMs > destStat.mtimeMs;
  } catch {
    return true; // dest doesn't exist yet
  }
}

async function compressFull(srcPath, destPath) {
  await execFileAsync(ffmpeg, [
    "-y",
    "-i", srcPath,
    "-vf", `scale=${FULL_MAX_DIMENSION}:${FULL_MAX_DIMENSION}:force_original_aspect_ratio=decrease:force_divisible_by=2`,
    "-c:v", "libx264",
    "-crf", String(FULL_CRF),
    "-preset", "slow",
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    destPath,
  ]);
}

async function compressPoster(srcPath, destPath) {
  await sharp(srcPath)
    .resize({
      width: POSTER_MAX_DIMENSION,
      height: POSTER_MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: POSTER_QUALITY })
    .toFile(destPath);
}

const results = { processed: [], skipped: [], missing: [] };

let entries;
try {
  entries = await readdir(SOURCE_DIR, { withFileTypes: true });
} catch {
  console.log(`No video folder found at ${SOURCE_DIR} - nothing to do.`);
  process.exit(0);
}

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const folderPath = join(SOURCE_DIR, entry.name);
  const slug = slugify(entry.name);
  const destDir = join(OUTPUT_DIR, slug);

  const files = await readdir(folderPath);
  const videoFile = files.find((f) => VIDEO_EXTS.has(extname(f).toLowerCase()));
  const imageFile = files.find((f) => IMAGE_EXTS.has(extname(f).toLowerCase()));

  if (!videoFile || !imageFile) {
    results.missing.push({ name: entry.name, videoFile, imageFile });
    continue;
  }

  const srcVideo = join(folderPath, videoFile);
  const srcImage = join(folderPath, imageFile);
  const destFull = join(destDir, "full.mp4");
  const destPoster = join(destDir, "poster.jpg");

  // One-time cleanup: drop a stale preview.mp4 from a previous version of
  // this script (grid now uses a static poster + play button, not an
  // autoplay clip).
  await unlink(join(destDir, "preview.mp4")).catch(() => {});

  if (!(await needsProcessing(srcVideo, destFull)) && !(await needsProcessing(srcImage, destPoster))) {
    results.skipped.push(slug);
    continue;
  }

  await mkdir(destDir, { recursive: true });

  const srcSize = (await stat(srcVideo)).size;
  await compressFull(srcVideo, destFull);
  await compressPoster(srcImage, destPoster);

  const fullSize = (await stat(destFull)).size;
  results.processed.push({ slug, srcSize, fullSize });

  const srcStat = await stat(srcVideo);
  await Promise.all([
    utimes(destFull, srcStat.atime, srcStat.mtime),
    utimes(destPoster, srcStat.atime, srcStat.mtime),
  ]);
}

// Prune output folders whose source folder no longer exists (renamed,
// replaced, or deleted) - mirrors compress-assets.mjs's behavior.
const sourceSlugs = new Set(
  entries.filter((e) => e.isDirectory()).map((e) => slugify(e.name))
);
const pruned = [];
let outputEntries = [];
try {
  outputEntries = await readdir(OUTPUT_DIR, { withFileTypes: true });
} catch {
  // OUTPUT_DIR doesn't exist yet - nothing to prune
}
for (const entry of outputEntries) {
  if (entry.isDirectory() && !sourceSlugs.has(entry.name)) {
    await rm(join(OUTPUT_DIR, entry.name), { recursive: true, force: true });
    pruned.push(entry.name);
  }
}

const fmt = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;

if (results.processed.length) {
  console.log("Processed:");
  for (const { slug, srcSize, fullSize } of results.processed) {
    const pct = (100 * (1 - fullSize / srcSize)).toFixed(0);
    console.log(`  ${slug}  source ${fmt(srcSize)} -> full ${fmt(fullSize)} (-${pct}%)`);
  }
}
if (results.missing.length) {
  console.log("\nSkipped (missing video or thumbnail image in folder):");
  for (const { name, videoFile, imageFile } of results.missing) {
    console.log(`  ${name}  (video: ${videoFile ?? "none"}, image: ${imageFile ?? "none"})`);
  }
}
console.log(`\nAlready up to date: ${results.skipped.length} folder(s)`);
if (pruned.length) {
  console.log(`\nRemoved stale compressed folders (source no longer in assets/): ${pruned.join(", ")}`);
}
