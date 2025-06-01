import { workData } from "@/data/work-projects";
import { notFound } from "next/navigation";
import Layout from "@/components/base/general-layout";

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = workData.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <Layout variant="project" projectTitle={project.title}>
      <div className="p-8 sm:p-20 text-sm font-[family-name:var(--font-geist-mono)]"></div>
    </Layout>
  );
}
