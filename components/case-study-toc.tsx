/* Case study table of contents - click scrolls to the matching section */

"use client";

import { useState } from "react";
import { TocEntry } from "@/lib/work-projects";

type CaseStudyTocProps = {
  toc: TocEntry[];
};

const CaseStudyToc = ({ toc }: CaseStudyTocProps) => {
  const [activeId, setActiveId] = useState(toc[0]?.id);

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
