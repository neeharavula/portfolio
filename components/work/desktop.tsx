"use client";

import { iconMap } from "@/utils/icons";
import { workData } from "@/data/work-projects";
import Image from "next/image";
import Link from "next/link";

const WorkDesktop = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center px-6 gap-8 max-w-4xl mx-auto font-[family-name:var(--font-geist-mono)]">
      {workData.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="w-full flex items-center justify-between border-none text-left group cursor-pointer"
        >
          {/* Left section — Title + dot */}
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-sm overflow-hidden relative">
              <Image
                src={`https://nravula-portfolio-assets.s3.amazonaws.com/work/logos/${project.slug}.png`}
                alt={`${project.title} logo`}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>

            <span className="text-sm group-hover:underline">
              {project.title}
            </span>
          </div>

          {/* Right section — Type, season, icons */}
          <div className="flex items-center gap-4 text-sm">
            <span>
              {project.type} / {project.date} /
            </span>
            <div className="flex gap-3">
              {project.tools.map((tool) => {
                const Icon = iconMap[tool];
                return Icon ? (
                  <Icon key={tool} className="min-w-5 min-h-5" />
                ) : null;
              })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WorkDesktop;
