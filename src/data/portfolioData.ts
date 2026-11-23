export interface Project {
  id: string;
  title: string;
  where: string;
  paragraphs: string[];
  technologies: string[];
  githubUrl?: string;
  features?: { title: string; text: string }[];
  closing?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  type: "Enterprise Platform" | "Software Engineering";
  highlights: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period?: string;
  focus: string;
}

export interface LeadershipItem {
  organization: string;
  role: string;
  description: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Sara Ferraa",
    portrait: "/sara-ferraa.jpg",
    title: "Software Engineer",
    intro: [
      "I build backend and enterprise software that holds up in production: a C# and C++ test-automation product today, Java and Spring Boot applications before that. I also organise GDG Casablanca.",
    ],
    email: "ferraasara1@gmail.com",
    github: "https://github.com/sara0411",
    linkedin: "https://www.linkedin.com/in/sara-ferraa-0aa73623a/",
    cv: "/sara-ferraa-cv.pdf",
    location: "Casablanca, Morocco",
  },

  experience: [
    {
      period: "August 2026 to present",
      role: "Software Engineer",
      organization: "Automai Corp",
      type: "Software Engineering",
      highlights: [
        "Own the Journey feature in ScenarioBuilder, a wizard that generates start, login and logout automations for web, desktop and Citrix/RDP applications.",
        "Delivered Journey Profile versioning and packaging, the Web Service Client enhancements across three repositories, and reworked control recognition in C# and the C++ OCR library.",
        "Root-caused and tracked more than 100 defects across releases 26.8.03 to 26.11.01, and diagnosed a customer's failing robot runs down to the C++ runtime.",
        "Co-own release preparation, wrote the Journey, Web Service Client and patch-release test suites, and built the team's Claude Code toolkit.",
      ],
      skills: ["C#", ".NET WinForms", "C++", "OCR", "Python/Django", "Inno Setup"],
    },
    {
      period: "February to July 2026",
      role: "Software Engineering Intern",
      organization: "Deloitte Morocco Cyber Center",
      type: "Enterprise Platform",
      highlights: [
        "Architected and built an enterprise SAM skills platform with Java 21, Spring Boot 3, React and PostgreSQL, with role-based access control, authentication and session management.",
        "Implemented a local RAG knowledge assistant with LangChain4j, Ollama and ChromaDB.",
        "Built a Python/FastAPI OCR pipeline for IBM AS/400 licensing reports and an Apache POI module that generates customised Project Management Plans.",
      ],
      skills: ["Java 21", "Spring Boot 3", "Spring Security", "React", "PostgreSQL", "LangChain4j", "FastAPI"],
    },
    {
      period: "May to September 2025",
      role: "Software Engineering Intern",
      organization: "SLTVerse",
      type: "Software Engineering",
      highlights: [
        "Developed PingPay, a React Native multi-payment application integrating Supabase, Stripe, Plaid and Ethers.js across card, bank, ACH and crypto payment workflows.",
        "Built a privacy-preserving authentication prototype with Semaphore, zkPass, Next.js and Supabase that verifies users without exposing their credentials.",
      ],
      skills: ["React Native", "Expo", "TypeScript", "Supabase", "Stripe", "Plaid", "Ethers.js"],
    },
    {
      period: "Previous",
      role: "Software Developer Intern",
      organization: "Attijariwafa Bank",
      type: "Software Engineering",
      highlights: [
        "Developed a CV management web application for recruitment forums using ASP.NET Core MVC, C# and SQL Server, with role-based access for the recruitment workflow.",
      ],
      skills: ["ASP.NET Core MVC", "C#", "SQL Server"],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "automai-guided-authoring",
      title: "Teaching software to automate itself",
      where: "Automai Corp, Software Engineer, August 2026 to now",
      paragraphs: [
        "Automai builds a test and process automation platform. I own Journey, a wizard in ScenarioBuilder where someone demonstrates how to start, log in to and log out of an application (web, desktop or Citrix/RDP) and gets working automations out of it.",
        "What the user teaches is saved, compiled into scripts, and run by a separate C++ robot runtime. Most of what I build has to hold together across all four, and across several repositories.",
      ],
      features: [
        {
          title: "Save and resume",
          text: "An unfinished Journey used to be lost when the wizard closed. It is now kept as a draft that can be reopened, renamed or discarded cleanly.",
        },
        {
          title: "Versioning and packaging",
          text: "Stable IDs for scripts and profiles, content fingerprints, one-file package export and migration of older automations, with the matching change in the C++ runtime and the installer, so scripts keep their identity through renames, regeneration and upgrades.",
        },
        {
          title: "An API step for real requests",
          text: "The Web Service Client, end to end across three repositories: query parameters, authentication, body types, expected status codes and response headers, from the WinForms options to the C++ robot and the installer's action definitions.",
        },
        {
          title: "Knowing what was clicked",
          text: "Control recognition in C# and the C++ OCR library now finds fields, checkboxes and buttons with pale or dark borders on the first click, anywhere in the window. I also fixed false matches in the image search and moved calibration to a background queue so the recorder no longer freezes.",
        },
        {
          title: "Diagnosing what customers see",
          text: "I reproduced a customer's failing robot runs (188 of 188) on a VM and traced them to variable-name handling in the C++ runtime, with a workaround and a fix proposal. An audit of the upload path also turned up a legacy route that accepted uploads without login; it has since been removed.",
        },
        {
          title: "Releases and tooling",
          text: "More than 100 defects root-caused and tracked across releases 26.8.03 to 26.11.01. I co-own release preparation, and I built the team's Claude Code toolkit: git-safety hooks with 64 tests, 14 skills for root-cause, verification and release checks, and a fix index of more than 21,000 symbols.",
        },
      ],
      technologies: ["C#", ".NET WinForms", "C++", "OCR", "Inno Setup"],
    },
    {
      id: "sam-itam-elearning",
      title: "A skills platform for a SAM team",
      where: "Deloitte Morocco Cyber Center, 2026, my final-year project",
      paragraphs: [
        "An internal platform for the Software Asset Management team: learning paths, quizzes, manager validation, analytics and a knowledge assistant. I architected and built it during my internship.",
        "It runs on Java 21 and Spring Boot 3 with React and PostgreSQL, with role-based access control, authentication and session management. The knowledge assistant is local RAG with LangChain4j, Ollama and ChromaDB. Alongside it I built a FastAPI OCR pipeline that reads IBM AS/400 licensing reports (detecting columns and merging staggered headers) and an Apache POI module that writes Project Management Plans. The code is private.",
      ],
      technologies: ["Java 21", "Spring Boot 3", "React", "PostgreSQL", "LangChain4j", "Ollama", "ChromaDB", "FastAPI"],
    },
    {
      id: "ai-log-analyzer",
      title: "Log classifier",
      where: "School project, with one teammate",
      paragraphs: [
        "We classified security events in about 1 GB of system logs. The text model is a two-layer bidirectional LSTM behind a Flask interface.",
        "It reached 91.3% accuracy on the held-out test split. The labels came from heuristics and we didn't keep precision or recall, so I treat that number as a rough one.",
      ],
      technologies: ["Python", "TensorFlow", "Flask"],
      githubUrl: "https://github.com/sara0411/cybersec-log-analyzer",
    },
    {
      id: "pagemate",
      title: "PageMate",
      where: "Personal project, in progress",
      paragraphs: [
        "A reading app in Flutter: a private library, notes and highlights, reading progress, and reading with other people. Supabase handles authentication, PostgreSQL, private storage with signed access, and realtime. Not public yet.",
      ],
      technologies: ["Flutter", "Dart", "Supabase", "PostgreSQL"],
    },
    {
      id: "pingpay",
      title: "PingPay",
      where: "SLTVerse, May to September 2025",
      paragraphs: [
        "A React Native app that pays four ways: card, bank, ACH and crypto, through Stripe, Plaid and Ethers.js, on Supabase.",
        "I also built a privacy-preserving sign-in prototype with Semaphore and zkPass that verifies a user without exposing their credentials. Both are private.",
      ],
      technologies: ["React Native", "Expo", "TypeScript", "Supabase", "Stripe", "Plaid", "Ethers.js"],
    },
    {
      id: "recruitment-cv-platform",
      title: "CV management for recruitment forums",
      where: "Attijariwafa Bank internship",
      paragraphs: [
        "An ASP.NET Core MVC application with SQL Server for managing the candidate CVs collected at recruitment forums, with role-based access.",
      ],
      technologies: ["C#", "ASP.NET Core MVC", "SQL Server"],
      githubUrl: "https://github.com/sara0411/GestionCVForum",
    },
  ] as Project[],

  skills: [
    {
      title: "Languages",
      skills: ["C#", "C++", "Java", "Python", "TypeScript", "SQL"],
    },
    {
      title: "Backend & desktop",
      skills: ["Spring Boot", "Spring Security", "REST APIs", "JPA/Hibernate", "Maven", "FastAPI", "Django", ".NET WinForms", "Inno Setup"],
    },
    {
      title: "Engineering",
      skills: ["Debugging", "root-cause analysis", "persistence", "authentication and RBAC", "cross-component contracts", "testing", "release management", "OCR and image matching", "RDP/Citrix"],
    },
    {
      title: "Data & AI",
      skills: ["PostgreSQL", "Supabase", "RAG", "LangChain4j", "Ollama", "ChromaDB", "Claude Code (skills, hooks, subagents)"],
    },
    {
      title: "Frontend & mobile",
      skills: ["React", "Next.js", "React Native", "Flutter", "HTML/CSS"],
    },
    {
      title: "Tools & platforms",
      skills: ["Git/GitHub", "Jira", "Confluence", "Linux", "Oracle OCI", "AWS fundamentals", "ServiceNow SAM Pro", "BigFix", "IBM ILMT"],
    },
  ] as SkillCategory[],

  certifications: [
    {
      name: "ServiceNow Certified System Administrator (CSA)",
      issuer: "ServiceNow",
      description: "ServiceNow platform administration certification.",
    },
    {
      name: "Oracle Cloud Infrastructure DevOps Professional",
      issuer: "Oracle",
      description: "Oracle Cloud Infrastructure DevOps certification.",
    },
    {
      name: "BigFix Foundation",
      issuer: "HCL",
      description: "Foundation credential covering the BigFix platform.",
    },
    {
      name: "IBM Licensing Expertise",
      issuer: "IBM",
      credentialId: "DL65030G",
      description: "IBM software licensing expertise credential.",
    },
    {
      name: "SAP Professional Fundamentals",
      issuer: "SAP",
      description: "SAP professional fundamentals credential.",
    },
  ] as Certification[],

  education: [
    {
      degree: "Five-year Software Engineering degree (MIAGE, Master's equivalent)",
      institution: "EMSI Casablanca",
      period: "October 2021 to July 2026",
      focus: "Final-year project: the SAM skills platform at Deloitte.",
    },
  ] as EducationItem[],

  leadership: [
    {
      organization: "GDG on Campus EMSI Casablanca",
      role: "2024 to 2026",
      description: "The campus chapter of Google Developer Groups.",
      highlights: [
        "2024, co-lead: organised workshops and a cybersecurity bootcamp.",
        "2025, lead: led a hackathon together with a series of workshops.",
        "2026, co-lead again.",
      ],
    },
    {
      organization: "GDG Casablanca",
      role: "Organiser, 2026",
      description: "The city chapter of Google Developer Groups.",
      highlights: [],
    },
    {
      organization: "OpportunAI Hackathon",
      role: "Organiser",
      description: "Organised the hackathon and supported sponsor and community coordination.",
      highlights: [],
    },
    {
      organization: "EMSI Career Center",
      role: "Ambassador",
      description: "Supported career-oriented student programming.",
      highlights: [],
    },
  ] as LeadershipItem[],
};
