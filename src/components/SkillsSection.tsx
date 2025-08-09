'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Database, Code, Cpu, Rocket } from 'lucide-react'

// Revolutionary skill data with personality and visual metaphors
const skillWeapons = [
  {
    category: "Frontend Mastery",
    tagline: "Modern Web Experiences",
    description: "I craft responsive, interactive interfaces that users love to explore",
    icon: Code,
    chaos: "◊",
    color: "from-accent/20 to-primary/30",
    borderColor: "border-accent/30",
    weapons: [
      { 
        name: "React & Next.js", 
        mastery: "Expert",
        level: 92,
        description: "Building scalable, performant React applications.",
        particles: 15
      },
      { 
        name: "TypeScript", 
        mastery: "Advanced",
        level: 88,
        description: "Type-safe development for robust applications.",
        particles: 12
      },
      { 
        name: "Tailwind CSS", 
        mastery: "Proficient",
        level: 90,
        description: "Utility-first styling for rapid development.",
        particles: 14
      },
      { 
        name: "JavaScript ES6+", 
        mastery: "Expert",
        level: 95,
        description: "Modern JavaScript for dynamic web apps.",
        particles: 16
      },
      { 
        name: "HTML5 & CSS3", 
        mastery: "Expert",
        level: 96,
        description: "Semantic markup and modern styling.",
        particles: 13
      },
      { 
        name: "Framer Motion", 
        mastery: "Advanced",
        level: 85,
        description: "Smooth animations that enhance UX.",
        particles: 10
      }
    ]
  },
  {
    category: "Backend Engineering",
    tagline: "Server-Side Architecture",
    description: "I build robust APIs and systems that handle real-world complexity",
    icon: Database,
    chaos: "※",
    color: "from-primary/20 to-accent/25",
    borderColor: "border-primary/30",
    weapons: [
      { 
        name: "Node.js & Express", 
        mastery: "Advanced",
        level: 88,
        description: "Fast, scalable server-side JavaScript.",
        particles: 11
      },
      { 
        name: "Python", 
        mastery: "Expert",
        level: 92,
        description: "Data processing, ML, and backend services.",
        particles: 14
      },
      { 
        name: "Java", 
        mastery: "Proficient",
        level: 82,
        description: "Enterprise-grade application development.",
        particles: 9
      },
      { 
        name: ".NET & C#", 
        mastery: "Advanced",
        level: 86,
        description: "Microsoft stack for robust applications.",
        particles: 10
      },
      { 
        name: "PostgreSQL", 
        mastery: "Advanced",
        level: 85,
        description: "Relational database design and optimization.",
        particles: 10
      },
      { 
        name: "MongoDB", 
        mastery: "Proficient",
        level: 80,
        description: "NoSQL for flexible data storage.",
        particles: 8
      },
      { 
        name: "REST APIs", 
        mastery: "Expert",
        level: 90,
        description: "RESTful service design and implementation.",
        particles: 12
      },
      { 
        name: "GraphQL", 
        mastery: "Proficient",
        level: 75,
        description: "Efficient API queries and mutations.",
        particles: 7
      }
    ]
  },
  {
    category: "AI & Data Science",
    tagline: "Intelligence Engineering",
    description: "I leverage machine learning to solve complex real-world problems",
    icon: Cpu,
    chaos: "∆",
    color: "from-accent/25 to-primary/20",
    borderColor: "border-accent/40",
    weapons: [
      { 
        name: "TensorFlow/Keras", 
        mastery: "Advanced",
        level: 85,
        description: "Deep learning for anomaly detection systems.",
        particles: 13
      },
      { 
        name: "NLP Processing", 
        mastery: "Advanced",
        level: 82,
        description: "Natural language understanding and analysis.",
        particles: 11
      },
      { 
        name: "scikit-learn", 
        mastery: "Proficient",
        level: 80,
        description: "Machine learning for classification tasks.",
        particles: 9
      },
      { 
        name: "Deep Learning", 
        mastery: "Advanced",
        level: 83,
        description: "LSTM networks for sequence analysis.",
        particles: 10
      }
    ]
  },
  {
    category: "Development Tools",
    tagline: "Professional Workflow",
    description: "I use industry-standard tools for efficient, reliable development",
    icon: Rocket,
    chaos: "⚡",
    color: "from-primary/15 to-accent/30",
    borderColor: "border-primary/25",
    weapons: [
      { 
        name: "Git & GitHub", 
        mastery: "Expert",
        level: 94,
        description: "Version control and collaborative development.",
        particles: 12
      },
      { 
        name: "Docker", 
        mastery: "Proficient",
        level: 78,
        description: "Containerization for consistent deployments.",
        particles: 8
      },
      { 
        name: "Jest & Cypress", 
        mastery: "Advanced",
        level: 82,
        description: "Comprehensive testing strategies.",
        particles: 9
      },
      { 
        name: "CI/CD Pipelines", 
        mastery: "Proficient",
        level: 80,
        description: "Automated deployment and integration.",
        particles: 7
      }
    ]
  }
]

