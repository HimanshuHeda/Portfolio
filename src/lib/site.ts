// Production URL used for canonical links, sitemap, OG images and JSON-LD.
// Override with NEXT_PUBLIC_SITE_URL if the domain changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://himanshuheda.vercel.app").replace(/\/$/, "");

export const SITE_TITLE = "Himanshu Heda | Full-Stack & AI Integration Engineer";

// ~155 characters: Flutter, FastAPI, AI integration, Noida.
export const SITE_DESCRIPTION =
  "Himanshu Heda, Full-Stack & AI Integration Engineer in Noida, India. Flutter, FastAPI, Python, AWS and AI integration. Shipped FabVision AI to Google Play.";

/**
 * Per-page Open Graph / Twitter fields. Page-level openGraph replaces the
 * layout's object, so repeat the shared fields here. The 1200x630 image comes
 * from app/opengraph-image.tsx; it must be listed here because a page-level
 * openGraph object replaces the file-based image too.
 */
export function pageSocial(title: string, description: string, path: string) {
  const fullTitle = `${title} | Himanshu Heda`;
  return {
    openGraph: {
      type: "website" as const,
      locale: "en_IN",
      siteName: "Himanshu Heda",
      url: path,
      title: fullTitle,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description,
      images: ["/twitter-image"],
    },
  };
}
