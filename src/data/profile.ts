/**
 * Single source of truth for portfolio content. Sections read from here, so
 * updating a project, skill or contact detail never means touching layout code.
 */

export const PROFILE = {
  name: "Omkar Potnuru",
  shortName: "Omkar",
  discipline: "Electrical & Electronics Engineering",
  location: "Visakhapatnam, Andhra Pradesh, India",
  locationShort: "Visakhapatnam, AP",
  timeZone: "Asia/Kolkata",
  objective:
    "To begin my professional journey in an engineering or technology role where I can apply engineering knowledge, creativity and problem-solving skills while contributing to meaningful projects.",
  tagline: "Building practical solutions through engineering and technology.",
} as const;

export const CONTACT = {
  email: "potnuruomkar123@gmail.com",
  linkedin: "https://linkedin.com/in/omkar-potnuru",
  linkedinHandle: "in/omkar-potnuru",
  github: "https://github.com/omkar-potnuru",
  githubHandle: "omkar-potnuru",
} as const;

/* ---------------- About ---------------- */

export const ABOUT_PARAGRAPHS = [
  "I'm Omkar Potnuru, a third-year Electrical & Electronics Engineering diploma student passionate about practical engineering, circuit design and technology-driven innovation.",
  "I enjoy combining electrical engineering fundamentals with embedded systems, automation and technical problem-solving. My goal is to transform engineering concepts into practical solutions while continuously learning and developing my skills.",
] as const;

export type Stat = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  caption: string;
};

export const STATS: Stat[] = [
  { value: 9.8, decimals: 1, label: "CGPA", caption: "Academic Excellence" },
  { value: 9000, label: "State Rank", caption: "POLYCET State Rank" },
  { value: 3, suffix: "rd", label: "Year", caption: "Diploma in EEE" },
];

export const FACTS = [
  { label: "Based in", value: "Visakhapatnam, India" },
  { label: "Studying", value: "Diploma in EEE · 3rd Year" },
  { label: "Institute", value: "Govt. Polytechnic, Pendurthi" },
  { label: "Training", value: "Spotmies LLP · Completed" },
] as const;

/* ---------------- Education ---------------- */

export const DIPLOMA = {
  title: "Diploma in Electrical & Electronics Engineering",
  institute: "Government Polytechnic, Pendurthi",
  location: "Visakhapatnam, Andhra Pradesh",
  status: "Third Year — Currently Pursuing",
  score: "9.8",
  lead: "Strong academic foundation",
  coursework: [
    "Electrical circuit theory",
    "Electrical machines",
    "Analog & digital electronics",
    "Power generation & transmission",
    "Electrical measurements",
    "Switchgear & industrial protection",
  ],
  years: 3,
  currentYear: 3,
} as const;

export const SCHOOL = {
  title: "Sree Siva Shankar Vidya Mandhir",
  note: "Previous schooling",
} as const;

/* ---------------- Skills ---------------- */

export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  icon: "drafting" | "wiring" | "embedded" | "testing";
  skills: { name: string; level: number }[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "autocad",
    title: "AutoCAD Drafting",
    description: "Electrical schematics, single-line diagrams and technical drafting.",
    icon: "drafting",
    skills: [
      { name: "Single-Line Diagrams", level: 92 },
      { name: "Electrical Circuit Drafting", level: 90 },
      { name: "Layout Drawings", level: 88 },
      { name: "Blueprint Documentation", level: 86 },
    ],
  },
  {
    id: "wiring",
    title: "Electrical Wiring",
    description: "Residential and industrial electrical installation and protection.",
    icon: "wiring",
    skills: [
      { name: "Switchboard & DB Wiring", level: 94 },
      { name: "MCB/MCCB & Relay Connections", level: 90 },
      { name: "Earthing Systems", level: 88 },
      { name: "Load Calculation", level: 85 },
    ],
  },
  {
    id: "embedded",
    title: "Arduino & Embedded Systems",
    description: "Microcontroller interfacing, sensors and automated control.",
    icon: "embedded",
    skills: [
      { name: "Relay Module Switching", level: 92 },
      { name: "Arduino UNO/Nano Programming", level: 90 },
      { name: "Sensor Integration", level: 88 },
      { name: "PWM Motor Control", level: 86 },
    ],
  },
  {
    id: "testing",
    title: "Manual Software Testing",
    description: "Quality assurance, functional testing and defect reporting.",
    icon: "testing",
    skills: [
      { name: "Test Case Design", level: 90 },
      { name: "Functional Testing", level: 88 },
      { name: "Bug Lifecycle", level: 86 },
      { name: "Regression Testing", level: 85 },
    ],
  },
];

export const TOOLCHAIN = [
  "AutoCAD",
  "Electrical Wiring",
  "Arduino",
  "C/C++",
  "Circuit Analysis",
  "Sensor Interfacing",
  "Manual Testing",
  "Quality Assurance",
  "MATLAB",
  "ESP32",
] as const;

/* ---------------- Projects ---------------- */

export type ProjectArt = "arduino" | "sld" | "vfd" | "meter" | "star-delta" | "inverter" | "blueprint";

