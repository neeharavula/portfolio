"use client";

import { iconMap } from "@/utils/icons";
import { workData } from "@/data/work-projects";
import { useRouter } from "next/navigation";

const WorkMobile = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 md:hidden font-[family-name:var(--font-geist-mono)]">
      {workData.map((project) => (
        <div
          key={project.slug}
          onClick={() => router.push(`/work/${project.slug}`)}
          className="flex items-center bg-white shadow-md rounded-2xl p-4 gap-4 cursor-pointer hover:opacity-80"
        >
          <div className={`w-14 h-14 rounded-xl ${project.color}`} />
          <div className="flex flex-col flex-1">
            <p className="font-medium">{project.title}</p>
            <p className="text-sm text-zinc-500">
              {project.type} / {project.date}
            </p>
            <div className="flex gap-2 mt-1">
              {project.tools.map((tool, index) => {
                const Icon = iconMap[tool];
                return <Icon key={index} className="text-xl text-zinc-600" />;
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkMobile;
