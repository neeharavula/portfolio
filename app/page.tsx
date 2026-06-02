/* Home page */

"use client";

import Layout from "@/components/base/general-layout";
import Link from "next/link";
import { TextLoop } from "@/components/ui/text-loop";
import { Magnetic } from "@/components/ui/magnetic";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
} from "@phosphor-icons/react";

/* Home */
export default function Home() {
  return (
    <Layout variant="home">
      <section className="relative flex flex-col justify-between h-full w-full px-8">
        {/* Summary */}
        <div className="flex-1 flex items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="font-offbit mt-17 text-[3rem] md:text-[5em] lg:text-[5rem] xl:text-[6rem] leading-none"
          >
            Neeha Ravula is a{" "}
            <span className="inline-block sm:inline">
              <TextLoop
                className="overflow-y-clip text-[#94A75D] leading-[1] align-baseline"
                transition={{
                  type: "spring",
                  stiffness: 900,
                  damping: 80,
                  mass: 10,
                }}
                variants={{
                  initial: {
                    y: 20,
                    rotateX: 90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                  animate: {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                  exit: {
                    y: -20,
                    rotateX: -90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                }}
              >
                <span>developer</span>
                <span>creative</span>
              </TextLoop>
            </span>
            <br />
            based in San Diego, CA, exploring <br /> the intersection of design
            and <br />
            computation.
          </motion.h1>
        </div>

        {/* Bottom right nav */}
        <div className="hidden sm:flex flex-col gap-8 text-right text-sm font-[family-name:var(--font-geist-mono)] absolute bottom-8 right-8">
          {/* Work */}
          <Magnetic>
            <div className="relative inline-block">
              <Link href="/work" className="block hover:text-[#94A75D]">
                <span className="text-gray-500">[</span> Work{" "}
                <span className="text-gray-500">]</span>
              </Link>
            </div>
          </Magnetic>
          {/* Play */}
          <Magnetic>
            <div className="relative inline-block">
              <Link href="/play" className="block hover:text-[#94A75D]">
                <span className="text-gray-500">[</span> Play{" "}
                <span className="text-gray-500">]</span>
              </Link>
            </div>
          </Magnetic>
          {/* Resume */}
          <Magnetic>
            <div className="relative inline-block">
              <Link href="/resume" className="block hover:text-[#94A75D]">
                <span className="text-gray-500">[</span> Resume{" "}
                <span className="text-gray-500">]</span>
              </Link>
            </div>
          </Magnetic>
        </div>
        {/* Mobile: Socials */}
        <div className="fixed bottom-8 left-0 w-full flex justify-center gap-8 sm:hidden text-xl text-zinc-600 dark:text-zinc-400 z-40">
          {/* Email */}
          <Link
            href="mailto:hello@neeharavula.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <EnvelopeIcon size={20} />
          </Link>
          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/neeharavula/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogoIcon size={20} />
          </Link>
          {/* X */}
          <Link
            href="https://x.com/neeharavula"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XLogoIcon size={20} />
          </Link>
          {/* Github */}
          <Link
            href="https://github.com/neeharavula"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogoIcon size={20} />
          </Link>
          {/* Instagram */}
          <Link
            href="https://www.instagram.com/neehasroll/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogoIcon size={20} />
          </Link>
          {/* Spotify */}
          <Link
            href="https://open.spotify.com/user/awesomesauce872?si=0ea3f9e157784457"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SpotifyLogoIcon size={20} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
