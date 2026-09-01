/* Mobile nav menu overlay */

import Link from "next/link";
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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-overlay text-tertiary p-xl">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <span className="font-navigation text-sm uppercase">Menu</span>
        <button aria-label="Close menu" onClick={onClose}>
          <XIcon size={24} />
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 flex flex-col items-start justify-center gap-lg font-navigation text-sm uppercase">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={onClose}>
            [ {label} ]
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
