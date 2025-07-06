/* Top nav bar component */

"use client";

import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  SunHorizonIcon,
  ArrowBendUpLeftIcon,
  ListIcon,
} from "@phosphor-icons/react";
import { Magnetic } from "../ui/magnetic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NavProps {
  variant: "home" | "work" | "project" | "play" | "about" | "menu" | "resume";

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
  const isWorkPlayResume = ["work", "play", "resume"].includes(variant);
  const isHomeAbout = ["home", "about"].includes(variant);
  const isProject = variant === "project";

  const [time, setTime] = useState<string>(() => formatTime(new Date()));
  const [hour, setHour] = useState<number>(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(formatTime(now));
      setHour(now.getHours());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  const getIcon = () => {
    if ((hour >= 6 && hour < 8) || (hour >= 18 && hour < 20)) {
      return <SunHorizonIcon size={20} className={iconClass} />;
    }
    if (hour >= 8 && hour < 18) {
      return <SunIcon size={20} className={iconClass} />;
    }
    return <MoonIcon size={20} className={iconClass} />;
  };

  const navClass = `w-full text-sm px-8 py-8 font-[family-name:var(--font-geist-mono)] ${
    variant === "about"
      ? "bg-black text-white"
      : "bg-[var(--background)] text-black dark:text-white"
  }`;

  const iconClass =
    variant === "about" ? "text-white" : "text-black dark:text-white";

  return (
    <nav className={navClass}>
      {/* Desktop */}
      <div className="hidden sm:flex w-full items-center justify-between">
        {isHomeAbout && (
          <>
            <Magnetic>
              <Link href="/">
                <div className="relative z-10">{"Neeha Ravula"}</div>
              </Link>
            </Magnetic>
            <div className="flex items-center gap-8 relative z-10">
              <span>{time}</span>
              {getIcon()}
            </div>
          </>
        )}

        {isWorkPlayResume && (
          <>
            <Magnetic>
              <Link href="/">
                <div className="flex items-center gap-8 relative z-10">
                  <ArrowBendUpLeftIcon size={20} className={iconClass} />
                  <span>Back</span>
                </div>
              </Link>
            </Magnetic>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              {variant === "work" && "Work"}
              {variant === "play" && "Play"}
              {variant === "resume" && "Resume"}
            </div>
            <div className="flex items-center gap-8 relative z-10">
              <span>{time}</span>
              {getIcon()}
            </div>
          </>
        )}

        {isProject && (
          <>
            <Magnetic>
              <Link href="/work">
                <div className="flex items-center gap-8 relative z-10">
                  <ArrowBendUpLeftIcon size={20} className={iconClass} />
                  <span>All work</span>
                </div>
              </Link>
            </Magnetic>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              {projectTitle ?? "Project"}
            </div>
            <div className="flex items-center gap-8 relative z-10">
              <span>{time}</span>
              {getIcon()}
            </div>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden items-center justify-between w-full">
        <div className={`flex justify-start ${isProject ? "w-8" : ""}`}>
          {isProject && (
            <Link href="/work" className="inline-flex items-center">
              <ArrowBendUpLeftIcon size={20} className={iconClass} />
            </Link>
          )}
        </div>
        <div
          className={`flex-1 truncate ${
            isProject ? "text-center" : "text-left"
          }`}
        >
          {isHomeAbout &&
            (variant === "home"
              ? "Neeha Ravula"
              : variant === "about"
              ? "About"
              : "")}
          {isWorkPlayResume &&
            (variant === "work"
              ? "Work"
              : variant === "play"
              ? "Play"
              : variant === "resume"
              ? "Resume"
              : "")}
          {isProject && (projectTitle ?? "Project")}
          {variant === "menu" && "Menu"}
        </div>
        <div className="w-8 flex justify-end">
          {!menuOpen && (
            <button onClick={() => setMenuOpen(true)}>
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
