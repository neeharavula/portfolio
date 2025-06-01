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
import { ComponentType } from "react";

export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  // languages
  python: PythonOriginal,
  javascript: JavascriptOriginal,
  typescript: TypescriptOriginal,
  html5: Html5Original,
  angular: AngularOriginal,
  css3: Css3Original,
  tailwind: TailwindcssOriginal,
  // frameworks
  react: ReactOriginal,
  nextjs: NextjsOriginal,
  // apis
  postman: PostmanOriginal,
  // data
  aws: AmazonwebservicesOriginalWordmark,
  mysql: MysqlOriginal,
  // design
  figma: FigmaOriginal,
};
