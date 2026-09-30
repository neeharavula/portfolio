/* Shares the currently-hovered project's type with the custom cursor */

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

type CursorContextValue = {
  label: string | null;
  setLabel: (label: string | null) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [label, setLabel] = useState<string | null>(null);
  const pathname = usePathname();

  // Resets the cursor if navigation happens before onMouseLeave fires
  // (e.g. clicking a card), so the pill doesn't get stuck on the next page.
  useEffect(() => {
    setLabel(null);
  }, [pathname]);

  return (
    <CursorContext.Provider value={{ label, setLabel }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
