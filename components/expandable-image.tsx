/* Expandable image - wraps an <img> with a click-to-expand morphing dialog */

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogContainer,
  MorphingDialogImage,
} from "@/components/motion-primitives/morphing-dialog";

type ExpandableImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const ExpandableImage = ({ src, alt, className = "" }: ExpandableImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <MorphingDialog transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}>
      <MorphingDialogTrigger className="inline-block w-full cursor-pointer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
          <MorphingDialogImage
            src={src}
            alt={alt}
            className={`rounded-lg ${className}`}
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="fixed inset-0 m-auto w-fit h-fit overflow-hidden rounded-lg">
          <MorphingDialogImage
            src={src}
            alt={alt}
            className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

export default ExpandableImage;
