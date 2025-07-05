"use client";

import { useEffect, useState } from "react";
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
import { useInView } from "react-intersection-observer";
import { Magnetic } from "@/components/motion-primitives/magnetic";

type AboutOverlayProps = {
  onClose: () => void;
};

const AboutOverlay = ({ onClose }: AboutOverlayProps) => {
  // Hook calls always happen unconditionally
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: iconsRef, inView: iconsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for checking if screen width is < 640 (mobile)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check window width only on client side
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 640);

      // Optional: listen for resize if you want dynamic updates
      const handleResize = () => setIsMobile(window.innerWidth < 640);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (isMobile) {
    return null; // skip mobile render
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
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 20 }}
          animate={imageInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="relative w-1/3 max-w-xs aspect-[3/4] mb-4"
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
          transition={{ delay: 0.2, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="w-2/3 flex flex-col justify-center"
        >
          <p className="whitespace-pre-wrap leading-relaxed text-sm">
            Hi! I&apos;m Neeha. I grew up in San Diego, California and studied
            Computer Science at UC Santa Cruz in northern California. Currently,
            I develop simulation and flight control software solutions in the
            aerospace/defense sector. 🛩️
            <br />
            <br />
            I approach my work with a mix of intentionality, playfulness, and
            care, balancing thoughtful design with scalable, functional
            solutions. I’m driven by curiosity and exploration, and am always
            looking for opportunities that lie at the intersection of design,
            tech, and social impact.
            <br />
            <br />
            Outside of tech, you can find me hiking by the beach, taking photos
            on my Fujifilm XT30II, browsing my next travel destination
            (it&apos;s an obsession), or finding my next song fixation on
            Spotify. Feel free to reach out and say hi!
          </p>
        </motion.div>

        {/* Icons */}
        <motion.div
          ref={iconsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={iconsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="flex gap-8 mt-12"
        >
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutOverlay;
