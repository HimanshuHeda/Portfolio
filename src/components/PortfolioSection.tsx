"use client";

import FilterableProjects from "./FilterableProjects";
import { portfolioProjects, portfolioCategories } from "@/data/portfolio-data";

export default function PortfolioSection() {
  return (
    <article className="portfolio" data-page="portfolio">
      <header>
        <h1 className="h2 article-title">Work</h1>
      </header>
      <FilterableProjects
        projects={portfolioProjects}
        categories={portfolioCategories}
      />
    </article>
  );
}
