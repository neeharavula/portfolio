/* Global nav */

"use client";

import { useState } from "react";
import Link from "next/link";
import { SunIcon, ListIcon } from "@phosphor-icons/react/ssr";
import { motion, AnimatePresence } from "motion/react";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import MobileMenu from "@/components/mobile-menu";

const links = [
  { href: "/", label: "Work" },
  { href: "/play", label: "Play" },
  { href: "/about", label: "About" },
];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-xl py-xl">
      {/* Home */}
      <Magnetic>
        <Link href="/" aria-label="Home">
          <span className="block h-3.5 w-3.5 rounded-full bg-accent" />
        </Link>
      </Magnetic>

      {/* Desktop: links + theme icon */}
      <div className="hidden sm:flex items-center gap-xl font-navigation text-tertiary text-sm uppercase">
        {links.map(({ href, label }) => (
          <Magnetic key={href}>
            <Link href={href} className="hover:text-accent">
              [ {label} ]
            </Link>
          </Magnetic>
        ))}
        <Magnetic>
          <SunIcon size={20} weight="regular" />
        </Magnetic>
      </div>

      {/* Mobile: menu button */}
      <div className="sm:hidden text-tertiary">
        <AnimatePresence mode="wait">
          {!menuOpen && (
            <motion.button
              key="hamburger"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ListIcon size={20} weight="regular" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Nav;
