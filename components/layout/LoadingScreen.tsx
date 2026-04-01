"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import DecryptedText from "@/components/animations/DecryptedText";
import FadeContent from "@/components/animations/FadeContent";

type Phase = "CINEMATIC" | "READY" | "WELCOME" | "REVEAL";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [phase, setPhase] = useState<Phase>("CINEMATIC");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Emergency escape
      if (phase === "CINEMATIC") setPhase("READY");
    }, 15000);
    return () => clearTimeout(timer);
  }, [phase]);

  if (!isFirstLoad) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {phase !== "REVEAL" && (
          <motion.div
            className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center font-mono selection:bg-transparent overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Background Layer (Removed per User Request) */}
            <div className="absolute inset-0 z-0 bg-black" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-6 pointer-events-auto">
               
               {/* Consolidated Stage: Loading */}
               {(phase === "CINEMATIC" || phase === "READY") && (
                 <motion.div 
                   key="loading-group"
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                   transition={{ duration: 0.1 }}
                   className="flex flex-col items-center gap-12 w-full"
                 >
                   <div className="flex flex-col items-center gap-8 w-full">
                      <div className="flex items-center gap-3 text-signal text-xl md:text-3xl font-bold tracking-widest text-center">
                        <DecryptedText 
                          text="Accessing the mainframe : " 
                          speed={100} 
                          maxIterations={15} 
                          animateOn="view"
                          revealDirection="start"
                          sequential={true}
                          className="text-[#ccaa2c]"
                          encryptedClassName="text-ink-600"
                        />
                        <CountUp
                          from={0}
                          to={100}
                          duration={2.0}
                          onStart={() => setProgress(0)}
                          onEnd={() => {
                              setPhase("WELCOME");
                          }}
                          className="min-w-[4ch] text-left text-[#ccaa2c]"
                          onUpdate={(latest: number) => setProgress(latest)}
                        />
                      </div>
                   </div>
                 </motion.div>
               )}

               {/* Stage 3: Welcome Transition */}
               {phase === "WELCOME" && (
                 <FadeContent
                   blur={true}
                   duration={400}
                   ease="power3.out"
                   initialOpacity={0}
                   disappearAfter={400}
                   disappearDuration={400}
                   onDisappearanceComplete={() => {
                        setPhase("REVEAL");
                        setIsFirstLoad(false);
                   }}
                   className="text-3xl md:text-5xl font-display text-white font-bold tracking-tight text-center"
                 >
                   welcome to my world
                 </FadeContent>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Website reveal logic */}
      <div 
        aria-hidden={phase !== "REVEAL"}
        className={phase !== "REVEAL" ? "h-screen overflow-hidden pointer-events-none" : ""}
      >
        {children}
      </div>
    </>
  );
}
