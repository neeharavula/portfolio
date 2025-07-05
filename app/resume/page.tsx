"use client";

import React, { useState } from "react";
import Layout from "@/components/base/general-layout";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/work/section";
import { resumeSections } from "@/data/resume-data";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import {
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

export default function ResumePage() {
  const [profileRef, profileInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for custom cursor inside Education section
  const [isHoveringEducation, setIsHoveringEducation] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Handler to track mouse move inside Education section
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <Layout variant="resume">
      <div className="max-w-5xl mx-auto p-8 text-sm font-[family-name:var(--font-geist-mono)]">
        {/* Profile Header */}
        <motion.div
          ref={profileRef}
          initial={{ opacity: 0, y: 20 }}
          animate={profileInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="flex items-center gap-8 mb-10"
        >
          <Image
            src={`https://nravula-portfolio-assets.s3.amazonaws.com/resume/pfp.jpg`}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full"
          />
          <div>
            <h1 className="text-sm font-medium">Neeha Ravula</h1>
            <p className="text-black dark:text-white">Software Engineer</p>
            <p className="text-neutral-400">San Diego, CA</p>
          </div>
        </motion.div>

        {/* Resume Sections */}
        {resumeSections.map((section) => {
          // For Education section, add handlers and cursor style override
          const isEducation = section.title === "Education";

          return (
            <Section
              key={section.title}
              title={section.title}
              className={isEducation ? "relative" : ""}
              // When Education, add mouse events to track hover and mouse move
              {...(isEducation
                ? {
                    onMouseEnter: () => setIsHoveringEducation(true),
                    onMouseLeave: () => setIsHoveringEducation(false),
                    onMouseMove: handleMouseMove,
                    style: { cursor: "none" }, // hide default cursor on hover for Education section
                  }
                : {})}
            >
              <ul className="space-y-8">
                <AnimatedBackground
                  enableHover
                  className="rounded-md bg-zinc-100 dark:bg-zinc-900"
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.2,
                  }}
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
                        <p className="w-24 text-neutral-400 shrink-0">
                          {entry.date}
                        </p>
                        <div className="flex-1">
                          <p className="block text-black dark:text-white relative z-10">
                            {entry.role}
                          </p>
                          <p className="text-neutral-400 text-sm">
                            {entry.location}
                          </p>
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

              {/* Custom cursor image only shows inside Education section on hover */}
              {isEducation && isHoveringEducation && (
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
                    backgroundImage: 'url("/images/sammy.png")', // Replace with your cursor image URL
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
  <div className="flex gap-8 items-start px-3 py-3">
    <div className="flex-1 flex gap-8 items-center">
      <Magnetic>
        <div className="hover:text-[#adbcc4]">
          <Link
            href="mailto:ravulaneeha@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <EnvelopeIcon size={20} />
          </Link>
        </div>
      </Magnetic>
      <Magnetic>
        <div className="hover:text-[#60a0c4]">
          <Link
            href="https://www.linkedin.com/in/neeharavula/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogoIcon size={20} />
          </Link>
        </div>
      </Magnetic>
      <Magnetic>
        <div className="hover:text-[#d1996b]">
          <Link
            href="https://github.com/neeharavula"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogoIcon size={20} />
          </Link>
        </div>
      </Magnetic>
      <Magnetic>
        <div className="hover:text-[#bd6881]">
          <Link
            href="https://www.instagram.com/neehasroll/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogoIcon size={20} />
          </Link>
        </div>
      </Magnetic>
      <Magnetic>
        <div className="hover:text-[#94A75D]">
          <Link
            href="https://open.spotify.com/user/awesomesauce872?si=0ea3f9e157784457"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SpotifyLogoIcon size={20} />
          </Link>
        </div>
      </Magnetic>
    </div>
  </div>
</Section>


      </div>
    </Layout>
  );
}
