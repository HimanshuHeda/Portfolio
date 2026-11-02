"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { IoPaperPlane } from "react-icons/io5";
import { personalInfo } from "@/data/portfolio-data";

// Set NEXT_PUBLIC_FORMSPREE_FORM_ID in .env.local and in the Vercel project
// settings. Without it the form is hidden and only the email link is shown.
// TODO(me): create the Formspree form and add its ID to Vercel env vars.
const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
const formEndpoint = formId ? `https://formspree.io/f/${formId}` : null;

export default function ContactSection() {
  const [formValid, setFormValid] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleInput(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    setFormValid(form.checkValidity());
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formEndpoint) return;
    const form = e.currentTarget;
    setSending(true);
    setStatus(null);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus({
          message: "Message sent successfully! I will get back to you soon.",
          type: "success",
        });
        form.reset();
        setFormValid(false);
      } else {
        const data = await response.json();
        const msg = data.errors
          ? data.errors.map((err: { message: string }) => err.message).join(", ")
          : "Something went wrong. Please try again, or email me directly.";
        setStatus({ message: msg, type: "error" });
      }
    } catch {
      setStatus({
        message: "Network error. Please try again later, or email me directly.",
        type: "error",
      });
    }

    setSending(false);
    setTimeout(() => setStatus(null), 6000);
  }

  return (
    <article className="contact">
      <header>
        <h1 className="h2 article-title">Contact</h1>
      </header>

      <section className="contact-direct">
        <p className="contact-direct-text">
          Hiring for a full-time role, or want to talk about a project? Email me at{" "}
          <a href={`mailto:${personalInfo.email}`} className="contact-direct-link">
            {personalInfo.email}
          </a>
          . Based in {personalInfo.location}.
        </p>
      </section>

      {formEndpoint && (
        <motion.section
          className="contact-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="h3 form-title">Contact Form</h2>

          <form className="form" onInput={handleInput} onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="New message from Portfolio" />

            <div className="input-wrapper">
              <label className="sr-only" htmlFor="contact-name">Full name</label>
              <input
                id="contact-name"
                type="text"
                name="fullname"
                className="form-input"
                placeholder="Full name"
                autoComplete="name"
                required
              />
              <label className="sr-only" htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className="form-input"
                placeholder="Email address"
                autoComplete="email"
                required
              />
            </div>

            <label className="sr-only" htmlFor="contact-message">Your message</label>
            <textarea
              id="contact-message"
              name="message"
              className="form-input"
              placeholder="Your Message"
              required
            />

            <button className="form-btn" type="submit" disabled={!formValid || sending}>
              <IoPaperPlane aria-hidden="true" />
              <span>{sending ? "Sending…" : "Send Message"}</span>
            </button>
          </form>

          {status && (
            <p
              className="form-status"
              role="status"
              style={{
                color:
                  status.type === "success"
                    ? "hsl(120, 60%, 65%)"
                    : "hsl(0, 60%, 65%)",
                marginTop: "12px",
                fontSize: "var(--fs-6)",
                textAlign: "center",
              }}
            >
              {status.message}
            </p>
          )}
        </motion.section>
      )}
    </article>
  );
}
