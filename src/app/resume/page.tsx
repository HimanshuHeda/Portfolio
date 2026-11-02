import type { Metadata } from "next";
import { pageSocial } from "@/lib/site";
import ResumeSection from "@/components/ResumeSection";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Experience, education and publication of Himanshu Heda: Developer at OctoDo Sol, building Flutter, FastAPI and AI integration work in production.",
  alternates: { canonical: "/resume" },
  ...pageSocial("Resume", "Experience, education and publication of Himanshu Heda: Developer at OctoDo Sol, building Flutter, FastAPI and AI integration work in production.", "/resume"),
};

export default function ResumePage() {
  return <ResumeSection />;
}
