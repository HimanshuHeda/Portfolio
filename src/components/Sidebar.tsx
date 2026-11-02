"use client";

import { useState } from "react";
import Image from "next/image";
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

export default function Sidebar({ resumeAvailable }: { resumeAvailable: boolean }) {
  // On wide screens (>= 1250px) CSS always shows the contacts and hides the
  // toggle. Below that, the toggle opens them. Contacts are always in the
  // server-rendered HTML, so nothing shifts after hydration.
  const [open, setOpen] = useState(false);

  return (
    <aside className="sidebar" data-open={open}>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <Image
            src={personalInfo.avatar}
            alt={personalInfo.name}
            width={80}
            height={80}
          />
        </figure>

        <div className="info-content">
          <p className="name">{personalInfo.name}</p>
          <p className="title">{personalInfo.title}</p>
        </div>

        <button
          className="info_more-btn"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="sidebar-contacts"
          aria-label={open ? "Hide contacts" : "Show contacts"}
        >
          <span>{open ? "Hide Contacts" : "Show Contacts"}</span>
          <IoChevronDown aria-hidden="true" className="info_more-icon" />
        </button>
      </div>

      <div id="sidebar-contacts" className="sidebar-info_more">
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

          {/* TODO(me): add public/assets/Resume/Himanshu_Heda_Resume.pdf (without the client name); this item stays hidden until it exists. */}
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
      </div>
    </aside>
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
