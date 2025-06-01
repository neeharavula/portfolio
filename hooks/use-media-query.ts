"use client";

import { useState, useEffect } from "react";

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    updateMatch(); // set on mount
    media.addEventListener("change", updateMatch);

    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}
