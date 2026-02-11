import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

interface TechMarqueeProps {
    items: string[]
    direction?: "left" | "right"
    speed?: "fast" | "normal" | "slow"
    className?: string
}

export function TechMarquee({
    items,
    direction = "left",
    speed = "normal",
    className
}: TechMarqueeProps) {
    const [start, setStart] = useState(false)

    useEffect(() => {
        setStart(true)
    }, [])

    const speedDuration = {
        fast: "20s",
        normal: "40s",
        slow: "60s",
    }

    return (
        <div className={cn("w-full overflow-hidden py-2", className)}>
            <div
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4",
                    start && "animate-scroll-x"
                )}
                style={{
                    "--scroll-duration": speedDuration[speed],
                    "--scroll-direction": direction === "left" ? "normal" : "reverse",
                    animationDirection: "var(--scroll-direction)",
                    animationDuration: "var(--scroll-duration)"
                } as React.CSSProperties}
            >
                {[...items, ...items, ...items].map((item, idx) => (
                    <span
                        key={idx}
                        className="flex items-center justify-center px-4 py-2 text-sm font-mono text-vesper-orange/60 border border-vesper-orange/10 rounded bg-background/50 whitespace-nowrap hover:border-vesper-orange/40 hover:text-vesper-orange transition-colors cursor-default"
                    >
                        {item}
                    </span>
                ))}
            </div>
            <style>{`
        @keyframes scroll-x {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll-x {
          animation: scroll-x linear infinite;
        }
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    )
}
