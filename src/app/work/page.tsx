import type { Metadata } from "next";
import PortfolioSection from "@/components/PortfolioSection";
import DesignSection from "@/components/DesignSection";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <>
      <PortfolioSection />
      <DesignSection />
    </>
  );
}
