// ── Centralized portfolio data ──
// Edit this file to update your portfolio content.

export const personalInfo = {
  name: "Himanshu Heda",
  title: "Full-Stack Developer | AI Integration Engineer",
  avatar: "/images/my-avatar.png",
  email: "himanshuheda123@gmail.com",
  // City only. Phone and full address stay on the resume PDF, not in page HTML.
  location: "Noida, India",
  resumeUrl: "/assets/Resume/Himanshu_Heda_Resume.pdf",
  socials: [
    { name: "GitHub", url: "https://github.com/HimanshuHeda", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/himanshu-heda/", icon: "linkedin" },
  ],
};

export const hero = {
  headlineLead: "Full-Stack & AI Integration Engineer.",
  headlineRest: "I build and ship production systems.",
  subheadline:
    "Flutter, FastAPI, Python, AWS. Shipped FabVision AI to Google Play (now v20), cut manual processing by 80% for enterprise clients, and integrated WhatsApp/Meta APIs end to end.",
  availability: "Open to full-time roles",
};

// Keep these identical to the resume.
export const metrics = [
  { value: "80%", label: "less manual processing" },
  { value: "60 min → under 5 sec", label: "pump selection time" },
  { value: "v20", label: "live on Google Play" },
  { value: "100+", label: "app downloads" },
  { value: "50+", label: "PRs reviewed" },
];

export const aboutText = [
  `I'm a developer at OctoDo Sol in Noida. I build production systems end to end: Flutter apps, FastAPI and Node.js backends, and the AI and automation layers that connect them to real business workflows. My flagship project, FabVision AI, generates AI model photoshoots for Indian textile manufacturers. I built it solo, and it is live on Google Play (v20) with Razorpay payments.`,
  `I start from the manual process a team wants gone, then measure the result. That approach cut manual processing by 80% in a work-order system and brought pump selection for a manufacturing client from 60 minutes to under 5 seconds. I have also reviewed 50+ pull requests and mentored 100+ contributors in open-source programs, and co-authored an IEEE paper on phishing URL detection.`,
  `I completed my MCA at CHRIST (Deemed to be University) in 2026. I'm open to full-time roles as a Flutter or full-stack developer, AI integration engineer or product engineer, at startups, GCCs, and manufacturing or BFSI digital teams.`,
];

export const services = [
  {
    icon: "/images/icon-app.svg",
    title: "Mobile & web apps",
    text: "Flutter apps shipped to Google Play, plus React and Next.js dashboards in TypeScript and Tailwind.",
  },
  {
    icon: "/images/icon-dev.svg",
    title: "Backends & APIs",
    text: "FastAPI and Node.js services with Celery and Redis, PostgreSQL and MSSQL, deployed on AWS.",
  },
  {
    icon: "/images/icon-design.svg",
    title: "AI integration",
    text: "Gemini, Claude API and LangChain built into real products, from AI image generation to local multi-agent LLM setups.",
  },
  {
    icon: "/images/icon-photo.svg",
    title: "Workflow automation",
    text: "n8n pipelines, WhatsApp / Meta Business API flows and Tally integrations that remove manual work.",
  },
];

export const certifications = [
  { src: "/certifications/ACWOC.png", alt: "AcWoC Certificate" },
  { src: "/certifications/infosys_java.png", alt: "Infosys Java Certificate" },
  { src: "/certifications/ReactJS.png", alt: "ReactJS Certificate" },
  { src: "/certifications/International Conference ICIEGL.jpg", alt: "International Conference ICIEGL Certificate" },
  { src: "/certifications/POWER BI.jpg", alt: "Power BI Certificate" },
  { src: "/certifications/TABLEAU.jpg", alt: "Tableau Certificate" },
  { src: "/certifications/Python_HackerRank.png", alt: "Python HackerRank Certificate" },
];

export const badges = [
  { src: "/badges/AcWoC Badge.png", alt: "AcWoC Badge" },
  { src: "/badges/networking-basics.png", alt: "Cisco Networking Basics Badge" },
  { src: "/badges/AI_IBM.jpg", alt: "IBM AI Badge" },
  { src: "/badges/Microsoft 365 Copilot.png", alt: "Microsoft 365 Copilot Badge" },
  { src: "/badges/GitHub Practices Microsoft.png", alt: "GitHub Practices Microsoft Badge" },
];

export type RoleProject = {
  name: string;
  text: string;
  /** Case study page, if there is one. */
  href?: string;
  inProgress?: boolean;
};

export type TimelineEntry = {
  role: string;
  org: string;
  place?: string;
  period: string;
  points: string[];
  projects?: RoleProject[];
  additional?: string;
};

export const experience: TimelineEntry[] = [
  {
    role: "Developer",
    org: "OctoDo Sol Pvt Ltd",
    place: "Noida",
    period: "Jan 2026 — Present",
    points: [],
    projects: [
      {
        name: "FabVision AI",
        text: "built solo and shipped to Google Play (v20, 100+ downloads, Razorpay payments live). Flutter, FastAPI, Celery, Redis on AWS.",
        href: "/work/fabvision-ai",
      },
      {
        name: "WorkOrder Lifecycle Management System",
        text: "cut manual processing by 80% with automated validation and duplicate detection. React, Node.js, MSSQL, n8n.",
        href: "/work/workorder-lifecycle",
      },
      {
        name: "CES Pump Selector",
        text: "pump selection for a manufacturing client from 60 minutes to under 5 seconds, 100% accurate against manufacturer datasheets.",
        href: "/work/ces-pump-selector",
      },
      {
        name: "n8n + Tally order-to-cash automation",
        text: "ledger creation and invoicing automated through Tally.",
        href: "/work/workorder-lifecycle",
      },
      {
        name: "Meta / WhatsApp Business API automation",
        text: "from business verification to live deployment across 3 numbers/projects, with automated demo scheduling and reminders.",
        href: "/work/whatsapp-business-automation",
      },
      {
        name: "Payment Tracker",
        text: "one dashboard for payments, invoices and GST across all OctoDo products.",
        href: "/work/payment-tracker",
        inProgress: true,
      },
      {
        name: "Sewar pump research",
        text: "comparing DP, CMA-ES, GA, MPSO, ACO and GNN approaches for a sewer-network pump plugin.",
        href: "/work/sewar-pump-research",
        inProgress: true,
      },
    ],
    additional:
      "Microsoft 365 email-automation agent, listmonk email campaigns on Amazon SES, an image-to-text converter, and website builds for multiple clients.",
  },
  {
    role: "Python Full-Stack Developer Intern",
    org: "OctoDo Sol",
    period: "May 2025 — Jul 2025",
    points: [
      "Refactored a hydraulic design system and added Linear Regression, improving cost prediction accuracy by 15%.",
      "Built n8n SEO automation that cut manual effort by 60%, saving 10+ hours a week.",
      "Integrated the Semrush API across 5+ client accounts.",
    ],
  },
  {
    role: "Web Development Intern",
    org: "CodSoft",
    period: "Sep 2024 — Oct 2024",
    points: ["Built responsive web projects with 18% higher engagement and 25% faster page load."],
  },
];

export const openSource = {
  title: "Open source",
  roles:
    "Project Admin at GirlScript Summer of Code, SWOC and GDSC. Mentor at Kharagpur Open Source Society and Android Club VIT Bhopal.",
  stats: [
    { value: "50+", label: "PRs reviewed" },
    { value: "100+", label: "contributors mentored" },
    { value: "3+", label: "programs" },
  ],
};

export const education = [
  {
    title: "MCA, CHRIST (Deemed to be University)",
    place: "Delhi NCR",
    period: "Jul 2024 — Jul 2026",
  },
  {
    title: "BCA, Vision Group of Commerce",
    place: "Chittorgarh",
    period: "Jul 2021 — Apr 2024",
  },
];

export const publication = {
  title: "Comparative Analysis on Phishing URL Detection using Machine Learning & Deep Learning",
  venue: "IEEE",
  year: "2025",
  coAuthors: "Mudita Sharan and Preety Shoran",
  // Published figure confirmed by me (the resume PDF still says "over 94%").
  result: "97.70% accuracy",
  links: [
    { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11507313" },
    {
      label: "ResearchGate",
      href: "https://www.researchgate.net/publication/404749872_Comparative_Analysis_using_on_Phishing_URL's_using_Machine_Learning_and_Deep_Learning",
    },
  ],
};

export const skills = [
  { name: "Web Developer", value: 90 },
  { name: "Java Developer", value: 80 },
  { name: "Python", value: 70 },
  { name: "Cloud Computing", value: 80 },
  { name: "Cyber Security", value: 80 },
];

export type DesignItem = {
  title: string;
  image: string;
  url: string;
  prototypeUrl?: string;
};

export const designProjects: DesignItem[] = [
  {
    title: "Christ",
    image: "/images/Christ.png",
    url: "https://www.figma.com/design/RukbRCyfreN3hBKfXRQrE4/Christ?node-id=0-1&t=qSn7xMOzrWpyQSTg-1",
  },
  {
    title: "International Bank",
    image: "/images/Bank.png",
    url: "https://www.figma.com/design/mjWjrfBlldX8C5m3klqLPf/International-Bank?node-id=0-1&t=kaB4F0J3f7gRWThW-1",
    prototypeUrl: "https://www.figma.com/proto/mjWjrfBlldX8C5m3klqLPf/International-Bank?node-id=2-2&p=f&t=VtzuHAE5wX9RUew1-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2&show-proto-sidebar=1",
  },
  {
    title: "Indian Manuscripts",
    image: "/images/Manuscripts.png",
    url: "https://www.figma.com/design/Uy6Sc3AjfrXk1fgi84dVUG/Indian-Manuscripts?node-id=0-1&t=jCRlHefpmDfN48Rc-1",
    prototypeUrl: "https://www.figma.com/proto/Uy6Sc3AjfrXk1fgi84dVUG/Indian-Manuscripts?node-id=2-2&p=f&t=VtzuHAE5wX9RUew1-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2&show-proto-sidebar=1",
  },
  {
    title: "Furniture",
    image: "/images/Furniture.png",
    url: "https://www.figma.com/design/va4OHqFsbBmuNhVTjpaNvl/Furniture?node-id=0-1&t=SngNE4SN7uWUvycr-1",
    prototypeUrl: "https://www.figma.com/proto/va4OHqFsbBmuNhVTjpaNvl/Furniture?node-id=2-2&p=f&t=VtzuHAE5wX9RUew1-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2&show-proto-sidebar=1",
  },
];
