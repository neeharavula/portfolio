/* Resume data */

export type ResumeEntry = {
  date: string;
  role: string;
  location: string;
  link?: string;
  images?: string[];
  cursorImage?: string;
};

export type ResumeSection = {
  title: string;
  entries: ResumeEntry[];
};

export const resumeSections: ResumeSection[] = [
  {
    /* Education */
    title: "Education",
    entries: [
      {
        date: "Incoming", // 2026 - Now
        role: "Master's in Computer Science at Cornell Tech",
        location: "New York, NY",
        link: "https://tech.cornell.edu/",
        cursorImage: "/images/big-red.png",
      },
      {
        date: "2020 - 2023",
        role: "Bachelor's in Computer Science at UC Santa Cruz",
        location: "Santa Cruz, CA",
        link: "https://www.ucsc.edu/",
        cursorImage: "/images/sammy.png",
      },
    ],
  },
  {
    /* Professional */
    title: "Professional",
    entries: [
      {
        date: "2024 — 2026",
        role: "Software Engineer at General Atomics Aeronautical Systems",
        location: "San Diego, CA",
        link: "https://www.ga-asi.com/",
      },
      {
        date: "2023",
        role: "Software Engineer Intern at Northwestern Mutual",
        location: "Milwaukee, WI",
        link: "https://www.northwesternmutual.com/",
      },
      {
        date: "2022",
        role: "Software Developer Intern at General Atomics Aeronautical Systems",
        location: "San Diego, CA",
        link: "https://www.ga-asi.com/",
      },
    ],
  },
  {
    /* Community */
    title: "Community",
    entries: [
      {
        date: "2023",
        role: "Web Developer at UCSC Tech4Good Lab",
        location: "Santa Cruz, CA",
        link: "https://tech4good.soe.ucsc.edu/",
        images: [],
      },
      {
        date: "2022 - 2023",
        role: "Publicity Chair Officer for UCSC ACM-W ",
        location: "Santa Cruz, CA",
        link: "https://www.instagram.com/acmw.ucsc/",
      },
    ],
  },
];
