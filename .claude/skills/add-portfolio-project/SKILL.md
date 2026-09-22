---
name: add-portfolio-project
description: Add a new work project to the portfolio - creates the project card and case study page from info + assets the user provides. Use when the user wants to add, create, or publish a new work project / case study, or invokes /add-portfolio-project.
---

# Add Portfolio Project

Turns project info + assets the user hands you into a finished project card
(on the home page) and case study page (`/work/<slug>`), by creating one
`.mdx` file in `content/work/`. No other file needs to change - the home page
and case study routes both auto-discover everything in that folder at build
time (see `lib/work-projects.ts`).

## Before you start

Read `lib/work-projects.ts` to confirm the current frontmatter shape hasn't
changed since this skill was written, and skim one or two existing files in
`content/work/` for the expected style and tone.

## 1. Collect the info

Ask for whatever the user hasn't already given you:

- **name** - project name (e.g. "Aircraft Simulation")
- **org** - company/org name (e.g. "General Atomics Aeronautical Systems")
- **timeline** - full range, e.g. "June 2024 – May 2026"
- **role** - their title/role on the project
- **team** - short team description (e.g. "Modeling and Simulation, Autonomy and AI. 1 Manager, 2 PMs, 3 Devs")
- **tags** - short list of tags shown as pills (e.g. ["PyTest", "Kubernetes", "C++", "Podman"])
- **stack** - technologies for the Stack column icons. Cross-check each
  against `utils/icons.tsx`'s `iconMap` keys (python, javascript,
  typescript, html, css, tailwind, angular, react, nextjs, postman, twilio,
  stackblitz, aws, mysql, figma). If something they mention isn't in the
  map, ask whether to add a new icon there or just omit it for now - don't
  silently drop it without saying so.
- **description** - one short sentence for the project card's hover reveal
- **card image** - the image shown on the home page card (optional; a grey
  placeholder box renders automatically if omitted)
- **written content** - whatever they give you for the case study body
  (loose notes, a doc, plain prose - any shape is fine)
- **media** - any additional photos/videos/embeds for the case study body,
  and roughly where each should go in the flow

Derive `date` (the short badge shown on the project card, e.g. "2024 – 2026")
from `timeline` yourself - don't ask for it separately.

Derive `slug` from the project name (lowercase, alphanumeric and hyphens
only, e.g. "aircraft-simulation"). Reject/re-derive if it would contain `/`,
`..`, or any other unsafe character - it becomes both a filename and part of
a Blob storage path.

## 2. Upload images

For each image (card image + any inline case study media):

```
BLOB_READ_WRITE_TOKEN=<token from .env.local, never print it> \
  node scripts/upload-blob-asset.mjs <local-file-path> work/projects/<slug>/<filename>
```

- Use a descriptive filename per asset (`hero.jpg`, `flow-diagram.png`, not
  `image1.png`), and keep every path scoped under `work/projects/<slug>/` -
  never write outside that prefix, so there's no chance of colliding with
  fonts or other projects' assets in the same store.
- If `BLOB_READ_WRITE_TOKEN` isn't set, tell the user to run
  `vercel env pull .env.local` (the project is already linked) or grab it
  from the Vercel dashboard's Storage tab - don't ask them to paste the
  token into the chat.
- The script prints the resulting public URL - that's what goes in
  `image:` (frontmatter) or a `<ProjectImage src="...">` call.
- If the script errors because a blob already exists at that path, don't
  force an overwrite - pick a different filename or confirm with the user
  first.

## 3. Write the MDX file

Create `content/work/<slug>.mdx`:

```mdx
---
name: "..."
org: "..."
date: "..."
timeline: "..."
role: "..."
team: "..."
tags: ["...", "..."]
stack: ["...", "..."]
description: "..."
image: "<uploaded URL, or empty string for the placeholder box>"
---

## <Section Heading>

Prose, in the user's voice, based on what they gave you.

## <Next Section Heading>

More prose...

<ProjectImage src="<uploaded URL>" alt="..." caption="..." />

More prose...
```

Notes on the body:

- **Sections are flexible, not fixed.** Use whatever `##` headings fit this
  project's story (Overview/Contributions/Reflections is a fine default,
  but Background/Problem/Solution/Outcome or anything else is equally
  valid) - the table of contents on the case study page is generated
  automatically from these headings, in order.
- **Place media exactly where the user says it goes**, using
  `<ProjectImage src="..." alt="..." caption="..." />` (caption optional)
  inline in the prose, not bunched at the end of a section.
- **Embeds** (Figma prototypes, YouTube, etc.) use
  `<Embed src="..." title="..." />`. Only use `src` values from platforms
  meant to be embedded (Figma, YouTube, Vimeo, CodeSandbox, etc.) - an
  iframe renders whatever that URL serves directly on the user's site.
- **Lists and code** are plain Markdown - `- item` for bullets, fenced
  code blocks with a language hint (` ```ts `) for snippets. No special
  component needed for either.
- Don't paste raw HTML/script snippets the user hands you (e.g. a copied
  embed code) directly into the MDX without a quick sanity check first -
  MDX compiles to real, executed code.

## 4. Verify

Run `npm run build`. Confirm the new route appears in the output (e.g.
`● /work/<slug>`) and that it actually compiles - a bad frontmatter field or
malformed MDX will surface here, not silently. Fix and re-run before calling
the task done.

## 5. Report back

Tell the user the project is live locally, give the slug/URL path, and
mention anything you skipped or need a decision on (missing stack icon,
media you weren't sure where to place, etc.) rather than guessing silently.
