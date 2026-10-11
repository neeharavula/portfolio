#!/usr/bin/env node
/* Mirrors ~/neeharavula/assets/ into ~/neeharavula/assets-compressed/,
 * re-encoding anything over 1MB: capped to MAX_DIMENSION on the long edge
 * (matching the resize already used for images currently live in Blob) and
 * quality-reduced for JPEG/WEBP (PNG stays lossless). Files under 1MB and
 * non-image files are copied through unchanged. Only touches a file in
 * assets-compressed/ if the source is new or has changed since the last
 * run (compared by size + mtime), so repeat runs are fast. Anything in
 * assets-compressed/ whose source was renamed/removed from assets/ gets
 * pruned, so assets-compressed/ always mirrors assets/'s file set exactly.
 */

import { readdir, stat, mkdir, copyFile, utimes, unlink } from "node:fs/promises";
import { join, relative, dirname, extname } from "node:path";
import { homedir } from "node:os";
import sharp from "sharp";

const SOURCE_DIR = join(homedir(), "neeharavula/assets");
const OUTPUT_DIR = join(homedir(), "neeharavula/assets-compressed");
const SIZE_THRESHOLD = 1024 * 1024; // 1MB
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
// Matches the convention already used for the images currently live in
// Blob storage (confirmed: every existing photo checked was resized to
// exactly half its original long-edge dimension before upload) - without
// this, quality-only re-encoding of a full-resolution source produces a
// LARGER file than what's already live, not a smaller one.
const MAX_DIMENSION = 3000;

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function needsProcessing(srcPath, destPath) {
  try {
    const [srcStat, destStat] = await Promise.all([stat(srcPath), stat(destPath)]);
    return srcStat.mtimeMs > destStat.mtimeMs || srcStat.size !== destStat.size;
  } catch {
    return true; // dest doesn't exist yet
  }
}

async function compressImage(srcPath, destPath, ext) {
  const image = sharp(srcPath).resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: "inside",
    withoutEnlargement: true,
  });
  if (ext === ".jpg" || ext === ".jpeg") {
    await image.jpeg({ quality: JPEG_QUALITY }).toFile(destPath);
  } else if (ext === ".webp") {
    await image.webp({ quality: WEBP_QUALITY }).toFile(destPath);
  } else if (ext === ".png") {
    // Lossless only - sharp's prebuilt binary doesn't include libimagequant,
    // so there's no real "quality" knob for PNG, just max DEFLATE effort.
    await image.png({ compressionLevel: 9, effort: 10 }).toFile(destPath);
  }
}

const results = { compressed: [], copied: [], skipped: [], unsupported: [] };

for await (const srcPath of walk(SOURCE_DIR)) {
  const rel = relative(SOURCE_DIR, srcPath);
  const destPath = join(OUTPUT_DIR, rel);
  const ext = extname(srcPath).toLowerCase();

  if (!(await needsProcessing(srcPath, destPath))) {
    results.skipped.push(rel);
    continue;
  }

  await mkdir(dirname(destPath), { recursive: true });

  const srcSize = (await stat(srcPath)).size;

  if (srcSize <= SIZE_THRESHOLD) {
    await copyFile(srcPath, destPath);
    results.copied.push(rel);
  } else if (IMAGE_EXTS.has(ext)) {
    await compressImage(srcPath, destPath, ext);
    const destSize = (await stat(destPath)).size;
    results.compressed.push({ rel, srcSize, destSize });
  } else if (ext === ".gif") {
    // Animated GIF recompression isn't well supported by sharp - copy
    // through as-is rather than risk breaking the animation.
    await copyFile(srcPath, destPath);
    results.unsupported.push(rel);
  } else {
    await copyFile(srcPath, destPath);
    results.copied.push(rel);
  }

  // Match mtime so the next run's needsProcessing() check is accurate.
  const srcStat = await stat(srcPath);
  await utimes(destPath, srcStat.atime, srcStat.mtime);
}

// Prune anything in assets-compressed/ whose source no longer exists in
// assets/ (renamed, replaced, or deleted) - otherwise stale output lingers
// and the Blob sync can't tell it's no longer wanted.
const results_pruned = [];
for await (const destPath of walk(OUTPUT_DIR)) {
  const rel = relative(OUTPUT_DIR, destPath);
  const srcPath = join(SOURCE_DIR, rel);
  try {
    await stat(srcPath);
  } catch {
    await unlink(destPath);
    results_pruned.push(rel);
  }
}

const fmt = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;

if (results.compressed.length) {
  console.log("Compressed:");
  for (const { rel, srcSize, destSize } of results.compressed) {
    const pct = (100 * (1 - destSize / srcSize)).toFixed(0);
    console.log(`  ${rel}  ${fmt(srcSize)} -> ${fmt(destSize)} (-${pct}%)`);
  }
}
if (results.copied.length) {
  console.log(`\nCopied unchanged (<=1MB or non-image): ${results.copied.length} file(s)`);
}
if (results.unsupported.length) {
  console.log(`\nCopied as-is (GIF, not recompressed): ${results.unsupported.join(", ")}`);
}
console.log(`\nAlready up to date: ${results.skipped.length} file(s)`);
if (results_pruned.length) {
  console.log(`\nRemoved stale compressed copies (source no longer in assets/): ${results_pruned.join(", ")}`);
}
