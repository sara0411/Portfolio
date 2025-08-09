'use client'

import { useEffect, useState } from 'react'
import Navigation from './Navigation'

export default function NavigationWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="font-serif font-semibold text-xl lg:text-2xl text-foreground">
              
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return <Navigation />
}
