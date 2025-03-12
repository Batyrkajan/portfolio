"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface SpinningCardProps {
  title: string;
  subtitle: string;
  number: string;
  imageUrl?: string;
  gradientClass: string;
  onClick: () => void;
}

const SpinningCard = ({
  title,
  subtitle,
  number,
  imageUrl,
  gradientClass,
  onClick,
}: SpinningCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Motion values for 3D card tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse movement into rotation values
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Handle mouse move for 3D effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center
    const xPosition = event.clientX - rect.left - width / 2;
    const yPosition = event.clientY - rect.top - height / 2;

    // Update motion values for rotation
    x.set(xPosition);
    y.set(yPosition);
  };

  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`relative ${gradientClass} rounded-xl overflow-hidden cursor-pointer glow`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        transition: "transform 0.1s ease-out",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/5 to-white/20 opacity-0 z-10 pointer-events-none"
        style={{
          opacity: useTransform(y, [-100, 0, 100], [0.5, 0, 0.5]),
          rotateY: useTransform(x, [-100, 100], [5, -5]),
        }}
      />

      {/* Card number */}
      <div className="absolute top-4 right-4 text-6xl font-bold opacity-30 font-mono">
        {number}
      </div>

      {/* Card content */}
      <div className="relative z-10 p-8 min-h-[260px] flex flex-col justify-end backdrop-blur-sm">
        <div className="mb-1 text-sm opacity-70">{subtitle}</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2 heading-shadow">
          {title}
        </h3>

        {/* Icon and hover text */}
        <div className="flex items-center mt-4">
          <motion.span
            className="text-sm mr-2"
            initial={{ opacity: 0, x: -10 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            View project
          </motion.span>
          <motion.div
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7H13M13 7L7 1M13 7L7 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpinningCard;
