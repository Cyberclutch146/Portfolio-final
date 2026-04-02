"use client";
import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function KonamiCode() {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow lowercase or uppercase B/A
      const key = e.key.toLowerCase();
      const expected = KONAMI_CODE[index].toLowerCase();
      
      if (key === expected) {
        index++;
        if (index === KONAMI_CODE.length) {
          setSuccess(true);
          index = 0;
          // Deactivate after 8 seconds
          setTimeout(() => setSuccess(false), 8000);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!success) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden mix-blend-difference">
      {/* Heavy green tint */}
      <div className="absolute inset-0 bg-[#00ff41] opacity-30 animate-pulse" />
      {/* Glitch text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-[#00ff41] text-5xl md:text-8xl font-mono tracking-widest font-bold rotate-[-5deg] opacity-90 shadow-lg" style={{ textShadow: "0 0 40px #00ff41, 0 0 10px #fff" }}>
          OVERCLOCKED
        </h1>
      </div>
      {/* Screen color inversion hack */}
      <style>{`
        html, body {
          filter: invert(1) hue-rotate(180deg) !important;
          transition: filter 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
