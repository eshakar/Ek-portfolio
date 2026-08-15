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
    role: "Full Stack Developer",
    company: "Ascentspark Software",
    type: "Full-time",
    period: "Dec 2025 — Present",
    duration: "9 mos",
    location: "Kolkata, West Bengal, India",
    remote: true,
    current: true,
    logo: "/images/ascentspark_software_logo.jpeg",
    extraLogo: "/images/logo-tenyears.gif",
    bullets: [
      "Own API integrations, endpoint development, and application logic in Next.js.",
      "Built scalable frontend–backend data flows with TanStack Query — caching, state management, and optimized API communication.",
      "Resolve 20+ bugs a week: UI issues, API failures, state inconsistencies, and performance bottlenecks.",
      "Design clean, reusable API endpoints and business logic aligned with product and scalability goals.",
      "Improve UX by refining workflows and loading states, collaborating with designers, backend engineers, and stakeholders.",
    ],
    skills: ["Next.js", "TanStack Query", "REST APIs", "TypeScript"],
  },
  {
    role: "Software Developer",
    company: "Sheryians Coding School",
    type: "Apprenticeship",
    period: "Sep 2025 — Jan 2026",
    duration: "5 mos",
    location: "India",
    remote: true,
    logo: "/images/the_sheryians_coding_school_logo.jpeg",
    bullets: [
      "Developed and deployed full-stack web apps on the MERN stack.",
      "Worked with RESTful APIs, authentication systems, and state management (Redux / Context API).",
      "Built responsive, dynamic UIs with React and Tailwind CSS.",
      "Implemented backend services with Node.js / Express and MongoDB for data management.",
      "Collaborated on team projects following agile workflows and Git / GitHub.",
    ],
    skills: ["MERN", "React", "Node.js", "MongoDB"],
  },
  {
    role: "Founding Engineer",
    company: "Voxvertex",
    type: "Full-time",
    period: "Nov 2025 — Dec 2025",
    duration: "2 mos",
    location: "Ghaziabad, Uttar Pradesh, India",
    remote: true,
    logo: "/images/voxvertex_logo.jpeg",
    bullets: [
      "Core founding-team member building an AI-driven event & speaker management platform.",
      "Built the full product stack — Next.js, React, Node.js — with AI integrations (OpenAI, LangChain, Hugging Face).",
      "Led UI revamps and multiple redesign cycles; owned scheduling modules, performance, and SEO.",
      "Handled scalable architecture and CI/CD; collaborated with clients, organizers, and internal teams.",
    ],
    skills: ["Next.js", "Node.js", "OpenAI", "LangChain"],
  },
  {
    role: "Software Developer Intern",
    company: "ITJOBXS",
    type: "Internship",
    period: "Jan 2025 — Oct 2025",
    duration: "10 mos",
    location: "India",
    remote: true,
    logo: "/images/itjobxs_logo.jpeg",
    bullets: [
      "Designed and developed responsive web pages, improving site engagement by 40%.",
      "Implemented security measures like reCAPTCHA, cutting spam activity by 60%.",
      "Optimized website performance, improving page load speed by 30%.",
      "Fixed 20+ bugs and optimized API endpoints, reducing response time by 25%.",
      "Built Redis-based rate limiting and session caching, improving performance and security.",
    ],
    skills: ["AWS", "CI/CD", "Redis", "REST APIs"],
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
      "Developed a user-friendly clinic website with React and Material UI, boosting patient engagement.",
      "Implemented user validation with Axios for secure data handling and a better experience.",
      "Contributed to 25% growth in patient interactions with a welcoming digital environment.",
    ],
    skills: ["React", "Material UI", "Axios"],
  },
  {
    role: "Frontend Developer",
    company: "LawCrats",
    type: "Full-time",
    period: "Aug 2024 — Sep 2024",
    duration: "2 mos",
    location: "India",
    remote: true,
    bullets: [
      "Led the design of a legal-resolutions platform serving 5,000 users (React, Material UI).",
      "Introduced code standards that lifted team productivity by 25%.",
      "Improved company websites' SEO performance by 35%.",
    ],
    skills: ["React", "Material UI", "SEO"],
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
