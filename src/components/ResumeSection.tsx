"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoBookOutline } from "react-icons/io5";
import { education, experience, skills } from "@/data/portfolio-data";

const slideInLeft = {
  hidden: { opacity: 0, x: -25 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.05 },
  }),
};

export default function ResumeSection() {
  const [counterDone, setCounterDone] = useState(false);
  const countersRef = useRef<HTMLUListElement>(null);

  // animate skill counters on mount
  useEffect(() => {
    if (counterDone) return;
    setCounterDone(true);
    const timer = setTimeout(() => {
      if (!countersRef.current) return;
      countersRef.current
        .querySelectorAll<HTMLElement>(".skill-counter")
        .forEach((el) => {
          const target = parseInt(el.dataset.value || "0", 10);
          if (isNaN(target)) return;
          let current = 0;
          const increment = Math.max(1, Math.ceil(target / 40));
          const id = setInterval(() => {
            current = Math.min(current + increment, target);
            el.textContent = `${current}%`;
            if (current >= target) clearInterval(id);
          }, 22);
        });
    }, 450);
    return () => clearTimeout(timer);
  }, [counterDone]);

  return (
    <article className="resume" data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      {/* Education */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IoBookOutline />
          </div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          {education.map((item, i) => (
            <motion.li
              key={i}
              className="timeline-item"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
            >
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              <span>{item.period}</span>
              <p className="timeline-text">{item.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IoBookOutline />
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          {experience.map((item, i) => (
            <motion.li
              key={i}
              className="timeline-item"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
            >
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              <span>{item.period}</span>
              <p className="timeline-text">{item.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>

        <ul className="skills-list content-card" ref={countersRef}>
          {skills.map((skill, i) => (
            <motion.li
              key={skill.name}
              className="skills-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <div className="title-wrapper">
                <h5 className="h5">{skill.name}</h5>
                <span
                  className="skill-counter"
                  data-value={skill.value}
                >
                  0%
                </span>
              </div>
              <div className="skill-progress-bg">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${skill.value}%` }}
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </article>
  );
}
