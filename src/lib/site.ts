// Production URL used for canonical links, sitemap, OG images and JSON-LD.
// Override with NEXT_PUBLIC_SITE_URL if the domain changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://himanshuheda.vercel.app").replace(/\/$/, "");

export const SITE_TITLE = "Himanshu Heda | Full-Stack & AI Integration Engineer";

// ~155 characters: Flutter, FastAPI, AI integration, Noida.
export const SITE_DESCRIPTION =
  "Himanshu Heda, Full-Stack & AI Integration Engineer in Noida, India. Flutter, FastAPI, Python, AWS and AI integration. Shipped FabVision AI to Google Play.";
