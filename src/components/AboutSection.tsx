'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Rocket, Target, Lightbulb, Zap } from 'lucide-react'

export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activePhilosophy, setActivePhilosophy] = useState(0)

  // Disruptive philosophy statements
  const philosophies = [
    {
      title: "Chaos-Driven Problem Solving",
      description: "I dive deep into problems others avoid. The messier the challenge, the more elegant my solution becomes. Complexity is just opportunity in disguise.",
      icon: Brain,
      chaos: "◊"
    },
    {
      title: "Perpetual Evolution Mode",
      description: "While others master yesterday's tech, I'm already breaking tomorrow's rules. Every project teaches me something that reshapes how I approach the next impossible task.",
      icon: Lightbulb,
      chaos: "※"
    },
    {
      title: "Human-Centric Disruption",
      description: "I don't build for machines—I build for humans. Every algorithm, every interface, every line of code serves real people with real needs.",
      icon: Target,
      chaos: "∆"
    },
    {
      title: "Elegant Architecture Obsession",
      description: "Quick fixes are for amateurs. I craft systems that not only work beautifully today but evolve gracefully into futures we haven't imagined yet.",
      icon: Rocket,
      chaos: "⚡"
    }
  ]

  const stats = [
    { value: "4+", label: "AI Projects", description: "Machine learning solutions" },
    { value: "8+", label: "Technologies", description: "Frontend to AI/ML" },
    { value: "100%", label: "Problem Solver", description: "Finding innovative solutions" },
    { value: "24/7", label: "Learning Mode", description: "Always expanding skills" }
  ]

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 lg:py-32 px-6 lg:px-8 overflow-hidden"
    >
      {/* Chaotic Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-accent/4 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 0.6, 1],
            x: [0, 40, 0],
            y: [0, -25, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Disruptive Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, skewX: -2 }}
          animate={isInView ? { opacity: 1, y: 0, skewX: 0 } : { opacity: 0, y: 50, skewX: -2 }}
          transition={{ duration: 0.8, type: "spring", damping: 25 }}
          className="text-center mb-20"
        >
          <div className="relative">
            <motion.div
              className="absolute -top-8 -right-8 text-8xl font-bold text-accent/10 pointer-events-none"
              animate={{ 
                rotate: [0, 20, -20, 0],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              ◊
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
              Mind of
              <motion.span 
                className="block text-accent italic -mt-2 ml-8 md:ml-16"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Chaos
              </motion.span>
            </h2>
            
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
                Where conventional thinking goes to die and impossible ideas come alive.
              </p>
              <p className="text-accent font-medium tracking-wider uppercase text-sm">
                Professionally unpredictable since day one
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Responsive Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side - Responsive Portrait */}
          <motion.div 
            className="lg:col-span-5 order-2 lg:order-1 max-w-md mx-auto lg:mx-0 w-full"
            initial={{ opacity: 0, x: -80, rotate: -5 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -80, rotate: -5 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <div className="relative">
              {/* Floating elements around portrait */}
              <motion.div
                className="absolute -top-8 -right-8 w-16 h-16 bg-accent/20 rounded-full"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/30"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 0.8, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              
              {/* Responsive portrait area */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-accent/20 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder content with personality */}
                  <div className="text-center relative z-10">
                    <motion.div 
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-accent" />
                    </motion.div>
                    <p className="text-foreground font-bold text-sm sm:text-base lg:text-lg">Sara Ferraa</p>
                    <p className="text-accent text-xs sm:text-sm font-medium">Digital Disruptor</p>
                  </div>
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full">
                      <pattern id="chaos-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 0 0 L 40 40 M 40 0 L 0 40" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#chaos-pattern)" />
                    </svg>
                  </div>
                </div>

                {/* Responsive Chaos Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center p-2 sm:p-3 bg-muted/30 rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className="text-lg sm:text-xl font-bold text-accent">{stat.value}</div>
                      <div className="text-xs sm:text-xs font-medium text-foreground">{stat.label}</div>
                      <div className="text-xs text-muted-foreground">{stat.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Responsive Philosophy */}
          <motion.div 
            className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          >
            
            {/* Disruptive Bio */}
            <div className="space-y-6">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg font-medium text-foreground">
                  I turn algorithms into art and data into digital rebellion.
                </p>
                
                <p>
                  While others build standard CRUD apps, I architect LSTM networks that predict chaos in system logs. I don&apos;t just create mobile apps—I design digital companions for elderly care that understand human needs better than most humans do.
                </p>
                
                <p>
                  My code spans realms: React frontends that break design rules, .NET backends that scale impossibly, and AI models that see patterns where others see noise. I don&apos;t follow the full-stack playbook—I rewrite it.
                </p>
                
                <p className="text-accent font-medium">
                  Why build ordinary when you can architect extraordinary?
                </p>
              </div>

              {/* Philosophy Cards */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground mb-4">My Disruption Manifesto</h3>
                <div className="space-y-3">
                  {philosophies.map((philosophy, index) => {
                    const Icon = philosophy.icon
                    const isActive = activePhilosophy === index
                    
                    return (
                      <motion.div
                        key={philosophy.title}
                        className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isActive 
                            ? 'bg-accent/10 border-accent/30 shadow-lg' 
                            : 'bg-card/50 border-border/50 hover:border-accent/20'
                        }`}
                        onClick={() => setActivePhilosophy(index)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isActive ? 'bg-accent/20' : 'bg-muted/50 group-hover:bg-accent/10'
                          }`}>
                            <Icon className={`w-6 h-6 transition-colors ${
                              isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-accent'
                            }`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className={`font-bold transition-colors ${
                                isActive ? 'text-accent' : 'text-foreground group-hover:text-accent'
                              }`}>
                                {philosophy.title}
                              </h4>
                              <motion.span 
                                className="text-accent/60 text-lg"
                                animate={{ rotate: isActive ? [0, 360] : 0 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                              >
                                {philosophy.chaos}
                              </motion.span>
                            </div>
                            
                            <motion.p 
                              className="text-sm text-muted-foreground leading-relaxed"
                              animate={{ 
                                opacity: isActive ? 1 : 0.7,
                                scale: isActive ? 1 : 0.98
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {philosophy.description}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Reality Check */}
              <motion.div 
                className="relative p-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl border border-accent/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                  <h3 className="text-lg font-bold text-foreground">Current Status</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Disruption Level:</span>
                    <span className="text-accent font-bold">Maximum</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Accepting Chaos:</span>
                    <span className="text-primary font-bold">Always</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Conventional Solutions:</span>
                    <span className="text-red-500 font-bold">Forbidden</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}