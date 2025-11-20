"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface TypingEffectProps {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypingEffect({
  words,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        } else {
          // Finished typing word
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1))
        } else {
          // Finished deleting
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={cn("font-mono inline-block min-w-[2ch]", className)}>
      {displayText}
      <span className="animate-blink inline-block ml-1 w-[0.5em] h-[1em] bg-vesper-orange align-middle mb-1"></span>
    </span>
  )
}
