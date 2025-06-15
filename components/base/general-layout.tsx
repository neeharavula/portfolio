"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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

  const showFooter = variant !== "project";
  const isScrollable = ["play", "about", "work"].includes(variant);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Nav
        variant={variant}
        projectTitle={variant === "project" ? projectTitle : undefined}
      />

      <main className={`flex-1 ${isScrollable ? "overflow-auto" : ""}`}>
        {children}

        {/* Wrap overlay in AnimatePresence */}
        <AnimatePresence>
          {showAboutOverlay && (
            <AboutOverlay onClose={() => setShowAboutOverlay(false)} />
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
