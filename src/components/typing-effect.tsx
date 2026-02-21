import { cn } from "@/lib/utils"
import { useEffect, useReducer } from "react"

interface TypingEffectProps {
    words: string[]
    className?: string
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
}

type TypingState = {
    displayText: string
    currentWordIndex: number
    isDeleting: boolean
}

type TypingAction =
    | { type: "type-char"; value: string }
    | { type: "set-deleting"; value: boolean }
    | { type: "advance-word"; totalWords: number }

function typingReducer(state: TypingState, action: TypingAction): TypingState {
    switch (action.type) {
        case "type-char":
            return {
                ...state,
                displayText: action.value,
            }
        case "set-deleting":
            return {
                ...state,
                isDeleting: action.value,
            }
        case "advance-word":
            return {
                displayText: "",
                isDeleting: false,
                currentWordIndex: (state.currentWordIndex + 1) % action.totalWords,
            }
        default:
            return state
    }
}

export function TypingEffect({
    words,
    className,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000
}: TypingEffectProps) {
    const [state, dispatch] = useReducer(typingReducer, {
        displayText: "",
        currentWordIndex: 0,
        isDeleting: false,
    })

    useEffect(() => {
        const currentWord = words[state.currentWordIndex]

        const handleTyping = () => {
            if (!state.isDeleting) {
                if (state.displayText.length < currentWord.length) {
                    dispatch({ type: "type-char", value: currentWord.slice(0, state.displayText.length + 1) })
                } else {
                    setTimeout(() => dispatch({ type: "set-deleting", value: true }), pauseDuration)
                }
            } else if (state.displayText.length > 0) {
                dispatch({ type: "type-char", value: currentWord.slice(0, state.displayText.length - 1) })
            } else {
                dispatch({ type: "advance-word", totalWords: words.length })
            }
        }

        const timer = setTimeout(
            handleTyping,
            state.isDeleting ? deletingSpeed : typingSpeed
        )

        return () => clearTimeout(timer)
    }, [state, words, typingSpeed, deletingSpeed, pauseDuration])

    return (
        <span className={cn("font-mono inline-block min-w-[2ch]", className)}>
            {state.displayText}
            <span className="animate-blink inline-block ml-1 w-[0.5em] h-[1em] bg-vesper-orange align-middle mb-1"></span>
        </span>
    )
}
