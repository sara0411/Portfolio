'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolioData'

export default function AboutSection() {
  const coreCompetencies = [
    {
      title: "Backend & Systems Design",
      desc: "Architecting modular service layers, RESTful APIs, and relational schemas using Java, Python, C#, and SQL."
    },
    {
      title: "Enterprise Automation",
      desc: "Translating business processes into reliable, auditable automated workflows using ServiceNow and Flow Designer."
    },
    {
      title: "Applied Machine Learning",
      desc: "Designing sequence classification and text analysis pipelines with scikit-learn, TensorFlow, and Pandas."
    },
    {
      title: "Cross-Functional Delivery",
      desc: "Collaborating across full software lifecycles with Git, Docker, CI/CD practices, and modern web/mobile interfaces."
    }
  ]

  return (
    <section
      id="about"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-border bg-background"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            01 / Professional Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
            Engineering Systems End-to-End
          </h2>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {PORTFOLIO_DATA.about.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-mono font-semibold text-foreground uppercase tracking-wider mb-3">
                Core Engineering Stack
              </h3>
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-mono text-foreground">
                {['Java', 'Python', 'C#', 'JavaScript', 'SQL', 'ServiceNow', 'REST APIs', 'PostgreSQL', 'Docker'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-muted/60 border border-border text-foreground/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Structured Highlights Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-xs font-semibold text-foreground uppercase">
                  Technical Pillars
                </span>
                <span className="text-xs font-mono text-primary font-medium">
                  Verified Capabilities
                </span>
              </div>

              <div className="space-y-4">
                {coreCompetencies.map((comp) => (
                  <div key={comp.title} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {comp.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-normal">
                        {comp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Location: Remote / Hybrid</span>
                <span className="text-foreground font-medium">Full-Time Focus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}