/* Home page header, with the developer/creative word loop */

"use client";

import { motion } from "motion/react";
import { TextLoop } from "@/components/motion-primitives/text-loop";

const HomeHeader = () => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="font-header text-3xl md:text-5xl text-header max-w-3xl"
    >
      Neeha Ravula is a{" "}
      <TextLoop
        className="text-accent"
        transition={{ type: "spring", stiffness: 900, damping: 80, mass: 10 }}
        variants={{
          initial: { y: 20, opacity: 0, filter: "blur(4px)" },
          animate: { y: 0, opacity: 1, filter: "blur(0px)" },
          exit: { y: -20, opacity: 0, filter: "blur(4px)" },
        }}
      >
        <span>creative</span>
        <span>developer</span>
      </TextLoop>
      <br />
      based in New York, NY, exploring
      <br />
      the intersection of design and computation.
    </motion.h1>
  );
};

export default HomeHeader;
