"use client";

import { iconMap } from "@/utils/icons";
import { workData } from "@/data/work-projects";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WorkMobile = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 p-8 md:hidden text-sm font-[family-name:var(--font-geist-mono)]">
      {workData.map((project) => (
        <div
          key={project.slug}
          onClick={() => router.push(`/work/${project.slug}`)}
          className="flex items-center bg-white dark:bg-zinc-950 shadow-md dark:shadow-zinc-800 rounded-2xl p-4 gap-4 cursor-pointer hover:opacity-80 transition-colors duration-300"
        >
          <div className="w-14 h-14 rounded-xl overflow-hidden">
            <div className="w-14 h-14 rounded-xl overflow-hidden relative">
              <Image
                src={`https://nravula-portfolio-assets.s3.amazonaws.com/work/logos/${project.slug}.png`}
                alt={`${project.title} logo`}
                fill
                className="object-cover"
                sizes="56px" // 14 * 4 = 56px
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <p>{project.title}</p>
            <p className="text-zinc-500 dark:text-zinc-400">
              {project.type} / {project.date}
            </p>

            <div className="flex gap-2 mt-1">
              {project.tools.map((tool) => {
                const Icon = iconMap[tool];
                return Icon ? <Icon key={tool} className="text-md" /> : null;
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkMobile;
