import type { Metadata } from "next";
import ResumeSection from "@/components/ResumeSection";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return <ResumeSection />;
}
