import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Twitter, Mail, ExternalLink, ArrowDown, Code2, Cpu, Globe, Terminal, ArrowUpRight, Linkedin, Aperture, Database, Cloud, BrainCircuit, TestTube, Layers, Server } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";
import WebGLBackground from "./components/WebGLBackground";
import CustomCursor from "./components/CustomCursor";
import TechStack from "./components/sections/TechStack";
import Lenis from "lenis";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);
  const [isMobileExperience, setIsMobileExperience] = useState(false);
  const titles = ["Full Stack Developer", "ML Engineer"];

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)"
    );

    const updateExperienceMode = () => {
      setIsMobileExperience(mediaQuery.matches);
    };

    updateExperienceMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateExperienceMode);

      return () => {
        mediaQuery.removeEventListener("change", updateExperienceMode);
      };
    }

    mediaQuery.addListener(updateExperienceMode);

    return () => {
      mediaQuery.removeListener(updateExperienceMode);
    };
  }, []);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => {
      clearInterval(titleInterval);
    };
  }, [titles.length]);

  useEffect(() => {
    if (isMobileExperience) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isMobileExperience]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <WebGLBackground mobileOptimized={isMobileExperience} />
      <div 
        className="min-h-screen selection:bg-accent selection:text-white grid-bg relative overflow-x-hidden"
        style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease-out" }}
      >
        <CustomCursor />
        <div className="noise-bg" />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 z-50 flex w-full items-center gap-6 px-4 py-6 sm:gap-8 sm:px-6 md:px-10 mix-blend-difference">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="shrink-0 pr-4 text-lg font-display font-bold tracking-tighter sm:pr-8 sm:text-xl md:pr-12"
          >
            AKSHAT<span className="text-accent">.</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-auto flex gap-4 text-xs font-mono uppercase tracking-[0.28em] sm:gap-7 sm:text-sm sm:tracking-widest"
          >
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#projects" className="hover:text-accent transition-colors">Work</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center px-3 sm:px-6 md:px-20 relative overflow-hidden">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.1,
                }
              }
            }}
            className="z-10 flex flex-col items-center text-center w-full"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-accent font-accent-mono text-sm mb-8 tracking-[0.3em] uppercase h-6 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="block"
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h2>
            <h1 className="mb-8 flex w-full max-w-[94vw] flex-col items-center text-center font-display text-[clamp(2.45rem,11.5vw,4.8rem)] font-bold leading-[0.82] md:max-w-none md:text-[10rem] md:leading-[0.75]">
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }} 
                className="hero-word inline-block text-white"
              >
                PRECISION
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
                }} 
                className="relative z-10 my-[-0.12em] font-artistic-serif text-[clamp(1.85rem,8vw,3.8rem)] italic lowercase text-[#E07A3E] md:my-[-0.25em] md:text-[8rem]"
              >
                and
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }} 
                className="hero-word hero-word-secondary inline-block uppercase text-dotted text-[0.84em] md:text-[0.9em]"
              >
                DEDICATION
              </motion.span>
            </h1>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-mono">Scroll</span>
            <ArrowDown size={16} />
          </motion.div>
        </section>

        <TechStack mobileOptimized={isMobileExperience} />

        {/* Quote Section */}
        <section className="py-40 relative flex justify-center items-center px-6 overflow-hidden">
          <div className="max-w-6xl w-full relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0">
            {/* Silver Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-80 h-56 md:w-[500px] md:h-[320px] rounded-[2rem] bg-gradient-to-br from-[#e2e2e2] via-[#c9c9c9] to-[#8b8b8b] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center relative z-10 overflow-hidden border border-white/40"
            >
              {/* User Uploaded Image (Covers the CSS fallback if it exists) */}
              <img 
                src="/Card.png" 
                alt="Silver Card" 
                className="absolute inset-0 w-full h-full object-cover z-20"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Subtle metallic reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-60 pointer-events-none" />
              
              <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center z-10">
                {/* Custom Classical Profile SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full text-[#0f1115] opacity-95" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <mask id="profile-mask">
                      <rect width="200" height="200" fill="white" />
                      {/* Hair details (cutouts) - drawn in black to cut out */}
                      <path d="M 95 40 Q 115 45 125 65" fill="none" stroke="black" strokeWidth="5" strokeLinecap="round" />
                      <path d="M 100 60 Q 125 65 130 85" fill="none" stroke="black" strokeWidth="5" strokeLinecap="round" />
                      <path d="M 115 100 Q 130 105 125 115" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
                      {/* Eye */}
                      <path d="M 82 82 Q 92 78 98 82 Q 92 86 82 82 Z" fill="black" />
                    </mask>
                  </defs>

                  {/* Right Crescent */}
                  <path d="M 100 15 A 85 85 0 0 1 100 185" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  {/* Left Crescent */}
                  <path d="M 60 80 A 65 65 0 0 0 70 155" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  
                  {/* Face & Hair Silhouette */}
                  <path d="M 90 30 C 130 30 150 60 140 90 C 150 100 140 120 120 120 C 120 140 100 160 100 180 L 60 180 C 50 160 80 150 80 140 C 70 140 65 135 65 130 C 65 125 75 120 75 115 C 70 105 70 95 75 85 C 80 85 85 70 90 30 Z" fill="currentColor" mask="url(#profile-mask)" />
                </svg>
              </div>

              {/* Bottom Right Sparkle */}
              <div className="absolute bottom-4 right-4 text-white/60">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
                </svg>
              </div>
            </motion.div>

            {/* Quote Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-20 md:-ml-32 mt-10 md:mt-40 text-center md:text-right flex flex-col items-center md:items-end"
            >
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-artistic-serif italic font-light mb-8 leading-tight tracking-wide text-white drop-shadow-xl">
                "TALK IS CHEAP,<br />
                SHOW ME THE <span className="text-[#E07A3E] font-normal">CODE</span>"
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <span className="font-accent-mono text-white/60 uppercase tracking-widest text-sm">~ LINUS TORVALDS</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 md:px-20 border-t border-white/5">
          <div className="flex justify-between items-end mb-20">
            <div>
              <span className="text-accent font-accent-mono text-xs mb-4 block tracking-widest uppercase">02 // Selected Work</span>
              <h2 className="text-4xl md:text-7xl font-display font-bold">MY PROJECTS</h2>
            </div>
            <div className="hidden md:block text-text/40 font-mono text-sm">
              (EXPLORE ALL)
            </div>
          </div>

          <div className="grid gap-1">
            <ProjectRow 
              title="Vaultflow" 
              category="SaaS" 
              year="2024" 
              href="https://github.com/AKSHEXXXX/Vaultflow" 
            />
            <ProjectRow 
              title="Pitting Onset" 
              category="Deep Learning" 
              year="2024" 
              href="https://github.com/AKSHEXXXX/pitting-onset-prediction" 
            />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6 md:px-20 text-text relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-32 overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-accent-mono text-xs mb-8 block tracking-[0.5em] uppercase opacity-40"
              >
                03 // Initiate Contact
              </motion.span>
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-4xl md:text-[7rem] font-display font-extrabold tracking-normal uppercase leading-[0.85]"
                >
                  LET'S WORK<br />TOGETHER
                </motion.h2>
              </div>
            </div>
            
            <div className="flex flex-col relative">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 origin-left z-20"
              />
              <MarqueeRow 
                label="SEND A MESSAGE" 
                meta="AKSHAT.SAXENA.DEV@GMAIL.COM" 
                href="mailto:akshat.saxena.dev@gmail.com"
                icon={<Mail size={48} />}
              />
              <MarqueeRow 
                label="GITHUB" 
                meta="OPEN SOURCE" 
                href="https://github.com/AKSHEXXXX"
                icon={<Github size={48} />}
              />
              <MarqueeRow 
                label="X / TWITTER" 
                meta="THOUGHTS & UPDATES" 
                href="https://x.com/Akshats___"
                icon={<Twitter size={48} />}
              />
              <MarqueeRow 
                label="LINKEDIN" 
                meta="PROFESSIONAL NETWORK" 
                href="https://www.linkedin.com/in/akshat-saxena-457b4b229/"
                icon={<Linkedin size={48} />}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-text/40">
          <div>Local Time: {new Date().toLocaleTimeString()}</div>
          <div>Location: Planet Earth</div>
          <div>© 2026 Akshat. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}

function ProjectRow({ title, category, year, href }: { title: string, category: string, year: string, href: string }) {
  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      className="group flex items-center justify-between py-8 border-b border-white/5 cursor-pointer transition-colors px-4 block"
    >
      <div className="flex items-center gap-8">
        <span className="font-accent-mono text-sm text-white/60 transition-colors group-hover:text-accent">{year}</span>
        <h3 className="text-2xl md:text-4xl font-display font-bold group-hover:translate-x-2 transition-transform">{title}</h3>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-accent-mono uppercase tracking-widest text-text/40 group-hover:text-text transition-colors">{category}</span>
        <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
      </div>
    </motion.a>
  );
}

function MarqueeRow({ label, meta, href, icon }: { label: string, meta: string, href: string, icon: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-24 md:h-40 border-b border-white/10 overflow-hidden cursor-pointer block transition-colors duration-500"
    >
      {/* Default State */}
      <motion.div 
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -20 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-between px-6 md:px-12 pointer-events-none"
      >
        <h3 className="text-2xl md:text-6xl font-display font-extrabold tracking-tighter uppercase">
          {label}
        </h3>
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-[10px] md:text-sm font-mono uppercase tracking-[0.2em] opacity-40">
            {meta}
          </span>
          <ArrowUpRight size={24} className="opacity-40" />
        </div>
      </motion.div>

      {/* Hover Marquee State */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 20,
          backgroundColor: isHovered ? "#FF6321" : "transparent"
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center overflow-hidden"
      >
        <motion.div 
          className="flex whitespace-nowrap"
          animate={isHovered ? { x: "-50%" } : { x: "0%" }}
          transition={{ 
            x: isHovered ? {
              repeat: Infinity,
              repeatType: "loop",
              duration: 15,
              ease: "linear",
            } : {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-12">
              <span className="text-3xl md:text-7xl font-display font-extrabold tracking-tighter leading-none text-white uppercase">
                {label}
              </span>
              <div className="text-white opacity-80">
                {icon}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

function SocialLink({ href, label }: { href: string, label: string }) {
  return (
    <a href={href} className="group flex items-center gap-2 font-accent-mono text-sm uppercase tracking-widest hover:translate-x-1 transition-transform">
      {label} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
