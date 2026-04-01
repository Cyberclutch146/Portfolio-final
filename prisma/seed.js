// prisma/seed.js
// Run with: npm run db:seed
// Populates the database with Swagata's real projects and skills

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Clear existing data ──────────────────────────────────────────────────────
  await prisma.contactMessage.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();

  // ── Projects ─────────────────────────────────────────────────────────────────
  const projects = [
    {
      slug: "racing-bot",
      title: "Autonomous Racing Robot",
      tagline: "A self-navigating bot tuned for speed and obstacle avoidance.",
      description:
        "Built a two-wheel differential drive robot capable of autonomous navigation on a marked track. The system uses IR sensors for line detection, ultrasonic ranging for collision avoidance, and a custom PID loop for smooth cornering — all running on an Arduino Uno at the core.",
      problem:
        "Campus robotics competitions demanded a robot that could complete a lap in minimum time while reliably avoiding dynamic obstacles — without any external control or computer vision. The constraint was purely onboard processing under 16 MHz.",
      approach:
        "I designed the mechanical chassis from acrylic, optimised motor driver H-bridge current ratings to prevent brownouts, and iteratively tuned PID constants (Kp, Ki, Kd) through trial on real track segments. The sensor fusion logic runs a state machine: LINE_FOLLOWING → OBSTACLE_DETECTED → AVOIDANCE → RECOVER.",
      learnings:
        "Real hardware is unforgiving. Sensor noise, voltage sag under load, and mechanical play are all things you can't simulate. I learned that good firmware architecture matters more than clever algorithms — a clean state machine beats spaghetti conditionals every time.",
      techStack: ["Arduino Uno", "C++", "PID Control", "IR Sensors", "HC-SR04", "L298N", "Acrylic Chassis"],
      category: "ROBOTICS",
      githubUrl: "https://github.com/swagata-ganguly/racing-bot",
      coverImage: "/images/projects/racing-bot.jpg",
      images: [],
      featured: true,
      order: 1,
    },
    {
      slug: "smart-home-node",
      title: "Smart Home Sensor Node",
      tagline: "Low-power embedded node for real-time environment monitoring.",
      description:
        "Designed and built a battery-powered IoT sensor node that logs temperature, humidity, and LPG gas levels — publishing data over Wi-Fi to a lightweight local dashboard. Built around the ESP8266 with deep-sleep cycles to extend battery life.",
      problem:
        "Commercial smart sensors are expensive and locked into ecosystems. I wanted full-stack ownership: hardware, firmware, protocol, and dashboard — all custom, all understandable.",
      approach:
        "The node wakes every 5 minutes via deep-sleep timer, reads DHT22 and MQ-6 sensors, publishes JSON over MQTT to a Raspberry Pi broker, then goes back to sleep. A simple Node.js dashboard polls the broker and renders live graphs. Calibration curves for the MQ-6 were derived empirically against a reference sensor.",
      learnings:
        "Power budget math is not optional in embedded design. MQTT is beautifully simple for IoT — but message loss on a bad Wi-Fi connection taught me to always build retry logic and local fallback storage.",
      techStack: ["ESP8266", "C++", "Arduino IDE", "DHT22", "MQ-6", "MQTT", "Node.js"],
      category: "EMBEDDED",
      githubUrl: "https://github.com/swagata-ganguly/smart-home-node",
      coverImage: "/images/projects/smart-home.jpg",
      images: [],
      featured: true,
      order: 2,
    },
    {
      slug: "dsa-visualizer",
      title: "DSA Algorithm Visualizer",
      tagline: "Interactive visualizations for sorting and graph algorithms.",
      description:
        "A web application that animates classical data structure and algorithm operations — sorting (Bubble, Merge, Quick), graph traversal (BFS, DFS), and pathfinding (Dijkstra). Built to make algorithmic thinking visible for students.",
      problem:
        "When tutoring students in DSA, I noticed that reading pseudocode alone rarely builds intuition. A visual, step-by-step animation helps learners connect the abstract to the concrete instantly.",
      approach:
        "Built with vanilla JavaScript, HTML5 Canvas for rendering, and a custom animation scheduler that converts algorithm steps into a time-sequenced queue. Each algorithm exposes a generator function that yields intermediate states — the renderer consumes these at a configurable speed.",
      learnings:
        "Generator functions are an underrated tool for decoupling algorithm logic from rendering. Building this also sharpened my own understanding of time complexity — you feel O(n²) when you watch Bubble Sort labour through 200 elements.",
      techStack: ["JavaScript", "HTML5 Canvas", "CSS3", "Generator Functions"],
      category: "SOFTWARE",
      githubUrl: "https://github.com/swagata-ganguly/dsa-visualizer",
      demoUrl: "https://dsa-viz.vercel.app",
      coverImage: "/images/projects/dsa-visualizer.jpg",
      images: [],
      featured: true,
      order: 3,
    },
    {
      slug: "brand-identity-design",
      title: "Brand Identity & Motion Design",
      tagline: "Visual identity systems and motion graphics for local businesses.",
      description:
        "Freelance graphic design work spanning logo design, brand guidelines, social media kits, and short-form video edits. Clients include a local tutoring center, a food startup, and a youth sports club.",
      problem:
        "Small businesses often operate with mismatched visuals — inconsistent fonts, colours, and tone across platforms. My goal was to give each client a cohesive identity they could carry forward themselves.",
      approach:
        "Each project starts with a brief: audience, values, competitors, medium. From there: moodboard → rough sketches → digital refinement in Adobe Illustrator. Motion pieces (reels, intros, transitions) are produced in Premiere Pro + After Effects, keeping brand colours consistent in motion.",
      learnings:
        "Design is communication, not decoration. The best logo I made was the simplest one — the client understood it immediately without explanation. That's the goal.",
      techStack: ["Adobe Illustrator", "Adobe Premiere Pro", "After Effects", "Figma", "Typography"],
      category: "CREATIVE",
      githubUrl: null,
      coverImage: "/images/projects/brand-design.jpg",
      images: [],
      featured: false,
      order: 4,
    },
    {
      slug: "ece-lab-scheduler",
      title: "ECE Lab Session Scheduler",
      tagline: "Automated timetable generator for department lab bookings.",
      description:
        "A Python + CLI tool that ingests faculty availability, lab equipment slots, and student batch data — then generates conflict-free lab schedules using a constraint-satisfaction approach. Deployed internally for the ECE department.",
      problem:
        "Lab scheduling at the department was done manually on spreadsheets, resulting in frequent double-bookings and last-minute scrambles. I built an automated alternative over a week of spare time.",
      approach:
        "Modelled the problem as a CSP: variables = (batch, lab, slot), domains = available times per lab, constraints = no faculty double-booking, no equipment clash, batch gap requirements. Implemented backtracking with forward-checking in Python. Output is a clean CSV and an HTML view.",
      learnings:
        "Constraint satisfaction is one of those areas where the right formulation matters enormously. A poorly modelled CSP with backtracking runs forever; a well-modelled one finishes in seconds. I also learned to never underestimate the political complexity of replacing manual processes with automated ones.",
      techStack: ["Python", "CSP Backtracking", "CSV", "HTML", "CLI"],
      category: "SOFTWARE",
      githubUrl: "https://github.com/swagata-ganguly/lab-scheduler",
      coverImage: "/images/projects/lab-scheduler.jpg",
      images: [],
      featured: false,
      order: 5,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
    console.log(`  ✓ Project: ${project.title}`);
  }

  // ── Skills ───────────────────────────────────────────────────────────────────
  const skills = [
    // Languages
    { name: "C / C++",     level: 88, category: "LANGUAGES", icon: "⚙️", order: 1 },
    { name: "Java",        level: 82, category: "LANGUAGES", icon: "☕", order: 2 },
    { name: "Python",      level: 80, category: "LANGUAGES", icon: "🐍", order: 3 },
    { name: "JavaScript",  level: 75, category: "LANGUAGES", icon: "JS", order: 4 },
    { name: "HTML / CSS",  level: 85, category: "LANGUAGES", icon: "🌐", order: 5 },
    // Hardware
    { name: "Arduino",     level: 90, category: "HARDWARE",  icon: "🔌", order: 1 },
    { name: "ESP8266/32",  level: 78, category: "HARDWARE",  icon: "📡", order: 2 },
    { name: "PCB Design",  level: 62, category: "HARDWARE",  icon: "🔧", order: 3 },
    { name: "Sensors & Actuators", level: 85, category: "HARDWARE", icon: "📟", order: 4 },
    // Tools
    { name: "Git / GitHub", level: 82, category: "TOOLS",   icon: "🐙", order: 1 },
    { name: "VS Code",     level: 90, category: "TOOLS",     icon: "💻", order: 2 },
    { name: "Linux (CLI)", level: 72, category: "TOOLS",     icon: "🐧", order: 3 },
    { name: "Figma",       level: 70, category: "TOOLS",     icon: "🎨", order: 4 },
    // Design
    { name: "Adobe Illustrator", level: 78, category: "DESIGN", icon: "✏️", order: 1 },
    { name: "Adobe Premiere Pro", level: 75, category: "DESIGN", icon: "🎬", order: 2 },
    { name: "After Effects", level: 65, category: "DESIGN",  icon: "🎞️", order: 3 },
    { name: "Typography",  level: 82, category: "DESIGN",    icon: "Aa", order: 4 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`  ✓ ${skills.length} skills seeded`);

  console.log("\n✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
