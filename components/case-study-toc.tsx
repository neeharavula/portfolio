/* Case study table of contents - highlights + scrolls to the active section */

"use client";

import { useEffect, useState } from "react";
import { TocEntry } from "@/lib/work-projects";

type CaseStudyTocProps = {
  toc: TocEntry[];
};

// How far from the top of the viewport a heading counts as "in view".
const SCROLL_OFFSET = 150;

const CaseStudyToc = ({ toc }: CaseStudyTocProps) => {
  const [activeId, setActiveId] = useState(toc[0]?.id);

  // Highlights whichever section's heading is the last one scrolled past
  // the reference line near the top of the viewport.
  useEffect(() => {
    const handleScroll = () => {
      let current = toc[0]?.id;
      for (const { id } of toc) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToSection = (id: string) => {
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