interface WeaponCardProps {
  weapon: {
    name: string
    mastery: string
    level: number
    description: string
    particles: number
  }
  index: number
  categoryIndex: number
  isInView: boolean
}

function WeaponCard({ weapon, index, categoryIndex, isInView }: WeaponCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
      transition={{ 
        delay: categoryIndex * 0.2 + index * 0.1,
        duration: 0.6,
        type: "spring",
        damping: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particle system */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {Array.from({ length: weapon.particles }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: isHovered ? [0.4, 1, 0.4] : [0.1, 0.3, 0.1],
              scale: isHovered ? [1, 1.5, 1] : [0.5, 1, 0.5],
              x: isHovered ? Math.random() * 20 - 10 : 0,
              y: isHovered ? Math.random() * 20 - 10 : 0,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Main card */}
      <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-3 sm:p-4 group-hover:border-accent/50 transition-all duration-300">
        <div className="space-y-2 sm:space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-bold text-foreground group-hover:text-accent transition-colors text-sm sm:text-base truncate">
              {weapon.name}
            </h4>
            <motion.span 
              className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full font-bold whitespace-nowrap"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? [0, 5, -5, 0] : 0
              }}
            >
              {weapon.mastery}
            </motion.span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            {weapon.description}
          </p>

          {/* Responsive level visualization */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Mastery Level</span>
              <span className="text-accent font-bold">{weapon.level}%</span>
            </div>
            
            {/* Chaotic visualization - Mobile optimized */}
            <div className="relative h-5 sm:h-6 bg-muted/50 rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/60 to-primary/60"
                style={{
                  clipPath: `polygon(0 0, ${weapon.level}% 0, ${weapon.level - 5}% 100%, 0 100%)`,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ 
                  delay: categoryIndex * 0.3 + index * 0.1 + 0.5,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              />
              
              {/* Glitch effect overlay */}
              <motion.div
                className="absolute inset-0 bg-accent/20"
                animate={{
                  x: isHovered ? [0, 2, -2, 0] : 0,
                  opacity: isHovered ? [0, 0.3, 0] : 0,
                }}
                transition={{ duration: 0.1, repeat: isHovered ? 3 : 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 lg:py-32 px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Chaotic background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/3 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/4 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 0.8, 1],
            x: [0, -20, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Revolutionary Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, skewX: 3 }}
          animate={isInView ? { opacity: 1, y: 0, skewX: 0 } : { opacity: 0, y: 50, skewX: 3 }}
          transition={{ duration: 0.8, type: "spring", damping: 25 }}
          className="text-center mb-20"
        >
          <div className="relative">
            <motion.div
              className="absolute -top-8 -right-8 text-8xl font-bold text-accent/10 pointer-events-none"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              ⚡
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
              Arsenal of
              <motion.span 
                className="block text-accent italic -mt-2 ml-8 md:ml-16"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Disruption
              </motion.span>
            </h2>
            
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
                Weapons of mass creation. Each tool mastered to surgical precision.
              </p>
              <p className="text-accent font-medium tracking-wider uppercase text-sm">
                No boring progress bars here
              </p>
            </motion.div>
              </div>
        </motion.div>

        {/* Weapon Categories */}
        <div className="space-y-20">
          {skillWeapons.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
                  <motion.div
                key={category.category}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -100 : 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: categoryIndex % 2 === 0 ? -100 : 100 }}
                    transition={{ 
                  delay: categoryIndex * 0.3,
                  duration: 0.8,
                  type: "spring",
                  damping: 25
                }}
                className="relative"
              >
                {/* Responsive Category Header */}
                <div className={`flex flex-col sm:flex-row items-center mb-8 sm:mb-12 text-center sm:text-left ${categoryIndex % 2 === 1 ? 'sm:justify-end' : ''}`}>
                  <div className={`mb-4 sm:mb-0 ${categoryIndex % 2 === 1 ? 'sm:order-2' : ''}`}>
                    <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center border ${category.borderColor} shadow-lg mx-auto sm:mx-0`}>
                      <Icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-accent" />
                    </div>
                    </div>
                    
                  <div className={`flex-1 max-w-md ${categoryIndex % 2 === 1 ? 'sm:text-right sm:order-1 sm:mr-8' : 'sm:ml-8'}`}>
                    <div className={`flex ${categoryIndex % 2 === 1 ? 'sm:flex-row-reverse sm:justify-start' : 'flex-row'} items-center space-x-3 mb-6`}>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                        {category.category}
                      </h3>
                      <motion.span 
                        className="text-2xl sm:text-3xl text-accent/60"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        {category.chaos}
                      </motion.span>
                    </div>
                    <p className="text-accent font-medium tracking-wider uppercase text-xs sm:text-sm mb-3">
                      {category.tagline}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base ">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Responsive Weapons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {category.weapons.map((weapon, index) => (
                    <WeaponCard 
                      key={weapon.name}
                      weapon={weapon}
                      index={index}
                      categoryIndex={categoryIndex}
                      isInView={isInView}
                    />
                ))}
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}