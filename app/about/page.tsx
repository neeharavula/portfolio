/* About page */

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  EnvelopeIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
} from "@phosphor-icons/react/ssr";
import { resumeSections } from "@/data/resume-data";
import Section from "@/components/section";
import { Magnetic } from "@/components/motion-primitives/magnetic";

const socials = [
  { href: "mailto:hello@neeharavula.com", label: "Email", Icon: EnvelopeIcon },
  {
    href: "https://www.linkedin.com/in/neeharavula/",
    label: "LinkedIn",
    Icon: LinkedinLogoIcon,
  },
  { href: "https://x.com/neeharavula", label: "X", Icon: XLogoIcon },
  {
    href: "https://github.com/neeharavula",
    label: "GitHub",
    Icon: GithubLogoIcon,
  },
  {
    href: "https://www.instagram.com/neehasroll/",
    label: "Instagram",
    Icon: InstagramLogoIcon,
  },
  {
    href: "https://open.spotify.com/user/awesomesauce872?si=0ea3f9e157784457",
    label: "Spotify",
    Icon: SpotifyLogoIcon,
  },
];

export default function About() {
  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [textRef, textInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Easter egg cursor
  const [activeCursorImage, setActiveCursorImage] = useState<string | null>(
    null
  );
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main className="max-w-5xl mx-auto px-xl pt-16 pb-xl font-content text-sm">
      {/* Summary */}
      <div className="flex flex-col md:flex-row gap-24 items-start mb-xl">
        {/* Photo */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 20 }}
          animate={imageInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="relative w-full md:w-1/4 aspect-[3/4] shrink-0 -rotate-3"
        >
          <Image
            src="https://f6ciazohrats9a1e.public.blob.vercel-storage.com/about/polaroid.png"
            alt="Neeha Ravula"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Text + socials */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 20 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="flex-1 space-y-lg leading-relaxed text-primary"
        >
          <h1 className="font-header text-2xl text-header">
            hi! i&apos;m neeha
          </h1>
          <p>
            I grew up in San Diego, California and studied
            computer science at UC Santa Cruz. This fall, I&apos;ll be heading
            to NYC to pursue a master&apos;s in computer science at Cornell
            Tech, exploring the areas of human-centered computing and AI.
            Previously, I worked on developing software solutions across the
            aerospace and fintech sectors.
          </p>
          <p>
            I approach my work with a mix of intentionality, playfulness, and
            care, bridging thoughtful design with scalable, functional
            solutions. I&apos;m driven by curiosity and a hunger to learn, and
            am always looking for opportunities that lie at the intersection
            of design, tech, and social impact.
          </p>
          <p>
            Outside of tech, you can find me hiking in the mountains, taking
            photos on my Fujifilm XT30II, or finding my next song fixation on
            Spotify. Feel free to reach out and say hi!
          </p>

          {/* Socials */}
          <div className="flex items-center gap-lg pt-md text-primary">
            {socials.map(({ href, label, Icon }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-accent"
                >
                  <Icon size={20} weight="regular" />
                </a>
              </Magnetic>
            ))}
          </div>
        </motion.div>
      </div>

      <hr className="border-t-[0.5px] border-secondary mt-16 mb-16" />

      {/* Resume */}
      <div>
        {resumeSections.map((section) => {
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
              <ul className="space-y-lg">
                {section.entries.map((entry, i) => (
                  <motion.li
                    key={`${section.title}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.5,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    onMouseEnter={
                      isEducation
                        ? () =>
                            setActiveCursorImage(entry.cursorImage ?? null)
                        : undefined
                    }
                    onMouseLeave={
                      isEducation ? () => setActiveCursorImage(null) : undefined
                    }
                  >
                    <Link
                      href={entry.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-lg items-start"
                    >
                      {/* Date */}
                      <p className="w-24 shrink-0 text-tertiary">
                        {entry.date}
                      </p>
                      {/* Role and location */}
                      <div className="flex-1">
                        <p className="text-primary">{entry.role}</p>
                        <p className="text-tertiary text-sm">
                          {entry.location}
                        </p>
                        {/* Images */}
                        {entry.images && entry.images.length > 0 && (
                          <div className="flex gap-sm mt-sm">
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
              </ul>
            </Section>
          );
        })}
      </div>

      {/* Easter egg cursor */}
      {activeCursorImage && (
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
    </main>
  );
}
