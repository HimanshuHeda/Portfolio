import type { Metadata } from "next";
import ResumeSection from "@/components/ResumeSection";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Experience, education and publication of Himanshu Heda: Developer at OctoDo Sol, building Flutter, FastAPI and AI integration work in production.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return <ResumeSection />;
}
