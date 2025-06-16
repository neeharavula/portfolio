"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  XIcon,
  EnvelopeIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import Nav from "@/components/base/nav";
import Footer from "@/components/base/footer";
import AboutOverlay from "@/components/about/overlay";

export interface LayoutConfig {
  variant: "home" | "work" | "project" | "play" | "about" | "menu";
}

type LayoutProps = {
  children: React.ReactNode;
  variant: LayoutConfig["variant"];
  projectTitle?: string;
};

const Layout = ({ children, variant, projectTitle }: LayoutProps) => {
  const [showAboutOverlay, setShowAboutOverlay] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showFooter = variant !== "project";

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Nav
        variant={variant}
        projectTitle={variant === "project" ? projectTitle : undefined}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main
        className={`flex-1 ${
          variant === "home" ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        {children}

        <AnimatePresence>
          {showAboutOverlay && (
            <AboutOverlay onClose={() => setShowAboutOverlay(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black text-white flex flex-col justify-between z-50 p-8"
            >
              <div className="absolute top-8 left-8 text-sm font-[family-name:var(--font-geist-mono)]">
                Menu
              </div>
              {/* X button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-8 right-8 p-2"
              >
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XIcon size={20} className="text-white" />
                </motion.div>
              </button>

              {/* Links */}
              <div className="flex-1 flex flex-col justify-center">
                <nav className="flex flex-col gap-8 mt-16 text-sm font-[family-name:var(--font-geist-mono)]">
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4"
                  >
                    Home
                    <ArrowUpRightIcon size={16} />
                  </Link>
                  <Link
                    href="/work"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4"
                  >
                    Work
                    <ArrowUpRightIcon size={16} />
                  </Link>
                  <Link
                    href="/play"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4"
                  >
                    Play
                    <ArrowUpRightIcon size={16} />
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4"
                  >
                    About
                    <ArrowUpRightIcon size={16} />
                  </Link>
                  <Link
                    href="https://read.cv/nravula"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4"
                  >
                    Resume
                    <ArrowUpRightIcon size={16} />
                  </Link>
                </nav>
              </div>

              {/* Social icons at bottom */}
              <div className="flex justify-center items-center gap-8 mt-8">
                <Link
                  href="mailto:ravulaneeha@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EnvelopeIcon size={20} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/neeharavula/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinLogoIcon size={20} />
                </Link>
                <Link
                  href="https://github.com/neeharavula"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubLogoIcon size={20} />
                </Link>
                <Link
                  href="https://www.instagram.com/neehasroll/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramLogoIcon size={20} />
                </Link>
                <Link
                  href="https://open.spotify.com/user/awesomesauce872?si=0ea3f9e157784457"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SpotifyLogoIcon size={20} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {showFooter && (
        <Footer
          variant={variant}
          onAboutClick={() => setShowAboutOverlay(true)}
        />
      )}
    </div>
  );
};

export default Layout;
