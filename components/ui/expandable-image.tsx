/* Expandable Image Component - wraps Next.js Image with morphing dialog */

"use client";

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogContainer,
  MorphingDialogImage,
} from "@/components/ui/morphing-dialog";

type ExpandableImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function ExpandableImage({
  src,
  alt,
  className = "",
}: ExpandableImageProps) {
  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      <MorphingDialogTrigger className="inline-block cursor-pointer">
        <MorphingDialogImage
          src={src}
          alt={alt}
          className={`rounded-lg ${className}`}
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative overflow-hidden rounded-lg">
          <MorphingDialogImage
            src={src}
            alt={alt}
            className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
