/* Play page */

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Masonry from "react-masonry-css";
import { filters, imageFiles, FilterType } from "@/data/play-gallery";
import ExpandableImage from "@/components/expandable-image";

const breakpointColumnsObj = {
  default: 4,
  768: 2,
};

const imageUrl = (category: FilterType, file: string) =>
  `https://f6ciazohrats9a1e.public.blob.vercel-storage.com/play/${category}/${file}`;

type GalleryImage = { category: FilterType; file: string };

const renderGrid = (images: GalleryImage[]) => (
  <Masonry
    breakpointCols={breakpointColumnsObj}
    className="masonry-grid"
    columnClassName="masonry-column"
  >
    {images.map(({ category, file }, index) => (
      <motion.div
        key={`${category}-${file}-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <ExpandableImage
          src={imageUrl(category, file)}
          alt={`${category} ${index}`}
          className="w-full h-auto object-cover"
        />
      </motion.div>
    ))}
  </Masonry>
);

export default function Play() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(filters[0]);

  // Mobile has no filter UI (nav is desktop-only) - it always shows every
  // category combined, independent of the desktop filter selection.
  const allImages = filters.flatMap((category) =>
    imageFiles[category].map((file) => ({ category, file }))
  );
  const currentImages = imageFiles[activeFilter].map((file) => ({
    category: activeFilter,
    file,
  }));

  return (
    <main className="flex-1 flex flex-col md:flex-row gap-y-sm md:gap-x-8 px-xl md:px-16 pt-md md:pt-16 pb-xl font-content text-sm">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 md:shrink-0 space-y-10">
        <div>
          <h1 className="font-header text-2xl text-header">
            welcome to the playground
          </h1>
          <p className="text-tertiary mt-sm">Exploration in other mediums</p>
        </div>

        <nav className="hidden md:flex flex-col gap-sm font-navigation text-sm uppercase">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-left uppercase cursor-pointer ${
                activeFilter === filter ? "text-accent" : "text-tertiary"
              }`}
            >
              {activeFilter === filter ? `[ ${filter} ]` : filter}
            </button>
          ))}
        </nav>
      </div>

      {/* Masonry image grid */}
      <div className="w-full md:flex-1">
        <div className="md:hidden">{renderGrid(allImages)}</div>
        <div className="hidden md:block">{renderGrid(currentImages)}</div>
      </div>
    </main>
  );
}
