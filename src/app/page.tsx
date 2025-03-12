"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import ParticlesBackground from "@/components/ParticlesBackground";
import HonorsButton from "@/components/HonorsButton";
import MobileNav from "@/components/MobileNav";
import SpinningCard from "@/components/SpinningCard";

// Define sections
const sections = [
  { id: "start", label: "Start" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// Project data
const projects = [
  {
    id: 1,
    title: "Project One",
    subtitle: "Web Application",
    number: "00",
    gradientClass: "card-gradient-1",
  },
  {
    id: 2,
    title: "Project Two",
    subtitle: "Mobile Application",
    number: "01",
    gradientClass: "card-gradient-2",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("start");
  const { scrollYProgress } = useScroll();

  // Register section refs
  const sectionRefs = useRef({});

  const registerSection = (id, ref) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  // Scroll to section
  const scrollToSection = (id) => {
    setActiveSection(id);
    if (sectionRefs.current[id]) {
      sectionRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  // Typewriter animation for the name
  const typewriter = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        delay: 0.8,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Background */}
      <ParticlesBackground />

      {/* Floating Button */}
      <HonorsButton />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 py-4 px-4 md:px-8 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-bold"
          >
            &lt;<span className="gradient-text">Portfolio</span>/&gt;
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`nav-link ${
                  activeSection === section.id ? "active" : ""
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
          <MobileNav
            sections={sections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />
        </div>
      </motion.nav>

      {/* Content */}
      <div className="mt-20">
        {/* Start Section */}
        <section
          id="start"
          ref={(ref) => registerSection("start", ref)}
          className="section-container min-h-screen flex flex-col justify-center items-center text-center"
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.h1
              className="heading-xl mb-6"
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeIn}
            >
              Hi, I'm{" "}
              <motion.span
                className="gradient-text text-glow overflow-hidden relative inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.span
                  className="inline-block"
                  variants={typewriter}
                  initial="hidden"
                  animate="visible"
                >
                  Your Name
                </motion.span>
                <motion.span
                  className="absolute right-0 top-0 h-full w-[2px] bg-accent-light"
                  animate={{
                    opacity: [1, 0],
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.8,
                    },
                  }}
                />
              </motion.span>
            </motion.h1>

            <motion.h2
              className="heading-lg mb-6"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeIn}
            >
              Frontend Developer
            </motion.h2>

            <motion.p
              className="body-lg max-w-2xl mx-auto mb-10"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeIn}
            >
              I create beautiful, responsive websites and web applications that
              deliver exceptional user experiences.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeIn}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-primary"
                onClick={() => scrollToSection("work")}
              >
                View My Work
                <motion.span
                  className="ml-2 inline-block"
                  animate={{
                    x: [0, 5, 0],
                    transition: { repeat: Infinity, duration: 1.5 },
                  }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Work Section */}
        <section
          id="work"
          ref={(ref) => registerSection("work", ref)}
          className="section-container border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="section-title mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              My Work
            </motion.h2>

            <motion.p
              className="body-lg max-w-2xl mx-auto mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Here are some of my recent projects. Each represents unique
              challenges and solutions.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card-item"
                >
                  <SpinningCard
                    title={project.title}
                    subtitle={project.subtitle}
                    number={project.number}
                    gradientClass={project.gradientClass}
                    onClick={() => console.log(`Clicked: ${project.title}`)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          ref={(ref) => registerSection("about", ref)}
          className="section-container border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="section-title mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About Me
            </motion.h2>

            <div className="body-lg max-w-2xl mx-auto">
              <motion.p
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                I'm a passionate developer with a focus on creating exceptional
                digital experiences. With expertise in React, Next.js, and
                modern frontend technologies, I build solutions that are both
                beautiful and functional.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                When I'm not coding, you can find me exploring new technologies,
                contributing to open source, or enjoying the outdoors.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={(ref) => registerSection("contact", ref)}
          className="section-container border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="section-title mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.h2>

            <motion.p
              className="body-lg max-w-2xl mx-auto mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Interested in working together? Feel free to reach out through any
              of these channels.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Email",
                  icon: "✉️",
                  href: "mailto:your.email@example.com",
                },
                { name: "GitHub", icon: "👨‍💻", href: "#" },
                { name: "LinkedIn", icon: "💼", href: "#" },
                { name: "Twitter", icon: "🐦", href: "#" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="glass-card p-6 text-center hover:scale-105 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-medium">{item.name}</div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="mt-16 text-center text-sm opacity-60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              © {new Date().getFullYear()} • Built with Next.js and Tailwind CSS
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
