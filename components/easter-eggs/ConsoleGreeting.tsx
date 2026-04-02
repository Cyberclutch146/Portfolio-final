"use client";
import { useEffect } from "react";

export default function ConsoleGreeting() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(
        "%c SWAGATA GANGULY ",
        "font-weight: bold; font-size: 40px;color: #ccaa2c; text-shadow: 2px 2px 0 #000, 4px 4px 0 #2e2e34"
      );
      console.log(
        "%c\nLooking under the hood? I see you're a developer of culture.\nFeel free to explore the source code or get in touch if you're hiring!\n\nhttps://github.com/Cyberclutch146\n",
        "font-size: 14px; color: #a8a8b8; font-family: monospace;"
      );
    }
  }, []);
  return null;
}
