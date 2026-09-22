/* Fade-in-on-mount wrapper, matching the reveal used across the site */

"use client";

import { motion } from "motion/react";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const FadeIn = ({ children, delay = 0, className }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.33, 1, 0.68, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeIn;
