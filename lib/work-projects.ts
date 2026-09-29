/* Reads work case studies from content/work/*.mdx (server-only) */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import GithubSlugger from "github-slugger";
import { mdxComponents } from "@/components/mdx-components";

const CONTENT_DIR = path.join(process.cwd(), "content/work");

export type WorkProjectFrontmatter = {
  name: string;
  org: string;
  date: string;
  timeline: string;
  role: string;
  team: string;
  tags: string[];
  stack: string[];
  description: string;
  image: string;
  externalUrl?: string;
};

export type WorkProjectSummary = WorkProjectFrontmatter & { slug: string };

export type TocEntry = { id: string; label: string };

const getSlugs = (): string[] =>
  fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

// Sorts newest-first using the start of `timeline` (e.g. "June 2023 –
// August 2023" or "2021"), so ties within the same year (e.g. two projects
// both dated "2023") still order correctly by month.
const getTimelineStart = (timeline: string): number => {
  const start = timeline.split("–")[0].trim();
  const parsed = Date.parse(start);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const getAllWorkProjects = (): WorkProjectSummary[] =>
  getSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as WorkProjectFrontmatter) };
    })
    .sort((a, b) => getTimelineStart(b.timeline) - getTimelineStart(a.timeline));

// Extracts h2 headings (and matching ids) to build the case study's table
// of contents, using the same slugger rehype-slug uses so ids line up.
const extractToc = (body: string): TocEntry[] => {
  const slugger = new GithubSlugger();
  const headingPattern = /^##\s+(.+)$/gm;
  const toc: TocEntry[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingPattern.exec(body)) !== null) {
    const label = match[1].trim();
    toc.push({ id: slugger.slug(label), label });
  }
  return toc;
};

export const getWorkProjectBySlug = async (slug: string) => {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content: body } = matter(raw);

  const { content, frontmatter } = await compileMDX<WorkProjectFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeHighlight],
      },
    },
  });

  return {
    slug,
    frontmatter,
    content,
    toc: extractToc(body),
  };
};
