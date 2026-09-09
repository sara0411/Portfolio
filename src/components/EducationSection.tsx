'use client'

import React from 'react'
import { GraduationCap, Award } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolioData'

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            06 / Education & Verification
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
            Academic Background & Certifications
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            Formal computing education and industry-recognized enterprise certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground font-sans">
                  Academic Studies
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  Software Engineering Focus
                </span>
              </div>
            </div>

            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-semibold text-base text-foreground">
                  {edu.degree}
                </h4>
                <div className="text-xs font-mono text-muted-foreground">
                  {edu.institution}
                </div>
                <p className="text-sm text-muted-foreground pt-2 leading-relaxed">
                  {edu.focus}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground font-sans">
                  Enterprise Certifications
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  Industry Verification
                </span>
              </div>
            </div>

            {PORTFOLIO_DATA.certifications.map((cert) => (
              <div key={cert.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-base text-foreground">
                    {cert.name}
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    Certified
                  </span>
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  Issuer: {cert.issuer}
                </div>
                <p className="text-sm text-muted-foreground pt-2 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
