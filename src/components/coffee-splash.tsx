'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CoffeeSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return show && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Coffee cup container */}
      <div className="relative w-40 h-48 sm:w-48 sm:h-56 flex flex-col items-center justify-center">
        {/* Coffee cup */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Cup body - realistic shape */}
          <div className="relative w-24 h-32 sm:w-28 sm:h-36">
            {/* Cup outer shape - trapezoid/truncated cone */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{
                width: '100%',
                height: '85%',
                clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)',
                background: 'linear-gradient(to bottom, rgba(160, 82, 45, 0.85), rgba(139, 69, 19, 0.95), rgba(101, 67, 33, 1))',
                borderRadius: '0 0 10px 10px',
                border: '2px solid rgba(139, 69, 19, 0.7)',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Cup rim - top border (thicker, more visible) */}
              <div
                className="absolute top-0 left-0 right-0 h-3"
                style={{
                  background: 'linear-gradient(to bottom, rgba(205, 133, 63, 0.9), rgba(160, 82, 45, 0.95), rgba(139, 69, 19, 0.9))',
                  borderRadius: '3px 3px 0 0',
                  boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                }}
              />

              {/* Inner rim shadow */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-[88%] h-0.5"
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                }}
              />

              {/* Coffee liquid */}
              <motion.div
                initial={{ height: '60%' }}
                animate={{ height: '75%' }}
                transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 right-0 overflow-hidden"
                style={{
                  clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                  background: 'linear-gradient(to bottom, rgba(184, 134, 11, 0.9), rgba(139, 69, 19, 0.95))',
                  borderRadius: '0 0 6px 6px',
                }}
              >
                {/* Coffee surface highlight */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(255, 215, 0, 0.3), transparent)',
                  }}
                />

                {/* Ripple effect when drop hits */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 2, 0],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{
                    duration: 0.2,
                    delay: 0.5,
                    times: [0, 0.5, 1]
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-amber-500/50"
                />
              </motion.div>
            </div>

            {/* Cup handle - more realistic */}
            <div
              className="absolute right-[-4px] top-1/3 -translate-y-1/2"
              style={{
                width: '18px',
                height: '36px',
                border: '4px solid rgba(139, 69, 19, 0.8)',
                borderRadius: '0 14px 14px 0',
                background: 'transparent',
                boxShadow: 'inset -3px 0 6px rgba(0, 0, 0, 0.4), 2px 0 4px rgba(0, 0, 0, 0.2)',
              }}
            />

            {/* Cup base shadow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1"
              style={{
                background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.4), transparent)',
                borderRadius: '50%',
              }}
            />
          </div>
        </motion.div>

        {/* Coffee drop */}
        <motion.div
          initial={{ y: -80, opacity: 0, scale: 0.3 }}
          animate={{
            y: [0, 45, 45],
            opacity: [0, 1, 0],
            scale: [0.3, 1.1, 0.9]
          }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            times: [0, 0.75, 1],
            ease: [0.34, 1.56, 0.64, 1] // Bounce effect
          }}
          className="absolute top-8 left-1/2 -translate-x-1/2"
        >
          <div className="relative w-4 h-6 sm:w-5 sm:h-7">
            <div className="w-full h-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 rounded-full shadow-lg">
              {/* Drop highlight */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-amber-300/60 rounded-full blur-[1px]" />
              {/* Drop shine */}
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-1.5 bg-white/40 rounded-full" />
            </div>
            {/* Drop trail */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                scaleY: [0, 1, 0]
              }}
              transition={{
                duration: 0.15,
                delay: 0.1,
                times: [0, 0.5, 1]
              }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-amber-400/30"
            />
          </div>
        </motion.div>

        {/* Splash effect when drop hits */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 0.2,
            delay: 0.5,
            times: [0, 0.5, 1]
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20"
        >
          <div className="absolute inset-0 rounded-full border-2 border-amber-600/40" />
          <div className="absolute inset-0 rounded-full border border-amber-500/30 scale-75" />
        </motion.div>
      </div>

      {/* Subtle background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-transparent to-amber-950/20 pointer-events-none"
      />
    </motion.div>
  )
}
