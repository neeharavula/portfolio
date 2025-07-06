/* Project pages */

import Layout from "@/components/base/general-layout";
import Section from "@/components/work/section";
import { iconMap } from "@/utils/icons";
import { workData } from "@/data/work-projects";
import { notFound } from "next/navigation";

/* Props */
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/* Pull project data */
export default async function Project({ params }: Props) {
  const { slug } = await params;

  const project = workData.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <Layout variant="project" projectTitle={project.title}>
      <div className="max-w-5xl mx-auto px-8 py-2 font-[family-name:var(--font-geist-mono)] text-sm relative z-10">
        {/* Overview */}
        {project.overview && (
          <Section title="Overview">
            <p>{project.overview}</p>
          </Section>
        )}

        {/* Stack */}
        {project.tools && (
          <Section title="Stack">
            <ul className="flex gap-2 flex-wrap">
              {project.tools.map((tool) => {
                const Icon = iconMap[tool.toLowerCase()];
                const lowerTool = tool.toLowerCase();

                return Icon ? (
                  <li
                    key={tool}
                    title={tool}
                    className="w-6 h-6 flex items-center justify-center relative"
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        lowerTool === "twilio"
                          ? "text-red-600 scale-[0.8]"
                          : lowerTool === "stackblitz"
                          ? "scale-[0.8]"
                          : "text-gray-800"
                      }`}
                    />
                  </li>
                ) : (
                  <li key={tool} className="text-sm text-neutral-500">
                    {tool}
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {/* Contributions */}
        {project.tasks && (
          <Section title="Contributions">
            <p>{project.tasks}</p>
          </Section>
        )}

        {/* Reflections */}
        {project.reflections && (
          <Section title="Reflections">
            <p>{project.reflections}</p>
          </Section>
        )}
      </div>
    </Layout>
  );
}
