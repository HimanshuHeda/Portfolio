// ── Case studies (/work and /work/[slug]) ──
// Facts only. No client names, client data, internal URLs or screenshots of
// client systems. Items without a public screenshot get an architecture diagram.

export type CaseStudyStatus = "Live" | "In progress" | "Personal project" | "Open source";

export type CaseStudy = {
  slug: string;
  title: string;
  /** One-line summary, shown on cards and as the page description. */
  summary: string;
  status: CaseStudyStatus;
  /** Short context label, e.g. "OctoDo Sol" or "Manufacturing client". */
  context: string;
  problem: string;
  role: string;
  stack: string[];
  /** Rendered as a top-to-bottom flow diagram. */
  architecture: { label: string; detail?: string }[];
  /** Headline numbers. Leave empty for in-progress work. */
  results: { value: string; label: string }[];
  /** Non-numeric outcomes. */
  outcomes: string[];
  links: { label: string; href: string }[];
  image?: { src: string; alt: string; width: number; height: number };
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fabvision-ai",
    title: "FabVision AI",
    summary:
      "AI-generated model photoshoots for Indian textile manufacturers. Built solo, live on Google Play.",
    status: "Live",
    context: "OctoDo Sol",
    problem:
      "Textile manufacturers, many of them in the Surat cluster, need to show buyers how a fabric looks as a finished garment on a model. FabVision AI generates those model photoshoots with AI.",
    role: "Built it solo: the Flutter app, the FastAPI backend, background workers, AWS deployment, Razorpay payments and every Google Play release.",
    stack: ["Flutter", "FastAPI", "Python", "Celery", "Redis", "AWS", "Gemini", "Claude API", "Razorpay"],
    architecture: [
      { label: "Flutter app", detail: "Android app on Google Play. iOS build in its final stage, pending Apple In-App Purchase." },
      { label: "FastAPI backend", detail: "API, accounts and Razorpay payments." },
      { label: "Redis + Celery", detail: "Background job queue for photoshoot generation." },
      { label: "Generative AI", detail: "Gemini and Claude API." },
      { label: "AWS", detail: "Hosting for the backend and workers." },
    ],
    results: [
      { value: "v20", label: "on Google Play" },
      { value: "100+", label: "downloads" },
      { value: "Live", label: "Razorpay payments" },
    ],
    outcomes: ["20 iterative releases on Google Play.", "iOS build nearly done; Apple In-App Purchase pending."],
    links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.fabvision.ai" }],
    featured: true,
  },
  {
    slug: "workorder-lifecycle",
    title: "Automated WorkOrder Lifecycle Management System",
    summary: "End-to-end work-order automation, from entry to Tally invoicing, that cut manual processing by 80%.",
    status: "Live",
    context: "OctoDo Sol",
    problem:
      "Work orders were processed by hand, which was slow and let data-entry errors and duplicate orders through to accounting.",
    role: "Architected and built the system end to end as a developer at OctoDo Sol.",
    stack: ["React", "Node.js", "MSSQL", "n8n", "Tally"],
    architecture: [
      { label: "React front end", detail: "Work-order entry and tracking." },
      { label: "Node.js API", detail: "Automated validation and duplicate detection." },
      { label: "MSSQL", detail: "Work-order data." },
      { label: "n8n workflows", detail: "Order-to-cash automation." },
      { label: "Tally", detail: "Ledger creation and invoicing." },
    ],
    results: [{ value: "80%", label: "less manual processing" }],
    outcomes: [
      "Automated validation and duplicate detection removed data-entry errors.",
      "Order-to-cash automated through Tally ledger and invoicing.",
    ],
    links: [],
  },
  {
    slug: "ces-pump-selector",
    title: "CES Pump Selector",
    summary: "Pump selection for a manufacturing client, from 60 minutes to under 5 seconds.",
    status: "Live",
    context: "Manufacturing client",
    problem:
      "Selecting the right pump took about 60 minutes each time, and every result had to match the manufacturer's datasheets exactly.",
    role: "Delivered the application for a manufacturing client as a developer at OctoDo Sol.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Recharts", "Puppeteer", "JWT"],
    architecture: [
      { label: "Next.js app (TypeScript)", detail: "Role-based access with JWT authentication." },
      { label: "Selection logic", detail: "Runs against pump data in PostgreSQL through Prisma." },
      { label: "Recharts", detail: "Charts for the selected pump." },
      { label: "Puppeteer", detail: "Automated PDF datasheets." },
    ],
    results: [
      { value: "60 min → under 5 sec", label: "pump selection time" },
      { value: "100%", label: "accuracy vs manufacturer datasheets" },
    ],
    outcomes: ["Role-based access and JWT authentication.", "PDF datasheets generated automatically."],
    links: [],
  },
  {
    slug: "whatsapp-business-automation",
    title: "Meta / WhatsApp Business API automation",
    summary: "WhatsApp Business API taken from business verification to live deployment across 3 numbers/projects.",
    status: "Live",
    context: "OctoDo Sol",
    problem:
      "Each project needed WhatsApp Business messaging taken all the way from Meta business verification to live use, with demo bookings followed up automatically and email campaigns on their own domains.",
    role: "Handled the integration end to end at OctoDo Sol: verification, number setup, deployment and the automation on top.",
    stack: ["Meta Business API", "WhatsApp Business API", "listmonk", "Amazon SES"],
    architecture: [
      { label: "Meta business verification", detail: "Per project, through to live deployment." },
      { label: "WhatsApp Business numbers", detail: "3 numbers/projects live." },
      { label: "Demo scheduling", detail: "Automated booking flow." },
      { label: "Reminders", detail: "Sent 24 hours and 30 minutes before each demo." },
      { label: "Email campaigns", detail: "listmonk on Amazon SES, on two domains." },
    ],
    results: [
      { value: "3", label: "numbers/projects live" },
      { value: "24 h + 30 min", label: "automated demo reminders" },
      { value: "2", label: "email domains on Amazon SES" },
    ],
    outcomes: [],
    links: [],
  },
  {
    slug: "payment-tracker",
    title: "Payment Tracker",
    summary: "One dashboard for payments, invoices and GST across all OctoDo products.",
    status: "In progress",
    context: "OctoDo Sol",
    problem: "Payments, invoices and GST across OctoDo's apps and websites had no single view for the accounts team.",
    role: "Building it as a developer at OctoDo Sol.",
    // TODO(me): add the stack once it is final.
    stack: [],
    architecture: [
      { label: "All OctoDo products", detail: "Apps and websites." },
      { label: "Payment Tracker", detail: "Payments, invoices, GST and payment stages in one place." },
      { label: "Accounts team", detail: "Workflows with role-based access." },
    ],
    results: [],
    outcomes: ["In progress: payment-stage tracking, accounts-team workflows and role-based access."],
    links: [],
  },
  {
    slug: "sewar-pump-research",
    title: "Sewar pump research",
    summary: "Comparing six optimization approaches for a sewer-network pump plugin.",
    status: "In progress",
    context: "OctoDo Sol",
    problem:
      "A sewer-network pump plugin needs an optimization method that works across a whole network of manholes and pipes. This research compares candidate approaches before one is built in.",
    role: "Research and prototyping as a developer at OctoDo Sol.",
    stack: ["Python", "Streamlit", "DP", "CMA-ES", "GA", "MPSO", "ACO", "GNN"],
    architecture: [
      { label: "Network model", detail: "Manholes, pipes and city layout." },
      { label: "Optimization approaches", detail: "DP, CMA-ES, GA, MPSO, ACO and GNN." },
      { label: "Comparison", detail: "Results side by side." },
      { label: "Streamlit UI", detail: "Maps manholes and pipes." },
    ],
    results: [],
    outcomes: ["In progress: six approaches under comparison."],
    links: [],
  },
  {
    slug: "local-multi-agent-llm",
    title: "Local multi-agent LLM system",
    summary: "Routes coding and vision tasks across self-hosted models with Ollama.",
    status: "Personal project",
    context: "Personal",
    problem: "I wanted coding and vision tasks handled by the model best suited to each, running on my own hardware.",
    role: "Personal project, built end to end.",
    stack: ["Python", "Ollama"],
    architecture: [
      { label: "Incoming task", detail: "Coding or vision." },
      { label: "Router", detail: "Picks a model for the task type." },
      { label: "Self-hosted models", detail: "Served locally through Ollama." },
      { label: "Result", detail: "Returned to the caller." },
    ],
    results: [],
    outcomes: ["Runs fully on self-hosted hardware."],
    links: [],
  },
  {
    slug: "zip-tales",
    title: "Zip Tales",
    summary: "AI news verification platform that filters misinformation and scores credibility.",
    status: "Open source",
    context: "Open source",
    problem:
      "Misinformation spreads faster than corrections. Zip Tales filters it and gives news items community-verified credibility scores.",
    role: "Owner of the open-source project on GitHub.",
    // TODO(me): confirm the stack. GitHub reports TypeScript; the resume lists Python, Gemini AI, Blockchain and Streamlit.
    stack: ["TypeScript", "Gemini AI", "Blockchain"],
    architecture: [
      { label: "News item", detail: "Submitted for checking." },
      { label: "AI check", detail: "Gemini-based analysis." },
      { label: "Community verification", detail: "Crowd-sourced validation." },
      { label: "Credibility score", detail: "Shown with the item." },
      { label: "Blockchain record", detail: "Tamper-proof verification history." },
    ],
    results: [
      { value: "11", label: "GitHub stars" },
      { value: "20", label: "forks" },
    ],
    outcomes: [],
    links: [
      { label: "Live site", href: "https://ziptales.netlify.app/" },
      { label: "GitHub", href: "https://github.com/HimanshuHeda/Zip_Tales" },
    ],
    image: { src: "/images/project-5.png", alt: "Zip Tales home page", width: 2559, height: 1468 },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

// ── Earlier work: small row at the bottom of /work ──
export const earlierWork = [
  { title: "Car Sales Analysis", tech: "Python, Streamlit", url: "https://github.com/HimanshuHeda/Car_Sales_Analysis" },
  { title: "Smart Energy Meter", tech: "IoT", url: "https://github.com/HimanshuHeda/Smart_Energy_Meter" },
  { title: "Step Into Style", tech: "HTML, CSS, JS, PHP", url: "https://github.com/HimanshuHeda/step_into_style" },
  { title: "Chatting Application", tech: "Java, sockets", url: "https://github.com/HimanshuHeda/Chatting_Application_Java" },
  { title: "Bank Management System", tech: "Java", url: "https://github.com/HimanshuHeda/Bank_Management_System_Java" },
  { title: "TextUtil", tech: "React", url: "https://github.com/HimanshuHeda/TextUtil_React" },
  { title: "Multi Step Form", tech: "HTML, CSS, JS", url: "https://github.com/HimanshuHeda/Multi_Step_Form" },
  { title: "Myntra Clone", tech: "HTML, CSS, JS", url: "https://github.com/HimanshuHeda/Myntra_Clone" },
  { title: "Amazon Clone", tech: "HTML, CSS, JS", url: "https://himanshuheda.github.io/Amazon_Clone/" },
  { title: "Tic Tac Toe", tech: "HTML, CSS, JS", url: "https://tic-tac-toe-bice-six-89.vercel.app/" },
];
