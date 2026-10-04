import {
  Code2,
  Server,
  LayoutPanelLeft,
  Database,
  ClipboardCheck,
  Wrench,
  Cloud,
  Radio,
  CreditCard,
  Brain,
  type LucideIcon,
} from "lucide-react";

export const contact = {
  name: "Esha Kar",
  role: "Senior Full Stack AI-Native Developer",
  location: "Kolkata, India",
  email: "esha.kar20@gmail.com",
  phone: "+91-9932275231",
  linkedin: "https://www.linkedin.com/in/esha-kar-52758922a/",
  github: "https://github.com/eshakar",
  youtube: "https://www.youtube.com/channel/UCl_ax72lz6rygo077WKb-Ag",
  resume: "/Esha_resume.pdf",
};

export type SkillGroup = {
  icon: LucideIcon;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    icon: Code2,
    label: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python"],
  },
  {
    icon: LayoutPanelLeft,
    label: "Frontend",
    items: ["React.js", "Next.js", "Angular", "Tailwind CSS", "Three.js", "GSAP"],
  },
  {
    icon: Server,
    label: "Backend & APIs",
    items: ["Node.js", "Nest.js", "Express.js", "Django", "FastAPI", "REST", "JWT"],
  },
  {
    icon: Brain,
    label: "AI & Data",
    items: ["RAG Pipelines", "LangChain", "Gemini API", "ChatGPT API", "Vector DBs"],
  },
  {
    icon: Radio,
    label: "Real-time & SDKs",
    items: ["LiveKit SDK", "Amazon Chime SDK", "Firebase Realtime DB", "WebSockets"],
  },
  {
    icon: CreditCard,
    label: "Payments & Integrations",
    items: ["Razorpay", "Payment Gateway Integration", "Webhooks", "E-Commerce APIs"],
  },
  {
    icon: Database,
    label: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    icon: Cloud,
    label: "Infra & DevOps",
    items: ["VPS", "Cloudflare (CDN/DNS)", "Domain Management", "CI/CD Pipelines"],
  },
  {
    icon: ClipboardCheck,
    label: "Practices",
    items: ["TanStack Query", "Query Optimisation", "Component Architecture", "Production Debugging"],
  },
  {
    icon: Wrench,
    label: "Tools",
    items: ["Git", "GitHub", "Postman", "Figma", "Netlify"],
  },
];

export type Project = {
  title: string;
  tagline: string;
  tags: string[];
  href: string;
};

