/* Case study page */

import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWorkProjects, getWorkProjectBySlug } from "@/lib/work-projects";
import CaseStudyToc from "@/components/case-study-toc";
import FadeIn from "@/components/fade-in";
import { iconMap } from "@/utils/icons";

export function generateStaticParams() {
  return getAllWorkProjects().map(({ slug }) => ({ slug }));
}

export default async function WorkCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getWorkProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content, toc } = project;

  const infoColumns = [
    { label: "Timeline", value: frontmatter.timeline },
    { label: "Role", value: frontmatter.role },
    { label: "Team", value: frontmatter.team },
    {
      label: "Tags",
      value: (
        <div className="flex flex-wrap gap-sm">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-background-code px-sm py-xs text-xs text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Stack",
      value: (
        <div className="flex flex-wrap items-center gap-sm">
          {frontmatter.stack.map((tech) => {
            const Icon = iconMap[tech];
            return Icon ? <Icon key={tech} className="text-xl" /> : null;
          })}
        </div>
      ),
    },
  ];

  return (
    <main className="w-full flex-1 max-w-7xl mx-auto px-xl md:px-16 pt-md md:pt-16 pb-16 font-content text-sm">
      {/* Back link */}
      <FadeIn>
        <Link
          href="/"
          className="font-navigation text-xs uppercase text-accent md:text-tertiary md:hover:text-accent"
        >
          ← Back to all work
        </Link>
      </FadeIn>

      {/* Title */}
      <FadeIn delay={0.1}>
        <h1 className="font-header text-2xl md:text-3xl text-header mt-16">
          {frontmatter.name}
          <br />/ {frontmatter.org}
        </h1>
      </FadeIn>

      {/* Info columns */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-16 gap-y-lg mt-16">
          {infoColumns.map(({ label, value }) => (
            <div key={label}>
              <p className="font-navigation text-xs text-tertiary uppercase">
                {label}
              </p>
              <div className="text-primary mt-sm">{value}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      <hr className="border-t-[0.5px] border-page-divider mt-16 mb-16" />

      {/* Case study content */}
      <FadeIn delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-16 gap-y-lg">
          <CaseStudyToc toc={toc} />
          <div className="md:col-span-4">{content}</div>
        </div>
      </FadeIn>
    </main>
  );
}
