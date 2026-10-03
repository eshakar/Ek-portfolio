import {
  Code2,
  Server,
  LayoutPanelLeft,
  Database,
  ClipboardCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const contact = {
  name: "Esha Kar",
  role: "Full Stack Engineer",
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
    items: ["React.js", "Next.js", "Tailwind CSS", "Material UI", "Redux Toolkit"],
  },
  {
    icon: Server,
    label: "Backend & APIs",
    items: ["Node.js", "Express.js", "Nest.js", "REST API design", "JWT Auth", "Rate Limiting"],
  },
  {
    icon: Database,
    label: "Data & Performance",
    items: ["MongoDB", "Redis (caching, sessions)", "TanStack Query", "Query Optimization"],
  },
  {
    icon: ClipboardCheck,
    label: "Practices",
    items: ["Component-based architecture", "Code reviews", "Sprint-based delivery", "Production debugging"],
  },
  {
    icon: Wrench,
    label: "Tools",
    items: ["Git", "GitHub", "Postman", "Netlify", "Figma"],
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
    title: "AI-Powered Resume Analyzer & Interview Prep",
    tagline:
      "Gemini-powered analyzer generating role-specific interview questions and skill-gap scores in under 3s, at 300+ requests sub-500ms.",
    tags: ["Gemini API", "Node.js", "Express", "MongoDB"],
    href: "https://resume-analyzer-taupe-five.vercel.app/",
  },
  {
    title: "MERN Notes App",
    tagline:
      "Production notes app handling 500+ daily requests — full CRUD, JWT auth, and Redis caching cut server load by 30%.",
    tags: ["MongoDB", "Express", "React", "Redis", "JWT"],
    href: "https://frontend-2-ih6w.onrender.com/",
  },
  {
    title: "Dogs Studio",
    tagline:
      "Immersive 3D experience with Three.js and GSAP — scroll-linked animation sequences synced to 3D model states.",
    tags: ["Three.js", "GSAP", "React.js"],
    href: "https://react-dog-tau.vercel.app/",
  },
  {
    title: "AI Spoken English Platform — Tutopia",
    tagline:
      "Production AI spoken-English coach with ChatGPT-powered real-time conversation feedback and pronunciation coaching.",
    tags: ["Next.js", "TypeScript", "ChatGPT API", "TanStack Query"],
    href: "https://ai.tutopia.in/",
  },
  {
    title: "Drag & Drop Page Builder",
    tagline:
      "CMS-style page builder with react-dnd, undo/redo history, and 12 draggable component types — live property editing, no reload.",
    tags: ["React", "react-dnd", "Redux Toolkit"],
    href: "https://drag-drop-dun-zeta.vercel.app/",
  },
  {
    title: "Avatar Development",
    tagline:
      "Interactive avatar rendering app in React — dynamic customization with a real-time preview as you tweak every detail.",
    tags: ["React", "JavaScript", "UI"],
    href: "https://avatar-development.vercel.app/",
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
