'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.5 })

  return (
    <footer 
      ref={footerRef}
      className="py-12 px-6 lg:px-8 border-t border-border"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="max-w-7xl mx-auto text-center"
      >
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Sara Ferraa. Crafted with care and attention to detail.
        </p>
      </motion.div>
    </footer>
  )
}