export type Project = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  tools: string[];
  art: ProjectArt;
  status?: "in-preparation";
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "Arduino-Based Circuit Control System",
    subtitle: "Sensor Integration & Automated Relay Switching",
    description:
      "Engineered an automated control prototype using Arduino interfaced with sensors and relay drivers to control electrical loads, prevent overloads and display operational metrics.",
    specs: [
      { label: "Platform", value: "Arduino UNO / C++" },
      { label: "Control Logic", value: "Threshold Relay Trigger" },
      { label: "Switching", value: "Opto-Isolated 5V Relay" },
      { label: "Testing", value: "Manual QA Verified" },
    ],
    tools: ["Arduino", "C/C++", "Relay"],
    art: "arduino",
  },
  {
    number: "02",
    title: "AutoCAD Electrical SLD & Wiring Layout",
    subtitle: "Standardized Blueprint Drafting & Electrical Safety",
    description:
      "Drafted electrical single-line diagrams and panel wiring distribution layouts incorporating MCBs, conduit routing and protective earthing.",
    specs: [
      { label: "Drafting", value: "AutoCAD Electrical" },
      { label: "Output", value: "SLD & Wiring Schedules" },
      { label: "Safety", value: "Earthing & MCB Sizing" },
      { label: "Standards", value: "IS / IEC" },
    ],
    tools: ["AutoCAD", "Wiring", "SLD"],
    art: "sld",
  },
  {
    number: "03",
    title: "VFD 3-Phase Induction Motor Speed Drive",
    subtitle: "Constant V/f SPWM Variable Frequency Drive",
    description:
      "Designed a variable-frequency motor drive generating Sinusoidal PWM signals to regulate motor speed from 5 Hz to 60 Hz.",
    specs: [
      { label: "Motor", value: "0.5 HP 3-Phase" },
      { label: "Frequency", value: "5–60 Hz" },
      { label: "Topology", value: "3-Phase IGBT Bridge" },
      { label: "Control", value: "V/f Constant SPWM" },
    ],
    tools: ["IR2110", "MATLAB", "SPWM"],
    art: "vfd",
  },
  {
    number: "04",
    title: "IoT Energy Meter & Power Quality Monitor",
    subtitle: "Real-Time Power Factor & Harmonic Analytics",
    description:
      "Developed an energy telemetry concept calculating active power, reactive power, power factor and cumulative energy with remote cloud dashboard streaming.",
    specs: [
      { label: "Processor", value: "ESP32" },
      { label: "Accuracy", value: "Class 1.0 (±1%)" },
      { label: "Protocol", value: "MQTT / WebSockets" },
      { label: "Metrics", value: "V, I, P, VAR, PF" },
    ],
    tools: ["ESP-IDF", "MQTT", "OLED"],
    art: "meter",
  },
  {
    number: "05",
    title: "Automatic Star-Delta Motor Starter Panel",
    subtitle: "Starting Surge Suppression & Phase Reversal Guard",
    description:
      "Engineered a motor starter concept with timer-based Star-to-Delta transitions, thermal overload protection and phase-loss protection.",
    specs: [
      { label: "Motor", value: "7.5 HP, 415V" },
      { label: "Transition Delay", value: "5 seconds" },
      { label: "Interlock", value: "Electrical & Mechanical" },
    ],
    tools: ["AutoCAD", "Contactors", "Relays"],
    art: "star-delta",
  },
  {
    number: "06",
    title: "Pure Sine Wave Inverter",
    subtitle: "12V DC to 230V AC — 300W",
    description:
      "Developed an H-bridge MOSFET inverter concept generating low-distortion 50Hz AC output using SPWM and LC harmonic filtering.",
    specs: [
      { label: "Power", value: "300W continuous" },
      { label: "Output THD", value: "Below 3.5%" },
      { label: "Efficiency", value: "88.5% at rated load" },
    ],
    tools: ["MOSFET", "LC Filter", "Multisim"],
    art: "inverter",
  },
  {
    number: "07",
    title: "Final-Year Semester Project",
    subtitle: "In Preparation",
    description:
      "A planned project integrating Arduino microcontroller control, practical electrical wiring, AutoCAD circuit drafting and manual functional verification.",
    specs: [],
    tools: ["Arduino", "Electrical Wiring", "AutoCAD", "Functional Verification"],
    art: "blueprint",
    status: "in-preparation",
  },
];

/* ---------------- Experience ---------------- */

export const TRAINING = {
  company: "Spotmies LLP",
  role: "Industrial Training",
  status: "Completed",
  description:
    "Completed industrial training covering practical technical workflows, manual software testing methodologies, verification standards and real-world engineering problem-solving.",
  highlights: [
    "Manual Software Testing",
    "Functional Testing",
    "Test Case Execution",
    "Defect Reporting",
    "Quality Assurance",
  ],
} as const;

/* ---------------- Career ---------------- */

export const OPPORTUNITIES = [
  "Diploma Apprentice Trainee (DAT)",
  "Junior Electrical Engineer",
  "Power Automation",
  "Electrical Engineering",
  "Renewable Energy",
  "Industrial Automation",
] as const;
