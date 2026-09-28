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
  NextjsOriginal,
  // APIs
  PostmanOriginal,
  // Data
  AmazonwebservicesOriginalWordmark,
  MysqlOriginal,
  // Design
  FigmaOriginal,
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
  nextjs: NextjsOriginal,

  // APIs
  postman: PostmanOriginal,
  twilio: TwilioIcon,
  stackblitz: StackblitzIcon,

  // Data
  aws: AmazonwebservicesOriginalWordmark,
  mysql: MysqlOriginal,

  // Design
  figma: FigmaOriginal,
};
