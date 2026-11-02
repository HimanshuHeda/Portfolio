"use client";

import FilterableProjects from "./FilterableProjects";
import { portfolioProjects, portfolioCategories } from "@/data/portfolio-data";

export default function PortfolioSection() {
  return (
    <article className="portfolio" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>
      <FilterableProjects
        projects={portfolioProjects}
        categories={portfolioCategories}
      />
    </article>
  );
}
