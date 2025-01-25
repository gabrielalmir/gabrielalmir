"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface TypingEffectProps {
  text: string
  className?: string
  delay?: number
}

export function TypingEffect({ text, className, delay = 50 }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return (
    <div className={cn("font-mono", className)}>
      {displayText}
      <span className="animate-blink">_</span>
    </div>
  )
}