export const projects: Project[] = [
  {
    title: "AI Resume Analyzer & Interview Prep",
    tagline:
      "Gemini API-powered app generating role-specific interview questions — cuts prep time by 60%. Scoring engine returns ranked skill gaps in under 3s, handling 300+ requests at sub-500ms.",
    tags: ["Gemini API", "Node.js", "Express", "MongoDB"],
    href: "https://resume-analyzer-taupe-five.vercel.app/",
  },
  {
    title: "MERN Notes App",
    tagline:
      "Handles 500+ daily requests — Redis caching cut server load by 30% and indexing cut response time by 20%.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Redis"],
    href: "https://frontend-2-ih6w.onrender.com/",
  },
  {
    title: "Dogs Studio — 3D Interactive Experience",
    tagline:
      "Immersive Three.js + GSAP experience with ScrollTrigger-linked 3D animation sequences.",
    tags: ["Three.js", "GSAP", "ScrollTrigger", "React.js"],
    href: "https://react-dog-tau.vercel.app/",
  },
  {
    title: "Avatar Development",
    tagline:
      "Interactive avatar rendering app in React, exploring dynamic customization and real-time preview.",
    tags: ["React.js", "JavaScript"],
    href: "https://avatar-development.vercel.app/",
  },
  {
    title: "LabNest (Freelance · In Progress)",
    tagline:
      "Lab management platform under active development — owning frontend architecture, component design, and API integration.",
    tags: ["Next.js", "React.js", "REST APIs"],
    href: "https://labnest-self.vercel.app/",
  },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  remote?: boolean;
  current?: boolean;
  logo?: string;
  extraLogo?: string;
  bullets: string[];
  skills: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Senior Full Stack AI-Native Developer",
    company: "House of Jana Ventures",
    type: "Full-time",
    period: "Sep 2026 — Present",
    duration: "2 mos",
    location: "India",
    current: true,
    bullets: [
      "Haircraft — built an e-commerce platform from scratch as sole full-stack owner.",
      "Owned the project end-to-end — architecture, hosting, domain, VPS, and Cloudflare CDN.",
      "Built the storefront in Next.js and the admin panel in Angular, backed by a Nest.js API layer, with AI capabilities integrated across the platform.",
    ],
    skills: ["Next.js", "Angular", "Nest.js", "Cloudflare", "AI Integration"],
  },
  {
    role: "Full Stack Developer",
    company: "AscentSpark Pvt. Ltd.",
    type: "Full-time",
    period: "Nov 2025 — Sep 2026",
    duration: "11 mos",
    location: "Kolkata, West Bengal, India",
    remote: true,
    logo: "/images/ascentspark_software_logo.jpeg",
    extraLogo: "/images/logo-tenyears.gif",
    bullets: [
      "Tutopia (ed-tech, 1M+ downloads) — designed the end-to-end subscription and KYC payout flow with Next.js and Laravel APIs, enabling tutor wallet operations for 1M+ users.",
      "Established Quick Live 1:1 tutoring sessions with real-time wallet-based booking and joining flow.",
      "Adopted Amazon Chime SDK for large-scale live classrooms — 99.9% session reliability with raise-hand and moderation features.",
      "Reduced redundant API calls by 35% and improved app performance by 30% via TanStack Query caching.",
      "AI Spoken Learning — integrated LiveKit SDK as the real-time layer for an AI spoken-English agent, cutting session join time by 40% vs the prior Chime approach.",
      "Built the live AI evaluation frontend — audio-level indicators, transcription display, and instant feedback scoring — plus the full session lifecycle from room creation to graceful teardown.",
      "SSEN Samsung TV — developed a React OTT app for Samsung Tizen Smart TVs with D-pad navigation and live football streaming pipelines.",
      "FreshFishBasket — integrated Razorpay end-to-end: order creation, payment capture, webhooks, and refund processing.",
    ],
    skills: ["Next.js", "TanStack Query", "LiveKit", "Amazon Chime", "Razorpay"],
  },
  {
    role: "Software Development Intern",
    company: "ITJOBXS",
    type: "Internship",
    period: "Jan 2025 — Oct 2025",
    duration: "10 mos",
    location: "India",
    remote: true,
    logo: "/images/itjobxs_logo.jpeg",
    bullets: [
      "Fixed 20+ API bugs, reducing average server response time by 25%.",
      "Implemented Redis rate limiting and session caching from scratch, cutting abuse by 40%.",
      "Optimised 5+ MongoDB queries with indexing and aggregation, saving 120ms per query.",
    ],
    skills: ["Redis", "MongoDB", "Node.js", "REST APIs"],
  },
  {
    role: "Frontend Developer",
    company: "People Maketh",
    type: "Full-time",
    period: "May 2024 — Dec 2024",
    duration: "8 mos",
    location: "Bengaluru, Karnataka, India",
    remote: true,
    logo: "/images/people_maketh_logo.jpeg",
    bullets: [
      "Internal Data Verification System — consolidated 10+ REST APIs into React dashboards, reducing manual verification time by 25%.",
      "Created a reusable component library, cutting UI rebuild time by 35% across the team.",
    ],
    skills: ["React", "REST APIs", "Component Library"],
  },
];

export const achievements = [
  "Contributed to 100+ open-source projects on GitHub.",
  "5-star HackerRank rating in algorithms & data structures — top percentile.",
];

export const education = [
  { degree: "BCA (Pursuing Second Degree) · 8.76 CGPA", school: "Amity University", period: "2024 – 2027" },
  { degree: "BA English · 7.5 CGPA", school: "University of Kalyani", period: "2020 – 2023" },
];
