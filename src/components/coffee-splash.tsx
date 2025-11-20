'use client';

import { ArchlinuxPlain } from 'devicons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cpu, Terminal as TerminalIcon, XCircle, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function CoffeeSplash() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<'boot' | 'system' | 'ready'>('boot');
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('vesper-splash-seen-v2');
    if (!hasSeenSplash) {
      setShow(true);
      localStorage.setItem('vesper-splash-seen-v2', 'true');
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    if (!show) return;

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

    let currentIndex = 0;

    const processLogs = () => {
      if (currentIndex >= bootSequence.length) {
        setStep('system');
        setTimeout(() => setStep('ready'), 800);
        setTimeout(() => setShow(false), 2500);
        return;
      }

      const log = bootSequence[currentIndex];
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString('pt-BR', { hour12: false })}] ${log.text}`]);
      currentIndex++;
      setTimeout(processLogs, log.delay - (currentIndex > 0 ? bootSequence[currentIndex - 1].delay : 0));
    };

    // Start sequence
    const timer = setTimeout(processLogs, 500);

    // Allow skipping with ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center font-mono overflow-hidden"
        >
          {/* CRT Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none z-50 bg-scanline opacity-10"></div>
          <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>

          <div className="w-full max-w-3xl p-6 md:p-12 relative z-10">

            {step === 'boot' && (
              <div className="space-y-1 text-green-500/80 text-xs md:text-sm font-mono">
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                     <span className="text-vesper-orange/50">root@kernel:~$</span>
                     <span>{log}</span>
                  </motion.div>
                ))}
                <div ref={bottomRef} />
              </div>
            )}

            {step !== 'boot' && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="border border-vesper-orange/20 bg-black/80 backdrop-blur-xl rounded-lg p-8 shadow-2xl shadow-vesper-orange/10 relative overflow-hidden"
               >
                  {/* Decorative header */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vesper-orange via-vesper-cyan to-vesper-orange"></div>

                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <ArchlinuxPlain size={100} />

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
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="h-full bg-vesper-orange shadow-[0_0_10px_rgba(255,199,153,0.5)]"
                              />
                           </div>
                           <span className="text-xs text-vesper-orange animate-pulse">LOADING ASSETS...</span>
                       </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShow(false)}
                    className="absolute bottom-4 right-4 text-[10px] text-gray-600 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <XCircle size={10} /> ESC to Skip
                  </button>
               </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
