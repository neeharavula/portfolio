/* Case study page (placeholder pending design) */

import { workProjects } from "@/data/work-projects";

export default async function WorkCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = workProjects.find((p) => p.slug === slug);

  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="font-header text-2xl">
        {project?.title ?? "Project"} — case study under construction
      </h1>
    </main>
  );
}
