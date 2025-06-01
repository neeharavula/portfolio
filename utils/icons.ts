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
