"use client";

{
  /* Component UI: Footer */
}

import {
  SunIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

interface FooterProps {
  variant: "home" | "work" | "project" | "play" | "about" | "menu";
}

const Footer: React.FC<FooterProps> = ({ variant }) => {
  const isNormalMobileVariant = ["home", "work", "project", "play"].includes(
    variant
  );
  const isSocialMobileVariant = ["about", "menu"].includes(variant);

  return (
    <footer className="w-full text-sm px-8 py-8 font-[family-name:var(--font-geist-mono)]">
      {/* Desktop */}
      <div className="hidden sm:flex justify-between items-center">
        <div>© 2025</div>
        <div>About</div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        {/* Home, Work, Project, Play */}
        {isNormalMobileVariant && (
          <div className="flex justify-between items-center">
            <div>© 2025</div>
            <SunIcon size={20} />
          </div>
        )}

        {/* About, Menu */}
        {isSocialMobileVariant && (
          <div className="flex justify-center items-center gap-4">
            <EnvelopeIcon size={20} />
            <LinkedinLogoIcon size={20} />
            <GithubLogoIcon size={20} />
            <InstagramLogoIcon size={20} />
            <SpotifyLogoIcon size={20} />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
