import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code2, 
  Cloud, 
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
  GitBranch
} from "lucide-react";

const JavaIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 17.5H15.5C17.2 17.5 18.5 16.8 18.5 15.8C18.5 14.8 17.2 14.2 15.5 14.2H9C7.3 14.2 6 14.9 6 15.8C6 16.7 7.3 17.5 9 17.5Z" fill="#F89820"/>
    <path d="M8.5 19.5C10 20.1 12 20.3 13.8 20.1C15.9 19.9 17.5 19.3 18.5 18.5" stroke="#F89820" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12.5 4.5C14 5.8 10.8 6.7 12.2 8.2C13 9 14.7 8.5 14.7 10.1C14.7 11 14 11.7 13.1 12.2" stroke="#5382A1" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10.3 6.1C11.1 6.8 9.5 7.4 10.2 8.2" stroke="#5382A1" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PythonIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3.5H9C6.5 3.5 5 5 5 7.5V10.2C5 11.4 5.9 12.3 7.1 12.3H12.2C13.4 12.3 14.3 11.4 14.3 10.2V5.7C14.3 4.5 13.4 3.5 12 3.5Z" fill="#3776AB"/>
    <circle cx="9.2" cy="7.6" r="0.9" fill="white"/>
    <path d="M12 20.5H15C17.5 20.5 19 19 19 16.5V13.8C19 12.6 18.1 11.7 16.9 11.7H11.8C10.6 11.7 9.7 12.6 9.7 13.8V18.3C9.7 19.5 10.6 20.5 12 20.5Z" fill="#FFD43B"/>
    <circle cx="14.8" cy="16.4" r="0.9" fill="#1E1E1E"/>
  </svg>
);

const JavaScriptIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#F7DF1E"/>
    <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="700" fill="#111111" fontFamily="Arial, sans-serif">
      JS
    </text>
  </svg>
);

const TailwindIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 7.5C10.1 7.5 8.9 8.4 8.4 10.2C9.1 9.3 9.9 9 10.9 9.3C11.5 9.5 11.9 10 12.3 10.5C12.9 11.3 13.6 12.2 15.6 12.2C17.5 12.2 18.7 11.3 19.2 9.5C18.5 10.4 17.7 10.7 16.7 10.4C16.1 10.2 15.7 9.7 15.3 9.2C14.7 8.4 14 7.5 12 7.5Z" fill="#38BDF8"/>
    <path d="M8.4 12.2C6.5 12.2 5.3 13.1 4.8 14.9C5.5 14 6.3 13.7 7.3 14C7.9 14.2 8.3 14.7 8.7 15.2C9.3 16 10 16.9 12 16.9C13.9 16.9 15.1 16 15.6 14.2C14.9 15.1 14.1 15.4 13.1 15.1C12.5 14.9 12.1 14.4 11.7 13.9C11.1 13.1 10.4 12.2 8.4 12.2Z" fill="#38BDF8"/>
  </svg>
);

const SpringIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6C14.2 6 9.6 8.5 7 12.5C8.8 12.1 10.8 12.3 12.4 13.3C14.8 14.8 16.1 17.3 16 20C19.7 17.6 22 12.2 22 7.6V6H19Z" fill="#6DB33F"/>
    <path d="M8 16.4C10.2 15.3 12.7 15.5 14.5 16.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9.4" cy="10.2" r="1" fill="white"/>
  </svg>
);

const ReactIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="8" ry="3.3" stroke="#61DAFB" strokeWidth="1.6"/>
    <ellipse cx="12" cy="12" rx="8" ry="3.3" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="8" ry="3.3" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)"/>
    <circle cx="12" cy="12" r="1.7" fill="#61DAFB"/>
  </svg>
);

const NestIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="#E0234E"/>
    <path d="M8.4 16.8V7.2L15.6 16.8V7.2" stroke="white" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
);

const FlaskIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3H14" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M11 3V8L6.3 16.2C5.5 17.7 6.6 19.5 8.4 19.5H15.6C17.4 19.5 18.5 17.7 17.7 16.2L13 8V3" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M8.4 15C10 14.4 11.6 14.3 13.2 14.8C14.5 15.2 15.6 15.3 16.8 15" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const MongoIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C14.8 6.1 16.2 8.8 16.2 12.1C16.2 16.4 13.9 19.5 12 21C10.1 19.5 7.8 16.4 7.8 12.1C7.8 8.8 9.2 6.1 12 3Z" fill="#47A248"/>
    <path d="M12 5.2V18.8" stroke="#D7F5DD" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const PostgreIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3.2C8.1 3.2 5.4 6.2 5.4 10.4V15.7C5.4 17.4 6.8 18.8 8.5 18.8C9.5 18.8 10.6 18.2 11.2 17.4L11.5 20.3H13L13.4 16.8H15.6C18.7 16.8 20.7 14.7 20.7 11.7V10.4C20.7 6.2 17.9 3.2 14 3.2H12Z" fill="#336791"/>
    <circle cx="9.2" cy="9.8" r="1" fill="white"/>
    <circle cx="15.1" cy="9.8" r="1" fill="white"/>
    <path d="M10 13.5C11.4 12.9 12.9 12.9 14.3 13.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const KubernetesIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="7.5" fill="#326CE5"/>
    <circle cx="12" cy="12" r="2.4" fill="white"/>
    <path d="M12 5.2V8.1M12 15.9V18.8M18.8 12H15.9M8.1 12H5.2M16.9 7.1L14.9 9.1M9.1 14.9L7.1 16.9M16.9 16.9L14.9 14.9M9.1 9.1L7.1 7.1" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const LangChainIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4.2" y="8.2" width="7.8" height="7.8" rx="2.2" stroke="#3DDC97" strokeWidth="1.7"/>
    <rect x="12" y="8.2" width="7.8" height="7.8" rx="2.2" stroke="#3DDC97" strokeWidth="1.7"/>
    <path d="M10.2 12H13.8" stroke="#3DDC97" strokeWidth="1.7" strokeLinecap="round"/>
  </svg>
);

const LangSmithIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3.5L14.2 8.2L19.2 9L15.6 12.4L16.5 17.4L12 15L7.5 17.4L8.4 12.4L4.8 9L9.8 8.2L12 3.5Z" fill="#F59E0B"/>
  </svg>
);

const LangGraphIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="17" r="2.2" fill="#60A5FA"/>
    <circle cx="12" cy="7" r="2.2" fill="#60A5FA"/>
    <circle cx="18" cy="17" r="2.2" fill="#60A5FA"/>
    <path d="M7.6 15.5L10.4 8.8M13.6 8.8L16.4 15.5M8.1 17H15.9" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const RagIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M5 9L12 5L19 9L12 13L5 9Z" fill="#F97316"/>
    <path d="M5 13L12 9L19 13L12 17L5 13Z" fill="#FB923C"/>
    <path d="M5 17L12 13L19 17L12 21L5 17Z" fill="#FDBA74"/>
  </svg>
);

const PineconeIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L16.5 9H13.8L18 13.5H14.8L18.2 17.5H5.8L9.2 13.5H6L10.2 9H7.5L12 4Z" fill="#22C55E"/>
    <path d="M12 17.5V20" stroke="#D1FAE5" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const N8NIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="12" r="3" fill="#EF4444"/>
    <circle cx="17" cy="7" r="3" fill="#F97316"/>
    <circle cx="17" cy="17" r="3" fill="#FB7185"/>
    <path d="M9.6 10.7L14.4 8.3M9.6 13.3L14.4 15.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PyTorchIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 4.2C9 6.8 8 9.4 8 12.2C8 15.5 10.4 18 13.6 18C16.2 18 18.3 16.2 18.9 13.8" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12.5 4.2V8.2H16.7" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
      { name: "Java", icon: <JavaIcon /> },
      { name: "Python", icon: <PythonIcon /> },
      { name: "JavaScript", icon: <JavaScriptIcon /> },
      { name: "Tailwind CSS", icon: <TailwindIcon /> },
    ],
  },
  {
    title: "frameworks",
    items: [
      { name: "Spring Boot", icon: <SpringIcon /> },
      { name: "React JS", icon: <ReactIcon /> },
      { name: "Nest JS", icon: <NestIcon /> },
      { name: "Flask", icon: <FlaskIcon /> },
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
    title: "databases",
    items: [
      { name: "SQL", icon: <Box size={22} /> },
      { name: "MongoDB", icon: <MongoIcon /> },
      { name: "Postgre", icon: <PostgreIcon /> },
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
      { name: "Kubernetes", icon: <KubernetesIcon /> },
      { name: "AWS (EC2/S3)", icon: <Cloud size={22} /> },
    ],
  },
  {
    title: "ai",
    items: [
      { name: "LangChain", icon: <LangChainIcon /> },
      { name: "LangSmith", icon: <LangSmithIcon /> },
      { name: "LangGraph", icon: <LangGraphIcon /> },
      { name: "RAG", icon: <RagIcon /> },
      { name: "Pinecone", icon: <PineconeIcon /> },
      { name: "n8n", icon: <N8NIcon /> },
      { name: "PyTorch", icon: <PyTorchIcon /> },
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
          <span className="text-white/80 font-accent-mono text-xs mb-4 block tracking-[0.3em] uppercase">
            01 // Technical Arsenal
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter">
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
