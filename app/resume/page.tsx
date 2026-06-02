/* Resume page */

"use client";

import {
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { resumeSections } from "@/data/resume-data";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Magnetic } from "@/components/ui/magnetic";
import Layout from "@/components/base/general-layout";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_VERSION } from "@/config/image-version";
import Section from "@/components/base/section";

export default function ResumePage() {
  const [profileRef, profileInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Easter egg cursors :D
  const [activeCursorImage, setActiveCursorImage] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <Layout variant="resume">
      <div className="max-w-5xl mx-auto p-8 text-sm font-[family-name:var(--font-geist-mono)]">
        {/* Header Section */}
        <motion.div
          ref={profileRef}
          initial={{ opacity: 0, y: 20 }}
          animate={profileInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="flex items-center gap-8 mb-10"
        >
          <Image
            src={`https://f6ciazohrats9a1e.public.blob.vercel-storage.com/resume/pfp.jpeg?v=${IMAGE_VERSION}`}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full"
          />
          <div>
            <h1 className="text-sm font-medium">Neeha Ravula</h1>
            <p>Software Engineer</p>
            <p className="text-neutral-400">San Diego, CA</p>
          </div>
        </motion.div>

        {/* Resume Sections */}
        {resumeSections.map((section) => {
          // For Education section, use Sammy cursor
          const isEducation = section.title === "Education";

          return (
            <Section
              key={section.title}
              title={section.title}
              {...(isEducation
                ? {
                    onMouseMove: handleMouseMove,
                    style: activeCursorImage ? { cursor: "none" } : undefined,
                  }
                : {})}
            >
              <ul className="space-y-8">
                <AnimatedBackground
                  enableHover
                  className="rounded-md bg-[var(--hover-bg)]"
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.2,
                  }}
                  {...(isEducation
                    ? {
                        onValueChange: (id) => {
                          if (!id) { setActiveCursorImage(null); return; }
                          const idx = parseInt(id.split("-").pop()!);
                          setActiveCursorImage(section.entries[idx]?.cursorImage ?? null);
                        },
                      }
                    : {})}
                >
                  {section.entries.map((entry, i) => (
                    <motion.li
                      key={`${section.title}-${i}`}
                      data-id={`${section.title}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      className="rounded-md cursor-pointer"
                    >
                      <Link
                        href={entry.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-8 items-start px-3 py-3"
                      >
                        {/* Date */}
                        <p className="w-24 text-neutral-400 shrink-0">
                          {entry.date}
                        </p>
                        {/* Role and location */}
                        <div className="flex-1">
                          <p className="block relative z-10">
                            {entry.role}
                          </p>
                          <p className="text-neutral-400 text-sm">
                            {entry.location}
                          </p>
                          {/* Images */}
                          {entry.images && (
                            <div className="flex gap-2 mt-2">
                              {entry.images.map((src, idx) => (
                                <Image
                                  key={idx}
                                  src={src}
                                  alt="preview"
                                  width={120}
                                  height={80}
                                  className="rounded-md object-cover"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </AnimatedBackground>
              </ul>

              {/* Easter egg cursors */}
              {isEducation && activeCursorImage && (
                <div
                  style={{
                    position: "fixed",
                    top: cursorPos.y,
                    left: cursorPos.x,
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%)",
                    zIndex: 9999,
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundImage: `url("${activeCursorImage}")`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}
            </Section>
          );
        })}

        {/* Contact Section */}
        <Section title="Contact">
          <div className="flex flex-col items-center px-3 py-3 md:flex-row md:items-start md:justify-start">
            <div className="flex gap-8 items-center justify-center">
              {/* Email */}
              <Magnetic>
                <Link
                  href="mailto:hello@neeharavula.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#adbcc4]"
                >
                  <EnvelopeIcon size={20} />
                </Link>
              </Magnetic>
              {/* LinkedIn */}
              <Magnetic>
                <Link
                  href="https://www.linkedin.com/in/neeharavula/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#60a0c4]"
                >
                  <LinkedinLogoIcon size={20} />
                </Link>
              </Magnetic>
              {/* X */}
              <Magnetic>
                <Link
                  href="https://x.com/neeharavula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#adbcc4]"
                >
                  <XLogoIcon size={20} />
                </Link>
              </Magnetic>
              {/* Github */}
              <Magnetic>
                <Link
                  href="https://github.com/neeharavula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d1996b]"
                >
                  <GithubLogoIcon size={20} />
                </Link>
              </Magnetic>
              {/* Instagram */}
              <Magnetic>
                <Link
                  href="https://www.instagram.com/neehasroll/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#bd6881]"
                >
                  <InstagramLogoIcon size={20} />
                </Link>
              </Magnetic>
              {/* Spotify */}
              <Magnetic>
                <Link
                  href="https://open.spotify.com/user/awesomesauce872?si=0ea3f9e157784457"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#94A75D]"
                >
                  <SpotifyLogoIcon size={20} />
                </Link>
              </Magnetic>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
}
