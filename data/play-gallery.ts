export const filters = ["film", "digital", "art"] as const;
export type FilterType = (typeof filters)[number];

export const imageFiles: Record<FilterType, string[]> = {
  film: [
    "01-monaco.JPG",
    "03-beaune.JPG",
    "09-bigbear.JPG",
    "02-beaune.JPG",
    "12-tokyo.JPG",
    "14-maui.JPG",
    "05-nice.JPG",
    "04-monaco.JPG",
    "17-agra.JPG",
    "11-bui.JPG",
    "10-sandiego.JPG",
    "07-seoul.JPG",
    "06-beaune.JPG",
    "18-munich.JPG",
    "20-jaipur.JPG",
    "15-tokyo.JPG",
    "08-nice.JPG",
    "13-jaipur.JPG",
    "16-nice.JPG",
    "19-jeju.JPG",
  ],
  digital: [
    "01-sandiego.JPG",
    "02-sandiego.JPG",
    "03-rio.JPG",
    "04-buenosaires.JPG",
    "05-buenosaires.JPG",
    "06-buenosaires.JPG",
    "07-rio.JPG",
    "08-buenosaires.JPG",
    "09-sandiego.JPG",
    "10-rio.JPG",
    "11-sandiego.JPG",
    "13-buenosaires.JPG",
    "14-buenosaires.JPG",
    "15-rio.JPG",
    "16-rio.JPG",
    "17-sandiego.JPG",
    "18-sandiego.JPG",
  ],
  /*video: [
    "pilot.mp4",
    // ...
  ],*/
  art: [
    "florence.jpg",
    // ...
  ],
};
