import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

const RESUME_PATH = "/assets/Resume/Himanshu_Heda_Resume.pdf";

// Old resume URLs (from the previous static site and earlier builds) point to
// the current PDF once it is committed, otherwise to the /resume page, so
// shared links never 404.
const resumeTarget = fs.existsSync(path.join(process.cwd(), "public", RESUME_PATH))
  ? RESUME_PATH
  : "/resume";

const oldResumePaths = [
  "/assets/Resume/HimanshuHeda.pdf",
  "/assets/Resume/Himanshu%20Heda%20CV.pdf",
  "/resume/HimanshuHeda.pdf",
  "/resume/Himanshu%20Heda%20CV.pdf",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The previous site was a single static index.html.
      { source: "/index.html", destination: "/", permanent: true },
      ...oldResumePaths.map((source) => ({
        source,
        destination: resumeTarget,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
