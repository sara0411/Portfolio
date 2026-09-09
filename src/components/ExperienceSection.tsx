'use client'

import React from 'react'
import { Award } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolioData'

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            02 / Engineering Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
            Enterprise Platforms & Software Development
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            Real-world enterprise system engineering, workflow automation, and distributed software solutions.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {PORTFOLIO_DATA.experience.map((exp, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 sm:p-8 transition-all hover:border-primary/40 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-5 mb-5">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {exp.type}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1.5 font-sans">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-medium text-muted-foreground font-mono mt-0.5">
                    {exp.organization}
                  </div>
                </div>
              </div>

              {/* Responsibilities & Achievements */}
              <div className="space-y-3 mb-6">
                {exp.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start space-x-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary font-mono text-base font-bold shrink-0 leading-tight">
                      ›
                    </span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Used */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/80">
                <span className="text-xs font-mono text-muted-foreground mr-2">
                  Environment:
                </span>
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-muted/60 border border-border text-foreground/85"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Specialization Callout */}
        <div className="mt-8 p-5 sm:p-6 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm sm:text-base text-foreground">
                ServiceNow Certified System Administrator (CSA)
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Formal verification in enterprise platform administration, ITSM lifecycles, Service Catalog design, and automated Flow Designer workflows.
            </p>
          </div>
          <div className="shrink-0">
            <span className="text-xs font-mono px-3 py-1.5 rounded border border-primary/30 bg-card text-foreground font-medium">
              Verified Credential
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
