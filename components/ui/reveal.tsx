/* Reveal component */

"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  dataId: string;
};

export const Reveal = ({ children, delay = 0, dataId }: RevealProps) => {
  return (
    <motion.div
      data-id={dataId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
