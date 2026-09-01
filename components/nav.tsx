/* Global nav */

import Link from "next/link";
import { SunIcon, ListIcon } from "@phosphor-icons/react/ssr";

const links = [
  { href: "/", label: "Work" },
  { href: "/play", label: "Play" },
  { href: "/about", label: "About" },
];

const Nav = () => {
  return (
    <header className="w-full flex items-center justify-between px-xl py-xl">
      {/* Home */}
      <Link href="/" aria-label="Home">
        <span className="block h-3 w-3 rounded-full bg-accent" />
      </Link>

      {/* Desktop: links + theme icon */}
      <div className="hidden sm:flex items-center gap-xl font-navigation text-tertiary text-sm uppercase">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            [ {label} ]
          </Link>
        ))}
        <SunIcon size={20} />
      </div>

      {/* Mobile: menu button */}
      <button aria-label="Open menu" className="sm:hidden text-tertiary">
        <ListIcon size={24} />
      </button>
    </header>
  );
};

export default Nav;
