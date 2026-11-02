"use client";

import FilterableProjects from "./FilterableProjects";
import { designProjects } from "@/data/portfolio-data";

const designCategories = ["All", "Figma"];

export default function DesignSection() {
  return (
    <article className="design" data-page="design">
      <header>
        <h2 className="h2 article-title">Design</h2>
      </header>
      <FilterableProjects
        projects={designProjects}
        categories={designCategories}
      />
    </article>
  );
}
