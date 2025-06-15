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

  return (
    <nav className="w-full text-sm px-8 py-8 font-[family-name:var(--font-geist-mono)]">
      {/* Desktop */}
      <div className="hidden sm:flex w-full items-center justify-between">
        {isHomeAbout && (
          <>
            <Link href="/">
              <div>{"Neeha's Room"}</div>
            </Link>
            <SunIcon size={20} />
          </>
        )}

        {isWorkPlay && (
          <>
            <Link href="/">
              <div className="flex items-center gap-4">
                <ArrowBendUpLeftIcon size={20} />
                <span>Back to room</span>
              </div>
            </Link>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              {variant === "work" && "Work"}
              {variant === "play" && "Play"}
            </div>
            <SunIcon size={20} />
          </>
        )}

        {isProject && (
          <>
            <Link href="/work">
              <div className="flex items-center gap-4">
                <ArrowBendUpLeftIcon size={20} />
                <span>All work</span>
              </div>
            </Link>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              {projectTitle ?? "Project"}
            </div>
            <SunIcon size={20} />
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {isHomeAbout && (
            <Link href="/">
              <div>{"Neeha's Room"}</div>
            </Link>
          )}

          <div className="flex items-center gap-2">
            {isWorkPlay && (
              <Link href="/">
                <ArrowBendUpLeftIcon size={20} />
              </Link>
            )}
          </div>

          {/* Center title */}
          {isWorkPlay && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              {variant === "work" && "Work"}
              {variant === "play" && "Play"}
            </div>
          )}

          {isProject && (
            <>
              <Link href="/work">
                <ArrowBendUpLeftIcon size={20} />
              </Link>
              <div className="text-center">{projectTitle ?? "Project"}</div>
            </>
          )}

          {variant === "menu" && <div>Menu</div>}
        </div>

        {/* List button only (X button handled in overlay) */}
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
                <ListIcon size={20} className="text-black" />
              </motion.div>
            </AnimatePresence>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
