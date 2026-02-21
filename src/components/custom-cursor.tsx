import { cn } from '@/lib/utils'
import { LazyMotion, domAnimation, m, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useReducer, useSyncExternalStore } from 'react'

type CursorState = {
    isVisible: boolean
    isPointer: boolean
    isClicking: boolean
}

type CursorAction =
    | { type: 'move' }
    | { type: 'pointer'; value: boolean }
    | { type: 'down' }
    | { type: 'up' }
    | { type: 'leave' }

const initialState: CursorState = {
    isVisible: false,
    isPointer: false,
    isClicking: false,
}

function cursorReducer(state: CursorState, action: CursorAction): CursorState {
    switch (action.type) {
        case 'move':
            return { ...state, isVisible: true }
        case 'pointer':
            return { ...state, isPointer: action.value }
        case 'down':
            return { ...state, isClicking: true }
        case 'up':
            return { ...state, isClicking: false }
        case 'leave':
            return { ...state, isVisible: false }
        default:
            return state
    }
}

export function CustomCursor() {
    const [state, dispatch] = useReducer(cursorReducer, initialState)

    const isTouchDevice = useSyncExternalStore(
        (onStoreChange) => {
            const media = window.matchMedia('(pointer: coarse)')
            media.addEventListener('change', onStoreChange)
            return () => media.removeEventListener('change', onStoreChange)
        },
        () => window.matchMedia('(pointer: coarse)').matches,
        () => true
    )

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const ringConfig = { damping: 20, stiffness: 300, mass: 0.5 }
    const dotConfig = { damping: 35, stiffness: 1500, mass: 0.1 }

    const ringX = useSpring(mouseX, ringConfig)
    const ringY = useSpring(mouseY, ringConfig)
    const dotX = useSpring(mouseX, dotConfig)
    const dotY = useSpring(mouseY, dotConfig)

    useEffect(() => {
        if (isTouchDevice) {
            return
        }

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            dispatch({ type: 'move' })
        }

        const checkPointer = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isClickable =
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null

            dispatch({ type: 'pointer', value: isClickable })
        }

        const handleMouseDown = () => dispatch({ type: 'down' })
        const handleMouseUp = () => dispatch({ type: 'up' })
        const handleMouseOut = () => dispatch({ type: 'leave' })

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mousemove', checkPointer)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mouseout', handleMouseOut)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mousemove', checkPointer)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mouseout', handleMouseOut)
        }
    }, [isTouchDevice, mouseX, mouseY])

    if (isTouchDevice) {
        return null
    }

    return (
        <LazyMotion features={domAnimation}>
            <>
                <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

                <m.div
                    className={cn(
                        'fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference',
                        !state.isVisible && 'opacity-0'
                    )}
                    style={{
                        x: dotX,
                        y: dotY,
                        translateX: '-50%',
                        translateY: '-50%'
                    }}
                >
                    <div className={cn(
                        'rounded-full bg-vesper-orange transition-all duration-150',
                        state.isPointer ? 'h-1.5 w-1.5 opacity-0' : 'h-2 w-2'
                    )} />
                </m.div>

                <m.div
                    className={cn(
                        'fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference',
                        !state.isVisible && 'opacity-0'
                    )}
                    style={{
                        x: ringX,
                        y: ringY,
                        translateX: '-50%',
                        translateY: '-50%'
                    }}
                >
                    <div
                        className={cn(
                            'rounded-full border border-vesper-orange transition-all duration-200 ease-out',
                            state.isPointer ? 'h-10 w-10 border-2 bg-vesper-orange/10' : 'h-5 w-5 border opacity-50',
                            state.isClicking && 'scale-90 bg-vesper-orange/20'
                        )}
                    />
                </m.div>
            </>
        </LazyMotion>
    )
}
