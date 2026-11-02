"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const pages = [
  { label: "About", href: "/" },
  { label: "Resume", href: "/resume" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar" aria-label="Main">
      <ul className="navbar-list">
        {pages.map((page) => {
          const active = isActive(pathname, page.href);
          return (
            <li key={page.href} className="navbar-item">
              <Link
                href={page.href}
                className={`navbar-link${active ? " active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {page.label}
                {active && (
                  <motion.span
                    className="navbar-active-indicator"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
