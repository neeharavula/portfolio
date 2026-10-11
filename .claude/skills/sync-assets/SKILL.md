---
name: sync-assets
description: Compress oversized images in ~/neeharavula/assets/ into ~/neeharavula/assets-compressed/, then sync any new/changed files up to Vercel Blob storage. Use when the user wants to update, compress, or sync portfolio assets/images, or invokes /sync-assets.
---

# Sync Assets

The user is a photographer and keeps original (often large) source images in
`~/neeharavula/assets/`, mirroring the folder structure used in Vercel Blob
storage (e.g. `play/film/01-monaco.jpeg`, `work/projects/<slug>/cover.png`).
This skill produces `~/neeharavula/assets-compressed/` as a web-ready mirror
and pushes it to Blob.

## 1. Compress

Run:

```
node scripts/compress-assets.mjs
```

This walks `~/neeharavula/assets/` and mirrors it into
`~/neeharavula/assets-compressed/`:

- Files over 1MB are resized to a 3000px max long edge (matching the
  convention already used for every image currently live in Blob - quality-
  only compression without resizing produces LARGER files than what's
  already there) and re-encoded (JPEG/WEBP at quality 80, PNG at max
  lossless compression). 3000px is comfortably larger than the click-to-
  expand view's 90vw/90vh cap even on a 4K display, so quality should hold
  up there.
- Files at or under 1MB, and non-image files, are copied through
  unchanged.
- Animated GIFs are copied through as-is (not recompressed - sharp doesn't
  handle animated GIF recompression well).
- Already-up-to-date files (same size + not newer than their compressed
  copy) are skipped, so re-runs are fast.
- Anything in `assets-compressed/` whose source was renamed, replaced, or
  deleted from `assets/` gets pruned, so `assets-compressed/` always
  mirrors `assets/`'s file set exactly (this matters for step 2 below -
  otherwise a renamed file looks like a pure addition instead of a
  rename+orphan).

Report the script's output to the user: what got compressed and by how
much, what was skipped, what got pruned.

Note: PNGs only get lossless compression (no real quality knob available
in sharp's prebuilt binary), so a large PNG screenshot/photo may still be
large afterward. If a compressed PNG is still over ~1MB, mention it to the
user and suggest converting it to JPEG by hand if further reduction
matters for that particular image.

## 2. Check what's out of sync with Blob

Run:

```
node scripts/sync-assets-to-blob.mjs
```

This is a dry run - it diffs `~/neeharavula/assets-compressed/` against the
full Blob bucket listing (by path + file size) and prints what's new or
changed (needs uploading) and what's in Blob with no local match (needs
deleting - a file the user renamed or removed from `assets/`), without
changing anything yet.

## 3. Check if `data/play-gallery.ts` needs updating

If anything under `play/film/` or `play/digital/` was added, renamed, or
removed (compare the compress step's output / `assets/play/<category>/`
against `data/play-gallery.ts`'s `imageFiles` arrays), update that array to
match the new file list and order - this drives what actually renders on
the Play page, independent of what's in Blob. Do this before asking about
the Blob upload (steps 4-5), so the user reviews the complete picture -
code change plus pending Blob changes - together. Build (`npm run build`)
to confirm it compiles.

This file is the one known consumer that needs manual updates when
`play/` assets change; if other parts of the site ever reference asset
filenames directly (new case study covers are handled by the existing
`add-portfolio-project` skill, not this one), check those too.

## 4. Ask before uploading

Show the user the dry-run output from step 2. **Never run with `--apply`
without the user explicitly confirming** - this writes to their live
production Blob storage, visible on the deployed site immediately (no
build/deploy step in between), and the orphan cleanup is a real delete.

If the list is large or touches many different projects, consider
summarizing by folder (e.g. "12 play/film photos, 2 case study covers")
rather than reading out every single filename. Call out the orphaned/
to-delete list separately and clearly - a delete deserves more attention
than an upload.

## 5. Apply

Once confirmed, run:

```
node scripts/sync-assets-to-blob.mjs --apply
```

This uploads each new/changed file to its matching Blob path
(`allowOverwrite: true` for files that already exist there - that's
expected, it's how a changed file gets updated), then deletes any orphaned
Blob file that has no corresponding local file. Before overwriting or
deleting anything, it automatically backs up the CURRENT live bytes of
each affected file to `~/neeharavula/assets-blob-backup/<ISO timestamp>/`,
and prints the exact restore command afterward. Report the result,
including that restore command - the user may want to test the deploy
first and revert if they don't like it.

To revert, run exactly what was printed:

```
node scripts/sync-assets-to-blob.mjs --restore ~/neeharavula/assets-blob-backup/<timestamp>
```

This re-uploads every backed-up file to its original path, restoring
whatever was live before (works for both overwritten and deleted files -
"deleted" just means re-uploading brings it back).

## Notes

- Both scripts need `BLOB_READ_WRITE_TOKEN` in the environment - read it
  from `.env.local` the same way the `add-portfolio-project` skill does
  (`BLOB_READ_WRITE_TOKEN=$(grep ... | cut ...) node scripts/...`), never
  print the token itself.
- These scripts only ever read from `~/neeharavula/assets/` and write to
  `~/neeharavula/assets-compressed/` and Blob - they never touch
  `content/work/*.mdx` or any frontmatter `image:` fields. If the user
  uploaded a brand new asset (not a replacement for something already
  referenced), remind them they still need to wire it into the relevant
  `.mdx` file or component themselves (or ask if they want that done too).
