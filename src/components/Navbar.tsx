"use client";

import { motion } from "framer-motion";

const pages = ["About", "Resume", "Portfolio", "Design", "Blog", "Contact"];

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {pages.map((page) => (
          <li key={page} className="navbar-item">
            <button
              className={`navbar-link${activePage === page.toLowerCase() ? " active" : ""}`}
              onClick={() => onNavigate(page.toLowerCase())}
            >
              {page}
              {activePage === page.toLowerCase() && (
                <motion.span
                  className="navbar-active-indicator"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
