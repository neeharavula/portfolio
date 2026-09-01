/* Mobile nav menu overlay */

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  XIcon,
  EnvelopeIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
} from "@phosphor-icons/react/ssr";

const links = [
  { href: "/", label: "Work" },
  { href: "/play", label: "Play" },
  { href: "/about", label: "About" },
];

const socials = [
  { href: "mailto:hello@neeharavula.com", label: "Email", Icon: EnvelopeIcon },
  { href: "https://www.linkedin.com/in/neeharavula/", label: "LinkedIn", Icon: LinkedinLogoIcon },
  { href: "https://x.com/neeharavula", label: "X", Icon: XLogoIcon },
  { href: "https://github.com/neeharavula", label: "GitHub", Icon: GithubLogoIcon },
  { href: "https://www.instagram.com/neehasroll/", label: "Instagram", Icon: InstagramLogoIcon },
];

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-overlay text-tertiary p-xl"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <span className="font-navigation text-sm uppercase">Menu</span>
            <button aria-label="Close menu" onClick={onClose}>
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <XIcon size={20} weight="regular" />
              </motion.div>
            </button>
          </div>

          {/* Page links */}
          <nav className="flex-1 flex flex-col items-start justify-center gap-xl font-navigation text-sm uppercase">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} onClick={onClose}>
                [ {label} ]
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center justify-center gap-xl">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} aria-label={label}>
                <Icon size={20} weight="regular" />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
