import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Himanshu Heda, Full-Stack & AI Integration Engineer in Noida, India. Open to full-time roles.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactSection />;
}
