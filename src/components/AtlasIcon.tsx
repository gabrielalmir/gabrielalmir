import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  GitBranch,
  Network,
  Radio,
  type LucideProps,
} from 'lucide-react';

const icons = {
  branch: GitBranch,
  check: CheckCircle2,
  warning: AlertTriangle,
  network: Network,
  compute: Cpu,
  signal: Radio,
  external: ArrowUpRight,
} as const;

export type AtlasIconName = keyof typeof icons;

export default function AtlasIcon({ name, ...props }: { name: AtlasIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" focusable="false" {...props} />;
}
