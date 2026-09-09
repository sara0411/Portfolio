'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, FileText, Layers, Server, Cpu, Workflow } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolioData'

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const focusAreas = [
    { label: "Backend Systems", icon: Server, detail: "APIs, Microservices, Relational DBs" },
    { label: "Enterprise Platforms", icon: Layers, detail: "ServiceNow, ITSM, Service Catalog" },
    { label: "Workflow Automation", icon: Workflow, detail: "Flow Designer, Process Integration" },
    { label: "Applied Machine Learning", icon: Cpu, detail: "Sequence Models, NLP, Scikit-learn" },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-muted/20"
    >
      {/* Subtle technical background grid */}
      <div className="absolute inset-0 technical-grid opacity-50 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto w-full">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border bg-card/80 text-xs font-mono text-muted-foreground mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{PORTFOLIO_DATA.personal.availability}</span>
        </motion.div>

        {/* Name and Primary Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground font-sans">
            {PORTFOLIO_DATA.personal.name}
          </h1>

          <div className="flex items-center space-x-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary font-mono tracking-tight">
              {PORTFOLIO_DATA.personal.title}
            </h2>
          </div>
        </motion.div>

        {/* Engineering Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed"
        >
          {PORTFOLIO_DATA.personal.bioShort}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-sm"
        >
          <button
            onClick={() => scrollToSection('#projects')}
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-all shadow-xs"
          >
            <span>View Projects</span>
            <ArrowDown className="ml-2 w-4 h-4" />
          </button>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-3 rounded-md border border-border bg-card hover:bg-muted/60 text-foreground transition-colors"
          >
            <Github className="mr-2 w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-3 rounded-md border border-border bg-card hover:bg-muted/60 text-foreground transition-colors"
          >
            <Linkedin className="mr-2 w-4 h-4 text-primary" />
            <span>LinkedIn</span>
          </a>

          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-3 rounded-md border border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary font-medium transition-colors"
          >
            <FileText className="mr-2 w-4 h-4" />
            <span>Resume</span>
          </a>
        </motion.div>

        {/* Technical Focus Grid (Credible signal of range without overwhelming) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {focusAreas.map((area) => {
            const Icon = area.icon
            return (
              <div
                key={area.label}
                className="p-3.5 rounded-lg border border-border/80 bg-card/60 backdrop-blur-xs hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center space-x-2 text-foreground font-mono text-xs sm:text-sm font-semibold mb-1">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{area.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  {area.detail}
                </p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}