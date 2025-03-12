"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HonorsButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHonorsPanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={toggleHonorsPanel}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white text-black py-3 px-5 font-bold rotate-90 origin-right z-40 hover:bg-accent hover:text-white transition-colors duration-300 shadow-md"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle honors section"
      >
        Honors
      </motion.button>

      {/* Honors Panel that slides in */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={toggleHonorsPanel}
            />

            {/* Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Panel Header */}
              <div className="sticky top-0 bg-gray-900 p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  Awards & Honors
                </h2>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={toggleHonorsPanel}
                  aria-label="Close honors panel"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Panel Content */}
              <div className="p-6 space-y-8">
                {/* Award Item */}
                {[
                  {
                    year: "2023",
                    title: "Best Developer Award",
                    org: "Tech Conference",
                    description:
                      "Recognized for exceptional contributions to open source software development.",
                  },
                  {
                    year: "2022",
                    title: "Innovation Excellence",
                    org: "Digital Summit",
                    description:
                      "Awarded for creating innovative web applications with cutting-edge technology.",
                  },
                  {
                    year: "2021",
                    title: "Rising Star",
                    org: "Developer Community",
                    description:
                      "Selected as one of the top emerging talents in the developer ecosystem.",
                  },
                ].map((award, index) => (
                  <motion.div
                    key={index}
                    className="glass-card p-4 border-l-2 border-accent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {award.title}
                        </h3>
                        <p className="text-sm text-white/70 mb-2">
                          {award.org}
                        </p>
                        <p className="text-sm text-white/60">
                          {award.description}
                        </p>
                      </div>
                      <span className="text-accent font-mono text-sm">
                        {award.year}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Certificate Item */}
                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">
                    Certifications
                  </h3>
                  {[
                    {
                      name: "Advanced Web Development",
                      org: "Frontend Masters",
                      year: "2023",
                    },
                    {
                      name: "Cloud Solutions Architecture",
                      org: "AWS Certification",
                      year: "2022",
                    },
                    {
                      name: "UI/UX Design Fundamentals",
                      org: "Design Academy",
                      year: "2021",
                    },
                  ].map((cert, index) => (
                    <motion.div
                      key={index}
                      className="py-3 border-b border-white/5 flex justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + 0.1 * index }}
                    >
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-white/60">{cert.org}</p>
                      </div>
                      <span className="text-accent-light text-sm">
                        {cert.year}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
