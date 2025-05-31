"use client";

import { useState } from "react";
import Layout from "@/components/base/general-layout";
import Image from "next/image";
import { playGalleryImages, PlayCategory } from "@/data/play-gallery";

const categories: PlayCategory[] = ["film", "digital", "video", "art"];

export default function Play() {
  const [selectedCategory, setSelectedCategory] =
    useState<PlayCategory>("film");
  const filteredImages = playGalleryImages.filter(
    (img) => img.category === selectedCategory
  );

  return (
    <Layout variant="play">
      <section className="flex flex-col p-8 items-center gap-6 text-sm font-[family-name:var(--font-geist-mono)]">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`capitalize tracking-wider transition-colors ${
                cat === selectedCategory ? "text-black" : "text-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-6xl px-4">
          {filteredImages.map((img, idx) => (
            <Image
              key={idx}
              src={img.src}
              alt={img.alt}
              className="w-full object-cover rounded-lg"
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
