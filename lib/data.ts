// lib/data.ts
// Static data for Swagata's projects and skills

export const projects = [
  {
    slug: "flux-whiteboard",
    title: "SYNQ Workspace (Flux Whiteboard)",
    tagline: "Real-time collaborative whiteboard with 60 FPS multiplayer synchronization.",
    description: "A high-performance real-time collaborative workspace featuring a highly optimized drawing engine. Built to eliminate synchronization lag using a CRDT-based split-architecture that independently renders local strokes while syncing state seamlessly across clients.",
    problem: "Multiplayer whiteboards often suffer from latency and stuttering during rapid drawing or when multiple users interact simultaneously. Efficiently merging simultaneous edits while maintaining high frame rates is a complex systems problem.",
    approach: "Implemented Yjs for CRDT-based state resolution and WebRTC for peer-to-peer data channel synchronization. Throttled Firebase cursor updates and decoupled local rendering from remote state synchronization to ensure a flawless native-feeling performance on both web and mobile.",
    learnings: "Building a scalable collaborative system required deep knowledge of operational transformation and CRDTs. Optimizing Canvas rendering loops and handling mobile touch events synchronously dramatically changed my approach to frontend performance tuning.",
    techStack: ["React", "TypeScript", "Yjs", "WebRTC", "Firebase", "Zustand"],
    category: "WEB",
    githubUrl: "https://github.com/Cyberclutch146/flux-whiteboard",
    demoUrl: "https://flux-whiteboard.vercel.app",
    coverImage: "/images/projects/flux-whiteboard.jpg",
    images: [],
    featured: true,
    order: 0,
  },
  {
    slug: "microgrid-dashboard",
    title: "Microgrid Dashboard",
    tagline: "Real-time microgrid monitoring web dashboard designed for intelligent energy management.",
    description:
      "A comprehensive dashboard featuring live telemetry visualization, system health tracking, and actionable insights to optimize power distribution, efficiency, and reliability for local grids.",
    problem:
      "Traditional microgrid management interfaces are often archaic, difficult to read, and lack real-time telemetry resolution. Operators need instantaneous visual feedback on grid anomalies and load balancing.",
    approach:
      "Built using TypeScript and modern web frameworks to ensure type safety and high-performance rendering. The dashboard ingests real-time power data streams, rendering them immediately via responsive charting libraries and a highly optimized UI layer.",
    learnings:
      "Managing high-frequency data streams on the front-end requires strict memoization and optimized re-rendering strategies. Ensuring that UI panels remain deeply responsive while displaying hundreds of data points per second was the critical unlock.",
    techStack: ["TypeScript", "Next.js", "React", "Telemetry", "Data Visualization"],
    category: "WEB",
    githubUrl: "https://github.com/Cyberclutch146/Microgrid-Dashboard",
    demoUrl: "https://energy-dashboard-five-blond.vercel.app",
    coverImage: "/images/projects/microgrid.jpg",
    images: [],
    featured: true,
    order: 1,
  },
  {
    slug: "smart-medicine-companion",
    title: "HealthCare App (AI Vision)",
    tagline: "Smart Medicine Companion using AI to turn prescription photos into automated schedules.",
    description:
      "A full-stack healthcare application utilizing AI image processing to automatically parse physical prescriptions, instantly generating an automated, timely medicine schedule and dashboard for end-users.",
    problem:
      "Manually entering complex medication schedules is error-prone and tedious for patients, especially the elderly. There was a direct need to bridge the physical paper prescription with a digital reminding system frictionlessly.",
    approach:
      "Integrated AI vision models to extract OCR data, parsing dosage and timing heuristics to automatically construct a robust, alert-driven medication dashboard.",
    learnings:
      "Tuning the parsing heuristics for varied handwriting and unstructured text was challenging but incredibly rewarding. It reinforced the importance of edge-case handling in healthcare applications where accuracy is critical.",
    techStack: ["TypeScript", "Next.js", "AI Integration", "OCR", "Node.js"],
    category: "SOFTWARE",
    githubUrl: "https://github.com/Cyberclutch146/HealthCare-App",
    demoUrl: "https://showcasex-healthapp.vercel.app/",
    coverImage: "/images/projects/healthcare.jpg",
    images: [],
    featured: true,
    order: 2,
  },
  {
    slug: "cashflow-cli",
    title: "Cashflow CLI",
    tagline: "Ultra-fast command line interface tool built in raw C.",
    description:
      "A minimalistic, highly-performant CLI utility built from the ground up in C for parsing and tracing cashflows directly in the terminal.",
    problem:
      "Heavy GUI financial trackers are unnecessary for power users who live in the terminal. I wanted a lightning-fast, zero-dependency tool that executed instantly.",
    approach:
      "Written strictly in C to ensure minimal memory footprint and raw hardware execution speed. Iterative pointer management and lean architectural design keeps the binary size microscopic.",
    learnings:
      "Returning to C forces a rigorous discipline regarding memory allocation and data structure design. It's a fantastic exercise in maintaining deep control over program state without standard library safety nets.",
    techStack: ["C", "CLI", "Shell", "Memory Management"],
    category: "SOFTWARE",
    githubUrl: "https://github.com/Cyberclutch146/Cashflow-cli",
    demoUrl: null,
    coverImage: "/images/projects/cashflow.jpg",
    images: [],
    featured: true,
    order: 3,
  },
  {
    slug: "racing-bot",
    title: "Autonomous Racing Robot",
    tagline: "A self-navigating bot tuned for speed and obstacle avoidance.",
    description:
      "Built a two-wheel differential drive robot capable of autonomous navigation on a marked track. The system uses IR sensors for line detection, ultrasonic ranging for collision avoidance, and a custom PID loop for smooth cornering.",
    problem:
      "Campus robotics competitions demanded a robot that could complete a lap in minimum time while reliably avoiding dynamic obstacles — without any external control.",
    approach:
      "Iteratively tuned PID constants (Kp, Ki, Kd) through trial on real track segments. The sensor fusion logic runs a robust state machine.",
    learnings:
      "Real hardware is unforgiving. Sensor noise, voltage sag under load, and mechanical play are all things you can't simulate.",
    techStack: ["Arduino Uno", "C++", "PID Control", "Sensors"],
    category: "ROBOTICS",
    githubUrl: "https://github.com/swagata-ganguly/racing-bot",
    demoUrl: null,
    coverImage: "/images/projects/racing-bot.jpg",
    images: [],
    featured: false,
    order: 4,
  }
];

