import {
  // languages
  PythonOriginal,
  JavascriptOriginal,
  TypescriptOriginal,
  Html5Original,
  Css3Original,
  TailwindcssOriginal,
  // frameworks
  AngularOriginal,
  ReactOriginal,
  NextjsOriginal,
  // apis
  PostmanOriginal,
  // data
  AmazonwebservicesOriginalWordmark,
  MysqlOriginal,
  // design
  FigmaOriginal,
} from "devicons-react";

import { SiTwilio, SiStackblitz } from "react-icons/si";
import { ComponentType } from "react";

// ✅ React wrapper components with proper props
const TwilioIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <SiTwilio className={`text-[#F22F46] ${className ?? ""}`} />
);

const StackblitzIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <SiStackblitz className={`text-[#1389FD] ${className ?? ""}`} />
);

// ✅ Unified icon map with consistent types
export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  // languages
  python: PythonOriginal,
  javascript: JavascriptOriginal,
  typescript: TypescriptOriginal,
  html: Html5Original,
  css: Css3Original,
  tailwind: TailwindcssOriginal,

  // frameworks
  angular: AngularOriginal,
  react: ReactOriginal,
  nextjs: NextjsOriginal,

  // apis
  postman: PostmanOriginal,
  twilio: TwilioIcon,
  stackblitz: StackblitzIcon,

  // data
  aws: AmazonwebservicesOriginalWordmark,
  mysql: MysqlOriginal,

  // design
  figma: FigmaOriginal,
};
