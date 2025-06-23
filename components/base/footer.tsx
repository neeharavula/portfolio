"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/motion-primitives/magnetic";

interface FooterProps {
  variant: "home" | "work" | "project" | "play" | "about" | "menu";
  onAboutClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ variant, onAboutClick }) => {
  const footerClass = `w-full text-sm px-8 py-8 font-[family-name:var(--font-geist-mono)] ${
    variant === "about"
      ? "bg-[#111] text-white"
      : "bg-transparent text-black dark:text-white"
  }`;

  return (
    <footer className={footerClass}>
      <div className="hidden sm:flex justify-between items-center">
        <div>© 2025</div>
        <Magnetic>
          <div>Collab / Say Hi</div>
        </Magnetic>

        <Magnetic>
          <button
            onClick={onAboutClick}
            className="relative px-3 py-1 rounded-lg cursor-pointer overflow-hidden group text-black dark:text-white"
          >
            <div className="absolute inset-0 rounded-lg bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <motion.div
              layoutId="about-overlay"
              className="absolute inset-0 rounded-lg pointer-events-none"
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-white">
              About
            </span>
          </button>
        </Magnetic>
      </div>
    </footer>
  );
};

export default Footer;
