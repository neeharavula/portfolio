"use client";

import Layout from "@/components/base/general-layout";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/work/section";
import { resumeSections } from "@/data/resume-data";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ResumePage() {
  const [profileRef, profileInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

        {/* About Section */}
        <Section title="About">
          Software engineer passionate about the intersection of design and
          technology. Currently developing flight control and simulation
          software solutions in the aerospace/defense sector. 🛩️
        </Section>

        {/* Resume Sections */}
        {resumeSections.map((section) => (
          <Section key={section.title} title={section.title}>
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
                    className="rounded-md cursor-pointer" // make cursor pointer on entire item
                  >
                    <Link
                      href={entry.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-8 items-start px-3 py-3"
                      // full size clickable container with flex for layout
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
          </Section>
        ))}
      </div>
    </Layout>
  );
}
