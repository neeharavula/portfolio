/* Mobile nav menu overlay */

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { XIcon } from "@phosphor-icons/react/ssr";

const links = [
  { href: "/", label: "Work" },
  { href: "/play", label: "Play" },
  { href: "/about", label: "About" },
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
                <XIcon size={24} />
              </motion.div>
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col items-start justify-center gap-xl font-navigation text-sm uppercase">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} onClick={onClose}>
                [ {label} ]
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
