// ── Home page story ("build log") ──
// All copy for "/" lives here. Facts only: every number must match the resume.
// Metric values are imported from portfolio-data so they cannot drift.

import { CES_PUMP_SELECTOR, hero, metrics, personalInfo, publication } from "./portfolio-data";

export type StoryLink = { label: string; href: string; external?: boolean };

export type StoryChapter = {
  /** Anchor id, also used by the chapter progress nav. */
  id: string;
  index: number;
  /** Short label for the progress nav. */
  nav: string;
  /** Mono label above the heading, e.g. "01 / origin · 2021–2024". */
  kicker: string;
  title: string;
  paragraphs: string[];
  /** Command-output style facts. Values must be real. */
  facts?: { value: string; label: string }[];
  links?: StoryLink[];
};

/**
 * FabVision screenshots for the 3D phone. Empty = abstract screen.
 * To use real screenshots, add files to public/fabvision/ and list them here,
 * e.g. ["/fabvision/home.webp", "/fabvision/result.webp"].
 */
export const FABVISION_SCREENS: string[] = [];

export const boot = {
  prompt: "whoami",
  output: `${personalInfo.name.toLowerCase()} · full-stack & ai integration engineer · ${personalInfo.location.toLowerCase()}`,
  name: personalInfo.name,
  role: "Full-Stack & AI Integration Engineer.",
  subheadline: hero.subheadline,
  availability: hero.availability,
};

export const summary = {
  command: "metrics --summary",
  line: "Developer at OctoDo Sol, Noida. MCA, CHRIST (Deemed to be University), 2026.",
  metrics,
  links: [
    { label: "Selected work", href: "/work" },
    { label: "FabVision AI case study", href: "/work/fabvision-ai" },
    { label: "Resume page", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ] satisfies StoryLink[],
};

export const chapters: StoryChapter[] = [
  {
    id: "boot",
    index: 0,
    nav: "Boot",
    kicker: "00 / boot",
    title: boot.role,
    paragraphs: [],
  },
  {
    id: "origin",
    index: 1,
    nav: "Origin",
    kicker: "01 / origin · 2021–2024",
    title: "Small builds, finished.",
    paragraphs: [
      "BCA at Vision Group of Commerce in Chittorgarh (2021 to 2024), then an MCA at CHRIST (Deemed to be University), Delhi NCR (Jul 2024 to Jul 2026).",
      "My first builds were small and complete: an e-commerce site, a Java chat app and a Java bank system.",
    ],
    links: [{ label: "Earlier work", href: "/work#earlier-work" }],
  },
  {
    id: "community",
    index: 2,
    nav: "Community",
    kicker: "02 / community and first jobs · 2024–2025",
    title: "Reviewing other people's code.",
    paragraphs: [
      "Web development intern at CodSoft. Then Project Admin and Mentor at GirlScript Summer of Code, SWOC, GDSC, Kharagpur Open Source Society and Android Club VIT Bhopal.",
      "Hackathon finalist at ABV-IIITM Gwalior. Intern at OctoDo Sol: n8n SEO automation and a hydraulic design cost model. An IEEE paper on phishing URL detection.",
    ],
    facts: [
      { value: "50+", label: "PRs reviewed" },
      { value: "100+", label: "contributors mentored" },
      { value: "60%", label: "less manual SEO effort (n8n)" },
      { value: "+15%", label: "cost prediction accuracy" },
      { value: publication.result.replace(" accuracy", ""), label: "phishing detection accuracy (IEEE)" },
    ],
    links: [
      { label: "Resume", href: "/resume" },
      { label: "IEEE paper", href: publication.links[0].href, external: true },
    ],
  },
  {
    id: "production",
    index: 3,
    nav: "Production",
    kicker: "03 / production · 2026",
    title: "Developer at OctoDo Sol.",
    paragraphs: [
      "I build production systems for enterprise clients. A work-order system with automated validation and duplicate detection, through to Tally invoicing.",
      `The ${CES_PUMP_SELECTOR} for a manufacturing client, checked against the manufacturer's datasheets.`,
    ],
    facts: [
      { value: "80%", label: "less manual processing" },
      { value: "60 min → under 5 sec", label: "pump selection" },
      { value: "100%", label: "accuracy vs datasheets" },
    ],
    links: [
      { label: "WorkOrder system", href: "/work/workorder-lifecycle" },
      { label: CES_PUMP_SELECTOR, href: "/work/ces-pump-selector" },
    ],
  },
  {
    id: "fabvision",
    index: 4,
    nav: "FabVision AI",
    kicker: "04 / flagship",
    title: "FabVision AI.",
    paragraphs: [
      "AI-generated model photoshoots for Indian textile manufacturers. I built it solo: Flutter app, FastAPI backend, Celery and Redis workers on AWS.",
      "Live on Google Play with Razorpay payments. iOS is next.",
    ],
    facts: [
      { value: "v20", label: "on Google Play" },
      { value: "100+", label: "downloads" },
      { value: "live", label: "Razorpay payments" },
    ],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.fabvision.ai", external: true },
      { label: "Case study", href: "/work/fabvision-ai" },
    ],
  },
  {
    id: "integrations",
    index: 5,
    nav: "Integrations",
    kicker: "05 / integrations and automation",
    title: "Systems talking to systems.",
    paragraphs: [
      "WhatsApp Business API from Meta business verification to live, on 3 numbers, with demo reminders 24 hours and 30 minutes ahead.",
      "n8n with Tally for order-to-cash. listmonk on Amazon SES across two domains.",
    ],
    facts: [
      { value: "3", label: "WhatsApp numbers live" },
      { value: "2", label: "email domains on Amazon SES" },
    ],
    links: [
      { label: "WhatsApp automation", href: "/work/whatsapp-business-automation" },
      { label: "Order-to-cash", href: "/work/workorder-lifecycle" },
    ],
  },
  {
    id: "now",
    index: 6,
    nav: "Now",
    kicker: "06 / now",
    title: "What I'm building now.",
    paragraphs: [
      "In progress: a Payment Tracker for all OctoDo products, research into optimization methods for a sewer-network pump plugin, and a local multi-agent LLM system on my own hardware.",
      `${hero.availability}: Flutter or full-stack developer, AI integration engineer or product engineer.`,
    ],
    links: [
      { label: "Payment Tracker", href: "/work/payment-tracker" },
      { label: "Sewar pump research", href: "/work/sewar-pump-research" },
      { label: "Local LLM system", href: "/work/local-multi-agent-llm" },
    ],
  },
];
