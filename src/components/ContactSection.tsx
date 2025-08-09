'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, User, MessageSquare, Send, Zap, Sparkles, Rocket, Timer } from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'sending' | 'success' | 'error'
  message: string
}

export default function ContactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  })
  
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showSecretMode, setShowSecretMode] = useState(false)

  useEffect(() => {
    // Secret mode activation
    if (formData.subject.toLowerCase().includes('chaos') || 
        formData.message.toLowerCase().includes('disrupt')) {
      setShowSecretMode(true)
    }
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setFormStatus({ type: 'sending', message: 'Transmitting chaos...' })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setFormStatus({ 
      type: 'success', 
      message: 'Message launched into the digital void! I\'ll respond within 24 hours.' 
    })
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setFormStatus({ type: 'idle', message: '' })
      setShowSecretMode(false)
    }, 3000)
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 lg:py-32 px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Chaotic Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary/4 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 0.7, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Revolutionary Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, skewX: -3 }}
          animate={isInView ? { opacity: 1, y: 0, skewX: 0 } : { opacity: 0, y: 50, skewX: -3 }}
          transition={{ duration: 0.8, type: "spring", damping: 25 }}
          className="text-center mb-20"
        >
          <div className="relative">
            <motion.div
              className="absolute -top-8 -left-8 text-8xl font-bold text-accent/10 pointer-events-none"
              animate={{ 
                rotate: [0, -15, 15, 0],
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              ※
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
              Ready to
              <motion.span 
                className="block text-accent italic -mt-2 ml-8 md:ml-16"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Disrupt?
              </motion.span>
            </h2>
            
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
                Let&apos;s create something that breaks the internet (in the best way).
              </p>
              <p className="text-accent font-medium tracking-wider uppercase text-sm">
                Warning: I respond fast and think faster
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Responsive Contact Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Side - Contact Philosophy */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/10 rounded-full blur-xl" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-accent/30 rounded-3xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Direct Line to Chaos
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-accent" />
                    <span className="text-foreground font-medium">hello@saraferraa.com</span>
                  </div>
                  
                  <div className="space-y-3 text-muted-foreground leading-relaxed">
                    <p>
                      I don&apos;t just build projects—I architect experiences that challenge conventions.
                    </p>
                    <p>
                      Ready to break some rules together? Let&apos;s discuss your wildest ideas.
                    </p>
                  </div>
                  
                  <motion.div
                    className="flex items-center space-x-2 text-accent text-sm font-medium"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Timer className="w-4 h-4" />
                    <span>Response time: Usually &lt; 4 hours</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                className="group relative p-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-6 h-6 text-accent mb-2" />
                <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  Quick Chat
                </span>
              </motion.button>
              
              <motion.button
                className="group relative p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Rocket className="w-6 h-6 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Big Project
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Chaos Contact Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          >
            {/* Secret mode indicator */}
            <AnimatePresence>
              {showSecretMode && (
                <motion.div
                  className="absolute -top-8 right-0 px-4 py-2 bg-accent/20 text-accent text-xs font-bold rounded-full border border-accent/30"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                >
                  🔥 CHAOS MODE ACTIVATED
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative bg-card/90 backdrop-blur-sm border border-accent/20 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
              {/* Form header */}
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Launch Your Project</h3>
                <p className="text-muted-foreground text-sm">Into the chaos of creativity</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div 
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === 'name' ? 'text-accent' : 'text-muted-foreground'
                      }`} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent focus:bg-accent/5 transition-all duration-300"
                        placeholder="What should I call you?"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedField === 'email' ? 'text-accent' : 'text-muted-foreground'
                      }`} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent focus:bg-accent/5 transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="space-y-2"
                  whileFocus={{ scale: 1.02 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                    Project Type
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent focus:bg-accent/5 transition-all duration-300"
                    placeholder="Website? App? Digital chaos?"
                    required
                  />
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  whileFocus={{ scale: 1.01 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
                    Your Vision
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute left-3 top-3 w-4 h-4 transition-colors ${
                      focusedField === 'message' ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent focus:bg-accent/5 transition-all duration-300 resize-none"
                      placeholder="Describe your project. The weirder, the better. I thrive on impossible ideas..."
                      required
                    />
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={formStatus.type === 'sending'}
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 ${
                    formStatus.type === 'sending'
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : showSecretMode
                      ? 'bg-gradient-to-r from-accent to-primary text-background hover:from-primary hover:to-accent shadow-lg hover:shadow-xl'
                      : 'bg-primary text-primary-foreground hover:bg-accent hover:shadow-lg'
                  }`}
                  whileHover={formStatus.type !== 'sending' ? { scale: 1.02, y: -2 } : {}}
                  whileTap={formStatus.type !== 'sending' ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {formStatus.type === 'sending' ? (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Launching...</span>
                      </motion.div>
                    ) : formStatus.type === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-2"
                      >
                        <span>🚀</span>
                        <span>Message Sent!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <Send className="w-5 h-5" />
                        <span>{showSecretMode ? 'Launch Project' : 'Send Message'}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Status message */}
                <AnimatePresence>
                  {formStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`text-center p-4 rounded-xl ${
                        formStatus.type === 'success'
                          ? 'bg-accent/10 text-accent border border-accent/20'
                          : formStatus.type === 'error'
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : 'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      {formStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}