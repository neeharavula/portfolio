/* Play page */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { captions, filters, imageFiles, FilterType } from "@/data/play-gallery";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogContainer,
} from "@/components/motion-primitives/morphing-dialog";
import Layout from "@/components/base/general-layout";
import Image from "next/image";
import Masonry from "react-masonry-css";

// Play
export default function Play() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("film");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Loading and progress handling
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
  }, [activeFilter]);

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    0: 1,
  };

  const visibleFilters = filters;

  const imageUrl = (file: string) =>
    `https://nravula-portfolio-assets.s3.amazonaws.com/play/${activeFilter}/${file}`;

  return (
    <Layout variant="play">
      <section className="flex flex-col px-8 py-4 items-center gap-6 text-sm font-[family-name:var(--font-geist-mono)] relative">
        {/* Loading dialog */}
        {loading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black transition-colors">
            <div
              className="text-2xl"
              style={{ fontFamily: "var(--font-offbit)", fontWeight: "bold" }}
            >
              {progress}
            </div>
            <div
              className="mt-2 text-sm"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {captions[activeFilter]}
            </div>
          </div>
        )}

        {/* Gallery gilters */}
        <div className="flex flex-wrap justify-center gap-12">
          {visibleFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setLoading(true);
                setActiveFilter(filter);
              }}
              className={`capitalize tracking-wide cursor-pointer ${
                activeFilter === filter
                  ? "text-[color:var(--foreground)] dark:text-[color:var(--foreground)]"
                  : "text-gray-400"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry image grid */}
        {!loading && (
          <div className="w-full max-w-6xl px-2 sm:px-4 mt-8">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-column"
            >
              {imageFiles[activeFilter].map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Expand image */}
                  <MorphingDialog
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <MorphingDialogTrigger>
                      <Image
                        src={imageUrl(file)}
                        alt={`${activeFilter} ${index}`}
                        width={500}
                        height={600}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </MorphingDialogTrigger>
                    <MorphingDialogContainer>
                      <MorphingDialogContent className="relative">
                        <Image
                          src={imageUrl(file)}
                          alt={`${activeFilter} ${index}`}
                          width={1200}
                          height={1600}
                          className="h-auto w-full max-w-[90vw] rounded-lg object-cover lg:h-[90vh]"
                        />
                      </MorphingDialogContent>
                    </MorphingDialogContainer>
                  </MorphingDialog>
                </motion.div>
              ))}

              {/* Spacer to shift lone image to the left on mobile */}
              {imageFiles[activeFilter].length % 2 === 1 && (
                <div key="spacer" className="block sm:hidden h-0"></div>
              )}
            </Masonry>
          </div>
        )}
      </section>
    </Layout>
  );
}
