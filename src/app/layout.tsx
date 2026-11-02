import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins-loaded",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Himanshu Heda | Full Stack Developer",
    template: "%s | Himanshu Heda",
  },
  description:
    "Himanshu Heda - Full Stack Developer specializing in Web Development, Java, Python, and Cybersecurity. Based in Noida, India.",
  keywords: [
    "Himanshu Heda",
    "Full Stack Developer",
    "Web Development",
    "Java",
    "Python",
    "Cybersecurity",
    "Portfolio",
  ],
  authors: [{ name: "Himanshu Heda" }],
  openGraph: {
    title: "Himanshu Heda | Full Stack Developer",
    description:
      "Portfolio of Himanshu Heda – Full Stack Developer, open-source contributor, and cybersecurity enthusiast.",
    images: ["/images/my-avatar.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Providers>
          <main>
            <Sidebar />
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
