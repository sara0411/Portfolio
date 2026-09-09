'use client'

import React from 'react'
import { ArrowUp } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolioData'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-background text-sm">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Identity & Copyright */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="font-bold text-foreground font-sans">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-muted-foreground font-mono text-xs">
              · Software Engineer
            </span>
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} Sara Ferraa. Built with Next.js, TypeScript & Tailwind CSS.
          </p>
        </div>

        {/* Social & Utility Links */}
        <div className="flex items-center space-x-4 font-mono text-xs">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Resume
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-1.5 rounded-md border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-2"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}