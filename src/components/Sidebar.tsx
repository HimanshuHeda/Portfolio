"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoMailOutline,
  IoLocationOutline,
  IoCloudDownloadOutline,
  IoChevronDown,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io5";
import { personalInfo } from "@/data/portfolio-data";

const socialIconMap: Record<string, React.ReactNode> = {
  github: <IoLogoGithub />,
  linkedin: <IoLogoLinkedin />,
};

const DESKTOP_QUERY = "(min-width: 1250px)";

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function Sidebar({ resumeAvailable }: { resumeAvailable: boolean }) {
  // Contacts are always open on wide screens; elsewhere the user toggles them.
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
  const [toggled, setToggled] = useState<boolean | null>(null);
  const expanded = toggled ?? isDesktop;

  return (
    <motion.aside
      className="sidebar"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="sidebar-info">
        <motion.figure
          className="avatar-box"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={personalInfo.avatar}
            alt={personalInfo.name}
            width={80}
            height={80}
          />
        </motion.figure>

        <div className="info-content">
          <p className="name">{personalInfo.name}</p>
          <p className="title">{personalInfo.title}</p>
        </div>

        <button
          className="info_more-btn"
          onClick={() => setToggled(!expanded)}
          aria-expanded={expanded}
          aria-controls="sidebar-contacts"
          aria-label={expanded ? "Hide contacts" : "Show contacts"}
        >
          <span>{expanded ? "Hide Contacts" : "Show Contacts"}</span>
          <IoChevronDown
            aria-hidden="true"
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id="sidebar-contacts"
            className="sidebar-info_more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="separator" />

            <ul className="contacts-list">
              <ContactItem icon={<IoMailOutline />} title="Email">
                <a href={`mailto:${personalInfo.email}`} className="contact-link">
                  {personalInfo.email}
                </a>
              </ContactItem>

              <ContactItem icon={<IoLocationOutline />} title="Location">
                <address>{personalInfo.location}</address>
              </ContactItem>

              {/* TODO(me): add public/assets/Resume/Himanshu_Heda_Resume.pdf; this item stays hidden until it exists. */}
              {resumeAvailable && (
                <ContactItem icon={<IoCloudDownloadOutline />} title="Resume">
                  <a href={personalInfo.resumeUrl} download className="contact-link">
                    Download PDF
                  </a>
                </ContactItem>
              )}
            </ul>

            <div className="separator" />

            <ul className="social-list">
              {personalInfo.socials.map((s) => (
                <li key={s.name} className="social-item">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={s.name}
                  >
                    {socialIconMap[s.icon]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

function ContactItem({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="contact-item">
      <div className="icon-box" aria-hidden="true">{icon}</div>
      <div className="contact-info">
        <p className="contact-title">{title}</p>
        {children}
      </div>
    </li>
  );
}
