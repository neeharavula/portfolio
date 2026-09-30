/* Accent dot that follows the cursor, morphing into a "SEE <TYPE>" pill
   when hovering a project card (see useCursor/CursorProvider). */

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { useCursor } from "@/components/cursor-context";

const isTouchDevice = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

const CustomCursor = () => {
  const { label } = useCursor();
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (prefersReducedMotion.matches || isTouchDevice()) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={`flex items-center justify-center rounded-full bg-accent text-[#ededed] ${
          label ? "gap-xs px-md py-xs" : "w-3 h-3"
        }`}
      >
        {label && (
          <span className="flex items-center gap-xs font-navigation text-xs uppercase whitespace-nowrap">
            See {label}
            <ArrowUpRightIcon size={14} weight="bold" />
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
