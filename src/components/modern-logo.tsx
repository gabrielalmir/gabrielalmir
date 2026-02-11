import { motion } from 'framer-motion';
import { CoffeeIcon } from 'lucide-react';

export const ModernLogo = () => {
    return (
        <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-8 h-8 flex items-center justify-center">
                <svg
                    className="absolute w-full h-full"
                    viewBox="0 0 100 100"
                    fill="none"
                >
                    <motion.path
                        d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
                        stroke="rgb(255, 199, 153)"
                        strokeWidth="2"
                        fill="rgba(255, 199, 153, 0.05)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </svg>
                <span className="relative z-10 text-xs font-bold text-vesper-orange tracking-tighter leading-none">
                    <CoffeeIcon size={16} />
                </span>
            </div>
            <span className="text-base font-bold text-vesper-orange tracking-wide">
                Gabriel Almir
            </span>
        </motion.div>
    );
};
