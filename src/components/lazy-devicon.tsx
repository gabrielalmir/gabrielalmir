import type { ComponentType } from "react";
import { useEffect, useState } from "react";

type DeviconsModule = Record<string, ComponentType<{ size?: number; className?: string }>>;

interface LazyDevIconProps {
    icon: string;
    size?: number;
    className?: string;
    fallbackClassName?: string;
}

export function LazyDevIcon({ icon, size = 24, className, fallbackClassName }: LazyDevIconProps) {
    const [Icon, setIcon] = useState<ComponentType<{ size?: number; className?: string }> | null>(null);

    useEffect(() => {
        let mounted = true;

        import("devicons-react")
            .then((module) => {
                const devicons = module as unknown as DeviconsModule;
                if (mounted && devicons[icon]) {
                    setIcon(() => devicons[icon]);
                }
            })
            .catch(() => {
                // Ignore icon loading errors and keep fallback.
            });

        return () => {
            mounted = false;
        };
    }, [icon]);

    if (!Icon) {
        return <span className={fallbackClassName ?? "inline-block rounded bg-vesper-orange/20"} style={{ width: size, height: size }} />;
    }

    return <Icon size={size} className={className} />;
}
