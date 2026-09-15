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
  githubUrl: string;
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
    bioShort: "My work includes Java and Spring Boot backends, React and Next.js interfaces, and mobile applications built with Flutter and React Native. I am currently a Software Engineering Intern at Automai.",
    email: "ferraasara1@gmail.com",
    github: "https://github.com/sara0411",
    linkedin: "https://linkedin.com/in/saraferraa",
    resumeUrl: "/resume.pdf",
    location: "Casablanca, Morocco",
    availability: "Software Engineering Intern at Automai",
  },

  about: {
    paragraphs: [
      "I am a software engineer with experience across backend and full-stack development, mobile applications, applied AI, and enterprise automation. My work includes Java and Spring Boot systems, Node.js and Express APIs, React and Next.js interfaces, and mobile products built with Flutter and React Native.",
      "My previous IT and Software Asset Management work at Deloitte covered IBM licensing, ServiceNow SAM Pro, BigFix, enterprise reporting, and related governance processes. That experience complements my engineering work with an understanding of how software is operated, tracked, and governed in enterprise environments.",
    ],
  },

  experience: [
    {
      period: "Present",
      role: "Software Engineering Intern",
      organization: "Automai",
      type: "Software Engineering",
      highlights: [],
      skills: [],
    },
    {
      period: "Ended July 2026",
      role: "IT & Software Asset Management Intern",
      organization: "Deloitte Extended Services Morocco",
      type: "Enterprise Platform",
      highlights: [
        "Worked with IBM software licensing environments, including ILMT, BigFix, and Passport Advantage concepts.",
        "Used ServiceNow SAM Pro, Flexera, USU, and Active Directory for software and IT asset work.",
        "Performed contract and licensing analysis and built reporting with Power BI, Excel, and VBA.",
        "Designed and built a Spring Boot e-learning platform for internal SAM and ITAM training.",
      ],
      skills: ["IBM Licensing", "ILMT", "BigFix", "ServiceNow SAM Pro", "Power BI", "VBA", "FinOps"],
    },
    {
      period: "Previous",
      role: "Software Engineer",
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
      role: "Software Developer",
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
      problem: "The project explored how to classify security-focused system log data while improving the quality of the source dataset used for evaluation.",
      contribution: "Prepared and improved the source dataset, then developed and evaluated the sequence-model pipeline for log classification.",
      solution: "Processed Syslog data and applied NLP with LSTM and BiLSTM sequence models. The reported evaluation reached approximately 91.3% accuracy.",
      evidence: "Approximately 91.3% reported evaluation accuracy",
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
      githubUrl: "https://github.com/sara0411/Portfolio",
    },
    {
      id: "sam-itam-elearning",
      title: "SAM & ITAM E-Learning Platform",
      tagline: "Internal learning platform covering software asset management fundamentals.",
      category: "Enterprise",
      problem: "The internal project organized training on ITAM fundamentals, IBM licensing and contracts, and CVA and SLR processes.",
      contribution: "Designed and built the internal learning platform, including authentication, course progression, assessment, validation, reporting, and administration flows.",
      solution: "Built the platform with Spring Boot, Thymeleaf, Spring Security, JPA, Hibernate, and H2. It includes role-based access, learning modules, quizzes, manager validation, progress tracking, resources, analytics, and email notifications.",
      evidence: "Role-based learning, assessment, validation, and analytics flows",
      technologies: ["Java", "Spring Boot", "Thymeleaf", "Spring Security", "JPA", "H2"],
      status: "Completed",
      githubUrl: "https://github.com/sara0411/Portfolio",
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
  ] as Project[],

  skills: [
    {
      title: "Languages",
      skills: ["Java", "JavaScript", "TypeScript", "Python", "C#", "Dart", "SQL", "HTML/CSS", "Bash"],
    },
    {
      title: "Backend & APIs",
      skills: ["Spring Boot", "Node.js", "Express", "ASP.NET Core", "REST APIs", "Microservices", "JPA / Hibernate"],
    },
    {
      title: "Frontend & Mobile",
      skills: ["React", "Next.js", "Tailwind CSS", "Thymeleaf", "Flutter", "React Native", "Expo"],
    },
    {
      title: "Data & AI",
      skills: ["PostgreSQL", "Supabase", "SQL Server", "RAG", "NLP", "LSTM / BiLSTM", "Vector Search", "OCR"],
    },
    {
      title: "Enterprise, Cloud & Tools",
      skills: ["ServiceNow", "BigFix", "IBM ILMT", "Active Directory", "Oracle Cloud Infrastructure", "Docker", "Power BI", "Git"],
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
      name: "Oracle Cloud Infrastructure DevOps",
      issuer: "Oracle",
      description: "Oracle Cloud Infrastructure DevOps certification.",
    },
  ] as Certification[],

  education: [
    {
      degree: "State Engineering Degree in Computer Science, Information Systems & Networks",
      institution: "EMSI (École Marocaine des Sciences de l'Ingénieur), Casablanca",
      period: "2021 to 2026",
      focus: "Computer science with an information systems and networks orientation.",
    },
  ] as EducationItem[],

  leadership: [
    {
      organization: "GDG on Campus EMSI Casablanca",
      role: "Co-Lead (previously Lead / President)",
      description: "A student developer community organizing technical workshops, events, and hackathons.",
      highlights: [
        "Progressed from co-lead to Lead/President and currently serves as co-lead.",
        "Organized technical workshops, developer events, and career-oriented sessions.",
      ],
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
