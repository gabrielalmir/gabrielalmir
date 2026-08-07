import { Badge } from '@/components/ui/badge';
import { LazyDevIcon } from '@/components/lazy-devicon';

const coreStackItems = [
  { icon: 'NodejsOriginal', label: 'Node.js', level: 'Expert' },
  { icon: 'TypescriptOriginal', label: 'TypeScript', level: 'Expert' },
  { icon: 'NestjsOriginal', label: 'NestJS', level: 'Expert' },
  { icon: 'PythonOriginal', label: 'Python', level: 'Advanced' },
  { icon: 'AmazonwebservicesPlainWordmark', label: 'AWS', level: 'Advanced' },
];

export default function CoreStack() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-px w-8 bg-vesper-orange/60 flex-shrink-0"></div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-vesper-orange/80 font-semibold">
          Core Stack
        </h3>
        <Badge
          variant="outline"
          className="border-vesper-orange/20 text-vesper-orange/70 text-[10px] uppercase tracking-wider font-mono"
        >
          Especialidade Principal
        </Badge>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {coreStackItems.map(({ icon, label, level }) => (
          <div
            key={label}
            className="group relative p-5 sm:p-6 rounded-xl border border-vesper-orange/10 bg-background/40 backdrop-blur-sm hover:bg-vesper-orange/[0.04] hover:border-vesper-orange/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vesper-orange/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center gap-3.5">
              <LazyDevIcon
                icon={icon}
                size={42}
                className="text-vesper-cyan group-hover:scale-110 group-hover:text-vesper-cyan/100 transition-all duration-300"
              />
              <div className="text-center">
                <div className="font-semibold text-foreground/90 text-sm">{label}</div>
                <div className="text-[10px] text-vesper-orange/60 mt-1 font-mono uppercase tracking-wider">
                  {level}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
