export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Machine Learning" | "Backend Systems" | "Mobile & Full-Stack" | "Enterprise";
  problem: string;
  contribution: string;
  solution: string;
  evidence: string;
  technologies: string[];
  status: "Completed" | "Active Development" | "Deployed";
  githubUrl?: string;
  liveUrl?: string;
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
    secondaryTitle: "Backend · Full Stack · Mobile · Applied AI · Enterprise Automation",
    bioShort: "I am a recent software engineering graduate and current Software Engineering Intern at Automai. My work spans backend systems, enterprise applications, product interfaces, and applied AI.",
    email: "ferraasara1@gmail.com",
    github: "https://github.com/sara0411",
    linkedin: "https://www.linkedin.com/in/sara-ferraa-0aa73623a/",
    location: "Casablanca, Morocco",
    availability: "Backend and Enterprise Software Engineering",
  },

  about: {
    paragraphs: [
      "I am a recent software engineering graduate from EMSI Casablanca. I work across backend and full-stack development, mobile applications, applied AI, and enterprise automation, with Java and Spring Boot as my primary backend stack.",
      "At Automai, I am responsible for a guided authoring feature in a C# and WinForms desktop application. The work crosses UI, persistence, code generation, and the separate runtime that executes generated automation.",
      "My Deloitte internship combined Software Asset Management work with engineering. I worked with IBM licensing environments, ServiceNow SAM Pro, and BigFix while building an internal Spring Boot learning platform with local RAG, document processing, and reporting workflows.",
    ],
  },

  experience: [
    {
      period: "August 2026 to present",
      role: "Software Engineering Intern",
      organization: "Automai",
      type: "Software Engineering",
      highlights: [
        "Responsible for a guided authoring feature that compiles user-taught workflows into automation executed by a separate runtime, working across UI, persistence, and code generation.",
        "Improved reliability ahead of release by tracing generated output through its consuming runtime and root-causing and fixing approximately 30 defects.",
        "Shipped save-and-resume support to replace a flow that forced users to discard unfinished work.",
        "Reconciled the feature with its documentation and runtime contract, then helped unblock a release by tracing a fresh-install build failure that left a core service non-functional.",
      ],
      skills: ["C#", "WinForms", "Persistence", "Code Generation", "Runtime Integration", "Debugging"],
    },
    {
      period: "February to July 2026",
      role: "Software Asset Management Intern",
      organization: "Deloitte Extended Services Morocco",
      type: "Enterprise Platform",
      highlights: [
        "Worked with IBM software licensing environments, including ILMT, BigFix, and Passport Advantage concepts.",
        "Used ServiceNow SAM Pro, Flexera, USU, and Active Directory for software and IT asset work.",
        "Performed contract and licensing analysis and built reporting with Power BI, Excel, and VBA.",
        "Designed and built a Spring Boot learning platform with role-based modules, assessment, local RAG, document processing, and reporting workflows.",
      ],
      skills: ["Java", "Spring Boot", "ServiceNow SAM Pro", "IBM Licensing", "BigFix", "LangChain4j", "Power BI"],
    },
    {
      period: "Previous",
      role: "Software Engineering Intern",
      organization: "SLTVerse",
      type: "Software Engineering",
      highlights: [
        "Built mobile features for PingPay/SLTPay with React Native, Expo, and TypeScript against a Node.js and Express backend.",
        "Integrated payment, identity, blockchain, and real-time services including Stripe, Plaid, Ethers.js, WebSockets, and ShuftiPro.",
        "Contributed to a Next.js dashboard with role-based access and more than 40 API endpoints.",
      ],
      skills: ["React Native", "TypeScript", "Node.js", "Next.js", "Supabase", "PostgreSQL"],
    },
    {
      period: "Previous",
      role: "Software Developer Intern",
      organization: "Attijariwafa Bank",
      type: "Software Engineering",
      highlights: [
        "Developed a CV management web application for recruitment forums using ASP.NET Core MVC, C#, and SQL Server.",
        "Implemented role-based functionality for recruitment workflows.",
      ],
      skills: ["ASP.NET Core MVC", "C#", "SQL Server"],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "ai-log-analyzer",
      title: "AI Log Analyzer",
      tagline: "Sequence model for classifying anomalous system log behavior.",
      category: "Machine Learning",
      problem: "The academic project explored how to classify security-focused behavior in approximately 1 GB of system logs while improving the quality of the source data used for evaluation.",
      contribution: "Worked in a two-person team to prepare the dataset and develop and evaluate the sequence-model pipeline for log classification.",
      solution: "Processed Syslog data and applied NLP with LSTM and BiLSTM sequence models. The reported evaluation reached approximately 91.3% accuracy.",
      evidence: "Approximately 1 GB of logs and 91.3% reported evaluation accuracy",
      technologies: ["Python", "LSTM", "BiLSTM", "NLP", "Machine Learning"],
      status: "Completed",
      githubUrl: "https://github.com/sara0411/cybersec-log-analyzer",
    },
    {
      id: "pingpay-dashboard",
      title: "PingPay Dashboard",
      tagline: "Full-stack administration and analytics dashboard for a fintech product.",
      category: "Backend Systems",
      problem: "PingPay required distinct application experiences and permissions for users, businesses, and administrators.",
      contribution: "Contributed across the Next.js dashboard, its role-based product flows, and the supporting backend APIs.",
      solution: "Contributed to a Next.js, React, and TypeScript dashboard with Supabase, Recharts, role-based access, and a backend containing more than 40 API endpoints.",
      evidence: "More than 40 backend API endpoints",
      technologies: ["Next.js", "React", "TypeScript", "Supabase", "Recharts"],
      status: "Completed",
    },
    {
      id: "sam-itam-elearning",
      title: "SAM & ITAM E-Learning Platform",
      tagline: "Internal learning and automation platform for Software Asset Management consultants.",
      category: "Enterprise",
      problem: "The internal project organized training and operational knowledge for more than 60 consultants working with ITAM, IBM licensing, contracts, CVA, and SLR processes.",
      contribution: "Designed and built the platform, including authentication, learning progression, assessment, manager validation, analytics, local RAG, OCR-assisted document processing, and reporting workflows.",
      solution: "Built the core platform with Java 21, Spring Boot, Thymeleaf, Spring Security, JPA, and H2. Integrated LangChain4j, Ollama, and ChromaDB for local retrieval, plus Python, FastAPI, Tesseract, and Apache POI for document and spreadsheet automation.",
      evidence: "Designed for 60+ consultants with role-based learning, RAG, and document automation",
      technologies: ["Java 21", "Spring Boot", "LangChain4j", "Ollama", "ChromaDB", "FastAPI", "Apache POI"],
      status: "Completed",
    },
    {
      id: "recruitment-cv-platform",
      title: "Recruitment CV Management Platform",
      tagline: "Web application for managing candidate CVs during recruitment forums.",
      category: "Backend Systems",
      problem: "Recruitment forums needed an application to manage candidate CVs and the associated recruitment workflow.",
      contribution: "Developed the application and implemented role-based access for its recruitment workflow.",
      solution: "Developed an ASP.NET Core MVC application in C# with SQL Server and role-based functionality for recruitment users.",
      evidence: "Public source for the role-based recruitment application",
      technologies: ["C#", "ASP.NET Core MVC", "SQL Server"],
      status: "Completed",
      githubUrl: "https://github.com/sara0411/GestionCVForum",
    },
    {
      id: "pagemate",
      title: "PageMate",
      tagline: "A mobile reading product built around private libraries and shared reading.",
      category: "Mobile & Full-Stack",
      problem: "Readers need one place to manage private books, track progress, annotate pages, and share reading experiences with controlled visibility.",
      contribution: "Designed the product, its mobile experience, data model, access rules, and the reading and social flows.",
      solution: "Building the application in Flutter with Supabase authentication, PostgreSQL, private storage, signed document access, realtime features, notes, highlights, and reading progress.",
      evidence: "Active Flutter and Supabase implementation with documented product and access architecture",
      technologies: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Realtime"],
      status: "Active Development",
    },
  ] as Project[],

  skills: [
    {
      title: "Languages",
      skills: ["Java", "JavaScript", "TypeScript", "Python", "C#", "Dart", "SQL", "HTML/CSS", "Bash"],
    },
    {
      title: "Backend & APIs",
      skills: ["Spring Boot", "Node.js", "Express", "FastAPI", "ASP.NET Core", "REST APIs", "Microservices", "JPA / Hibernate"],
    },
    {
      title: "Frontend & Mobile",
      skills: ["React", "Next.js", "Tailwind CSS", "Thymeleaf", "Flutter", "React Native", "Expo"],
    },
    {
      title: "Data & AI",
      skills: ["PostgreSQL", "Supabase", "SQL Server", "RAG", "LangChain4j", "Ollama", "ChromaDB", "NLP", "Vector Search", "OCR"],
    },
    {
      title: "Enterprise, Cloud & Tools",
      skills: ["ServiceNow", "BigFix", "IBM ILMT", "Active Directory", "Oracle Cloud Infrastructure", "GCP", "Docker", "Power BI", "Git"],
    },
  ] as SkillCategory[],

  certifications: [
    {
      name: "ServiceNow Certified System Administrator (CSA)",
      issuer: "ServiceNow",
      description: "ServiceNow platform administration certification.",
    },
    {
      name: "BigFix Foundation",
      issuer: "HCL",
      description: "Foundation credential covering the BigFix platform.",
    },
    {
      name: "Oracle Cloud Infrastructure DevOps Professional",
      issuer: "Oracle",
      description: "Oracle Cloud Infrastructure DevOps certification.",
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
      degree: "State Engineering Degree in Computer Science, Information Systems & Networks",
      institution: "EMSI (École Marocaine des Sciences de l'Ingénieur), Casablanca",
      period: "2021 to 2026",
      focus: "MIAGE-oriented software engineering, information systems, and networks curriculum.",
    },
  ] as EducationItem[],

  leadership: [
    {
      organization: "GDG on Campus EMSI Casablanca",
      role: "Former Lead and Co-Lead",
      description: "Led and supported a student developer community organizing technical workshops, events, and hackathons.",
      highlights: [
        "Progressed from co-lead to Lead/President and currently serves as co-lead.",
        "Organized technical workshops, developer events, and career-oriented sessions.",
      ],
    },
    {
      organization: "GDG Casablanca",
      role: "Organizer",
      description: "Supports the city developer community and its technical programming.",
      highlights: [],
    },
    {
      organization: "OpportunAI Hackathon",
      role: "Organizer",
      description: "Organized the hackathon and supported sponsor and community coordination.",
      highlights: ["Coordinated sponsors and event logistics."],
    },
    {
      organization: "EMSI Career Center",
      role: "Ambassador",
      description: "Supported career-oriented student programming.",
      highlights: [],
    },
  ] as LeadershipItem[],
};
