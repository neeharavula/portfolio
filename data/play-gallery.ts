export type PlayCategory = "film" | "digital" | "video" | "art";

export interface PlayImage {
  src: string;
  alt: string;
  category: PlayCategory;
}

export const playGalleryImages: PlayImage[] = [
  /* Film */
  {
    src: "/play-assets/film/nice-bw.jpg",
    alt: "Old Nice",
    category: "film",
  },
  {
    src: "/play-assets/film/nice-bw.jpg",
    alt: "Old Nice",
    category: "film",
  },
  {
    src: "/play-assets/film/nice-bw.jpg",
    alt: "Old Nice",
    category: "film",
  },
  /* Digital */
  {
    src: "/play-assets/digital/buenosaires.jpg",
    alt: "Buenos Aires",
    category: "digital",
  },
  /* Video */
  {
    src: "/play-assets/video/pilot.jpeg",
    alt: "Still from pilot set",
    category: "video",
  },
  /* Art */
  {
    src: "/play-assets/art/florence.jpg",
    alt: "Florence",
    category: "art",
  },
  // Add more entries...
];
