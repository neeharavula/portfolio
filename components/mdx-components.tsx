/* Components available inside case study MDX content */

import type { MDXComponents } from "mdx/types";
import Image from "next/image";

type ProjectImageProps = {
  src: string;
  alt: string;
  caption?: string;
};

const ProjectImage = ({ src, alt, caption }: ProjectImageProps) => (
  <figure className="my-lg">
    {src ? (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
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

type EmbedProps = {
  src: string;
  title: string;
};

const Embed = ({ src, title }: EmbedProps) => (
  <div className="my-lg aspect-video rounded-lg overflow-hidden bg-background-code">
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

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-header text-2xl text-header mt-16 first:mt-0"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-primary mt-md leading-relaxed" {...props} />
  ),
  ul: (props) => (
    <ul
      className="list-disc list-inside space-y-sm mt-md text-primary"
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
};
