/* Desktop work page component */

"use client";

import Image from "next/image";
import Link from "next/link";
import { iconMap } from "@/utils/icons";
import { workData } from "@/data/work-projects";
import { AnimatedBackground } from "../ui/animated-background";
import { motion } from "framer-motion";

// Page
const WorkDesktop = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center px-6 gap-4 max-w-4xl mx-auto font-[family-name:var(--font-geist-mono)]">
      <AnimatedBackground
        enableHover
        className="rounded-md bg-zinc-100 dark:bg-zinc-900"
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.2,
        }}
      >
        {workData.map((project, index) => (
          <motion.div
            key={project.slug}
            data-id={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="w-full"
          >
            <Link
              href={`/work/${project.slug}`}
              className="w-full flex items-center justify-between px-3 py-3 rounded-md cursor-pointer"
            >
              {/* Left section: logo and title */}
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
                <span className="text-sm relative z-10">{project.title}</span>
              </div>

              {/* Left section: type, date, tools */}
              <div className="flex items-center gap-4 text-sm relative z-10">
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
          </motion.div>
        ))}
      </AnimatedBackground>
    </div>
  );
};

export default WorkDesktop;
