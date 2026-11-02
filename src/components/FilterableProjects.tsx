"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoEyeOutline, IoChevronDown } from "react-icons/io5";
import type { ProjectItem } from "@/data/portfolio-data";

interface FilterableProjectsProps {
  projects: ProjectItem[];
  categories: string[];
}

export default function FilterableProjects({
  projects,
  categories,
}: FilterableProjectsProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectOpen, setSelectOpen] = useState(false);

  const handleFilter = useCallback((cat: string) => {
    setActiveFilter(cat.toLowerCase());
    setSelectOpen(false);
  }, []);

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter, projects]
  );

  return (
    <section className="projects">
      {/* Desktop filter buttons */}
      <ul className="filter-list">
        {categories.map((cat) => (
          <li key={cat} className="filter-item">
            <button
              className={activeFilter === cat.toLowerCase() ? "active" : ""}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile filter select */}
      <div className="filter-select-box">
        <button
          className={`filter-select${selectOpen ? " active" : ""}`}
          onClick={() => setSelectOpen(!selectOpen)}
        >
          <div className="select-value">
            {categories.find((c) => c.toLowerCase() === activeFilter) || "Select category"}
          </div>
          <div className="select-icon">
            <IoChevronDown />
          </div>
        </button>

        {selectOpen && (
          <ul className="select-list">
            {categories.map((cat) => (
              <li key={cat} className="select-item">
                <button onClick={() => handleFilter(cat)}>{cat}</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Project grid */}
      <motion.ul className="project-list" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.li
              key={project.title}
              className="project-item active"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <IoEyeOutline />
                  </div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </figure>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
              </a>
              {project.prototypeUrl && (
                <a
                  href={project.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prototype-link"
                >
                  <p className="project-category">▶ View Prototype</p>
                </a>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
