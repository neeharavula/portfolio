#!/usr/bin/env node
/* Uploads a local file to Vercel Blob storage and prints the resulting public URL. */

import { put } from "@vercel/blob";
import { readFile } from "node:fs/promises";

const [, , localFilePath, blobPath] = process.argv;

if (!localFilePath || !blobPath) {
  console.error(
    "Usage: node scripts/upload-blob-asset.mjs <local-file-path> <blob-path>"
  );
  process.exit(1);
}

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error(
    "Missing BLOB_READ_WRITE_TOKEN. Run `vercel env pull .env.local` (project already linked) " +
      "or copy it from the Vercel dashboard's Storage tab, then re-run with it loaded."
  );
  process.exit(1);
}

const file = await readFile(localFilePath);

const { url } = await put(blobPath, file, {
  access: "public",
  token,
  addRandomSuffix: false,
});

console.log(url);
