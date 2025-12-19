/* Desktop footer component */

"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import Link from "next/link";

interface FooterProps {
  variant: "home" | "work" | "project" | "play" | "about" | "menu" | "resume";
  onAboutClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ variant, onAboutClick }) => {
  const footerClass = `w-full text-sm px-8 py-8 font-[family-name:var(--font-geist-mono)] ${
    variant === "about"
      ? "bg-[#111] text-white"
      : "bg-transparent"
  }`;

  return (
    <footer className={footerClass}>
      <div className="hidden sm:flex justify-between items-center">
        {/* Copyright */}
        <div className="relative z-10">© {new Date().getFullYear()}</div>
        {/* Collab note */}
        <Magnetic>
          <Link
            href="mailto:hello@neeharavula.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              Collab <span className="text-gray-500">/</span> Say Hi
            </div>
          </Link>
        </Magnetic>

        {/* About button */}
        <Magnetic>
          <button
            onClick={onAboutClick}
            className="relative px-3 py-1 rounded-lg cursor-pointer overflow-hidden group"
          >
            <div className="absolute inset-0 rounded-lg bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <motion.div
              layoutId="about-overlay"
              className="absolute inset-0 rounded-lg pointer-events-none"
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              About
            </span>
          </button>
        </Magnetic>
      </div>
    </footer>
  );
};

export default Footer;
