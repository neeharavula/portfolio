"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  title,
  children,
  className = "",
}: SectionProps) {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className={`flex flex-col md:flex-row md:py-8 py-4 ${className}`}>
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="w-full md:w-1/4 text-sm text-gray-400"
      >
        {title}
      </motion.div>

      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: 20 }}
        animate={contentInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
        className="w-full md:w-3/4 py-4 md:py-0"
      >
        {children}
      </motion.div>
    </section>
  );
}
