/* Mobile work page component */

"use client";

import Image from "next/image";
import Link from "next/link";
import { iconMap } from "@/utils/icons";
import { workData } from "@/data/work-projects";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Card
function WorkMobileCard({
  project,
  delay,
}: {
  project: (typeof workData)[0];
  delay: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        delay,
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="flex items-center bg-white dark:bg-zinc-900 shadow-md dark:shadow-zinc-900 rounded-2xl p-4 gap-4 hover:opacity-80 transition-colors duration-300"
      >
        <div className="w-14 h-14 rounded-xl overflow-hidden relative">
          {/* Logo */}
          <Image
            src={`https://nravula-portfolio-assets.s3.amazonaws.com/work/logos/${project.slug}.png`}
            alt={`${project.title} logo`}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="flex flex-col flex-1">
          {/* Title */}
          <p>{project.title}</p>
          <p className="text-zinc-500 dark:text-zinc-400">
            {/* Type and date */}
            {project.type} / {project.date}
          </p>

          <div className="flex gap-2 mt-1">
            {/* Tools */}
            {project.tools.map((tool) => {
              const Icon = iconMap[tool];
              return Icon ? <Icon key={tool} className="text-md" /> : null;
            })}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

{
  /* Page */
}
const WorkMobile = () => {
  return (
    <div className="flex flex-col gap-6 pt-2 px-8 pb-8 md:hidden text-sm font-[family-name:var(--font-geist-mono)]">
      {workData.map((project, index) => (
        <WorkMobileCard
          key={project.slug}
          project={project}
          delay={index * 0.15}
        />
      ))}
    </div>
  );
};

export default WorkMobile;
