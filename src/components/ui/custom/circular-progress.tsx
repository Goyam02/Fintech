"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  textClassName?: string;
  valueFormatter?: (value: number) => string;
  showValue?: boolean;
  gradientStart?: string;
  gradientEnd?: string;
  animationDuration?: number;
}

export function CircularProgress({
  value,
  size = 160,
  strokeWidth = 12,
  className,
  textClassName,
  valueFormatter = (value) => `${value}`,
  showValue = true,
  gradientStart = "#9333ea",
  gradientEnd = "#4f46e5",
  animationDuration = 1.5,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);

  // Calculate the circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animation for the progress
  useEffect(() => {
    // Ensure value is between 0 and 100
    const safeValue = Math.min(100, Math.max(0, value));

    // Start animation
    setProgress(safeValue);
  }, [value]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const gradientId = `circular-progress-gradient-${size}`;

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg width={size} height={size} className="rotate-[-90deg]" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          className="text-muted/20"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={`url(#${gradientId})`}
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: animationDuration, ease: "easeOut" }}
        />
      </svg>

      {/* Center text */}
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn("text-3xl font-bold", textClassName)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: animationDuration * 0.5, duration: 0.5 }}
          >
            {valueFormatter(progress)}
          </motion.span>
        </div>
      )}
    </div>
  );
}
