import { Poppins } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { personalInfo } from "@/data/portfolio-data";
import { publicFileExists } from "@/lib/assets";

// Card + sidebar shell for /resume, /work and /contact. The home page (/) has
// its own full-bleed story layout. Poppins is only loaded for these pages.
const poppins = Poppins({
  variable: "--font-poppins-loaded",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${poppins.variable} pages-shell`}>
      <Sidebar resumeAvailable={publicFileExists(personalInfo.resumeUrl)} />
      <div className="main-content">
        <Navbar />
        <div id="content" tabIndex={-1}>
          {children}
        </div>
      </div>
    </main>
  );
}
