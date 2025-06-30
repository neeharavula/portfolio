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

export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  // languages
  python: PythonOriginal,
  javascript: JavascriptOriginal,
  typescript: TypescriptOriginal,
  html: Html5Original,
  angular: AngularOriginal,
  css: Css3Original,
  tailwind: TailwindcssOriginal,
  // frameworks
  react: ReactOriginal,
  nextjs: NextjsOriginal,
  twilio: SiTwilio,
  // apis
  postman: PostmanOriginal,
  stackblitz: SiStackblitz,
  // data
  aws: AmazonwebservicesOriginalWordmark,
  mysql: MysqlOriginal,
  // design
  figma: FigmaOriginal,
};
