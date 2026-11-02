"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { IoPaperPlane } from "react-icons/io5";
import { mapEmbedUrl, formspreeUrl } from "@/data/portfolio-data";

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
    const form = e.currentTarget;
    setSending(true);
    setStatus(null);

    try {
      const response = await fetch(formspreeUrl, {
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
          : "Something went wrong. Please try again.";
        setStatus({ message: msg, type: "error" });
      }
    } catch {
      setStatus({
        message: "Network error. Please try again later.",
        type: "error",
      });
    }

    setSending(false);
    setTimeout(() => setStatus(null), 6000);
  }

  return (
    <article className="contact" data-page="contact">
      <header>
        <h1 className="h2 article-title">Contact</h1>
      </header>

      <motion.section
        className="mapbox"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <figure>
          <iframe
            src={mapEmbedUrl}
            width="400"
            height="300"
            loading="lazy"
            style={{ border: 0 }}
            title="Noida Sector 62, India"
          />
        </figure>
      </motion.section>

      <motion.section
        className="contact-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="h3 form-title">Contact Form</h3>

        <form
          className="form"
          onInput={handleInput}
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="_subject" value="New message from Portfolio" />

          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
            />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
          />

          <button
            className="form-btn"
            type="submit"
            disabled={!formValid || sending}
          >
            <IoPaperPlane />
            <span>{sending ? "Sending…" : "Send Message"}</span>
          </button>
        </form>

        {status && (
          <p
            className="form-status"
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
    </article>
  );
}
