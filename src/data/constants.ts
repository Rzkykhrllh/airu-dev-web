// Theme config - colors for preview dots, actual colors in globals.css
export const themes = [
  { id: "default", name: "Indigo", primary: "#6366f1", secondary: "#10b981", accent: "#f59e0b" },
  { id: "coral", name: "Coral", primary: "#f97316", secondary: "#14b8a6", accent: "#fbbf24" },
  { id: "violet", name: "Violet", primary: "#8b5cf6", secondary: "#facc15", accent: "#ec4899" },
  { id: "pink", name: "Pink", primary: "#ec4899", secondary: "#06b6d4", accent: "#a855f7" },
  { id: "teal", name: "Teal", primary: "#14b8a6", secondary: "#f97316", accent: "#8b5cf6" },
  { id: "blue", name: "Random", primary: "#2D4CFF", secondary: "#FFB703", accent: "#0F172A" },
  { id: "joints", name: "Joints UGM", primary: "#E9AA18", secondary: "#6513BE", accent: "#191A26" },
];

export const techStack = {
  frontend: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vue.js"],
  backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"],
  devops: ["Docker", "Linux", "Kubernetes", "Grafana"],
  tools: ["Git", "VS Code", "Figma", "Postman", "Notion", "Claude Code"],
};

export const timelineData = [
  {
    title: "Software Engineer",
    company: "Net Chart Japan",
    location: "Yokohama, Japan",
    period: "Jan 2024 – Present",
    label: "current",
    type: "full-time",
    highlights: [
      "Worked in IoT/SI team focusing on traffic sensors and data analytics systems",
      "Developed scalable backend APIs using Django for client-facing dashboards and third-party integrations",
      "Improved system reliability through performance testing with JMeter",
      "Built a sensor-based map application and optimized performance by migrating from real-time to batch processing",
      "Designed and implemented ML development infrastructure using Docker, MLflow, MinIO, and JupyterHub"
    ],
    tech: [
      "Python",
      "Django",
      "FastAPI",
      "Vue.js",
      "Docker",
      "MLflow",
      "MinIO",
      "JupyterHub",
      "Rundeck"
    ]
  },
  {
    title: "Software Engineer",
    company: "Tiket.com (PT Global Tiket Network)",
    location: "Jakarta, Indonesia",
    period: "Feb 2022 – Nov 2022",
    highlights: [
      "Developed user loyalty and review features for large-scale consumer web applications",
      "Built reusable UI components using internal component libraries",
      "Collaborated closely with designers to implement consistent UI/UX",
      "Wrote unit and integration tests using Jest and React Testing Library",
      "Maintained component documentation using Storybook"
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "GraphQL",
      "Jest",
      "Storybook"
    ]
  },
  {
    title: "Frontend Developer",
    company: "BIGIO.ID",
    location: "Indonesia",
    period: "Nov 2021 – Feb 2022",
    highlights: [
      "Developed frontend features for government-related monitoring applications",
      "Integrated APIs and managed global state using Redux",
      "Resolved bugs identified during QA testing phase"
    ],
    tech: [
      "React",
      "Material UI",
      "Redux",
      "SCSS"
    ]
  },
  {
    title: "Teaching Assistant",
    company: "Universitas Gadjah Mada",
    location: "Yogyakarta, Indonesia",
    period: "Mar 2021 – Jul 2021",
    highlights: [
      "Assisted in teaching Algorithms and Data Structures for undergraduate students",
      "Reviewed assignments and provided structured feedback to improve student understanding",
      "Supported learning sessions with practical explanations and examples"
    ]
  },
  {
    title: "Started Coding",
    company: "Self-taught Journey",
    period: "2019",
    label: "the beginning",
    highlights: [
      "Began learning programming independently",
      "Built first web projects and developed long-term interest in software engineering"
    ]
  }
];

export const projectsData = [
  { emoji: "🚀", year: "2024", title: "SaaS Platform", desc: "Team collaboration platform with real-time features and subscription management.", tech: ["Next.js", "Supabase"], color: "primary" },
  { emoji: "📊", year: "2024", title: "Analytics Dashboard", desc: "Data visualization dashboard with AI-powered insights and forecasting.", tech: ["React", "Python"], color: "secondary" },
  { emoji: "🛒", year: "2023", title: "E-Commerce Store", desc: "Full-featured online store with payment processing and inventory system.", tech: ["Next.js", "Stripe"], color: "accent" },
];

export const navSections = [
  { id: "about", label: "About", icon: "👤" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "timeline", label: "Journey", icon: "📍" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "contact", label: "Contact", icon: "✉️" },
];
