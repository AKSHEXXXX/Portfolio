import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code2, 
  Terminal, 
  Database, 
  Cloud, 
  BrainCircuit, 
  TestTube, 
  Layers, 
  Server,
  Cpu,
  Globe,
  Binary,
  Workflow,
  ShieldCheck,
  Zap,
  Box,
  Brackets,
  Github,
  GitBranch
} from "lucide-react";

// Custom Solid Icons to match the user's image
const GitIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M23.546 10.93L13.067.452a1.905 1.905 0 0 0-2.692 0L8.92 1.905l3.497 3.497a1.592 1.592 0 0 1 1.074 2.808 1.593 1.593 0 0 1-2.808-1.074 1.584 1.584 0 0 1 .106-.553L7.303 3.1l-6.85 6.85a1.905 1.905 0 0 0 0 2.692l10.478 10.478a1.905 1.905 0 0 0 2.692 0l10.477-10.478a1.905 1.905 0 0 0 0-2.692zM13.41 15.338a1.593 1.593 0 1 1-2.253-2.253 1.593 1.593 0 0 1 2.253 2.253z"/>
  </svg>
);

const GithubSolidIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinuxSolidIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12,2C12,2 11,2 10,3C9,4 9,5 9,6C9,7 9.5,8 10,9C8,10 7,12 7,14C7,16 8,18 10,19C10,20 10,21 11,22C12,23 13,23 14,22C15,21 15,20 15,19C17,18 18,16 18,14C18,12 17,10 15,9C15.5,8 16,7 16,6C16,5 16,4 15,3C14,2 13,2 12,2M12,4C12.5,4 13,4 13.5,4.5C14,5 14,5.5 14,6C14,6.5 13.5,7 13,7.5C12.5,8 12,8 11.5,7.5C11,7 10.5,6.5 10.5,6C10.5,5.5 10.5,5 11,4.5C11.5,4 12,4 12,4M12,11C13.5,11 15,12 15,14C15,16 13.5,17 12,17C10.5,17 9,16 9,14C9,12 10.5,11 12,11Z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "languages",
    items: [
      { name: "Java 21", icon: <Cpu size={22} /> },
      { name: "Python 3.x", icon: <Binary size={22} /> },
      { name: "SQL", icon: <Database size={22} /> },
      { name: "Bash", icon: <Terminal size={22} /> },
    ],
  },
  {
    title: "frameworks",
    items: [
      { name: "Spring Boot 3", icon: <Zap size={22} /> },
      { name: "Spring Security", icon: <ShieldCheck size={22} /> },
      { name: "PyTorch", icon: <BrainCircuit size={22} /> },
      { name: "Scikit-learn", icon: <Workflow size={22} /> },
      { name: "Pandas", icon: <Box size={22} /> },
    ],
  },
  {
    title: "backend & architecture",
    items: [
      { name: "Microservices", icon: <Layers size={22} /> },
      { name: "RESTful APIs", icon: <Globe size={22} /> },
      { name: "JWT/OAuth 2.0", icon: <ShieldCheck size={22} /> },
      { name: "NGINX", icon: <Server size={22} /> },
      { name: "Distributed Systems", icon: <Workflow size={22} /> },
    ],
  },
  {
    title: "databases & cache",
    items: [
      { name: "PostgreSQL", icon: <Database size={22} /> },
      { name: "Redis (Distributed Caching)", icon: <Zap size={22} /> },
      { name: "SQL Optimization", icon: <Code2 size={22} /> },
    ],
  },
  {
    title: "devops & cloud",
    items: [
      { name: "Git", icon: <GitIcon /> },
      { name: "GitHub", icon: <GithubSolidIcon /> },
      { name: "Linux", icon: <LinuxSolidIcon /> },
      { name: "WSL", icon: <LinuxSolidIcon /> },
      { name: "GitHub Actions (CI/CD)", icon: <Workflow size={22} /> },
      { name: "AWS (EC2/S3)", icon: <Cloud size={22} /> },
    ],
  },
  {
    title: "ai & machine learning",
    items: [
      { name: "PyTorch", icon: <BrainCircuit size={22} /> },
      { name: "LSTM", icon: <Workflow size={22} /> },
      { name: "Random Forest", icon: <Binary size={22} /> },
      { name: "Feature Engineering", icon: <Code2 size={22} /> },
    ],
  },
  {
    title: "testing & quality",
    items: [
      { name: "JUnit 5", icon: <TestTube size={22} /> },
      { name: "Mockito", icon: <TestTube size={22} /> },
      { name: "Integration Testing (>85% Coverage)", icon: <ShieldCheck size={22} /> },
    ],
  },
  {
    title: "core engineering",
    items: [
      { name: "System Design", icon: <Layers size={22} /> },
      { name: "Data Structures & Algorithms", icon: <Binary size={22} /> },
      { name: "Concurrency", icon: <Cpu size={22} /> },
      { name: "OOP", icon: <Code2 size={22} /> },
    ],
  },
];

interface TechStackProps {
  mobileOptimized?: boolean;
}

export default function TechStack({ mobileOptimized = false }: TechStackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileOptimized) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    const rows = sectionRef.current?.querySelectorAll(".tech-row");
    
    rows?.forEach((row) => {
      const title = row.querySelector(".category-title");
      const items = row.querySelectorAll(".tech-item");
      const bg = row.querySelector(".row-bg");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 55%",
          end: "bottom 45%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.to(bg, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(title, {
        x: 20,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, 0)
      .to(items, {
        color: "#FFFFFF",
        opacity: 1,
        scale: 1.05,
        stagger: 0.05,
        duration: 0.3,
        ease: "back.out(1.7)",
      }, 0.1);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [mobileOptimized]);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-20 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-white/40 font-accent-mono text-xs mb-4 block tracking-[0.3em] uppercase">
            01 // Technical Arsenal
          </span>
          <h2 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tighter">
            THE ARSENAL
          </h2>
          <p className="text-xl md:text-2xl text-text/60 leading-relaxed max-w-3xl font-light">
            A specialized collection of tools and technologies weaponized to engineer robust, scalable, and intelligent digital systems.
          </p>
        </div>

        <div className="flex flex-col">
          {TECH_CATEGORIES.map((category, idx) => (
            <div 
              key={idx} 
              className="tech-row group relative flex flex-col md:flex-row items-start md:items-center py-12 px-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm mb-6 transition-all duration-500 hover:bg-white/[0.03] hover:border-white/10 shadow-xl shadow-white/[0.02]"
            >
              {/* Spotlight Background */}
              <div className="row-bg absolute inset-0 bg-[#E07A3E]/[0.08] opacity-0 pointer-events-none transition-opacity duration-500" />
              
              {/* Category Title */}
              <div className="w-full md:w-1/3 mb-6 md:mb-0 z-10">
                <h3 className="category-title text-2xl md:text-3xl font-artistic-serif italic lowercase text-[#E07A3E] opacity-70 transition-all duration-500">
                  {category.title}
                </h3>
              </div>

              {/* Tech Items */}
              <div className="w-full md:w-2/3 flex flex-wrap gap-4 md:gap-6 z-10">
                {category.items.map((item, i) => (
                  <div 
                    key={i} 
                    className="tech-item flex items-center gap-3 px-2 py-1 transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-white">
                      {item.icon || <Brackets size={20} />}
                    </span>
                    <span className="text-base md:text-lg font-display font-bold uppercase tracking-wider text-white">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
