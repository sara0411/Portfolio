'use client'

import React, { useState } from 'react'
import { Github, ArrowUpRight } from 'lucide-react'
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData'

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', 'Backend Systems', 'Machine Learning', 'Mobile & Full-Stack']

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeCategory)

  return (
    <section
      id="projects"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-border bg-background"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
              03 / Featured Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
              Engineering Projects
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl">
              Production-oriented backend services, automated text pipelines, and full-stack software architectures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-muted/50 border border-border self-start md:self-auto font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeCategory === cat
                    ? 'bg-foreground text-background font-medium shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {filteredProjects.map((project: Project, index: number) => (
            <div
              key={project.id}
              className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all shadow-xs"
            >
              <div className="p-6 sm:p-8">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-5 mb-6">
                  <div>
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                        Project 0{index + 1}
                      </span>
                      <span className="text-xs font-mono text-primary font-medium">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        · {project.status}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground font-sans">
                      {project.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3 shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-border bg-muted/40 hover:bg-muted text-xs font-mono font-medium text-foreground transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code Repository</span>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-md border border-primary/30 bg-primary/10 hover:bg-primary/20 text-xs font-mono font-medium text-primary transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-base text-foreground font-medium mb-6 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Problem vs Solution Architecture */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/70 space-y-1.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                      The Problem
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-1.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                      Engineering Solution
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
                  <span className="text-xs font-mono text-muted-foreground mr-2">
                    Built with:
                  </span>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-muted/60 border border-border text-foreground/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Footnote */}
        <div className="mt-12 text-center p-6 rounded-xl border border-dashed border-border bg-card/50">
          <p className="text-sm text-muted-foreground">
            Explore additional utility scripts, algorithmic implementations, and coursework repositories on GitHub.
          </p>
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 mt-3 text-sm font-mono font-medium text-foreground hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>github.com/sara0411</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}