/* Nav links, shared between the desktop nav and mobile menu */

export const navLinks = [
  { href: "/", label: "Work" },
  { href: "/play", label: "Play" },
  { href: "/about", label: "About" },
];

// "/" (Work) also covers case study pages at /work/<slug>.
export const isNavLinkActive = (pathname: string, href: string): boolean =>
  href === "/" ? pathname === "/" || pathname.startsWith("/work/") : pathname === href;
