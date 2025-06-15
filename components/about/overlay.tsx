"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
  LinkedinLogoIcon,
  XIcon,
} from "@phosphor-icons/react";

type AboutOverlayProps = {
  onClose: () => void;
};

const AboutOverlay = ({ onClose }: AboutOverlayProps) => {
  if (typeof window !== "undefined" && window.innerWidth < 640) {
    return null; // skip mobile
  }

  return (
    <motion.div
      layoutId="about-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md p-20 font-[family-name:var(--font-geist-mono)]"
      onClick={onClose}
    >
      <div
        className="w-full h-full bg-[#111] text-white rounded-xl relative flex gap-12 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white"
          aria-label="Close"
        >
          <XIcon size={20} />
        </button>

        {/* Image */}
        <div className="relative w-1/3 aspect-[3/4]">
          <Image
            src="https://nravula-portfolio-assets.s3.amazonaws.com/about/me.JPG"
            alt="About Image"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Text + icons */}
        <div className="w-2/3 flex flex-col justify-center">
          <p className="whitespace-pre-wrap leading-relaxed text-sm">
            Hi, I’m Neeha! I’m a developer and creative based in San Diego, CA
            exploring the intersection of design and computation. I currently
            work as a software developer at a defense and aerospace company
            called General Atomics Aeronautical.
            <br />
            <br />
            Outside of work, you can find me hiking by the beach, messing around
            on my DJ controller, or finding my new song fixation. Feel free to
            reach out or say hi!
          </p>

          <div className="flex gap-8 mt-12">
            <EnvelopeIcon size={20} />
            <LinkedinLogoIcon size={20} />
            <GithubLogoIcon size={20} />
            <InstagramLogoIcon size={20} />
            <SpotifyLogoIcon size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutOverlay;
