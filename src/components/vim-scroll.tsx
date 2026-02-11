import { useEffect, useState } from "react"

export function VimScroll() {
    const [, setKeys] = useState<string[]>([])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            ) {
                return
            }

            if (e.key === "j") {
                window.scrollBy({ top: 100, behavior: "smooth" })
            } else if (e.key === "k") {
                window.scrollBy({ top: -100, behavior: "smooth" })
            } else if (e.key === "d" && e.ctrlKey) {
                e.preventDefault()
                window.scrollBy({ top: window.innerHeight / 2, behavior: "smooth" })
            } else if (e.key === "u" && e.ctrlKey) {
                e.preventDefault()
                window.scrollBy({ top: -window.innerHeight / 2, behavior: "smooth" })
            } else if (e.key === "G") {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
            } else if (e.key === "g") {
                setKeys((prev) => {
                    const newKeys = [...prev, "g"]
                    if (newKeys.slice(-2).join("") === "gg") {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                        return []
                    }
                    return newKeys
                })

                setTimeout(() => {
                    setKeys([])
                }, 500)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return null
}
