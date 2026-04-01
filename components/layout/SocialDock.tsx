"use client";

import Dock from "@/components/ui/Dock";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function SocialDock() {
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
  ];

  return (
    <Dock
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
    />
  );
}
