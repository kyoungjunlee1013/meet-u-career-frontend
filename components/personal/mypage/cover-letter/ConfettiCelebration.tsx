"use client";
import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiCelebrationProps {
  run: boolean;
  onComplete?: () => void;
}

export const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({ run, onComplete }) => {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (run && !hasRunRef.current) {
      hasRunRef.current = true;
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        zIndex: 9999,
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 100,
          origin: { x: 0, y: 0.8 },
          zIndex: 9999,
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 100,
          origin: { x: 1, y: 0.8 },
          zIndex: 9999,
        });
        if (onComplete) onComplete();
      }, 400);
    }
  }, [run, onComplete]);

  return null;
};
