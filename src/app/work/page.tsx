import type { Metadata } from "next";
import PortfolioSection from "@/components/PortfolioSection";
import DesignSection from "@/components/DesignSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Himanshu Heda: production Flutter, FastAPI, Next.js and automation projects, plus earlier projects and design work.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PortfolioSection />
      <DesignSection />
    </>
  );
}
