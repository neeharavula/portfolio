/* Theme toggle */

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { SunIcon, MoonIcon } from "@phosphor-icons/react/ssr";
import { Magnetic } from "@/components/motion-primitives/magnetic";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Magnetic>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden translate-y-[2.5px]"
      >
        {mounted && (
          <AnimatePresence initial={false}>
            {resolvedTheme === "dark" ? (
              <motion.span
                key="moon"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <MoonIcon size={20} weight="regular" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <SunIcon size={20} weight="regular" />
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </button>
    </Magnetic>
  );
};

export default ThemeToggle;
