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
      {/* web footer */}
      <div className="hidden sm:flex justify-between items-center">
        <div>© 2025</div>
        <div>About</div>
      </div>

      {/* mobile footer variant: normal */}
      <div className="sm:hidden">
        {isNormalMobileVariant && (
          <div className="flex justify-between items-center">
            <div>© 2025</div>
            <SunIcon size={24} />
          </div>
        )}

        {/* mobile footer variant: socials */}
        {isSocialMobileVariant && (
          <div className="flex justify-center items-center gap-4">
            <EnvelopeIcon size={24} />
            <LinkedinLogoIcon size={24} />
            <GithubLogoIcon size={24} />
            <InstagramLogoIcon size={24} />
            <SpotifyLogoIcon size={24} />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
