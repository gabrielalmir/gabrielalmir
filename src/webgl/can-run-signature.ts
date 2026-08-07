/**
 * Capability gate for the hero Three.js signature field.
 * Fail closed: any doubt → keep 2D craft only.
 */

export type SignatureGateReason =
  | 'ok'
  | 'reduced-motion'
  | 'save-data'
  | 'low-memory'
  | 'no-webgl'
  | 'flag-off'
  | 'ssr';

export type SignatureGateResult = {
  ok: boolean;
  reason: SignatureGateReason;
};

type Flag = 'on' | 'off' | 'force';

function readFlag(): Flag {
  if (typeof window === 'undefined') return 'off';
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('webgl') === '0' || params.get('webgl') === 'false') return 'off';
    if (params.get('webgl') === '1' || params.get('webgl') === 'true') return 'force';
  } catch {
    /* ignore */
  }
  const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
  const raw = env?.PUBLIC_THREE_SIGNATURE;
  if (raw === '0' || raw === 'false') return 'off';
  return 'on';
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function canRunSignature(): SignatureGateResult {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { ok: false, reason: 'ssr' };
  }
  const flag = readFlag();
  if (flag === 'off') return { ok: false, reason: 'flag-off' };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { ok: false, reason: 'reduced-motion' };
  }
  if (!hasWebGL()) return { ok: false, reason: 'no-webgl' };

  // ?webgl=1 forces attempt past save-data / low-memory (still needs WebGL + motion OK)
  if (flag === 'force') return { ok: true, reason: 'ok' };

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return { ok: false, reason: 'save-data' };
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory > 0 && nav.deviceMemory < 4) {
    return { ok: false, reason: 'low-memory' };
  }
  return { ok: true, reason: 'ok' };
}
