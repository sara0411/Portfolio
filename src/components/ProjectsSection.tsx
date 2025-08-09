'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Zap, Layers, Sparkles, Database } from 'lucide-react'

// Disruptive project data with personality
const projects = [
  {
    id: 1,
    title: "Syslog Anomaly Detector",
    subtitle: "AI-Powered Log Analysis",
    description: "Advanced LSTM neural network system that detects anomalies in system logs, identifying potential security threats and system failures before they escalate.",
    longDescription: "This project leverages deep learning to analyze system log patterns and identify unusual behavior. Using LSTM networks trained on historical log data, it can predict and flag anomalies with high accuracy, helping system administrators prevent downtime and security breaches.",
    tech: ["Python", "TensorFlow", "Keras", "NLP", "Deep Learning"],
    featured: true,
    icon: Zap,
    chaos: "⧫",
    impact: "94% anomaly detection accuracy",
    status: "Production",
    gradient: "from-accent/20 to-primary/30",
  },
  {
    id: 2,
    title: "AI Resume Screener",
    subtitle: "Intelligent Recruitment Tool",
    description: "Machine learning system that automatically filters and ranks candidate CVs based on job requirements, streamlining the recruitment process.",
    longDescription: "This NLP-powered tool analyzes resumes and job descriptions to automatically match candidates with positions. It uses advanced text processing and machine learning algorithms to score candidates, significantly reducing manual screening time.",
    tech: ["Python", "scikit-learn", "NLP", "Machine Learning", "Text Processing"],
    featured: false,
    icon: Database,
    chaos: "※",
    impact: "85% time reduction in screening",
    status: "Live",
    gradient: "from-primary/20 to-accent/25",
  },
  {
    id: 3,
    title: "Paperless Recruitment System",
    subtitle: "Digital Recruitment Platform",
    description: "Comprehensive recruitment fair management system with AI-powered candidate matching and automated data collection.",
    longDescription: "A complete digital solution for recruitment fairs that eliminates paper forms and manual data entry. Features include real-time candidate registration, AI-powered job matching, and automated report generation for recruiters.",
    tech: [".NET ASP Core MVC", "SQL Server", "AI Text Processing", "C#"],
    featured: false,
    icon: Layers,
    chaos: "∆",
    impact: "100% paperless operations",
    status: "Deployed",
    gradient: "from-accent/25 to-primary/20",
  },
  {
    id: 4,
    title: "ElderCare Med Manager",
    subtitle: "Senior Medication Assistant",
    description: "Mobile application designed for elderly users to manage medications with smart reminders, drug interaction warnings, and pharmacy locator.",
    longDescription: "A user-friendly mobile app specifically designed for seniors to safely manage their medications. Features include voice reminders, large text interfaces, drug compatibility checking, and integration with local pharmacy systems.",
    tech: ["React Native", "Node.js", "PostgreSQL", "Mobile Development"],
    featured: false,
    icon: Sparkles,
    chaos: "⚡",
    impact: "98% medication adherence",
    status: "Beta Testing",
    gradient: "from-primary/25 to-accent/20",
  },
]

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  onSelect: (project: typeof projects[0]) => void
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const Icon = project.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: -5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        damping: 20,
        stiffness: 100
      }}
      whileHover={{ 
        y: -12, 
        rotate: project.featured ? 1 : -1,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onClick={() => onSelect(project)}
      className={`group relative cursor-pointer transition-all duration-500 ${
        project.featured 
          ? 'md:col-span-2 xl:col-span-2 xl:row-span-1' 
          : ''
      }`}
    >
      {/* Chaotic Border */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300`}
      />
      
      {/* Main Card */}
      <div className="relative bg-card/95 backdrop-blur-sm border border-accent/20 rounded-3xl p-4 sm:p-6 lg:p-8 h-full overflow-hidden group-hover:border-accent/40 transition-all duration-300">
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 space-y-2">
          <motion.div
            className="w-3 h-3 bg-accent/40 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4] 
            }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          />
          <motion.div
            className="w-2 h-2 bg-primary/30 rounded-full"
            animate={{ 
              x: [0, 5, 0],
              rotate: [0, 180, 360] 
            }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
          />
        </div>

        {/* Status Badge */}
        <motion.div
          className="absolute top-6 left-6 px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full uppercase tracking-wider"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {project.status}
        </motion.div>

        {/* Chaos Symbol */}
        <motion.div
          className="absolute top-6 right-6 text-3xl font-bold text-accent/60"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.7
          }}
        >
          {project.chaos}
        </motion.div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <div className="mb-4 sm:mb-6 mt-4 sm:mt-6 lg:mt-8">
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300"
              whileHover={{ 
                rotate: 15,
                scale: 1.1
              }}
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-accent font-medium tracking-wider uppercase mt-1">
                {project.subtitle}
              </p>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Impact Metric */}
            <motion.div
              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-accent font-bold text-xs sm:text-sm">
                {project.impact}
              </span>
            </motion.div>

            {/* Tech Stack - Responsive Layout */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
              {project.tech.map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  className="px-2 sm:px-3 py-1 bg-muted/80 text-muted-foreground text-xs rounded-full border border-border hover:border-accent/30 hover:text-accent transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + tagIndex * 0.05 }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: -2,
                    y: -2
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action Buttons - Mobile friendly */}
          <div className="flex space-x-2 sm:space-x-3 mt-4 sm:mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              className="flex-1 p-2 sm:p-3 bg-accent/10 text-accent rounded-xl font-medium hover:bg-accent hover:text-background transition-all duration-300 border border-accent/30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mx-auto" />
            </motion.button>
            <motion.button
              className="flex-1 p-2 sm:p-3 bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary hover:text-background transition-all duration-300 border border-primary/30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4 mx-auto" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <>
      <section 
        id="projects" 
        ref={sectionRef}
        className="py-20 lg:py-32 px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Chaotic Background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-accent/5 rounded-full blur-xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 bg-primary/5 rounded-full blur-xl"
            animate={{ 
              x: [0, -40, 0],
              y: [0, 20, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Disruptive Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50, skewX: 5 }}
            animate={isInView ? { opacity: 1, y: 0, skewX: 0 } : { opacity: 0, y: 50, skewX: 5 }}
            transition={{ duration: 0.8, type: "spring", damping: 25 }}
            className="mb-20"
          >
            <div className="relative">
              <motion.div
                className="absolute -top-4 -left-4 text-6xl md:text-8xl font-bold text-accent/10 pointer-events-none"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                ⧫
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
                Digital
                <motion.span 
                  className="block text-accent italic -mt-2 ml-8 md:ml-16"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Disruptions
                </motion.span>
              </h2>
              
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
                  Projects that shatter expectations and redefine what&apos;s possible.
                </p>
                <p className="text-accent font-medium tracking-wider uppercase text-sm">
                  Each one breaks different rules
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Responsive Chaotic Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                onSelect={setSelectedProject}
              />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-accent to-primary text-background font-bold rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Let&apos;s Create Chaos Together</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-card border border-accent/30 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, y: 50, rotate: -5 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center">
                    <selectedProject.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{selectedProject.title}</h3>
                    <p className="text-accent font-medium">{selectedProject.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  ×
                </button>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {selectedProject.longDescription}
              </p>
              
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-accent/20 text-accent text-sm font-bold rounded-full">
                  {selectedProject.status}
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-bold rounded-full">
                  {selectedProject.impact}
                </span>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex-1 py-3 bg-accent text-background rounded-xl font-medium hover:bg-accent/90 transition-colors">
                  View Live
                </button>
                <button className="flex-1 py-3 bg-primary text-background rounded-xl font-medium hover:bg-primary/90 transition-colors">
                  View Code
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}