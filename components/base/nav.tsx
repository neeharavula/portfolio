"use client";

import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  SunHorizonIcon,
  ArrowBendUpLeftIcon,
  ListIcon,
} from "@phosphor-icons/react";
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

  const [time, setTime] = useState<string>(() => formatTime(new Date()));
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(formatTime(now));
      setHour(now.getHours());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDarkMode(e.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
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
      ? "bg-[var(--background)] text-white"
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
            <Link href="/">
              <div>{"Neeha Ravula"}</div>
            </Link>
            <div className="flex items-center gap-8">
              <span>{time}</span>
              {getIcon()}
            </div>
          </>
        )}

        {isWorkPlay && (
          <>
            <Link href="/">
              <div className="flex items-center gap-8">
                <ArrowBendUpLeftIcon size={20} className={iconClass} />
                <span>Back</span>
              </div>
            </Link>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              {variant === "work" && "Work"}
              {variant === "play" && "Play"}
            </div>
            <div className="flex items-center gap-8">
              <span>{time}</span>
              {getIcon()}
            </div>
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
            <div className="flex items-center gap-4">
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
          {isWorkPlay &&
            (variant === "work" ? "Work" : variant === "play" ? "Play" : "")}
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
