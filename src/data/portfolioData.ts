export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Machine Learning' | 'Backend Systems' | 'Mobile & Full-Stack' | 'Enterprise';
  problem: string;
  solution: string;
  technologies: string[];
  status: 'Completed' | 'Active Development' | 'Deployed';
  githubUrl: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  type: 'Enterprise Platform' | 'Software Engineering';
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

export interface EngineeringPrinciple {
  title: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Sara Ferraa",
    title: "Software Engineer",
    secondaryTitle: "Backend Systems · Enterprise Platforms · Workflow Automation · Applied AI",
    bioShort: "Software engineer working across backend development, enterprise platforms, automation, and applied AI. I focus on building reliable systems end-to-end, from APIs and databases to business-process automation and user-facing applications.",
    email: "ferraasara1@gmail.com",
    github: "https://github.com/sara0411",
    linkedin: "https://linkedin.com/in/saraferraa",
    resumeUrl: "/resume.pdf",
    location: "Remote / Hybrid",
    availability: "Available for Software Engineering roles",
  },

  about: {
    paragraphs: [
      "I am a software engineer with practical experience spanning backend development, enterprise platforms, automation, and applied machine learning. I enjoy understanding how systems work end-to-end—from database design and API contracts to automated business workflows and client applications.",
      "My technical background includes engineering with Java, Python, C#, JavaScript, and SQL, alongside enterprise development on ServiceNow. Rather than treating technologies as isolated silos, I focus on system reliability, structured code architecture, and practical engineering solutions that solve real operational problems.",
    ],
    highlights: [
      {
        label: "Systems & APIs",
        description: "Designing RESTful services, database schemas, and robust backend logic with strong separation of concerns."
      },
      {
        label: "Enterprise & Automation",
        description: "Configuring enterprise workflows, ITSM lifecycles, and automated process pipelines using ServiceNow and Flow Designer."
      },
      {
        label: "Applied Machine Learning",
        description: "Developing practical data processing pipelines and neural network models for text classification and sequence anomaly detection."
      }
    ]
  },

  experience: [
    {
      period: "Present",
      role: "Enterprise Platform & Workflow Engineering",
      organization: "ServiceNow Ecosystem",
      type: "Enterprise Platform",
      highlights: [
        "Configured and maintained core IT Service Management (ITSM) lifecycle modules including Incident, Problem, Change, Request, and Knowledge Management.",
        "Built automated multi-step organizational workflows utilizing ServiceNow Flow Designer and platform Business Rules to reduce manual process overhead.",
        "Engineered custom Service Catalog items, record producers, client scripts, and UI policies tailored to business user requirements.",
        "Researched and implemented platform integrations connecting ServiceNow instances with external REST APIs and structured data repositories."
      ],
      skills: ["ServiceNow", "ITSM", "Flow Designer", "JavaScript", "REST APIs", "Service Catalog", "Workflow Automation"]
    },
    {
      period: "Engineering Projects & Development",
      role: "Software Engineer",
      organization: "Independent & Collaborative Systems",
      type: "Software Engineering",
      highlights: [
        "Architected multi-tier web applications leveraging ASP.NET Core MVC and relational databases (SQL Server, PostgreSQL), enforcing domain isolation and data validation.",
        "Engineered deep learning anomaly detection pipelines using Python and TensorFlow to identify anomalous sequences in operational log files.",
        "Developed cross-platform mobile utilities with React Native connected to Node.js backend endpoints and relational databases."
      ],
      skills: ["Python", "C#", "ASP.NET Core", "React Native", "PostgreSQL", "Docker", "Git"]
    }
  ] as ExperienceItem[],

  projects: [
    {
      id: "lstm-anomaly-detector",
      title: "Log Sequence Anomaly Detection System",
      tagline: "Sequence modeling pipeline to detect anomalous operational behaviors in system logs.",
      category: "Machine Learning",
      problem: "Large-scale systems generate thousands of log lines per minute, making manual inspection impossible and leaving security threats or infrastructure failures undetected until downtime occurs.",
      solution: "Engineered an end-to-end NLP and LSTM recurrent neural network pipeline in Python and TensorFlow. The model parses unstructured log streams into sequential token vectors and identifies out-of-distribution sequence behaviors indicative of system failures.",
      technologies: ["Python", "TensorFlow", "Keras", "NumPy", "Pandas", "NLP"],
      status: "Completed",
      githubUrl: "https://github.com/sara0411/Portfolio",
    },
    {
      id: "ai-resume-screener",
      title: "Candidate Screening & Matching Engine",
      tagline: "Text processing pipeline that systematically matches candidate profiles to technical requirements.",
      category: "Machine Learning",
      problem: "Recruitment processes frequently struggle with high volumes of unstructured candidate resumes that must be consistently evaluated against complex job requisitions.",
      solution: "Developed a natural language processing service using scikit-learn and Python. The application extracts technical skill entities, tokenizes unstructured CV text, and computes similarity vectors against job descriptions to provide deterministic candidate matching.",
      technologies: ["Python", "scikit-learn", "NLP", "Pandas", "Text Processing"],
      status: "Completed",
      githubUrl: "https://github.com/sara0411/Portfolio",
    },
    {
      id: "paperless-recruitment",
      title: "Enterprise Recruitment Management Platform",
      tagline: "Centralized recruitment fair management system with digital data collection and workflow tracking.",
      category: "Backend Systems",
      problem: "Campus and career fairs traditionally rely on paper forms and disparate spreadsheets, creating data entry bottlenecks and delayed candidate follow-ups.",
      solution: "Built a structured MVC web platform in C# and ASP.NET Core with a SQL Server relational backend. Implemented role-based access control, automated candidate profile ingestion, structured evaluation scorecards, and administrative reporting dashboards.",
      technologies: ["C#", ".NET ASP Core MVC", "SQL Server", "Entity Framework", "REST APIs"],
      status: "Completed",
      githubUrl: "https://github.com/sara0411/Portfolio",
    },
    {
      id: "eldercare-med-manager",
      title: "Medication Schedule & Adherence Assistant",
      tagline: "Cross-platform mobile application supporting elderly users with scheduled dosage tracking and safety checks.",
      category: "Mobile & Full-Stack",
      problem: "Polypharmacy among senior patients often leads to skipped dosages or accidental double dosing due to complicated schedules and poor visibility.",
      solution: "Created an accessible mobile application in React Native backed by a Node.js REST API and PostgreSQL database. Features high-contrast intuitive controls, persistent notification scheduling, contraindication reminders, and nearby pharmacy geolocation.",
      technologies: ["React Native", "Node.js", "Express", "PostgreSQL", "TypeScript", "REST APIs"],
      status: "Active Development",
      githubUrl: "https://github.com/sara0411/Portfolio",
    }
  ] as Project[],

  skills: [
    {
      title: "Languages",
      skills: ["Java", "Python", "C#", "JavaScript", "TypeScript", "C", "C++", "SQL"]
    },
    {
      title: "Backend & APIs",
      skills: ["REST APIs", "ASP.NET Core", "Node.js", "Express", "Flask", "Entity Framework"]
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "SQL Server", "MySQL", "Relational Modeling", "Query Optimization"]
    },
    {
      title: "Enterprise & Automation",
      skills: ["ServiceNow", "ITSM (Incident, Problem, Change)", "Flow Designer", "Service Catalog", "Workflow Automation"]
    },
    {
      title: "AI & Data",
      skills: ["Machine Learning", "NLP", "scikit-learn", "TensorFlow / Keras", "Pandas", "NumPy"]
    },
    {
      title: "Frontend & Mobile",
      skills: ["React", "React Native", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"]
    },
    {
      title: "Engineering Tools",
      skills: ["Git", "GitHub", "Docker", "Linux", "CI/CD Concepts", "Postman", "VS Code"]
    }
  ] as SkillCategory[],

  principles: [
    {
      title: "End-to-End System Reliability",
      description: "Writing maintainable software means understanding how layers interact—from database transactions and API error handling to business validation and edge cases."
    },
    {
      title: "Pragmatic Automation",
      description: "Translating ambiguous manual operations into deterministic, auditable, and automated workflows that eliminate friction and human error."
    },
    {
      title: "Applied AI with Technical Restraint",
      description: "Leveraging machine learning where deterministic algorithms fall short, prioritizing reproducible pipelines and data validation over hype."
    },
    {
      title: "Clean Architecture & Readability",
      description: "Valuing simple, readable code with explicit boundaries over cleverness. Software must be built so other engineers can inspect, test, and maintain it."
    }
  ] as EngineeringPrinciple[],

  certifications: [
    {
      name: "Certified System Administrator (CSA)",
      issuer: "ServiceNow",
      description: "Validates proficiency in ServiceNow platform administration, user management, configuration of ITSM workflows, Flow Designer, Service Catalog, and data management."
    }
  ] as Certification[],

  education: [
    {
      degree: "Studies in Software Engineering & Computer Science",
      institution: "Higher Education",
      focus: "Algorithms, Data Structures, Software Architecture, Database Systems, Operating Systems, and Applied Machine Learning."
    }
  ] as EducationItem[]
};
