"use client"

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Separate springs for ring (smooth) and dot (snappy)
  const ringConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const dotConfig = { damping: 35, stiffness: 1500, mass: 0.1 }

  const ringX = useSpring(mouseX, ringConfig)
  const ringY = useSpring(mouseY, ringConfig)
  const dotX = useSpring(mouseX, dotConfig)
  const dotY = useSpring(mouseY, dotConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const checkPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null

      setIsPointer(isClickable)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousemove', checkPointer)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseout', () => setIsVisible(false))

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousemove', checkPointer)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseout', () => setIsVisible(false))
    }
  }, [mouseX, mouseY])

  // Disable on touch devices entirely
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main Snappy Dot (Precision) */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference",
          !isVisible && "opacity-0"
        )}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      >
        <div className={cn(
           "rounded-full bg-vesper-orange transition-all duration-150",
           isPointer ? "h-1.5 w-1.5 opacity-0" : "h-2 w-2"
        )} />
      </motion.div>

      {/* Trailing Ring (Aesthetic) */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference",
          !isVisible && "opacity-0"
        )}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      >
        <div
          className={cn(
            "rounded-full border border-vesper-orange transition-all duration-200 ease-out",
            isPointer ? "h-10 w-10 border-2 bg-vesper-orange/10" : "h-5 w-5 border opacity-50",
            isClicking && "scale-90 bg-vesper-orange/20"
          )}
        />
      </motion.div>
    </>
  )
}
