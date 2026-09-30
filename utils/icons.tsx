/* Tech stack icon map */

import {
  // Languages
  PythonOriginal,
  JavascriptOriginal,
  TypescriptOriginal,
  Html5Original,
  Css3Original,
  TailwindcssOriginal,
  // Frameworks
  AngularOriginal,
  ReactOriginal,
  ReactnativeOriginal,
  NextjsOriginal,
  ExpoOriginal,
  // APIs
  PostmanOriginal,
  // Data
  AmazonwebservicesOriginalWordmark,
  MysqlOriginal,
  SupabaseOriginal,
  // Design
  FigmaOriginal,
  // Platforms
  VercelOriginal,
  ViteOriginal,
} from "devicons-react";
import { SiStackblitz } from "react-icons/si";
import { TbBrandTwilio } from "react-icons/tb";
import { ComponentType } from "react";

type IconProps = { className?: string; size?: number | string };

// Rare icon components (not covered by devicons-react)
const TwilioIcon: ComponentType<IconProps> = ({ className, size }) => (
  <TbBrandTwilio className={`text-[#F22F46] ${className ?? ""}`} size={size} />
);

const StackblitzIcon: ComponentType<IconProps> = ({ className, size }) => (
  <SiStackblitz className={`text-[#1389FD] ${className ?? ""}`} size={size} />
);

// Icon map
export const iconMap: Record<string, ComponentType<IconProps>> = {
  // Languages
  python: PythonOriginal,
  javascript: JavascriptOriginal,
  typescript: TypescriptOriginal,
  html: Html5Original,
  css: Css3Original,
  tailwind: TailwindcssOriginal,

  // Frameworks
  angular: AngularOriginal,
  react: ReactOriginal,
  "react-native": ReactnativeOriginal,
  nextjs: NextjsOriginal,
  "expo-cli": ExpoOriginal,

  // APIs
  postman: PostmanOriginal,
  twilio: TwilioIcon,
  stackblitz: StackblitzIcon,

  // Data
  aws: AmazonwebservicesOriginalWordmark,
  mysql: MysqlOriginal,
  supabase: SupabaseOriginal,

  // Design
  figma: FigmaOriginal,

  // Platforms
  vercel: VercelOriginal,
  vite: ViteOriginal,
};

// Icons that render as solid black (or black + white) shapes by default,
// which disappear or go low-contrast against a dark background. Safe to
// invert in dark mode since they have no other brand color to preserve.
// Don't add multi-color icons here (e.g. aws) - inverting would distort
// their actual brand colors, not just fix contrast.
export const invertInDark = new Set(["expo-cli", "nextjs", "vercel"]);

// Display names for the icon map's keys, used e.g. for hover tooltips
export const iconLabels: Record<string, string> = {
  python: "Python",
  javascript: "JavaScript",
  typescript: "TypeScript",
  html: "HTML",
  css: "CSS",
  tailwind: "Tailwind CSS",

  angular: "Angular",
  react: "React",
  "react-native": "React Native",
  nextjs: "Next.js",
  "expo-cli": "Expo CLI",

  postman: "Postman",
  twilio: "Twilio",
  stackblitz: "StackBlitz",

  aws: "AWS",
  mysql: "MySQL",
  supabase: "Supabase",

  figma: "Figma",

  vercel: "Vercel",
  vite: "Vite",
};
