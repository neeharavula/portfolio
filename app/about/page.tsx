/* Mobile about page */

"use client";

import {
  EnvelopeIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Layout from "@/components/base/general-layout";
import Image from "next/image";
import Link from "next/link";

const AboutPageContent = () => {
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: iconsRef, inView: iconsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="flex flex-col items-center px-6 py-2 pb-8 font-[family-name:var(--font-geist-mono)]">
      {/* Image */}
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, y: 20 }}
        animate={imageInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="relative w-2/3 max-w-sm aspect-[3/4] mb-4"
      >
        <Image
          src="/images/about/polaroid.png"
          alt="About Image"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, y: 20 }}
        animate={textInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="text-center leading-relaxed text-sm mt-6 space-y-8"
      >
        <p className="indent-8">
          Hi! I&apos;m Neeha. I grew up in San Diego, California and studied
          Computer Science at UC Santa Cruz in northern California. Currently, I
          develop simulation and flight control software solutions in the
          aerospace/defense sector.
        </p>
        <p className="indent-8">
          I approach my work with a mix of intentionality, playfulness, and
          care, balancing thoughtful design with scalable, functional solutions.
          I&apos;m driven by curiosity and exploration and I&apos;m always
          looking for opportunities that lie at the intersection of design,
          tech, and social impact.
        </p>
        <p className="indent-8">
          Outside of tech, you can find me hiking by the beach, taking photos on
          my Fujifilm XT30II, browsing my next travel destination (it&apos;s an
          obsession), or finding my next song fixation on Spotify. Feel free to
          reach out and say hi!
        </p>
      </motion.div>

      {/* Social icons at bottom */}
      <motion.div
        ref={iconsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={iconsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="flex justify-center items-center gap-8 mt-8"
      >
        <Link
          href="mailto:hello@neeharavula.com"
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
      </motion.div>
    </div>
  );
};

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    setProgress(0);

    const interval = setInterval(() => {
      start = Math.min(start + Math.floor(Math.random() * 15) + 5, 100);
      setProgress(start);

      if (start >= 100) {
        clearInterval(interval);
      }
    }, 200);

    const loadTimeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setLoading(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(loadTimeout);
    };
  }, []);

  return (
    <Layout variant="about">
      <div className="bg-black text-white min-h-screen relative">
        {loading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-colors">
            <div
              className="text-2xl text-white"
              style={{ fontFamily: "var(--font-offbit)", fontWeight: "bold" }}
            >
              {progress}
            </div>
            <div
              className="mt-2 text-sm text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Loading info...
            </div>
          </div>
        )}

        {!loading && <AboutPageContent />}
      </div>
    </Layout>
  );
}
