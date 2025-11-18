'use client';

import { motion } from 'framer-motion';
import { Coffee, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

export function VesperDecorations() {
  const [mounted, setMounted] = useState(false);
  const [coffeeBeans, setCoffeeBeans] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);
  const [rainDrops, setRainDrops] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    setMounted(true);
    setCoffeeBeans(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 0.5 + 0.5,
      }))
    );
    setRainDrops(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 0.5 + 0.5,
      }))
    );
  }, []);

  const terminalLines = [
    { text: '> npm install coffee', delay: 0 },
    { text: '> brew coffee --fresh', delay: 0.5 },
    { text: '> coffee.init()', delay: 1 },
    { text: '✓ Coffee ready!', delay: 1.5 },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

      {coffeeBeans.map((bean) => (
        <motion.div
          key={bean.id}
          initial={{ opacity: 0, y: -20, rotate: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [0, 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            delay: bean.delay,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            left: `${bean.x}%`,
            top: `${bean.y}%`,
            transform: `scale(${bean.size})`,
          }}
        >
          <Coffee className="w-4 h-4 text-amber-600/20" />
        </motion.div>
      ))}


      {rainDrops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [0, 120],
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            left: `${drop.x}%`,
            top: '-10px',
          }}
        >
          <div className="w-0.5 h-8 bg-gradient-to-b from-vesper-cyan/30 via-vesper-cyan/20 to-transparent" />
        </motion.div>
      ))}


      <div className="absolute top-20 right-8 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="bg-background/50 border border-vesper-orange/20 rounded-lg p-3 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-3 h-3 text-vesper-orange/40" />
            <span className="text-xs text-vesper-orange/40 font-mono">terminal</span>
          </div>
          <div className="space-y-1">
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.3, x: 0 }}
                transition={{ duration: 0.3, delay: line.delay + 2 }}
                className="text-xs text-vesper-cyan/30 font-mono"
              >
                {line.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


      <div className="absolute bottom-32 left-1/4 hidden md:block">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
              opacity: [0, 0.2, 0],
              y: -30,
              x: i * 10 - 10,
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeOut',
            }}
            className="absolute"
          >
            <div className="w-1 h-8 bg-vesper-orange/10 rounded-full blur-sm" />
          </motion.div>
        ))}
      </div>


      <div className="absolute bottom-8 left-8 hidden md:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{
            duration: 1,
            delay: 3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="flex items-center gap-2 text-vesper-cyan/20 font-mono text-xs"
        >
          <span>$</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-4 bg-vesper-cyan/40"
          />
        </motion.div>
      </div>


      <div className="absolute top-1/3 left-8 hidden xl:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-vesper-orange/20 font-mono text-xs space-y-1"
        >
          <div>const coffee = ☕</div>
          <div>brew(coffee)</div>
          <div>return 'ready'</div>
        </motion.div>
      </div>


      <div className="absolute bottom-20 right-12 hidden 2xl:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 1, delay: 3 }}
          className="text-vesper-cyan/15 font-mono text-[10px] leading-tight"
        >
          <div>╔═══════════════════╗</div>
          <div>║  ☕ Gabriel Almir  ║</div>
          <div>║     Developer     ║</div>
          <div>║    Coffee Lover   ║</div>
          <div>╚═══════════════════╝</div>
        </motion.div>
      </div>


      <div className="absolute top-1/2 right-1/4 hidden lg:block">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 0.15, 0],
              scale: [0, 1, 0],
              y: [-20, 20],
              x: [0, (i % 2 === 0 ? 1 : -1) * 30],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
            className="absolute"
          >
            <div className="w-2 h-2 rounded-full bg-amber-600/20 blur-sm" />
          </motion.div>
        ))}
      </div>


      <div className="absolute inset-0 opacity-[0.01]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--vesper-cyan), 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--vesper-cyan), 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  );
}

