"use client";

import { ReactNode, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>; // <-- Add this to accept extra props

export default function Section({
  title,
  children,
  className = "",
  ...rest // capture extra props like onMouseEnter, style, etc.
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
    <section
      className={`flex flex-col md:flex-row md:py-8 py-4 ${className}`}
      {...rest} // <-- Forward all extra props here
    >
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="w-full md:w-1/4 text-sm text-neutral-400"
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
