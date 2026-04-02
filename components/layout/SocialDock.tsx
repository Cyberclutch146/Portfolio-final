"use client";

import Dock from "@/components/ui/Dock";
import { FaLinkedin, FaGithub, FaInstagram, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState, useEffect } from "react";

export default function SocialDock() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalText, setTerminalText] = useState("");

  useEffect(() => {
    if (!showTerminal) return;
    const text = "SYSTEM BREACH DETECTED...\n\nBYPASSING MAINFRAME ENCRYPTION...\n\nACCESS GRANTED.\n\nFile 0x9482A: Hi, I'm Swagata. Thanks for finding this easter egg!\nYou're exactly the kind of curious person I want to work with.";
    let i = 0;
    setTerminalText("");
    const interval = setInterval(() => {
      setTerminalText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [showTerminal]);
  const items = [
    {
      icon: <FaLinkedin size={18} />,
      label: "LinkedIn",
      onClick: () => window.open("https://www.linkedin.com/in/swagata-ganguly-453aa6327/", "_blank"),
    },
    {
      icon: <MdEmail size={18} />,
      label: "Email",
      onClick: () => window.location.href = "mailto:sagotogdg@gmail.com",
    },
    {
      icon: <FaGithub size={18} />,
      label: "GitHub",
      onClick: () => window.open("https://github.com/Cyberclutch146", "_blank"),
    },
    {
      icon: <FaInstagram size={18} />,
      label: "Instagram",
      onClick: () => window.open("https://instagram.com/undiagnosed.psycopath", "_blank"),
    },
    {
      icon: <FaLock size={18} className="text-red-500/80 group-hover:text-red-500" />,
      label: "CLASSIFIED",
      onClick: () => setShowTerminal(true),
    },
  ];

  return (
    <>
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
      {showTerminal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm" onClick={() => setShowTerminal(false)}>
          <div className="w-full max-w-2xl bg-[#0a0a0b] border border-[#00ff41]/30 p-6 shadow-[0_0_30px_rgba(0,255,65,0.15)] font-mono text-[#00ff41]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-[#00ff41]/20 pb-2 mb-4">
              <span className="text-xs tracking-widest opacity-70">root@swagata-mainframe:~</span>
              <button onClick={() => setShowTerminal(false)} className="hover:text-white transition-colors">✕</button>
            </div>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{terminalText}<span className="animate-pulse">_</span></pre>
          </div>
        </div>
      )}
    </>
  );
}
