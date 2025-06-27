"use client";

import { AnimatePresence, Transition, motion } from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useId,
} from "react";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export type AnimatedBackgroundProps = {
  children:
    | ReactElement<{ "data-id": string }>[]
    | ReactElement<{ "data-id": string }>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(defaultValue || null);
  const [backgroundStyle, setBackgroundStyle] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const uniqueId = useId();

  useEffect(() => {
    if (defaultValue) setActiveId(defaultValue);
  }, [defaultValue]);

  const updateBackgroundPosition = (id: string | null) => {
    setActiveId(id);

    if (onValueChange) onValueChange(id);

    if (!containerRef.current || !id) {
      setBackgroundStyle(null);
      return;
    }

    const target = containerRef.current.querySelector(`[data-id="${id}"]`);
    if (target instanceof HTMLElement) {
      const { top, left, width, height } = target.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setBackgroundStyle({
        top: top - containerRect.top,
        left: left - containerRect.left,
        width,
        height,
      });
    }
  };

  const childrenArray = Children.toArray(children);

  return (
    <div ref={containerRef} className="relative w-full">
      <AnimatePresence initial={false}>
        {activeId && backgroundStyle && (
          <motion.div
            key={`background-${uniqueId}`}
            layoutId={`background-${uniqueId}`}
            className={cn("absolute rounded-md", className)}
            style={{
              top: backgroundStyle.top,
              left: backgroundStyle.left,
              width: backgroundStyle.width,
              height: backgroundStyle.height,
            }}
            transition={transition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col w-full">
        {childrenArray.map((child: ReactNode, index) => {
          if (!isValidElement(child)) return null;

          // Cast to expected prop shape to avoid `any`
          const props = child.props as { "data-id"?: string };
          const id = props["data-id"];
          if (!id) return null;

          const interactionProps = enableHover
            ? {
                onMouseEnter: () => updateBackgroundPosition(id),
                onMouseLeave: () => updateBackgroundPosition(null),
              }
            : {
                onClick: () => updateBackgroundPosition(id),
              };

          return cloneElement(child, {
            key: index,
            ...interactionProps,
          });
        })}
      </div>
    </div>
  );
}
