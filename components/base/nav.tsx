"use client";

import { SunIcon, ArrowBendUpLeftIcon, ListIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavProps {
  variant: "home" | "work" | "project" | "play" | "about" | "menu";
  projectTitle?: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Nav: React.FC<NavProps> = ({
  variant,
  projectTitle,
  menuOpen,
  setMenuOpen,
}) => {
  const isWorkPlay = ["work", "play"].includes(variant);
  const isHomeAbout = ["home", "about"].includes(variant);
  const isProject = variant === "project";

  const navClass = `w-full text-sm px-8 py-8 font-[family-name:var(--font-geist-mono)] ${
    variant === "about" ? "bg-[#111] text-white" : "bg-transparent text-black"
  }`;

  const iconClass = variant === "about" ? "text-white" : "text-black";

  return (
    <nav className={navClass}>
      {/* Desktop */}
      <div className="hidden sm:flex w-full items-center justify-between">
        {isHomeAbout && (
          <>
            <Link href="/">
              <div>{"Neeha's Room"}</div>
            </Link>
            <SunIcon size={20} className={iconClass} />
          </>
        )}

        {isWorkPlay && (
          <>
            <Link href="/">
              <div className="flex items-center gap-4">
                <ArrowBendUpLeftIcon size={20} className={iconClass} />
                <span>Back to room</span>
              </div>
            </Link>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              {variant === "work" && "Work"}
              {variant === "play" && "Play"}
            </div>
            <SunIcon size={20} className={iconClass} />
          </>
        )}

        {isProject && (
          <>
            <Link href="/work">
              <div className="flex items-center gap-4">
                <ArrowBendUpLeftIcon size={20} className={iconClass} />
                <span>All work</span>
              </div>
            </Link>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              {projectTitle ?? "Project"}
            </div>
            <SunIcon size={20} className={iconClass} />
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden items-center justify-between w-full">
        {/* Left: Arrow or empty */}
        <div className="w-8 flex justify-start">
          {isProject && (
            <Link href="/work" className="inline-flex items-center">
              <ArrowBendUpLeftIcon size={20} className={iconClass} />
            </Link>
          )}

          {(isHomeAbout || isWorkPlay || variant === "menu") && null}
          {/* For other variants you can add icons/links here if needed */}
        </div>

        {/* Center: Title */}
        <div className="flex-1 text-center truncate">
          {isHomeAbout &&
            (variant === "home"
              ? "Neeha's Room"
              : variant === "about"
              ? "About"
              : "")}
          {isWorkPlay &&
            (variant === "work" ? "Work" : variant === "play" ? "Play" : "")}
          {isProject && (projectTitle ?? "Project")}
          {variant === "menu" && "Menu"}
        </div>

        {/* Right: Menu button or empty */}
        <div className="w-8 flex justify-end">
          {!menuOpen && (
            <button onClick={() => setMenuOpen(true)} className="p-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key="list"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListIcon size={20} className={iconClass} />
                </motion.div>
              </AnimatePresence>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
