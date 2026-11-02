"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoMailOutline,
  IoPhonePortraitOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoCloudDownloadOutline,
  IoChevronDown,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoFacebook,
} from "react-icons/io5";
import { personalInfo } from "@/data/portfolio-data";

const socialIconMap: Record<string, React.ReactNode> = {
  github: <IoLogoGithub />,
  linkedin: <IoLogoLinkedin />,
  twitter: <IoLogoTwitter />,
  instagram: <IoLogoInstagram />,
  facebook: <IoLogoFacebook />,
};

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1250px)");
    setExpanded(mq.matches);
    const handler = (e: MediaQueryListEvent) => setExpanded(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
          <motion.p
            className="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {personalInfo.name}
          </motion.p>
          <p className="title">{personalInfo.title}</p>
        </div>

        <button
          className="info_more-btn"
          onClick={() => setExpanded(!expanded)}
        >
          <span>{expanded ? "Hide Contacts" : "Show Contacts"}</span>
          <IoChevronDown
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="sidebar-info_more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="separator" />

            <ul className="contacts-list">
              <ContactItem
                icon={<IoMailOutline />}
                title="Email"
                delay={0}
              >
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="contact-link"
                >
                  {personalInfo.email}
                </a>
              </ContactItem>

              <ContactItem
                icon={<IoPhonePortraitOutline />}
                title="Phone"
                delay={0.08}
              >
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="contact-link"
                >
                  {personalInfo.phone}
                </a>
              </ContactItem>

              <ContactItem
                icon={<IoCalendarOutline />}
                title="Birthday"
                delay={0.16}
              >
                <time dateTime="2003-07-01">{personalInfo.birthday}</time>
              </ContactItem>

              <ContactItem
                icon={<IoLocationOutline />}
                title="Location"
                delay={0.24}
              >
                <address>{personalInfo.location}</address>
              </ContactItem>

              <ContactItem
                icon={<IoCloudDownloadOutline />}
                title="Resume"
                delay={0.32}
              >
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="contact-link"
                >
                  Click Here
                </a>
              </ContactItem>
            </ul>

            <div className="separator" />

            <ul className="social-list">
              {personalInfo.socials.map((s, i) => (
                <motion.li
                  key={s.name}
                  className="social-item"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    {socialIconMap[s.icon]}
                  </a>
                </motion.li>
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
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.li
      className="contact-item"
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <div className="icon-box">{icon}</div>
      <div className="contact-info">
        <p className="contact-title">{title}</p>
        {children}
      </div>
    </motion.li>
  );
}
