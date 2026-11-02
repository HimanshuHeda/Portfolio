"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
