"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import PortfolioSection from "@/components/PortfolioSection";
import DesignSection from "@/components/DesignSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

const pageComponents: Record<string, React.ComponentType> = {
  about: AboutSection,
  resume: ResumeSection,
  portfolio: PortfolioSection,
  design: DesignSection,
  blog: BlogSection,
  contact: ContactSection,
};

export default function Home() {
  const [activePage, setActivePage] = useState("about");

  const ActivePage = pageComponents[activePage];

  return (
    <main>
      <Sidebar />

      <div className="main-content">
        <Navbar activePage={activePage} onNavigate={setActivePage} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ActivePage />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
