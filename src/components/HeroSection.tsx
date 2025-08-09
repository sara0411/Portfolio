'use client'

import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])
  
  const springConfig = { damping: 100, stiffness: 400 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const x = clientX - innerWidth / 2
      const y = clientY - innerHeight / 2
      
      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Chaotic animation variants
  const chaosVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotate: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        mass: 1.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const glitchText = {
    hidden: { 
      opacity: 0,
      y: 50,
      skewX: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      skewX: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 200,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.02,
      skewX: 1,
      transition: { duration: 0.2 }
    }
  }

  const floatingElement = {
    y: [-20, 20, -20],
    rotate: [0, 360],
    scale: [1, 1.1, 1],
  }
  
  const floatingTransition = {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut" as const
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Chaotic Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Main floating shapes */}
        <motion.div 
          animate={floatingElement}
          transition={floatingTransition}
          className="absolute top-[15%] right-[20%] w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/30"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            filter: "blur(1px)",
          }}
        />
        
        <motion.div 
          animate={floatingElement}
          transition={{ ...floatingTransition, delay: 2 }}
          className="absolute bottom-[25%] left-[15%] w-24 h-24 bg-gradient-to-tl from-primary/25 to-accent/20 rounded-full"
        />
        
        <motion.div 
          animate={floatingElement}
          transition={{ ...floatingTransition, delay: 4 }}
          className="absolute top-[60%] right-[35%] w-16 h-40 bg-accent/15"
          style={{
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
            transform: "rotate(25deg)",
          }}
        />

        {/* Broken grid lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full">
            <defs>
              <pattern id="brokenGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M 20 0 L 20 60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7"/>
                <path d="M 0 30 L 80 30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#brokenGrid)" />
          </svg>
        </div>

        {/* Interactive parallax shapes */}
        <motion.div
          className="absolute top-[30%] left-[70%] w-8 h-8 bg-accent/30 rounded-full"
          style={{
            x: useTransform(mouseX, [0, 1000], [0, 50]),
            y: useTransform(mouseY, [0, 1000], [0, 30]),
          }}
        />
        
        <motion.div
          className="absolute bottom-[40%] right-[80%] w-6 h-6 bg-primary/40"
          style={{
            x: useTransform(mouseX, [0, 1000], [0, -30]),
            y: useTransform(mouseY, [0, 1000], [0, -20]),
            rotate: useTransform(mouseX, [0, 1000], [0, 180]),
          }}
        />
      </div>

      {/* Main Content - Broken Grid Layout */}
      <motion.div 
        className="relative z-10 w-full max-w-6xl mx-auto"
        style={{
          perspective: 1000,
          rotateX: springRotateX,
          rotateY: springRotateY,
        }}
      >
        <motion.div
          variants={chaosVariants}
          initial="hidden"
          animate="visible"
          className="min-h-screen flex flex-col justify-center py-20 relative"
        >
          {/* Responsive broken layout */}
          <div className="grid grid-cols-12 gap-4 lg:gap-6 items-center">
            
            {/* Name - Better responsive positioning */}
            <motion.div 
              variants={glitchText}
              whileHover="hover"
              className="col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-2 lg:col-span-6 lg:col-start-1 xl:col-span-5 xl:col-start-2"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif font-bold text-foreground leading-[0.9] tracking-tight">
                Sara
                <motion.span 
                  className="block text-accent font-light italic -mt-2 sm:-mt-3 md:-mt-4 ml-4 sm:ml-6 md:ml-8 lg:ml-12 xl:ml-16 2xl:ml-20"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Ferraa
                </motion.span>
              </h1>
            </motion.div>

            {/* Floating tagline - Better responsive positioning */}
            <motion.div 
              className="col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8 mt-8 lg:mt-0"
              initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed font-light">
                  I don&apos;t build websites.
                  <br />
                  <span className="text-foreground font-medium">I architect digital disruption.</span>
                  <br />
                  <span className="text-accent text-xs sm:text-xs uppercase tracking-wider">Out-of-the-box thinking included</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA area - Better mobile layout */}
          <motion.div 
            className="mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-lg mx-auto lg:max-w-none lg:justify-start lg:ml-8 xl:ml-16">
              {/* Asymmetric button design */}
              <motion.button
                onClick={scrollToAbout}
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-medium overflow-hidden text-sm sm:text-base"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-accent origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">See My Chaos</span>
              </motion.button>
              
              {/* Glitch-style outline button */}
              <motion.button
                onClick={scrollToContact}
                className="relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-accent text-accent font-medium bg-transparent overflow-hidden group text-sm sm:text-base"
                whileHover={{ 
                  boxShadow: "0 0 20px rgba(215, 108, 130, 0.3)",
                  borderColor: "rgba(215, 108, 130, 1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-accent/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 group-hover:text-accent-dark transition-colors">
                  Start a Project
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Scroll indicator - Better positioning */}
          <motion.div
            className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 lg:right-12"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <motion.div
              className="w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-accent to-transparent relative"
              animate={{ 
                height: [50, 70, 50],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="absolute bottom-0 w-2 h-2 bg-accent rounded-full -ml-0.5"
                animate={{ y: [0, -50, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cursor follower effect */}
      {isHovering && (
        <motion.div
          className="fixed w-4 h-4 bg-accent/30 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}
    </section>
  )
}