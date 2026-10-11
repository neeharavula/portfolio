/* Play page */

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Masonry from "react-masonry-css";
import { filters, imageFiles, videoItems, FilterType } from "@/data/play-gallery";
import ExpandableImage from "@/components/expandable-image";
import VideoThumbnail from "@/components/video-thumbnail";

const imageBreakpointCols = {
  default: 4,
  768: 2,
};

// Video thumbnails are given more room than photos
const videoBreakpointCols = {
  default: 2,
  768: 2,
};

const imageUrl = (category: Exclude<FilterType, "video">, file: string) =>
  `https://f6ciazohrats9a1e.public.blob.vercel-storage.com/play/${category}/${file}`;

type ImageGalleryItem = { category: Exclude<FilterType, "video">; file: string };

type MixedGalleryItem =
  | { type: "image"; category: Exclude<FilterType, "video">; file: string }
  | { type: "video"; slug: string; title: string };

const renderImageGrid = (items: ImageGalleryItem[]) => (
  <Masonry
    breakpointCols={imageBreakpointCols}
    className="masonry-grid"
    columnClassName="masonry-column"
  >
    {items.map(({ category, file }, index) => (
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

const renderVideoGrid = () => (
  <Masonry
    breakpointCols={videoBreakpointCols}
    className="masonry-grid"
    columnClassName="masonry-column"
  >
    {videoItems.map(({ slug, title }, index) => (
      <motion.div
        key={slug}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <VideoThumbnail slug={slug} title={title} />
      </motion.div>
    ))}
  </Masonry>
);

const mobileItems: MixedGalleryItem[] = filters.flatMap((filter) =>
  filter === "video"
    ? videoItems.map(({ slug, title }): MixedGalleryItem => ({ type: "video", slug, title }))
    : imageFiles[filter].map(
        (file): MixedGalleryItem => ({ type: "image", category: filter, file })
      )
);

const renderMobileGrid = () => (
  <Masonry
    breakpointCols={videoBreakpointCols}
    className="masonry-grid"
    columnClassName="masonry-column"
  >
    {mobileItems.map((item, index) => (
      <motion.div
        key={item.type === "video" ? item.slug : `${item.category}-${item.file}-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        {item.type === "video" ? (
          <VideoThumbnail slug={item.slug} title={item.title} />
        ) : (
          <ExpandableImage
            src={imageUrl(item.category, item.file)}
            alt={`${item.category} ${index}`}
            className="w-full h-auto object-cover"
          />
        )}
      </motion.div>
    ))}
  </Masonry>
);

export default function Play() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(filters[0]);

  const currentImages: ImageGalleryItem[] =
    activeFilter === "video"
      ? []
      : imageFiles[activeFilter].map((file) => ({ category: activeFilter, file }));

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

      {/* Masonry grid(s) */}
      <div className="w-full md:flex-1">
        {/* Mobile: everything combined, in filter order */}
        <div className="md:hidden">{renderMobileGrid()}</div>

        {/* Desktop: filtered to the selected category */}
        <div className="hidden md:block">
          {activeFilter === "video" ? renderVideoGrid() : renderImageGrid(currentImages)}
        </div>
      </div>
    </main>
  );
}
