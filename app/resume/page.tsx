// app/resume/page.tsx

import Layout from "@/components/base/general-layout";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/work/section";
import { resumeSections } from "@/data/resume-data";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";

export default function ResumePage() {
  return (
    <Layout variant="resume">
      <div className="max-w-5xl mx-auto p-8 text-sm font-[family-name:var(--font-geist-mono)]">
        {/* Profile Header */}
        <div className="flex items-center gap-8 mb-10">
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
        </div>

        {/* About Section */}
        <Section title="About">
          <p>
            Software engineer passionate about the intersection of design and
            technology. Currently developing flight control and simulation
            software solutions in the aerospace/defense sector. 🛩️
          </p>
        </Section>

        {/* Resume Sections */}
        {resumeSections.map((section) => (
          <Section key={section.title} title={section.title}>
            <ul className="space-y-8">
              <AnimatedBackground
                enableHover
                className="rounded-md bg-zinc-100 dark:bg-zinc-800"
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: 0.2,
                }}
              >
                {section.entries.map((entry, i) => (
                  <li
                    key={i}
                    data-id={`${section.title}-${i}`}
                    className="flex gap-8 items-start px-3 py-3 rounded-md cursor-pointer"
                  >
                    <p className="w-24 text-neutral-400 shrink-0">
                      {entry.date}
                    </p>
                    <div className="flex-1">
                      <Link
                        href={entry.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-black dark:text-white relative z-10"
                      >
                        {entry.role}
                      </Link>
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
                  </li>
                ))}
              </AnimatedBackground>
            </ul>
          </Section>
        ))}
      </div>
    </Layout>
  );
}
