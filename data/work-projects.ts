/* Work project data (placeholder content pending Part 2 content system) */

export type WorkProject = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export const workProjects: WorkProject[] = [
  {
    slug: "project-one",
    title: "Project One / Company Name",
    date: "2024 – 2026",
    description: "Placeholder description of this project goes here.",
    tags: ["Tag One", "Tag Two", "Tag Three"],
  },
  {
    slug: "project-two",
    title: "Project Two / Company Name",
    date: "2023",
    description: "Placeholder description of this project goes here.",
    tags: ["Tag One", "Tag Two"],
  },
  {
    slug: "project-three",
    title: "Project Three / Company Name",
    date: "2022",
    description: "Placeholder description of this project goes here.",
    tags: ["Tag One", "Tag Two", "Tag Three"],
  },
  {
    slug: "project-four",
    title: "Project Four / Company Name",
    date: "2021",
    description: "Placeholder description of this project goes here.",
    tags: ["Tag One"],
  },
];