export const skills = [
  // Languages
  { name: "C++", level: 90, category: "LANGUAGES", icon: "SiCplusplus", order: 1 },
  { name: "Java", level: 85, category: "LANGUAGES", icon: "FaJava", order: 2 },
  { name: "JavaScript", level: 90, category: "LANGUAGES", icon: "SiJavascript", order: 3 },
  { name: "TypeScript", level: 88, category: "LANGUAGES", icon: "SiTypescript", order: 4 },
  { name: "Python", level: 85, category: "LANGUAGES", icon: "SiPython", order: 5 },
  { name: "Solidity", level: 70, category: "LANGUAGES", icon: "SiSolidity", order: 6 },
  { name: "HTML / CSS", level: 95, category: "LANGUAGES", icon: "SiHtml5", order: 7 },

  // Web & Software
  { name: "React", level: 90, category: "TOOLS", icon: "SiReact", order: 1 },
  { name: "Next.js", level: 88, category: "TOOLS", icon: "SiNextdotjs", order: 2 },
  { name: "Node.js", level: 85, category: "TOOLS", icon: "SiNodedotjs", order: 3 },
  { name: "Express.js", level: 82, category: "TOOLS", icon: "SiExpress", order: 4 },
  { name: "Vite", level: 85, category: "TOOLS", icon: "SiVite", order: 5 },
  { name: "Socket.io", level: 75, category: "TOOLS", icon: "SiSocketdotio", order: 6 },
  { name: "Web3.js", level: 70, category: "TOOLS", icon: "SiWeb3Dotjs", order: 7 },
  { name: "Pandas", level: 80, category: "TOOLS", icon: "SiPandas", order: 8 },
  { name: "PyTorch", level: 75, category: "TOOLS", icon: "SiPytorch", order: 9 },
  { name: "WebRTC", level: 80, category: "TOOLS", icon: "SiWebrtc", order: 10 },
  { name: "Tailwind CSS", level: 90, category: "TOOLS", icon: "SiTailwindcss", order: 11 },
  { name: "Yjs", level: 85, category: "TOOLS", icon: "FaCode", order: 12 },

  // Infrastructure & Databases
  { name: "Firebase", level: 85, category: "TOOLS", icon: "SiFirebase", order: 10 },
  { name: "Supabase", level: 80, category: "TOOLS", icon: "SiSupabase", order: 11 },
  { name: "MongoDB", level: 88, category: "TOOLS", icon: "SiMongodb", order: 12 },
  { name: "PostgreSQL", level: 85, category: "TOOLS", icon: "SiPostgresql", order: 13 },
  { name: "MySQL", level: 85, category: "TOOLS", icon: "SiMysql", order: 14 },
  { name: "Vercel", level: 90, category: "TOOLS", icon: "SiVercel", order: 15 },
  { name: "Google Cloud", level: 75, category: "TOOLS", icon: "SiGooglecloud", order: 16 },

  // Hardware
  { name: "Arduino", level: 90, category: "HARDWARE", icon: "SiArduino", order: 1 },
  { name: "ESP-IDF", level: 80, category: "HARDWARE", icon: "SiEspressif", order: 2 },
  { name: "MATLAB", level: 75, category: "HARDWARE", icon: "SiMathworks", order: 3 },
  { name: "KiCad", level: 85, category: "HARDWARE", icon: "SiKicad", order: 4 },

  // Design & Utilities
  { name: "Git", level: 90, category: "TOOLS", icon: "SiGit", order: 17 },
  { name: "GitHub", level: 90, category: "TOOLS", icon: "SiGithub", order: 18 },
  { name: "Notion", level: 85, category: "TOOLS", icon: "SiNotion", order: 19 },
  { name: "Figma", level: 80, category: "DESIGN", icon: "SiFigma", order: 1 },
  { name: "Framer", level: 75, category: "DESIGN", icon: "SiFramer", order: 2 },
];
