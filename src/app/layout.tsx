import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { personalInfo } from "@/data/portfolio-data";
import { publicFileExists } from "@/lib/assets";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins-loaded",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
      <body className={poppins.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>
          <main>
            <Sidebar resumeAvailable={publicFileExists(personalInfo.resumeUrl)} />
            <div className="main-content">
              <Navbar />
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
