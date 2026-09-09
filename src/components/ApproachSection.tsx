'use client'

import React from 'react'
import { PORTFOLIO_DATA } from '@/data/portfolioData'

export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-border bg-background"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            05 / Engineering Mindset
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
            System & Development Philosophy
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            Software engineering is fundamentally about building systems that remain reliable, auditable, and maintainable over time.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.principles.map((principle, index) => (
            <div
              key={principle.title}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors shadow-xs"
            >
              <div className="flex items-center space-x-2.5 mb-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold">
                  0{index + 1}
                </span>
                <h3 className="text-lg font-bold text-foreground font-sans">
                  {principle.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-8.5">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
