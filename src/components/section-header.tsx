import type { ReactNode } from "react";

interface SectionHeaderProps {
    eyebrow: string;
    title: ReactNode;
    subtitle?: string;
    accent?: 'orange' | 'cyan';
}

export function SectionHeader({ eyebrow, title, subtitle, accent = 'orange' }: SectionHeaderProps) {
    return (
        <div className="mb-14 md:mb-20 w-full max-w-3xl">
            <span className={`section-eyebrow ${accent === 'cyan' ? 'text-vesper-cyan/80' : ''}`}>
                {eyebrow}
            </span>
            <h2 className="section-heading mt-4">{title}</h2>
            {subtitle && <p className="section-subheading mt-4">{subtitle}</p>}
        </div>
    );
}
