import { iconMap } from "@/utils/icons";
import { workData } from "@/data/work-projects";
import { notFound } from "next/navigation";
import Layout from "@/components/base/general-layout";
import Section from "@/components/work/section";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Project({ params }: Props) {
  const { slug } = await params;

  const project = workData.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <Layout variant="project" projectTitle={project.title}>
      <div className="max-w-5xl mx-auto px-8 py-16 font-[family-name:var(--font-geist-mono)] text-sm relative z-10">
        {project.overview && (
          <Section title="Overview">
            <p>{project.overview}</p>
          </Section>
        )}

        {project.tools && (
          <Section title="Stack">
            <ul className="flex gap-2 flex-wrap">
              {project.tools.map((tool) => {
                const Icon = iconMap[tool.toLowerCase()];
                return Icon ? (
                  <li
                    key={tool}
                    title={tool}
                    className="min-w-[24px] min-h-[24px]"
                  >
                    <Icon className="w-6 h-6" />
                  </li>
                ) : (
                  <li key={tool}>{tool}</li>
                );
              })}
            </ul>
          </Section>
        )}

        {project.tasks && (
          <Section title="Task 1">
            <p>{project.tasks}</p>
          </Section>
        )}
      </div>
    </Layout>
  );
}
