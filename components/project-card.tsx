/* Work project card - expands on hover to reveal description + tags */

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { WorkProject } from "@/data/work-projects";

type ProjectCardProps = {
  project: WorkProject;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const details = (
    <div className="p-md space-y-sm">
      <p className="text-tertiary text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-sm">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-background-code px-sm py-xs text-xs text-tertiary"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block rounded-lg bg-background-hover overflow-hidden"
    >
      {/* Title + date */}
      <div className="flex items-center justify-between gap-sm px-md py-sm font-navigation text-xs text-tertiary uppercase">
        <span>{project.title}</span>
        <span className="shrink-0">{project.date}</span>
      </div>

      {/* Placeholder image */}
      <div className="aspect-video rounded-lg bg-background-code" />

      {/* Mobile: always open */}
      <div className="md:hidden">{details}</div>

      {/* Desktop: reveal on hover */}
      <motion.div
        initial={false}
        animate={{ height: isHovered ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        className="hidden md:block overflow-hidden"
      >
        {details}
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
