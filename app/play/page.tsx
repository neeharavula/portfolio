/* Play page */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { captions, filters, imageFiles, FilterType } from "@/data/play-gallery";
import ExpandableImage from "@/components/ui/expandable-image";
import Layout from "@/components/base/general-layout";
import Masonry from "react-masonry-css";

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
    `https://f6ciazohrats9a1e.public.blob.vercel-storage.com/play/${activeFilter}/${file}`;

  return (
    <Layout variant="play">
      <section className="flex flex-col px-8 py-4 items-center gap-6 text-sm font-[family-name:var(--font-geist-mono)] relative">
        {/* Loading dialog */}
        {loading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--background)] transition-colors">
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

        {/* Gallery filters */}
        <div className="flex flex-wrap justify-center gap-12">
          {visibleFilters.map((filter) => {
            const handleFilterHover = () => {
              // Preload images for this filter on hover
              if (filter !== activeFilter) {
                imageFiles[filter].forEach((file) => {
                  const img = new window.Image();
                  img.src = `https://f6ciazohrats9a1e.public.blob.vercel-storage.com/play/${filter}/${file}`;
                });
              }
            };

            return (
              <button
                key={filter}
                onClick={() => {
                  setLoading(true);
                  setActiveFilter(filter);
                }}
                onMouseEnter={handleFilterHover}
                className={`capitalize tracking-wide cursor-pointer ${
                  activeFilter === filter
                    ? "text-[color:var(--foreground)] dark:text-[color:var(--foreground)]"
                    : "text-gray-400"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Masonry image grid */}
        <div className={`w-full max-w-6xl px-2 sm:px-4 mt-8 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-column"
            >
              {imageFiles[activeFilter].map((file, index) => {
                const handleMouseEnter = () => {
                  // Preload the full-resolution image on hover
                  const img = new window.Image();
                  img.src = imageUrl(file);
                };

                return (
                  <motion.div
                    key={`${activeFilter}-${file}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={loading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: loading ? 0 : index * 0.1 }}
                    onMouseEnter={handleMouseEnter}
                  >
                    <ExpandableImage
                      src={imageUrl(file)}
                      alt={`${activeFilter} ${index}`}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                );
              })}

              {/* Spacer to shift lone image to the left on mobile */}
              {imageFiles[activeFilter].length % 2 === 1 && (
                <div key="spacer" className="block sm:hidden h-0"></div>
              )}
            </Masonry>
        </div>
      </section>
    </Layout>
  );
}
