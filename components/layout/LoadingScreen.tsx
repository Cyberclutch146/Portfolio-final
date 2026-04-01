"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import DecryptedText from "@/components/animations/DecryptedText";
import FadeContent from "@/components/animations/FadeContent";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  // phase 1: Decrypting & Counting
  // phase 2: "welcome to my world" FadeContent
  // phase 3: Load complete, unmount overlay
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    // Safety escape hatch in case anything fails during animation after 10 seconds
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isFirstLoad) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {phase !== 3 && (
          <motion.div
            className="fixed inset-0 z-[99999] bg-ink-950 flex flex-col items-center justify-center font-mono selection:bg-transparent"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-4">
               {phase === 1 && (
                 <motion.div 
                   key="phase1"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                   transition={{ duration: 0.5 }}
                   className="flex justify-center items-center gap-2 md:gap-4 text-signal text-lg md:text-2xl lg:text-4xl font-bold tracking-widest md:tracking-[0.15em]"
                 >
                   <DecryptedText 
                     text="Accessing the mainframe : " 
                     speed={35} 
                     maxIterations={15} 
                     animateOn="view"
                     revealDirection="start"
                     sequential={true}
                     className="text-signal"
                     encryptedClassName="text-ink-600"
                   />
                   <CountUp
                     from={0}
                     to={100}
                     direction="up"
                     duration={2}
                     startWhen={true}
                     onEnd={() => {
                        // Switch to the welcome text slightly after count finishes
                        setTimeout(() => setPhase(2), 400);
                     }}
                   />
                 </motion.div>
               )}

               {phase === 2 && (
                 <FadeContent
                   blur={true}
                   duration={800}
                   ease="power2.out"
                   initialOpacity={0}
                   disappearAfter={1200}
                   disappearDuration={800}
                   onDisappearanceComplete={() => {
                        // Unmount the whole screen
                        setPhase(3);
                        setIsFirstLoad(false);
                   }}
                   className="text-4xl md:text-6xl lg:text-8xl font-display text-ink-50 font-black tracking-tighter text-center"
                 >
                   welcome to my world
                 </FadeContent>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 
         Render the website underneath. Use 'h-screen overflow-hidden' to 
         prevent the user from scrolling the site before the overlay disappears.
      */}
      <div 
        aria-hidden={phase !== 3}
        className={phase !== 3 ? "h-screen overflow-hidden pointer-events-none" : ""}
      >
        {children}
      </div>
    </>
  );
}
