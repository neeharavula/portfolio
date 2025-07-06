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
import { SiTwilio, SiStackblitz } from "react-icons/si";
import { ComponentType } from "react";

// Rare icon components
const TwilioIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <SiTwilio className={`text-[#F22F46] ${className ?? ""}`} />
);

const StackblitzIcon: ComponentType<{ className?: string }> = ({
  className,
}) => <SiStackblitz className={`text-[#1389FD] ${className ?? ""}`} />;

// Icon map
export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
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
