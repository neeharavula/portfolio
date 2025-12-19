/* Play data */

// Filters
export const filters = ["film", "digital", "art"] as const;
export type FilterType = (typeof filters)[number];

// Loading captions (per filter)
export const captions: Record<FilterType, string> = {
  film: "Loading film roll...",
  digital: "Cleaning sensor...",
  art: "Opening sketchbook...",
};

// Images (per filter)
export const imageFiles: Record<FilterType, string[]> = {
  film: [
    "01-monaco.jpeg",
    "03-beaune.jpeg",
    "09-bigbear.jpeg",
    "02-beaune.jpeg",
    "12-tokyo.jpeg",
    "14-maui.jpeg",
    "05-nice.jpeg",
    "04-monaco.jpeg",
    "17-agra.jpeg",
    "11-bui.jpeg",
    "10-sandiego.jpeg",
    "07-seoul.jpeg",
    "06-beaune.jpeg",
    "18-munich.jpeg",
    "20-jaipur.jpeg",
    "15-tokyo.jpeg",
    "08-nice.jpeg",
    "13-jaipur.jpeg",
    "16-nice.jpeg",
    "19-jeju.jpeg",
  ],
  digital: [
    "01-sandiego.jpeg",
    "02-sandiego.jpeg",
    "03-rio.jpeg",
    "04-buenosaires.jpeg",
    "05-buenosaires.jpeg",
    "06-buenosaires.jpeg",
    "07-rio.jpeg",
    "08-buenosaires.jpeg",
    "09-sandiego.jpeg",
    "10-rio.jpeg",
    "11-sandiego.jpeg",
    "13-buenosaires.jpeg",
    "14-buenosaires.jpeg",
    "15-rio.jpeg",
    "16-rio.jpeg",
    "17-sandiego.jpeg",
    "18-sandiego.jpeg",
  ],
  /*video: [
    "pilot.mp4",
    // ...
  ],*/
  art: ["florence.jpeg"],
};
