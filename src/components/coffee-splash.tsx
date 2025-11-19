'use client';

import { ArchlinuxPlain } from 'devicons-react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CoffeeSplash() {
  const [show, setShow] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState({ line: 0, text: '', index: 0 });
  const [showFastfetch, setShowFastfetch] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('vesper-splash-seen');
    if (!hasSeenSplash) {
      setShow(true);
      localStorage.setItem('vesper-splash-seen', 'true');
    }
  }, []);

  const terminalLines = [
    '[INFO] Booting Arch Linux kernel...',
    '[OK] Loading systemd services...',
    '[OK] Starting Node.js runtime...',
    '[OK] TypeScript compiler initialized',
    '[OK] Python interpreter ready',
    '[OK] Rust toolchain loaded',
    '[OK] Git repository initialized',
    '[OK] All systems operational',
  ];

  useEffect(() => {
    if (!show) return;

    const timers: NodeJS.Timeout[] = [];
    const intervals: NodeJS.Timeout[] = [];
    let lineStartTime = 100;

    terminalLines.forEach((line, lineIndex) => {
      const startTimer = setTimeout(() => {
        let charIndex = 0;
        const typingInterval = setInterval(() => {
          if (charIndex < line.length) {
            setCurrentTyping({
              line: lineIndex,
              text: line.substring(0, charIndex + 1),
              index: charIndex + 1,
            });
            charIndex++;
          } else {
            clearInterval(typingInterval);
            setDisplayedLines(prev => [...prev, line]);
            setCurrentTyping({ line: lineIndex + 1, text: '', index: 0 });
          }
        }, 15);
        intervals.push(typingInterval);
      }, lineStartTime);

      timers.push(startTimer);
      lineStartTime += line.length * 15 + 200;
    });

    const fastfetchTimer = setTimeout(() => {
      setShowFastfetch(true);
    }, lineStartTime + 100);

    const hideTimer = setTimeout(() => {
      setShow(false);
    }, lineStartTime + 1500);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      intervals.forEach(interval => clearInterval(interval));
      clearTimeout(fastfetchTimer);
      clearTimeout(hideTimer);
    };
  }, [show]);

  return show && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none z-[101]"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08) 1px, transparent 1px, transparent 3px)',
          opacity: 0.15,
        }}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl mx-auto px-6 sm:px-8 z-[102]"
      >
        <div className="bg-background border-2 border-vesper-orange/30 rounded-lg shadow-2xl overflow-hidden relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(153, 255, 228, 0.02) 0%, rgba(255, 199, 153, 0.02) 100%)',
              borderRadius: 'inherit',
            }}
          />

          <div className="bg-vesper-orange/10 border-b border-vesper-orange/20 px-4 py-2 flex items-center gap-2 relative">
            <TerminalIcon className="w-4 h-4 text-vesper-orange" />
            <span className="text-xs text-vesper-orange/80 font-mono">gabrielalmir v2.8</span>
            <div className="ml-auto flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-vesper-orange/40" />
              <div className="w-2 h-2 rounded-full bg-vesper-orange/20" />
              <div className="w-2 h-2 rounded-full bg-vesper-orange/10" />
            </div>
          </div>

          <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm relative">
            {!showFastfetch ? (
              <div className="space-y-2 text-vesper-cyan/90">
                {displayedLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-vesper-orange/60">&gt;</span>
                    <span style={{ textShadow: '0 0 2px rgba(153, 255, 228, 0.3)' }}>{line}</span>
                  </motion.div>
                ))}

                {currentTyping.text && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-vesper-orange/60">&gt;</span>
                    <span className="text-vesper-cyan/90" style={{ textShadow: '0 0 2px rgba(153, 255, 228, 0.3)' }}>{currentTyping.text}</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-4 bg-vesper-orange inline-block ml-1"
                    />
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-vesper-cyan/90"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="text-vesper-cyan/90 leading-[1.1] font-mono text-3xl sm:text-xs whitespace-pre flex items-center gap-2">
                    <ArchlinuxPlain size={64} />
                  </div>

                  <div className="space-y-0.5 text-vesper-cyan/90 text-xs sm:text-sm">
                    <div><span className="text-vesper-orange/70">OS:</span> Arch Linux</div>
                    <div><span className="text-vesper-orange/70">Kernel:</span> Linux 6.x</div>
                    <div><span className="text-vesper-orange/70">Shell:</span> zsh</div>
                    <div><span className="text-vesper-orange/70">Node:</span> v22.x</div>
                    <div><span className="text-vesper-orange/70">TypeScript:</span> 5.x</div>
                    <div><span className="text-vesper-orange/70">Python:</span> 3.14</div>
                    <div><span className="text-vesper-orange/70">Rust:</span> 1.91</div>
                    <div><span className="text-vesper-orange/70">Git:</span> 2.51</div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 pt-4 border-t border-vesper-orange/20"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-vesper-orange/60">&gt;</span>
                    <span className="text-vesper-cyan/90" style={{ textShadow: '0 0 2px rgba(153, 255, 228, 0.3)' }}>Welcome to Gabriel Almir's Portfolio</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-4 bg-vesper-orange inline-block ml-1"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 199, 153, 0.05), transparent)',
        }}
      />
    </motion.div>
  )
}
