"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import {
  SunIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

interface FooterProps {
  variant: "home" | "work" | "project" | "play" | "about" | "menu";
  onAboutClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ variant, onAboutClick }) => {
  const isNormalMobileVariant = ["home", "work", "project", "play"].includes(
    variant
  );
  const isSocialMobileVariant = ["about", "menu"].includes(variant);

  return (
    <footer className="w-full text-sm px-8 py-8 font-[family-name:var(--font-geist-mono)]">
      {/* Desktop */}
      <div className="hidden sm:flex justify-between items-center">
        <div>© 2025</div>
        <Magnetic>
          <button
            onClick={onAboutClick}
            className="relative px-3 py-1 rounded-lg cursor-pointer overflow-hidden group text-black dark:text-white"
          >
            {/* Hover background (separate from morph) */}
            <div className="absolute inset-0 rounded-lg bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Morph background (ONLY handles morph) */}
            <motion.div
              layoutId="about-overlay"
              className="absolute inset-0 rounded-lg pointer-events-none"
            />

            {/* Text */}
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-white">
              About
            </span>
          </button>
        </Magnetic>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        {isNormalMobileVariant && (
          <div className="flex justify-between items-center">
            <div>© 2025</div>
            <SunIcon size={20} />
          </div>
        )}

        {isSocialMobileVariant && (
          <div className="flex justify-center items-center gap-4">
            <EnvelopeIcon size={20} />
            <LinkedinLogoIcon size={20} />
            <GithubLogoIcon size={20} />
            <InstagramLogoIcon size={20} />
            <SpotifyLogoIcon size={20} />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
