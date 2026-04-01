"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollWheel() {
  const { scrollYProgress } = useScroll();
  // Rotate smoothly based on scroll depth
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="fixed bottom-8 right-8 z-[100] pointer-events-none mix-blend-difference opacity-40">
      <motion.div
        style={{ rotate }}
        className="w-12 h-12 flex items-center justify-center relative"
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 border border-white/30 rounded-full" />
        
        {/* Crosshair Lines */}
        <div className="absolute w-full h-[1px] bg-white/50" />
        <div className="absolute h-full w-[1px] bg-white/50" />
        
        {/* Center Dot */}
        <div className="w-1 h-1 bg-white rounded-full relative z-10" />

        {/* Tick Marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute w-[2px] h-[4px] bg-white/40"
            style={{
              transform: `rotate(${deg}deg) translateY(-22px)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
