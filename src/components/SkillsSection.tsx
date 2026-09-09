'use client'

import React from 'react'
import { Code, Server, Database, Workflow, Cpu, Smartphone, Wrench } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolioData'

export default function SkillsSection() {
  const categoryIcons: Record<string, React.ElementType> = {
    "Languages": Code,
    "Backend & APIs": Server,
    "Databases": Database,
    "Enterprise & Automation": Workflow,
    "AI & Data": Cpu,
    "Frontend & Mobile": Smartphone,
    "Engineering Tools": Wrench,
  }

  return (
    <section
      id="skills"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            04 / Technical Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
            Engineering Skills Architecture
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            A structured breakdown of languages, frameworks, and engineering tools applied across production platforms and software projects.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((category) => {
            const Icon = categoryIcons[category.title] || Code
            return (
              <div
                key={category.title}
                className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-border">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-base text-foreground font-sans">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-muted/50 text-foreground border border-border/70 hover:border-foreground/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>{category.skills.length} core tools</span>
                  <span className="text-primary font-medium">Active practice</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}