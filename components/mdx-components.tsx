/* Components available inside case study MDX content */

import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { Children } from "react";
import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

type ProjectImageProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

const ProjectImage = ({
  src,
  alt,
  caption,
  priority = false,
  unoptimized = false,
}: ProjectImageProps) => (
  <figure className="mt-8 mb-8">
    {src ? (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        priority={priority}
        unoptimized={unoptimized}
        className="w-full h-auto rounded-lg object-cover"
      />
    ) : (
      <div className="aspect-video rounded-lg bg-background-code" />
    )}
    {caption && (
      <figcaption className="text-tertiary text-xs mt-sm">
        {caption}
      </figcaption>
    )}
  </figure>
);

// Passing an array via a JSX expression prop (items={[...]}) doesn't
// survive next-mdx-remote's compileMDX - it silently drops any
// expression-valued attribute, keeping only string/boolean ones. So each
// item is its own <NumberedItem> child instead, numbered via Children.map.
const NumberedList = ({ children }: { children: ReactNode }) => (
  <ol className="mt-md space-y-sm text-primary">
    {Children.map(children, (child, index) => (
      <li key={index} className="flex items-start gap-sm">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fdbbe6] font-navigation text-xs font-semibold text-background">
          {index + 1}
        </span>
        {child}
      </li>
    ))}
  </ol>
);

const NumberedItem = ({ children }: { children: ReactNode }) => children;

type EmbedProps = {
  src: string;
  title: string;
};

const Embed = ({ src, title }: EmbedProps) => (
  <div className="mt-8 mb-8 aspect-video rounded-lg overflow-hidden bg-background-code">
    {src && (
      <iframe
        src={src}
        title={title}
        className="w-full h-full"
        allowFullScreen
      />
    )}
  </div>
);

type LinkButtonProps = {
  href: string;
  label: string;
};

const LinkButton = ({ href, label }: LinkButtonProps) => (
  <div className="mt-8 flex justify-center">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-sm rounded-lg bg-[#6c92a6] px-lg py-sm font-navigation text-xs uppercase text-background hover:opacity-90"
    >
      {label}
      <ArrowUpRightIcon size={14} weight="bold" />
    </a>
  </div>
);

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-header text-2xl text-header mt-8 first:mt-0"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-primary mt-md leading-relaxed" {...props} />
  ),
  ul: (props) => (
    <ul className="list-none space-y-sm mt-md text-primary" {...props} />
  ),
  li: (props) => (
    <li
      className="flex items-start gap-xs before:content-['•'] before:shrink-0 before:text-lg before:leading-[1.15]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-inside space-y-sm mt-md text-primary"
      {...props}
    />
  ),
  strong: (props) => <strong className="text-header font-semibold" {...props} />,
  a: (props) => (
    <a
      className="text-tertiary hover:text-accent underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-background-code rounded px-xs py-0.5 text-xs"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-background-code rounded-lg p-md overflow-x-auto text-xs mt-md"
      {...props}
    />
  ),
  ProjectImage,
  Embed,
  NumberedList,
  NumberedItem,
  LinkButton,
};
