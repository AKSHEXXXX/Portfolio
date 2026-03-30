import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lottie from "lottie-react";
import darkProfileData from "../../Dark Profile Card Float.json";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Counter logic
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 4700; // 4.7 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        // Progress reached 100
        setTimeout(() => {
          onCompleteRef.current();
        }, 400);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-center items-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Element 1: Name Label */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-muted uppercase tracking-[0.3em]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        AKSHAT.
      </motion.div>

      {/* Element 2: Lottie Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[450px] md:w-[600px] lg:w-[850px]">
          <Lottie animationData={darkProfileData} loop={true} />
        </div>
      </div>

      {/* Element 4: Perimeter Progress Bar */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-50">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="#E07A3E"
          strokeWidth="8"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
          className="transition-[stroke-dashoffset] duration-100 ease-linear"
        />
      </svg>
    </motion.div>
  );
}
