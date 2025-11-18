import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';

interface ContactButtonProps {
    href: string;
    label: string;
}

export function ContactButton({ href, label }: ContactButtonProps) {
    return (
        <Link href={href} className="w-full sm:w-auto">
            <motion.div
                className="relative overflow-hidden rounded-md"
                aria-label={label}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.1 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{
                        x: ['-100%', '100%'],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 3.4,
                        ease: 'easeInOut',
                    }}
                />
                <Button size="lg" className="terminal-button group w-full sm:w-auto relative z-10" id={`btn-${label}`}>
                    <MailIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span>Entrar em contato</span>
                </Button>
            </motion.div>
        </Link>
    )
}
