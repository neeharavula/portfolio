"use client";

{
  /* Base Component: nav */
}

import {
  SunIcon,
  ArrowBendUpLeftIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

interface NavProps {
  variant: "home" | "work" | "project" | "play" | "about" | "menu";
  projectTitle?: string;
}

const Nav: React.FC<NavProps> = ({ variant, projectTitle }) => {
  const isWorkPlay = ["work", "play"].includes(variant);
  const isHomeAbout = ["home", "about"].includes(variant);
  const isProject = variant === "project";
  const isMenu = variant === "menu";

  return (
    <nav className="w-full text-sm px-8 py-8 font-[family-name:var(--font-geist-mono)]">
      {/* Desktop */}
      <div className="hidden sm:flex w-full items-center justify-between">
        {/* Home, About */}
        {isHomeAbout && (
          <>
            <Link href="/">
              <div>{"Neeha's Room"}</div>
            </Link>
            <SunIcon size={20} />
          </>
        )}

        {/* Work, Play */}
        {isWorkPlay && (
          <>
            <Link href="/">
              <div className="flex items-center gap-4">
                <ArrowBendUpLeftIcon size={20} />
                <span>Back to room</span>
              </div>
            </Link>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              {variant === "work" && "Work"}
              {variant === "play" && "Play"}
            </div>
            <SunIcon size={20} />
          </>
        )}

        {/* Project */}
        {isProject && (
          <>
            <Link href="/work">
              <div className="flex items-center gap-4">
                <ArrowBendUpLeftIcon size={20} />
                <span>All work</span>
              </div>
            </Link>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              {projectTitle ?? "Project"}
            </div>
            <SunIcon size={20} />
          </>
        )}
      </div>

      {/* Mobile layout */}
      <div className="flex sm:hidden justify-between items-center">
        {/* Home, About */}
        {isHomeAbout && (
          <>
            <Link href="/">
              <div>{"Neeha's Room"}</div>
            </Link>
            <ListIcon size={20} />
          </>
        )}

        {/* Menu */}
        {isMenu && (
          <>
            <div>Menu</div>
            <XIcon size={20} />
          </>
        )}

        {/* Work, Play */}
        {isWorkPlay && (
          <>
            <Link href="/">
              <ArrowBendUpLeftIcon size={20} />
            </Link>
            <div className="text-center">
              {variant === "work" && "Work"}
              {variant === "play" && "Play"}
            </div>
            <ListIcon size={20} />
          </>
        )}

        {/* Project */}
        {isProject && (
          <>
            <Link href="/work">
              <ArrowBendUpLeftIcon size={20} />
            </Link>
            <div className="text-center">{projectTitle ?? "Project"}</div>
            <ListIcon size={20} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
