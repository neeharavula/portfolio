/* Play gallery data */

export const filters = ["film", "digital", "video", "art"] as const;
export type FilterType = (typeof filters)[number];

export const imageFiles: Record<Exclude<FilterType, "video">, string[]> = {
  film: [
    "01-monaco.jpeg",
    "02-beaune.jpg",
    "03-bigbear.jpeg",
    "04-beaune.jpeg",
    "05-tokyo.jpeg",
    "06-maui.jpeg",
    "07-nice.jpeg",
    "08-monaco.jpeg",
    "09-agra.jpeg",
    "10-bui.jpeg",
    "11-sandiego.jpeg",
    "12-seoul.jpeg",
    "13-beaune.jpeg",
    "14-munich.jpeg",
    "15-jaipur.jpeg",
    "16-tokyo.jpeg",
    "17-nice.jpeg",
    "18-jaipur.jpeg",
    "19-nice.jpeg",
    "20-jeju.jpeg",
  ],
  digital: [
    "01-sandiego.jpeg",
    "02-sandiego.jpeg",
    "03-rio.jpeg",
    "04-buenosaires.jpeg",
    "05-bigsur.jpg",
    "06-sanfrancisco.jpg",
    "07-buenosaires.jpeg",
    "08-pointreyes.jpg",
    "09-pointreyes.jpg",
    "10-quebec.jpg",
    "11-sanfrancisco.jpg",
    "12-sandiego.jpeg",
    "13-rio.jpeg",
    "14-sandiego.jpeg",
    "15-nantucket.jpg",
    "16-sandiego.jpeg",
    "17-morrobay.jpg",
    "18-nokings.jpg",
    "19-sandiego.jpeg",
  ],
  art: ["florence.jpeg"],
};

// Video entries live at Blob storage play/video/<slug>/{full.mp4,
// poster.jpg} (see scripts/compress-videos.mjs) - a richer shape than
// imageFiles since each needs a title (alt text/aria-label) and a slug
// that maps to two separate files, not one filename.
export type VideoItem = {
  slug: string;
  title: string;
};

export const videoItems: VideoItem[] = [
  { slug: "summer-in-the-vineyard", title: "Summer in the Vineyard" },
  { slug: "idyllwild", title: "Idyllwild" },
  { slug: "rochelle-jordan", title: "Rochelle Jordan" },
  { slug: "pnw", title: "PNW" },
];
