'use client'

import React, { useState } from 'react'
import { Github, Linkedin, FileText, Check, Copy, Send, ArrowUpRight } from 'lucide-react'
import { PORTFOLIO_DATA } from '@/data/portfolioData'

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')

    // Prepare mailto link as direct, reliable fallback
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(
      formState.subject || `Inquiry from ${formState.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`

    window.location.href = mailtoUrl
    setFormStatus('submitted')
  }

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-border bg-background"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
            07 / Contact & Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2">
            Let&apos;s Connect
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            For software engineering opportunities, enterprise platform projects, or technical inquiries, feel free to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-5">
              <h3 className="font-bold text-lg text-foreground font-sans">
                Direct Channels
              </h3>

              {/* Email Card with Copy */}
              <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>Primary Email</span>
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center space-x-1 text-primary hover:underline"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="block font-mono text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </div>

              {/* Action Links */}
              <div className="space-y-2 pt-2">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors font-mono text-sm text-foreground"
                >
                  <div className="flex items-center space-x-3">
                    <Github className="w-4 h-4 text-muted-foreground" />
                    <span>GitHub Profile</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors font-mono text-sm text-foreground"
                >
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-4 h-4 text-primary" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors font-mono text-sm text-primary font-medium"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4" />
                    <span>Download Official Resume</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Recruiter Evaluation Guarantee */}
            <div className="p-4 rounded-xl border border-border bg-muted/20 text-xs text-muted-foreground space-y-1 font-mono">
              <div className="text-foreground font-semibold">Response Commitment:</div>
              <p>Inquiries regarding full-time engineering roles typically receive a response within 24–48 hours.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
              <h3 className="font-bold text-lg text-foreground font-sans mb-1">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                All inquiries are delivered directly to {PORTFOLIO_DATA.personal.email}.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono font-medium text-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-md border border-border bg-muted/30 focus:bg-card focus:border-primary text-sm text-foreground placeholder:text-muted-foreground transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-mono font-medium text-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@organization.com"
                      className="w-full px-3.5 py-2.5 rounded-md border border-border bg-muted/30 focus:bg-card focus:border-primary text-sm text-foreground placeholder:text-muted-foreground transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-mono font-medium text-foreground">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Software Engineering Role / Technical Discussion"
                    className="w-full px-3.5 py-2.5 rounded-md border border-border bg-muted/30 focus:bg-card focus:border-primary text-sm text-foreground placeholder:text-muted-foreground transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Briefly describe the engineering opportunity, project scope, or topic..."
                    className="w-full px-3.5 py-2.5 rounded-md border border-border bg-muted/30 focus:bg-card focus:border-primary text-sm text-foreground placeholder:text-muted-foreground transition-colors font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-md bg-foreground text-background font-mono text-sm font-medium hover:bg-foreground/90 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                {formStatus === 'submitted' && (
                  <p className="text-xs font-mono text-emerald-500 mt-2">
                    Message client opened. If it didn&apos;t open automatically, write directly to {PORTFOLIO_DATA.personal.email}.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}