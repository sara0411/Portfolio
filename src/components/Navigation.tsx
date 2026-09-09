'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, FileText, ArrowUpRight } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { PORTFOLIO_DATA } from '@/data/portfolioData'

const navigationItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#approach', label: 'Approach' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-xs'
          : 'bg-background/40 backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Identity */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#hero')
            }}
            className="flex items-center space-x-3 group focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-md bg-foreground text-background flex items-center justify-center font-mono font-bold text-sm tracking-tight">
              SF
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-base tracking-tight leading-tight group-hover:text-primary transition-colors">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-xs text-muted-foreground font-mono leading-none mt-0.5">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors font-mono"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Resume, Theme Toggle, Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Resume Button */}
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-md transition-colors font-mono shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors border border-border"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open mobile navigation menu"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-1 shadow-lg"
          >
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors text-left font-mono"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-40" />
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">
                {PORTFOLIO_DATA.personal.availability}
              </span>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-medium text-primary hover:underline flex items-center space-x-1"
              >
                <span>View Resume</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}