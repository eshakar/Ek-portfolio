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
];

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack Developer",
    company: "Ascentspark Software Pvt. Ltd.",
    period: "Dec 2025 – Present",
    bullets: [
      "Shipped Next.js API routes supporting real-time data across 200+ concurrent sessions, cutting backend latency by 30%.",
      "Replaced direct API calls with TanStack Query across core flows, cutting average load time by 35%.",
      "Refactored business logic into reusable service modules, reducing code duplication by 40%.",
      "Resolved 15+ UI bottlenecks in production checkout and onboarding flows.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "ITJOBXS",
    period: "Jan 2025 – Oct 2025",
    bullets: [
      "Diagnosed and fixed 20+ bugs across API endpoints, reducing average server response time by 25%.",
      "Architected a Redis-based rate limiting and session caching layer from scratch, cutting request abuse by 40%.",
      "Optimized 5+ high-traffic MongoDB queries with indexing and aggregation, saving 120ms per query.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "People Maketh",
    period: "May 2024 – Dec 2024",
    bullets: [
      "Integrated 10+ REST APIs into React dashboards, cutting operational verification time by 25%.",
      "Delivered a reusable component library, reducing UI rebuild time for new features by 35%.",
    ],
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
