"use client";

import { iconMap } from "@/utils/icons";
import { workData } from "@/data/work-projects";
import { useRouter } from "next/navigation";

const WorkDesktop = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center py-16 px-6 max-w-4xl mx-auto gap-8 font-[family-name:var(--font-geist-mono)]">
      {workData.map((project, index) => (
        <button
          key={index}
          onClick={() => router.push(`/work/${project.slug}`)}
          className="w-full flex items-center justify-between border-none text-left group cursor-pointer"
        >
          {/* Left section — Title + dot */}
          <div className="flex items-center gap-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <span className="text-sm font-medium group-hover:underline">
              {project.title}
            </span>
          </div>

          {/* Right section — Type, season, icons */}
          <div className="flex items-center gap-8 text-sm text-zinc-500 dark:text-zinc-400">
            <span>
              {project.type} / {project.date}
            </span>
            <div className="flex gap-3">
              {project.tools.map((tool) => {
                const Icon = iconMap[tool];
                return Icon ? <Icon key={tool} className="w-5 h-5" /> : null;
              })}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default WorkDesktop;
