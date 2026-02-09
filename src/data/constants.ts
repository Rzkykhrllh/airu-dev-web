import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiDjango,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGrafana,
  SiPrometheus,
  SiRundeck,
  SiGithubactions,
  SiGit,
  SiVscodium,
  SiFigma,
  SiPostman,
  SiNotion,
} from "react-icons/si";
import { FaUser, FaBolt, FaMapMarkerAlt, FaRocket, FaEnvelope } from "react-icons/fa";
import { IconType } from "react-icons";

// Theme config - colors for preview dots, actual colors in globals.css
export const themes = [
  {
    id: "default",
    name: "Indigo",
    primary: "#6366f1",
    secondary: "#10b981",
    accent: "#f59e0b",
  },
  {
    id: "coral",
    name: "Coral",
    primary: "#f97316",
    secondary: "#14b8a6",
    accent: "#fbbf24",
  },
  {
    id: "violet",
    name: "Violet",
    primary: "#8b5cf6",
    secondary: "#facc15",
    accent: "#ec4899",
  },
  {
    id: "pink",
    name: "Pink",
    primary: "#ec4899",
    secondary: "#06b6d4",
    accent: "#a855f7",
  },
  {
    id: "teal",
    name: "Teal",
    primary: "#14b8a6",
    secondary: "#f97316",
    accent: "#8b5cf6",
  },
  {
    id: "blue",
    name: "Random",
    primary: "#2D4CFF",
    secondary: "#FFB703",
    accent: "#0F172A",
  },
  {
    id: "joints",
    name: "Joints UGM",
    primary: "#E9AA18",
    secondary: "#6513BE",
    accent: "#191A26",
  },
];

export const techStack = {
  frontend: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vue.js"],
  backend: ["Node.js", "Express.js", "Python", "FastAPI", "Django", "PostgreSQL", "MongoDB",],
  devops: ["Docker", "Grafana", "Prometheus", "Rundeck", "GitHub Actions"],
  tools: ["Git", "VS Code", "Figma", "Postman", "Notion", "Claude Code"],
};

export const techIcons: Record<string, IconType> = {
  "TypeScript": SiTypescript,
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Vue.js": SiVuedotjs,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "Python": SiPython,
  "FastAPI": SiFastapi,
  "Django": SiDjango,
  "PostgreSQL": SiPostgresql,
  "MongoDB": SiMongodb,
  "Redis": SiRedis,
  "Docker": SiDocker,
  "Grafana": SiGrafana,
  "Prometheus": SiPrometheus,
  "Rundeck": SiRundeck,
  "GitHub Actions": SiGithubactions,
  "Git": SiGit,
  "VS Code": SiVscodium,
  "Figma": SiFigma,
  "Postman": SiPostman,
  "Notion": SiNotion,
};

