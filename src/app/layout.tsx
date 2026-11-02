import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { personalInfo } from "@/data/portfolio-data";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Story fonts: display for headings, mono for labels and terminal text.
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Himanshu Heda",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Himanshu Heda",
    "Full-Stack Developer",
    "AI Integration Engineer",
    "Flutter Developer",
    "FastAPI",
    "Python",
    "Next.js",
    "AWS",
    "Noida",
  ],
  authors: [{ name: personalInfo.name, url: SITE_URL }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: personalInfo.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  url: SITE_URL,
  image: `${SITE_URL}${personalInfo.avatar}`,
  jobTitle: personalInfo.title,
  email: `mailto:${personalInfo.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressCountry: "IN",
  },
  worksFor: { "@type": "Organization", name: "OctoDo Sol Pvt Ltd" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "CHRIST (Deemed to be University)" },
    { "@type": "EducationalOrganization", name: "Vision Group of Commerce" },
  ],
  knowsAbout: [
    "Flutter",
    "FastAPI",
    "Python",
    "AWS",
    "Next.js",
    "React",
    "Node.js",
    "AI integration",
    "Workflow automation",
    "WhatsApp Business API",
  ],
  sameAs: personalInfo.socials.map((s) => s.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
