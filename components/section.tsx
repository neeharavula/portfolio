/* Resume section wrapper */

"use client";

import { HTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

type SectionProps = {
  title: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

const Section = ({ title, children, className = "", ...rest }: SectionProps) => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className={`flex flex-col md:flex-row gap-24 py-lg md:py-xl ${className}`}
      {...rest}
    >
      {/* Title */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="w-full md:w-1/4 md:shrink-0 md:pl-24 font-header text-2xl text-header"
      >
        {title}
      </motion.div>

      {/* Content */}
      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: 20 }}
        animate={contentInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
        className="w-full md:flex-1 py-md md:py-0"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
