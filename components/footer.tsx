/* Global footer */

"use client";

import { useEffect, useState } from "react";

const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const Footer = () => {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));
  const year = new Date().getFullYear();

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full flex items-center justify-between px-xl py-xl font-navigation text-tertiary text-sm uppercase">
      <span>© {year}</span>

      <a href="mailto:hello@neeharavula.com" className="hidden sm:inline">
        [ Collab / Say Hi ]
      </a>

      <span suppressHydrationWarning>{time}</span>
    </footer>
  );
};

export default Footer;
