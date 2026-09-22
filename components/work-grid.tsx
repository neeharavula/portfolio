/* Masonry grid of work project cards */

"use client";

import Masonry from "react-masonry-css";
import { motion } from "motion/react";
import ProjectCard from "@/components/project-card";
import { WorkProjectSummary } from "@/lib/work-projects";

type WorkGridProps = {
  projects: WorkProjectSummary[];
};

const breakpointColumnsObj = {
  default: 3,
  768: 1,
};

const WorkGrid = ({ projects }: WorkGridProps) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-column"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </Masonry>
  );
};

export default WorkGrid;
