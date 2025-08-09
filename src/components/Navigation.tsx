'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Zap, Code, User, FolderOpen, Mail } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const navigationItems = [
  { href: '#hero', label: 'Home', icon: Zap, chaos: '∆', description: 'Entry' },
  { href: '#about', label: 'About', icon: User, chaos: '◊', description: 'Reality' },
  { href: '#projects', label: 'Projects', icon: FolderOpen, chaos: '⧫', description: 'Chaos' },
  { href: '#skills', label: 'Skills', icon: Code, chaos: '⚡', description: 'Arsenal' },
  { href: '#contact', label: 'Contact', icon: Mail, chaos: '※', description: 'Nexus' },
]

export default function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Advanced scroll effect with hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Smooth scroll to section with chaos
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-lg border-b border-accent/20 shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.25, 0.1, 0.25, 1] as const,
        type: "spring",
        damping: 25,
        stiffness: 200
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Chaotic Logo */}
          <motion.div
            className="relative font-serif text-xl font-bold text-foreground"
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            whileHover={{ 
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.2 }
            }}
          >
            <span className="relative">
              Sara 
              <motion.span 
                className="text-accent ml-1"
                animate={{ 
                  rotateY: [0, 180, 360],
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                ◊
              </motion.span>
              <span className="block text-sm text-muted-foreground font-light -mt-1 tracking-wider">
                DISRUPTION
              </span>
            </span>
          </motion.div>

          {/* Orbital Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative group px-4 py-3 text-sm font-medium transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.1, 
                    duration: 0.5,
                    type: "spring",
                    damping: 20,
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Background morphing shape */}
                  <motion.div
                    className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100"
                    style={{
                      clipPath: hoveredItem === item.href 
                        ? "polygon(20% 0%, 80% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)"
                        : "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon and Chaos Symbol */}
                  <div className="relative flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    <span className="text-accent font-bold text-lg opacity-70 group-hover:opacity-100">
                      {item.chaos}
                    </span>
                  </div>
                  
                  {/* Hover description */}
                  <AnimatePresence>
                    {hoveredItem === item.href && (
                      <motion.div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-card/90 backdrop-blur-sm border border-accent/30 rounded-lg px-3 py-1 text-xs font-medium text-accent shadow-lg">
                          {item.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </div>

          {/* Theme & Mobile Chaos */}
          <div className="flex items-center space-x-4">
            {/* Reality Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative p-3 rounded-full text-muted-foreground hover:text-accent transition-all duration-300 border border-transparent hover:border-accent/30 group"
              whileHover={{ 
                scale: 1.1,
                rotate: 180,
                borderRadius: ["50%", "25%", "50%"]
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/10 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 relative z-10" />
              ) : (
                <Moon className="w-5 h-5 relative z-10" />
              )}
            </motion.button>

            {/* Chaos Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative p-3 rounded-lg text-muted-foreground hover:text-accent transition-all duration-300 border border-accent/20 group overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(215, 108, 130, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-accent/10"
                animate={{ 
                  x: isMobileMenuOpen ? 0 : "-100%"
                }}
                transition={{ duration: 0.3 }}
              />
              
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Chaotic Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-accent/20 bg-card/95 backdrop-blur-lg"
              initial={{ opacity: 0, height: 0, rotateX: -90 }}
              animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
              exit={{ opacity: 0, height: 0, rotateX: -90 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.1, 0.25, 1] as const,
                type: "spring",
                damping: 25
              }}
              style={{ transformOrigin: "top" }}
            >
              <div className="py-6 px-4 space-y-3">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="group relative w-full flex items-center space-x-4 px-6 py-4 text-left font-medium transition-all duration-300 hover:bg-accent/10 rounded-xl border border-transparent hover:border-accent/30"
                      initial={{ opacity: 0, x: -30, rotate: -5 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.4,
                        type: "spring",
                        damping: 20
                      }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Chaos background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 rounded-xl"
                        style={{
                          clipPath: "polygon(0% 0%, 95% 0%, 100% 70%, 90% 100%, 0% 100%)"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <Icon className="w-5 h-5 text-accent relative z-10" />
                      <span className="text-lg text-accent font-bold relative z-10">
                        {item.chaos}
                      </span>
                      <div className="relative z-10">
                        <span className="text-foreground group-hover:text-accent transition-colors">
                          {item.label}
                        </span>
                        <span className="block text-xs text-muted-foreground font-light tracking-wider uppercase">
                          {item.description}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}