"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface MobileNavProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

const MobileNav = ({
  sections,
  activeSection,
  onSectionClick,
}: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (id: string) => {
    onSectionClick(id);
    setIsOpen(false);
  };

  // Variants for menu animations
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  // Hamburger button animations
  const topLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 7 },
  };

  const centerLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -7 },
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <motion.button
        className="relative z-50 w-12 h-12 flex flex-col justify-center items-center bg-black/50 backdrop-blur-md rounded-full"
        onClick={toggleMenu}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="block w-6 h-0.5 bg-white mb-1.5"
          variants={topLineVariants}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-6 h-0.5 bg-white mb-1.5"
          variants={centerLineVariants}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-6 h-0.5 bg-white"
          variants={bottomLineVariants}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="flex flex-col items-center space-y-6"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`text-3xl py-2 px-4 relative ${
                    activeSection === section.id
                      ? "text-accent font-bold"
                      : "text-white/80 hover:text-white"
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-accent rounded-full"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.nav>

            {/* Close instructions */}
            <motion.div
              className="absolute bottom-10 text-sm opacity-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              Tap anywhere to close
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
