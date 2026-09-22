/* Work project data (placeholder content pending Part 2 content system) */

export type WorkProject = {
  slug: string;
  name: string;
  org: string;
  date: string;
  description: string;
  tags: string[];
  role: string;
  team: string;
  timeline: string;
  overview: string;
  contributions: string;
  reflections: string;
};

export const workProjects: WorkProject[] = [
  {
    slug: "project-one",
    name: "Project One",
    org: "Company Name",
    date: "2024 – 2026",
    description: "Placeholder description of this project goes here.",
    tags: ["Tag One", "Tag Two", "Tag Three"],
    role: "Placeholder Role",
    team: "Placeholder team description",
    timeline: "Month 2024 – Month 2026",
    overview: "Placeholder overview content for this project goes here.",
    contributions:
      "Placeholder contributions content for this project goes here.",
    reflections:
      "Placeholder reflections content for this project goes here.",
  },
  {
    slug: "project-two",
    name: "Project Two",
    org: "Company Name",
    date: "2023",
    description: "Placeholder description of this project goes here.",
    tags: ["Tag One", "Tag Two"],
    role: "Placeholder Role",
    team: "Placeholder team description",
    timeline: "Month 2023 – Month 2023",
    overview: "Placeholder overview content for this project goes here.",
    contributions:
      "Placeholder contributions content for this project goes here.",
    reflections:
      "Placeholder reflections content for this project goes here.",
  },
  {
    slug: "project-three",
    name: "Project Three",
    org: "Company Name",
    date: "2022",
    description: "Placeholder description of this project goes here.",
    tags: ["Tag One", "Tag Two", "Tag Three"],
    role: "Placeholder Role",
    team: "Placeholder team description",
    timeline: "Month 2022 – Month 2022",
    overview: "Placeholder overview content for this project goes here.",
    contributions:
      "Placeholder contributions content for this project goes here.",
    reflections:
      "Placeholder reflections content for this project goes here.",
  },
  {
    slug: "project-four",
    name: "Project Four",
    org: "Company Name",
    date: "2021",
    description: "Placeholder description of this project goes here.",
    tags: ["Tag One"],
    role: "Placeholder Role",
    team: "Placeholder team description",
    timeline: "Month 2021 – Month 2021",
    overview: "Placeholder overview content for this project goes here.",
    contributions:
      "Placeholder contributions content for this project goes here.",
    reflections:
      "Placeholder reflections content for this project goes here.",
  },
];
