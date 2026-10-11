#!/usr/bin/env node
/* Compares ~/neeharavula/assets-compressed/ against the full Vercel Blob
 * bucket and makes Blob match it exactly: new files get uploaded, changed
 * files get re-uploaded, and files in Blob with no corresponding local file
 * (renamed/removed from assets/) get deleted. Dry-run by default - pass
 * --apply to actually make changes. Blob paths mirror the folder structure
 * directly (e.g. assets-compressed/play/film/01-monaco.jpeg ->
 * play/film/01-monaco.jpeg).
 *
 * Before overwriting or deleting anything that already exists in Blob,
 * --apply backs up the CURRENT live bytes to
 * ~/neeharavula/assets-blob-backup/<timestamp>/ - restore any of them with:
 *   node scripts/sync-assets-to-blob.mjs --restore ~/neeharavula/assets-blob-backup/<timestamp>
 */

import { readdir, stat, readFile, mkdir, writeFile } from "node:fs/promises";
import { join, relative, dirname } from "node:path";
import { homedir } from "node:os";
import { list, put, del } from "@vercel/blob";

const SOURCE_DIR = join(homedir(), "neeharavula/assets-compressed");
const BACKUP_ROOT = join(homedir(), "neeharavula/assets-blob-backup");
const apply = process.argv.includes("--apply");
const restoreIndex = process.argv.indexOf("--restore");

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error(
    "Missing BLOB_READ_WRITE_TOKEN. Run `vercel env pull .env.local` " +
      "(project already linked) or copy it from the Vercel dashboard's " +
      "Storage tab, then re-run with it loaded."
  );
  process.exit(1);
}

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

if (restoreIndex !== -1) {
  const backupDir = process.argv[restoreIndex + 1];
  if (!backupDir) {
    console.error("Usage: node scripts/sync-assets-to-blob.mjs --restore <backup-dir>");
    process.exit(1);
  }
  console.log(`Restoring from ${backupDir} ...\n`);
  for await (const fullPath of walk(backupDir)) {
    const blobPath = relative(backupDir, fullPath);
    const file = await readFile(fullPath);
    await put(blobPath, file, {
      access: "public",
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    console.log(`  restored: ${blobPath}`);
  }
  console.log("\nDone.");
  process.exit(0);
}

const localFiles = [];
for await (const fullPath of walk(SOURCE_DIR)) {
  const blobPath = relative(SOURCE_DIR, fullPath);
  const size = (await stat(fullPath)).size;
  localFiles.push({ fullPath, blobPath, size });
}

let cursor;
const blobSizeByPath = new Map();
do {
  const res = await list({ cursor, limit: 1000, token });
  for (const b of res.blobs) blobSizeByPath.set(b.pathname, b.size);
  cursor = res.cursor;
} while (cursor);

const toUpload = localFiles.filter(({ blobPath, size }) => {
  const remoteSize = blobSizeByPath.get(blobPath);
  return remoteSize === undefined || remoteSize !== size;
});

const localPaths = new Set(localFiles.map((f) => f.blobPath));
const toDelete = [...blobSizeByPath.keys()].filter(
  (blobPath) => !blobPath.endsWith("/") && !localPaths.has(blobPath)
);

const fmt = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

if (toUpload.length === 0 && toDelete.length === 0) {
  console.log("Everything in assets-compressed/ already matches Blob storage.");
  process.exit(0);
}

if (toUpload.length > 0) {
  console.log(`${toUpload.length} file(s) ${apply ? "to upload" : "would be uploaded"}:\n`);
  for (const { blobPath, size } of toUpload) {
    const status = blobSizeByPath.has(blobPath) ? "changed" : "new";
    console.log(`  [${status}] ${blobPath}  (${fmt(size)})`);
  }
}
if (toDelete.length > 0) {
  console.log(`\n${toDelete.length} file(s) in Blob with no local match, ${apply ? "to delete" : "would be deleted"} (no longer in assets-compressed/):\n`);
  for (const blobPath of toDelete) {
    console.log(`  [orphaned] ${blobPath}`);
  }
}

if (!apply) {
  console.log("\nDry run only - re-run with --apply to actually upload/delete.");
  process.exit(0);
}

const toBackUp = [
  ...toUpload.filter(({ blobPath }) => blobSizeByPath.has(blobPath)).map(({ blobPath }) => blobPath),
  ...toDelete,
];
let backupDir;
if (toBackUp.length > 0) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  backupDir = join(BACKUP_ROOT, timestamp);
  console.log(`\nBacking up ${toBackUp.length} existing file(s) to ${backupDir} ...`);
  for (const blobPath of toBackUp) {
    const res = await fetch(`https://f6ciazohrats9a1e.public.blob.vercel-storage.com/${blobPath}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    const backupPath = join(backupDir, blobPath);
    await mkdir(dirname(backupPath), { recursive: true });
    await writeFile(backupPath, bytes);
    console.log(`  backed up: ${blobPath}`);
  }
}

if (toUpload.length > 0) {
  console.log("\nUploading...");
  for (const { fullPath, blobPath } of toUpload) {
    const file = await readFile(fullPath);
    await put(blobPath, file, {
      access: "public",
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    console.log(`  uploaded: ${blobPath}`);
  }
}

if (toDelete.length > 0) {
  console.log("\nDeleting orphaned files...");
  for (const blobPath of toDelete) {
    await del(`https://f6ciazohrats9a1e.public.blob.vercel-storage.com/${blobPath}`, { token });
    console.log(`  deleted: ${blobPath}`);
  }
}

console.log("\nDone.");
if (backupDir) {
  console.log(
    `\nTo revert (restores overwritten files, re-uploads deleted ones):\n` +
      `  node scripts/sync-assets-to-blob.mjs --restore ${backupDir}`
  );
}
