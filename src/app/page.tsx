"use client";

import { useState, useEffect } from "react";

// Theme config - colors for preview dots, actual colors in globals.css
const themes = [
  { id: "default", name: "Indigo", primary: "#6366f1", secondary: "#10b981", accent: "#f59e0b" },
  { id: "coral", name: "Coral", primary: "#f97316", secondary: "#14b8a6", accent: "#fbbf24" },
  { id: "violet", name: "Violet", primary: "#8b5cf6", secondary: "#facc15", accent: "#ec4899" },
  { id: "pink", name: "Pink", primary: "#ec4899", secondary: "#06b6d4", accent: "#a855f7" },
  { id: "teal", name: "Teal", primary: "#14b8a6", secondary: "#f97316", accent: "#8b5cf6" },
  { id: "blue", name: "Random", primary: "#2D4CFF", secondary: "#FFB703", accent: "#0F172A" },
  { id: "joints", name: "Joints UGM", primary: "#E9AA18", secondary: "#6513BE", accent: "#191A26" },
];

const tech_stack = {
  frontend: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vue.js"],
  backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"],
  devops: ["Docker", "Linux", "Kubernetes", "Grafana"],
  tools: ["Git", "VS Code", "Figma", "Postman", "Notion", "Claude Code"],
};

const timelineData = [
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


const projectsData = [
  { emoji: "🚀", year: "2024", title: "SaaS Platform", desc: "Team collaboration platform with real-time features and subscription management.", tech: ["Next.js", "Supabase"], color: "primary" },
  { emoji: "📊", year: "2024", title: "Analytics Dashboard", desc: "Data visualization dashboard with AI-powered insights and forecasting.", tech: ["React", "Python"], color: "secondary" },
  { emoji: "🛒", year: "2023", title: "E-Commerce Store", desc: "Full-featured online store with payment processing and inventory system.", tech: ["Next.js", "Stripe"], color: "accent" },
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [expandedItems, setExpandedItems] = useState<number[]>([0]); // First item expanded by default
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [othersOpen, setOthersOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["about", "skills", "timeline", "projects", "contact"];
      const scrollPosition = window.scrollY + 150; // offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      // If at top of page
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div
      className="min-h-screen grid-pattern"
      data-theme={currentTheme === "default" ? undefined : currentTheme}
    >
      {/* Theme Switcher */}
      <div className="fixed top-24 right-6 z-50 p-3 shadow-lg border-2 border-[#e2e8f0] rounded-lg bg-white">
        <div className="text-xs font-bold mono-label mb-2 text-[#64748b]">Theme</div>
        <div className="flex flex-col gap-2">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setCurrentTheme(t.id)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-bold mono-label transition-all rounded ${
                currentTheme === t.id ? "bg-[#0f172a] text-white" : "text-[#0f172a]"
              }`}
            >
              <span className="w-4 h-4 rounded-full" style={{ background: t.primary }}></span>
              <span className="w-4 h-4 rounded-full -ml-3" style={{ background: t.secondary }}></span>
              <span className="w-4 h-4 rounded-full -ml-3" style={{ background: t.accent }}></span>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-black text-xl transform -rotate-2 hover:rotate-0 transition-transform text-[#0f172a]">
            AIRU<span className="text-primary">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-3">
            {/* Home */}
            <a href="#" className="nav-item text-sm font-bold mono-label px-4 py-2 transition-all transform hover:-rotate-2 text-[#64748b] hover:text-primary">
              Home
            </a>

            {/* Blog */}
            <a href="/blog" className="nav-item text-sm font-bold mono-label px-4 py-2 transition-all transform hover:rotate-2 text-[#64748b] hover:text-primary">
              Blog
            </a>

            {/* Others Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOthersOpen(true)}
              onMouseLeave={() => setOthersOpen(false)}
            >
              <button className="text-sm font-bold mono-label px-4 py-2 transition-all transform hover:-rotate-2 text-[#64748b] flex flex-row items-center gap-1.5">
                Others
                <svg className={`w-3 h-3 transition-transform duration-200 ${othersOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-full right-0 mt-2 bg-white border-2 border-[#e2e8f0] shadow-lg rounded-lg overflow-hidden transition-all duration-200 ${
                othersOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
              }`}>
                <a
                  href="https://byairu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-bold mono-label text-[#64748b] hover:bg-[#f8fafc] hover:text-primary transition-colors whitespace-nowrap"
                >
                  <span>📷</span>
                  Photography
                  <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://hub.airu.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 text-sm font-bold mono-label text-[#64748b] hover:bg-[#f8fafc] hover:text-secondary transition-colors whitespace-nowrap border-t border-[#e2e8f0]"
                >
                  <span>🎮</span>
                  Hub
                  <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-[#e2e8f0]"></div>

            {/* Contact CTA */}
            <a href="#contact" className="nav-item bg-primary text-white text-sm font-bold mono-label px-5 py-2 transition-all transform -rotate-1 hover:rotate-0 shadow-md hover:shadow-lg">
              Contact
            </a>
          </nav>
          <a href="#contact" className="md:hidden bg-primary text-white px-4 py-2 text-sm font-bold mono-label transform -rotate-2">Say Hi</a>
        </div>
      </header>

      {/* Floating Sidebar Navigation */}
      <nav
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block transition-all duration-500 ease-out ${
          scrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 pointer-events-none"
        }`}
      >
        <div className={`bg-white border-2 border-[#e2e8f0] rounded-lg shadow-lg transition-all duration-300 ease-out overflow-hidden ${
          sidebarCollapsed ? "w-12 p-2" : "w-44 p-3"
        }`}>
          {/* Header with collapse button */}
          <div className={`flex items-center justify-between mb-2 ${sidebarCollapsed ? "flex-col gap-2" : ""}`}>
            {!sidebarCollapsed && (
              <div className="text-xs font-bold mono-label text-[#64748b] px-1">Navigate</div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] transition-colors"
              title={sidebarCollapsed ? "Expand" : "Collapse"}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="relative flex flex-col gap-0.5">
            {/* Vertical line connecting dots */}
            {!sidebarCollapsed && (
              <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-[#e2e8f0]" />
            )}

            {[
              { id: "about", label: "About", icon: "👤" },
              { id: "skills", label: "Skills", icon: "⚡" },
              { id: "timeline", label: "Journey", icon: "📍" },
              { id: "projects", label: "Projects", icon: "🚀" },
              { id: "contact", label: "Contact", icon: "✉️" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative flex items-center gap-2.5 py-2 rounded transition-all duration-200 ${
                  sidebarCollapsed ? "px-1.5 justify-center" : "px-2"
                } ${
                  activeSection === item.id
                    ? "text-[#0f172a]"
                    : "text-[#94a3b8] hover:text-[#64748b]"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {/* Dot */}
                <div
                  className={`relative z-10 shrink-0 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-primary border-primary scale-125"
                      : "bg-white border-[#cbd5e1] group-hover:border-[#94a3b8]"
                  }`}
                />
                {!sidebarCollapsed && (
                  <>
                    <span className={`text-sm ${activeSection === item.id ? "" : "opacity-70"}`}>{item.icon}</span>
                    <span className={`text-xs font-bold mono-label whitespace-nowrap ${activeSection === item.id ? "font-black" : ""}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="badge-pill bg-primary text-white mb-6">
          <span>{"</>"}</span>
          <span className="mono-label">Software Engineer</span>
        </div>

        <div className="mb-4">
          <span className="handwritten text-lg text-[#64748b]">Hi, I&apos;m</span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-center leading-none tracking-tight transform -rotate-1 text-gradient">
          AIRU
        </h1>

        <div className="flex items-center gap-3 mt-6 mb-4">
          <span className="w-8 h-0.5 bg-primary"></span>
          <h2 className="text-xl md:text-2xl font-bold mono-label text-[#0f172a]">I BUILD DIGITAL THINGS</h2>
          <span className="w-8 h-0.5 bg-secondary"></span>
        </div>

        <p className="text-lg md:text-xl text-center mt-4 max-w-xl text-[#64748b]">
          Full-stack developer crafting <span className="font-semibold text-primary">web applications</span> with clean code and thoughtful design.
        </p>

        <p className="handwritten mt-6 text-center text-sm text-[#64748b]">
          &quot;Turning coffee into code since 2019&quot;
        </p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-12">
          <div className="relative">
            <span className="handwritten absolute -top-6 left-0 text-sm transform -rotate-3">check my work</span>
            <a href="#projects" className="tilt-left block bg-primary text-white px-8 py-5 shadow-lg">
              <div className="mono-label text-base font-bold flex items-center gap-2">
                PROJECTS <span className="arrow-bounce">{">"}</span>
              </div>
              <div className="text-sm mt-1 opacity-80">See what I&apos;ve built</div>
            </a>
          </div>

          <div className="relative">
            <span className="handwritten absolute -top-6 right-0 text-sm transform rotate-3">let&apos;s connect</span>
            <a href="#contact" className="tilt-right block bg-secondary text-white px-8 py-5 shadow-lg">
              <div className="mono-label text-base font-bold flex items-center gap-2">
                CONTACT <span className="arrow-bounce">{">"}</span>
              </div>
              <div className="text-sm mt-1 opacity-80">Get in touch</div>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 text-white">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black">5+</div>
            <div className="mono-label text-xs mt-2 text-slate-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-primary">20+</div>
            <div className="mono-label text-xs mt-2 text-slate-400">Projects Done</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-secondary">100%</div>
            <div className="mono-label text-xs mt-2 text-slate-400">Dedication</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-bar mb-10">
            <span className="mr-2">01.</span> About Me
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-black mb-6 text-[#0f172a]">
                WHO IS <span className="text-gradient">AIRU</span>?
              </h3>
              <p className="leading-relaxed mb-4 text-[#64748b]">
                I&apos;m a passionate software engineer based in Indonesia with a love for creating
                elegant solutions to complex problems. I specialize in building full-stack web
                applications that deliver exceptional user experiences.
              </p>
              <p className="leading-relaxed text-[#64748b]">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                contributing to open-source, or sipping coffee while debugging.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary text-white p-6 tilt-left">
                <div className="text-3xl mb-2">📍</div>
                <div className="mono-label text-xs text-white/70">Location</div>
                <div className="font-bold mt-1">Indonesia</div>
              </div>
              <div className="p-6 tilt-right border-2 border-[#e2e8f0] bg-white">
                <div className="text-3xl mb-2">💼</div>
                <div className="mono-label text-xs text-[#64748b]">Status</div>
                <div className="font-bold mt-1 text-secondary">Available</div>
              </div>
              <div className="p-6 tilt-right border-2 border-[#e2e8f0] bg-white">
                <div className="text-3xl mb-2">🎓</div>
                <div className="mono-label text-xs text-[#64748b]">Focus</div>
                <div className="font-bold mt-1 text-[#0f172a]">Full-Stack</div>
              </div>
              <div className="bg-secondary text-white p-6 tilt-left">
                <div className="text-3xl mb-2">☕</div>
                <div className="mono-label text-xs text-white/70">Fuel</div>
                <div className="font-bold mt-1">Coffee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="section-bar mb-10">
            <span className="mr-2">02.</span> Tech Stack
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
                <span className="text-primary">{"{"}</span> Frontend <span className="text-primary">{"}"}</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {tech_stack.frontend.map((skill) => (
                  <span key={skill} className="skill-tag bg-primary text-white mono-label text-xs">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
                <span className="text-secondary">{"{"}</span> Backend <span className="text-secondary">{"}"}</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {tech_stack.backend.map((skill) => (
                  <span key={skill} className="skill-tag bg-secondary text-white mono-label text-xs">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
                <span className="text-accent">{"{"}</span> DevOps <span className="text-accent">{"}"}</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {tech_stack.devops.map((skill) => (
                  <span key={skill} className="skill-tag bg-accent text-white mono-label text-xs">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
                <span className="text-[#64748b]">{"{"}</span> Tools <span className="text-[#64748b]">{"}"}</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {tech_stack.tools.map((skill) => (
                  <span key={skill} className="skill-tag bg-[#0f172a] text-white mono-label text-xs">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-bar mb-10">
            <span className="mr-2">03.</span> Journey
          </div>

          <div className="mb-8">
            <h3 className="text-3xl font-black mb-4 text-[#0f172a]">
              MY <span className="text-primary">TIMELINE</span>
            </h3>
            <p className="leading-relaxed text-[#64748b] max-w-xl">
              A quick look at my professional journey so far. Every step taught me something valuable.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1.75 top-4 bottom-4 w-0.75 bg-[#e2e8f0] hidden md:block"></div>

            <div className="space-y-4">
              {timelineData.map((item, index, arr) => {
                const colorClasses = ["bg-primary", "bg-secondary", "bg-accent"];
                const borderClasses = ["border-primary", "border-secondary", "border-accent"];
                const textClasses = ["text-primary", "text-secondary", "text-accent"];
                const colorClass = colorClasses[index % colorClasses.length];
                const borderClass = borderClasses[index % borderClasses.length];
                const textClass = textClasses[index % textClasses.length];
                const isExpanded = expandedItems.includes(index);
                const isLast = index === arr.length - 1;

                return (
                  <div key={index} className="relative flex gap-6">
                    {/* Timeline Dot */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${colorClass} border-4 border-white shadow-md z-10 transition-transform duration-300 ${isExpanded ? "scale-125" : ""}`}></div>
                      {!isLast && <div className={`w-0.75 flex-1 ${isExpanded ? colorClass : "bg-transparent"} transition-colors duration-300`}></div>}
                    </div>

                    {/* Card */}
                    <div
                      className={`flex-1 experience-card bg-white border-2 ${isExpanded ? borderClass : "border-[#e2e8f0]"} p-6 transition-all duration-300 hover:border-[#cbd5e1] cursor-pointer`}
                      onClick={() => toggleExpand(index)}
                    >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-black text-xl text-[#0f172a]">{item.company}</h4>
                      <p className="font-medium text-[#64748b]">{item.title}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.label === "current" && (
                        <span className={`${colorClass} text-white text-xs font-bold mono-label px-3 py-1 rounded-full`}>
                          Current
                        </span>
                      )}
                      {item.type && (
                        <span className="bg-[#f1f5f9] text-[#64748b] text-xs font-bold mono-label px-3 py-1 rounded-full">
                          {item.type}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Period & Location */}
                  <div className="flex items-center gap-4 text-sm text-[#64748b] mb-4">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item.period}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* Key Achievements Header - Always visible */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className={`flex items-center justify-between py-2 mb-2 ${isExpanded ? `border-b border-[#e2e8f0]` : ""}`}>
                      <span className={`mono-label text-xs font-bold ${textClass}`}>KEY ACHIEVEMENTS</span>
                      <svg
                        className={`w-4 h-4 text-[#94a3b8] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}

                  {/* Expandable Content - Achievements */}
                  <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-125 opacity-100 mb-4" : "max-h-0 opacity-0"}`}>
                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="space-y-2 pt-2">
                        {item.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start gap-2 text-sm text-[#64748b]">
                            <span className={`${textClass} mt-0.5`}>◆</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Tech Stack - Always visible */}
                  {item.tech && item.tech.length > 0 && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3 border-t border-dashed border-[#e2e8f0]">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 text-sm text-[#64748b]"
                        >
                          <span className="text-[#94a3b8]">{"</>"}</span>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="section-bar mb-10">
            <span className="mr-2">04.</span> Projects
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => {
              const colorClasses = ["bg-primary", "bg-secondary", "bg-accent"];
              const textColorClasses = ["text-primary", "text-secondary", "text-accent"];
              const bgClass = colorClasses[index % colorClasses.length];
              const textClass = textColorClasses[index % textColorClasses.length];

              return (
                <div key={index} className="project-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl">{project.emoji}</span>
                    <span className={`badge-pill ${bgClass} text-white text-xs py-1 px-3`}>{project.year}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-[#0f172a]">{project.title}</h3>
                  <p className="text-sm mb-4 text-[#64748b]">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span key={t} className={`mono-label text-xs ${i === 0 ? textClass : "text-secondary"}`}>{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-dashed border-[#e2e8f0]">
                    <a href="#" className={`mono-label text-xs hover:underline ${textClass}`}>Live Demo</a>
                    <a href="#" className="mono-label text-xs text-[#64748b] hover:text-[#0f172a]">Source</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-bar mb-10">
            <span className="mr-2">05.</span> Contact
          </div>

          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-[#0f172a]">
              LET&apos;S <span className="text-primary">WORK</span> TOGETHER
            </h3>
            <p className="text-lg mb-8 text-[#64748b]">
              Have a project in mind or just want to say hi? I&apos;m always open to discussing new opportunities and ideas.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="mailto:hello@airu.dev" className="tilt-left bg-primary text-white px-8 py-4 font-bold mono-label flex items-center gap-2 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="tilt-right bg-[#0f172a] text-white px-8 py-4 font-bold mono-label flex items-center gap-2 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="border-2 border-[#0f172a] text-[#0f172a] px-8 py-4 font-bold mono-label flex items-center gap-2 hover:bg-[#0f172a] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <a href="mailto:hello@airu.dev" className="floating-cta bg-secondary text-white px-5 py-3 shadow-lg flex items-center gap-2 font-bold mono-label text-sm">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        Hire Me
      </a>

      {/* Footer */}
      <footer className="py-10 px-6 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-white">
          <div className="font-black text-xl transform -rotate-2">
            AIRU<span className="text-primary">.</span>
          </div>
          <div className="mono-label text-xs text-slate-400">
            Built with Next.js & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}
