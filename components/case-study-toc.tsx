/* Case study table of contents - highlights + scrolls to the active section */

"use client";

import { useEffect, useRef, useState } from "react";
import { TocEntry } from "@/lib/work-projects";

type CaseStudyTocProps = {
  toc: TocEntry[];
};

// How far from the top of the viewport a heading counts as "in view".
const SCROLL_OFFSET = 150;
// How close to the bottom of the page counts as "at the end" - guarantees
// the last section highlights even if its heading is too short to ever
// cross SCROLL_OFFSET before hitting the bottom of the page.
const BOTTOM_THRESHOLD = 2;
// After a sidebar click, ignore scroll-driven recalculation until scroll
// events stop for this long - otherwise the smooth-scroll animation fights
// the manually set active section and flickers between sections mid-scroll.
const MANUAL_SCROLL_SETTLE_MS = 150;

const CaseStudyToc = ({ toc }: CaseStudyTocProps) => {
  const [activeId, setActiveId] = useState(toc[0]?.id);
  const isManualScroll = useRef(false);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Highlights whichever section's heading is the last one scrolled past
  // the reference line near the top of the viewport (or the last section,
  // once scrolled to the bottom of the page).
  useEffect(() => {
    const computeActiveId = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - BOTTOM_THRESHOLD;
      if (atBottom) return toc[toc.length - 1]?.id;

      let current = toc[0]?.id;
      for (const { id } of toc) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = id;
        }
      }
      return current;
    };

    const handleScroll = () => {
      if (isManualScroll.current) {
        if (settleTimeout.current) clearTimeout(settleTimeout.current);
        settleTimeout.current = setTimeout(() => {
          isManualScroll.current = false;
        }, MANUAL_SCROLL_SETTLE_MS);
        return;
      }
      setActiveId(computeActiveId());
    };

    setActiveId(computeActiveId());
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
    };
  }, [toc]);

  const scrollToSection = (id: string) => {
    isManualScroll.current = true;
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="hidden md:flex md:flex-col gap-md md:gap-sm font-navigation text-sm uppercase h-fit md:sticky md:top-16">
      {toc.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={`text-left uppercase cursor-pointer ${
            activeId === id ? "text-accent" : "text-tertiary"
          }`}
        >
          {activeId === id ? `[ ${label} ]` : label}
        </button>
      ))}
    </nav>
  );
};

export default CaseStudyToc;
