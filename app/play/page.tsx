"use client";

import { useState } from "react";
import Layout from "@/components/base/general-layout";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { filters, imageFiles, FilterType } from "@/data/play-gallery";

export default function Play() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("film");

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    0: 1,
  };

  return (
    <Layout variant="play">
      <section className="flex flex-col p-8 mt-8 items-center gap-6 text-sm font-[family-name:var(--font-geist-mono)]">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
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

        {/* Masonry Grid */}
        <div className="w-full max-w-6xl px-2 sm:px-4 mt-8">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-column"
          >
            {imageFiles[activeFilter].map((file, index) => (
              <div key={index}>
                {activeFilter === "video" ? (
                  <video
                    src={`https://nravula-portfolio-assets.s3.amazonaws.com/play/${activeFilter}/${file}`}
                    muted
                    loop
                    preload="metadata"
                    className="w-full h-auto object-cover rounded-lg"
                    onMouseOver={(e) => {
                      e.currentTarget.play();
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <Image
                    src={`https://nravula-portfolio-assets.s3.amazonaws.com/play/${activeFilter}/${file}`}
                    alt={`${activeFilter} ${index}`}
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                )}
              </div>
            ))}

            {/* 👇 Spacer div to shift lone image to the left on mobile */}
            {imageFiles[activeFilter].length % 2 === 1 && (
              <div key="spacer" className="block sm:hidden h-0"></div>
            )}
          </Masonry>
        </div>
      </section>
    </Layout>
  );
}
