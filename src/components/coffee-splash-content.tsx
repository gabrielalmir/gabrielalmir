import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { LazyDevIcon } from '@/components/lazy-devicon';
import { Cpu, Terminal as TerminalIcon, XCircle, Zap } from 'lucide-react';
import { useEffect, useReducer, useRef } from 'react';

type SplashStep = 'boot' | 'system' | 'ready';

type SplashState = {
    show: boolean;
    step: SplashStep;
    logs: string[];
};

type SplashAction =
    | { type: 'appendLog'; value: string }
    | { type: 'setStep'; value: SplashStep }
    | { type: 'hide' };

const initialState: SplashState = {
    show: true,
    step: 'boot',
    logs: [],
};

function splashReducer(state: SplashState, action: SplashAction): SplashState {
    switch (action.type) {
        case 'appendLog':
            return { ...state, logs: [...state.logs, action.value] };
        case 'setStep':
            return { ...state, step: action.value };
        case 'hide':
            return { ...state, show: false };
        default:
            return state;
    }
}

export default function CoffeeSplashContent() {
    const [state, dispatch] = useReducer(splashReducer, initialState);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [state.logs]);

    useEffect(() => {
        if (!state.show) {
            return;
        }

        const bootSequence = [
            { text: 'Bios Check... OK', delay: 200 },
            { text: 'Loading Kernel... Linux 6.8.9-arch1-1', delay: 400 },
            { text: 'Mounting /dev/nvme0n1p2 on /... OK', delay: 600 },
            { text: 'Starting Systemd... OK', delay: 800 },
            { text: 'Loading Vesper Theme Modules... OK', delay: 1000 },
            { text: 'Initializing Graphics Interface... OK', delay: 1200 },
            { text: 'Connecting to Neural Network... OK', delay: 1600 },
            { text: 'System Ready.', delay: 2000 },
        ];

        const timeoutIds: number[] = [];
        let currentIndex = 0;

        const processLogs = () => {
            if (currentIndex >= bootSequence.length) {
                dispatch({ type: 'setStep', value: 'system' });
                timeoutIds.push(window.setTimeout(() => dispatch({ type: 'setStep', value: 'ready' }), 800));
                timeoutIds.push(window.setTimeout(() => dispatch({ type: 'hide' }), 2500));
                return;
            }

            const log = bootSequence[currentIndex];
            dispatch({
                type: 'appendLog',
                value: `[${new Date().toLocaleTimeString('pt-BR', { hour12: false })}] ${log.text}`,
            });

            currentIndex += 1;
            const nextDelay = log.delay - (currentIndex > 0 ? bootSequence[currentIndex - 1].delay : 0);
            timeoutIds.push(window.setTimeout(processLogs, nextDelay));
        };

        timeoutIds.push(window.setTimeout(processLogs, 500));

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                dispatch({ type: 'hide' });
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            timeoutIds.forEach((id) => window.clearTimeout(id));
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [state.show]);

    if (!state.show) {
        return null;
    }

    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                {state.show && (
                    <m.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center font-mono overflow-hidden"
                    >
                        <div className="absolute inset-0 pointer-events-none z-50 bg-scanline opacity-10"></div>
                        <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>

                        <div className="w-full max-w-3xl p-6 md:p-12 relative z-10">
                            {state.step === 'boot' && (
                                <div className="space-y-1 text-green-500/80 text-xs md:text-sm font-mono">
                                    {state.logs.map((log) => (
                                        <m.div
                                            key={log}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="text-vesper-orange/50">root@kernel:~$</span>
                                            <span>{log}</span>
                                        </m.div>
                                    ))}
                                    <div ref={bottomRef} />
                                </div>
                            )}

                            {state.step !== 'boot' && (
                                <m.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="border border-vesper-orange/20 bg-black/80 backdrop-blur-xl rounded-lg p-8 shadow-2xl shadow-vesper-orange/10 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vesper-orange via-vesper-cyan to-vesper-orange"></div>

                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <LazyDevIcon icon="ArchlinuxPlain" size={100} />

                                        <div className="flex-1 space-y-6 w-full">
                                            <div className="flex items-center justify-between border-b border-vesper-orange/10 pb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded bg-vesper-orange/10 text-vesper-orange">
                                                        <TerminalIcon size={20} />
                                                    </div>
                                                    <div>
                                                        <h1 className="text-lg font-bold text-white tracking-wide">GABRIEL ALMIR</h1>
                                                        <p className="text-xs text-vesper-orange/60">Fullstack System v2.0</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="space-y-1">
                                                    <div className="text-gray-500 text-xs uppercase tracking-wider">Role</div>
                                                    <div className="text-vesper-cyan font-bold flex items-center gap-2">
                                                        <Cpu size={14} /> Backend Engineer
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-gray-500 text-xs uppercase tracking-wider">Status</div>
                                                    <div className="text-green-400 font-bold flex items-center gap-2">
                                                        <Zap size={14} /> Online & Ready
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-gray-500 text-xs uppercase tracking-wider">Location</div>
                                                    <div className="text-white">Itapira-SP, BR</div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-gray-500 text-xs uppercase tracking-wider">Uptime</div>
                                                    <div className="text-white">99.9%</div>
                                                </div>
                                            </div>

                                            <div className="pt-4 flex justify-between items-center">
                                                <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden mr-4">
                                                    <m.div
                                                        initial={{ width: '0%' }}
                                                        animate={{ width: '100%' }}
                                                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                                                        className="h-full bg-vesper-orange shadow-[0_0_10px_rgba(255,199,153,0.5)]"
                                                    />
                                                </div>
                                                <span className="text-xs text-vesper-orange animate-pulse">LOADING ASSETS...</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => dispatch({ type: 'hide' })}
                                        className="absolute bottom-4 right-4 text-[10px] text-gray-600 hover:text-white transition-colors flex items-center gap-1"
                                    >
                                        <XCircle size={10} /> ESC to Skip
                                    </button>
                                </m.div>
                            )}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}
