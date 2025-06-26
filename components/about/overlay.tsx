"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
  LinkedinLogoIcon,
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
        className="w-full h-full overflow-y-auto bg-[#111] text-white rounded-xl relative flex flex-col items-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-1/3 max-w-xs aspect-[3/4] mb-4">
          <Image
            src="https://nravula-portfolio-assets.s3.amazonaws.com/about/polaroid.png"
            alt="About Image"
            fill
            className="object-contain"
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
            <Link
              href="mailto:ravulaneeha@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <EnvelopeIcon size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/neeharavula/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinLogoIcon size={20} />
            </Link>
            <Link
              href="https://github.com/neeharavula"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/neehasroll/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogoIcon size={20} />
            </Link>
            <Link
              href="https://open.spotify.com/user/awesomesauce872?si=0ea3f9e157784457"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SpotifyLogoIcon size={20} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutOverlay;
