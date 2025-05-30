"use client";

{
  /* Component UI: Footer */
}

import {
  SunIcon,
  ArrowBendUpLeftIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";

interface NavProps {
  variant: "home" | "work" | "project" | "play" | "about" | "menu";
}

const Nav: React.FC<NavProps> = ({ variant }) => {
  const isWorkPlayProject = ["work", "project", "play"].includes(variant);
  const isHomeAbout = ["home", "about"].includes(variant);
  const isMenu = variant === "menu";

  return (
    <nav className="w-full text-sm px-8 py-8 font-[family-name:var(--font-geist-mono)]">
      {/* Desktop */}
      <div className="hidden sm:flex w-full items-center justify-between">
        {/* Home, About */}
        {isHomeAbout && (
          <>
            <div>{"Neeha's Room"}</div>
            <SunIcon size={20} />
          </>
        )}

        {/* Work, Project, Play */}
        {isWorkPlayProject && (
          <>
            <div className="flex items-center gap-2">
              <ArrowBendUpLeftIcon size={20} />
              <span>Back to my room</span>
            </div>
            <div className="text-center absolute left-1/2 transform -translate-x-1/2">
              Project Name
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
            <div>{"Neeha's Room"}</div>
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

        {/* Work, Project, Play */}
        {isWorkPlayProject && (
          <>
            <ArrowBendUpLeftIcon size={20} />
            <div className="text-center">Project Name</div>
            <ListIcon size={20} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
