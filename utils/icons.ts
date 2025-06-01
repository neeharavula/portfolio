// src/utils/icons.ts
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiFigma,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";
import { IconType } from "react-icons";

export const iconMap: Record<string, IconType> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  html5: SiHtml5,
  css3: SiCss3,
  figma: SiFigma,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
};

export const iconColorMap: Record<string, string> = {
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  html5: "#E34F26",
  css3: "#1572B6",
  figma: "#F24E1E",
  react: "#61DAFB",
  nextjs: "#000000",
  tailwind: "#06B6D4",
};
