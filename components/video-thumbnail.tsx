/* Video gallery item */

"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PlayCircleIcon, XIcon } from "@phosphor-icons/react/ssr";

const BASE = "https://f6ciazohrats9a1e.public.blob.vercel-storage.com";

type VideoThumbnailProps = {
  slug: string;
  title: string;
};

const VideoThumbnail = ({ slug, title }: VideoThumbnailProps) => {
  const [open, setOpen] = useState(false);
  const fullUrl = `${BASE}/play/video/${slug}/full.mp4`;
  const posterUrl = `${BASE}/play/video/${slug}/poster.jpg`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Play ${title}`}
        className="relative block w-full cursor-pointer"
      >
        <Image
          src={posterUrl}
          alt={title}
          width={1200}
          height={1200}
          className="w-full h-auto rounded-lg object-cover"
        />
        <PlayCircleIcon
          size={48}
          weight="fill"
          className="absolute inset-0 m-auto text-[#ededed] drop-shadow-lg"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/90 p-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={fullUrl}
                poster={posterUrl}
                controls
                autoPlay
                playsInline
                className="max-w-[90vw] max-h-[90vh] rounded-lg"
              />
            </motion.div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-xl right-xl text-tertiary hover:text-accent cursor-pointer"
            >
              <XIcon size={24} weight="regular" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoThumbnail;
