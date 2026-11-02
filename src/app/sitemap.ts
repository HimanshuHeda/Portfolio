import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { SITE_URL } from "@/lib/site";

const routes = ["", "/resume", "/work", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...caseStudies.map((c) => ({
      url: `${SITE_URL}/work/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: c.featured ? 0.9 : 0.7,
    })),
  ];
}
