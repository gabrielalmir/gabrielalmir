import { Badge } from "@/components/ui/badge";
import { LazyDevIcon } from "@/components/lazy-devicon";

const coreStackItems = [
    { icon: "NodejsOriginal", label: "Node.js", level: "Expert" },
    { icon: "TypescriptOriginal", label: "TypeScript", level: "Expert" },
    { icon: "NestjsOriginal", label: "NestJS", level: "Expert" },
    { icon: "PythonOriginal", label: "Python", level: "Advanced" },
    { icon: "AmazonwebservicesPlainWordmark", label: "AWS", level: "Advanced" },
];

export default function CoreStack() {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-vesper-orange rounded-full flex-shrink-0"></div>
                <h3 className="text-2xl font-bold text-vesper-orange">Core Stack</h3>
                <Badge variant="outline" className="border-vesper-orange/30 text-vesper-orange/80">
                    Especialidade Principal
                </Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {coreStackItems.map(({ icon, label, level }) => (
                    <div
                        key={label}
                        className="group relative p-6 rounded-xl border border-vesper-orange/10 bg-background/50 hover:bg-vesper-orange/5 hover:border-vesper-orange/30 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <LazyDevIcon icon={icon} size={48} className="text-vesper-cyan group-hover:scale-110 transition-transform duration-300" />
                            <div className="text-center">
                                <div className="font-bold text-foreground">{label}</div>
                                <div className="text-xs text-vesper-orange/70 mt-1 font-mono">{level}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
