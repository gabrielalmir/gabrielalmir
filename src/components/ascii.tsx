import { cn } from "@/lib/utils"

interface AsciiProps {
  className?: string
}

export function Ascii({ className }: AsciiProps) {
  return (
    <pre className={cn("text-[0.5rem] sm:text-sm md:text-base lg:text-lg font-fira whitespace-pre", className)}>
      {`
 █████╗ ██╗     ███╗   ███╗██╗██████╗
██╔══██╗██║     ████╗ ████║██║██╔══██╗
███████║██║     ██╔████╔██║██║██████╔╝
██╔══██║██║     ██║╚██╔╝██║██║██╔══██╗
██║  ██║███████╗██║ ╚═╝ ██║██║██║  ██║
╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝
`.trim()}
    </pre>
  )
}