export const timelineData = [
  {
    title: "Software Engineer",
    company: "Net Chart Japan",
    location: "Yokohama, Japan",
    period: "Jan 2024 – Present",
    label: "current",
    type: "full-time",
    description:
      "Worked in the Traffic Counting team, focusing primarily on backend development and infrastructure platforms supporting data analytics systems",
    highlights: [
      "**Contributed to the implementation of backend APIs** in Django for traffic data dashboards, collaborating on API design and validating performance and reliability through JMeter-based testing",
      "**Improved API response times by 95-97% (from 2-3s to 0.1s) on a map-based traffic visualization app** by shifting from on-demand computation to scheduled batch precomputation, and integrated failure detection with alerting for operational stability (FastAPI, Vue.js, Rundeck, Slack Webhook)",
      "**Designed and implemented** the architecture and execution workflows of an internal ML platform from experimentation to production, **orchestrating 23 scheduled jobs with Rundeck** (scheduling, retries, failure handling) to support repeatable training/evaluation and experiment tracking (JupyterHub, MLflow, object storage, Rundeck)",
      "**Designed and implemented** centralized monitoring system for 3 VMs running 20+ dockerized services** by configuring Prometheus scraping (node-exporter, cAdvisor, blackbox exporter) and Grafana dashboards, with Slack notifications for host/container health and endpoint availability",
    ],
    tech: [
      "Python",
      "Django",
      "FastAPI",
      "Vue.js",
      "Docker",
      "Rundeck",
      "MLflow",
      "MinIO",
      "Grafana",
      "Prometheus",
      "JupyterHub",
      "Rundeck",
    ],
  },
  {
    title: "Frontend Developer",
    type: "Internship",
    company: "Tiket.com (PT Global Tiket Network)",
    location: "Jakarta, Indonesia",
    period: "Feb 2022 – Des 2022",
    desciption:
      "Worked on the Loyalty & Reviews team, building and shipping user-facing web features for the loyalty page and the review form/list flows.",
    highlights: [
      "**Contributed to shipping 7 features across 3 user-facing pages** (loyalty page, review form, review list) by building UI with the internal component library and collaborating with designers and engineers (Next.js, React, TypeScript, GraphQL, SCSS)",
      "**Improved maintainability** by refactoring parts of the codebase, and adding tests plus Storybook documentation for **4+ key components** (Jest, React Testing Library, Storybook)",
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "GraphQL",
      "Jest",
      "Storybook",
      "React Testing Library",
    ],
  },
  {
    title: "Frontend Developer",
    type: "Internship",
    company: "BIGIO.ID",
    location: "Indonesia",
    period: "Nov 2021 – Feb 2022",
    description:
      "Worked on a remote team developing Biofarma’s Partnership and Community Development monitoring website, focusing on frontend implementation and integration",

    highlights: [
      "Contributed to a web system for Biofarma’s partnership and community development monitoring by implementing UI using existing component patterns (React, Material UI, SCSS)",
      "Integrated API calls with Axios, managed global state with Redux, and resolved QA-reported bugs to improve stability and usability (Axios, Redux)",
    ],
    tech: ["React", "Material UI", "Redux", "SCSS"],
  },
  {
    title: "Teaching Assistant",
    company: "Universitas Gadjah Mada",
    location: "Yogyakarta, Indonesia",
    period: "Mar 2021 – Jul 2021",
    highlights: [
      "**Assisted in teaching 2 classes of Algorithms and Data Structures for 40+ undergraduate students**, including tutorials and Q&A sessions.",
      "Reviewed assignments and provided structured feedback to improve student understanding and problem-solving approach.",
      "Supported course delivery by preparing examples and explanations for key topics (e.g., sorting, recursion, data structures)",
    ],
  },
];

export const projectsData = [
  {
    year: "2025",
    title: "Photography Portfolio Website",
    desc: `End-to-end developed photography portfolio website with a custom admin panel for content and collection management.\n\n The project emphasizes clean UI design, responsive layout, and performance optimization for fast and reliable delivery of high-resolution images in a production environment.`,
    tech: ["Next.js", "Tailwind CSS", "Midtrans API"],
    demoUrl: "#",
    sourceUrl: "#",
    color: "primary",
  },
  {
    year: "2022",
    title: "Into UGM",
    desc: `Event website developed for Into UGM 2022, an academic event organized by IKAGAMASS UGM, supporting event promotion, participant registration, tryout submissions, and online payment processing. The platform successfully handled over 1,000 transactions, ensuring a smooth and reliable user experience throughout the event period.`,
    tech: ["Next.js", "Tailwind CSS", "Midtrans API"],
    demoUrl: "#",
    sourceUrl: "#",
    color: "primary",
  },
];

export const navSections = [
  { id: "about", label: "About", icon: FaUser },
  { id: "skills", label: "Skills", icon: FaBolt },
  { id: "timeline", label: "Journey", icon: FaMapMarkerAlt },
  { id: "projects", label: "Projects", icon: FaRocket },
  { id: "contact", label: "Contact", icon: FaEnvelope },
];
