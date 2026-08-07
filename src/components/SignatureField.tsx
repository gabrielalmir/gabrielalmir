import { useEffect, useRef, useState } from 'react';
import { canRunSignature } from '@/webgl/can-run-signature';
import type { SignatureHandle } from '@/webgl/signature-scene';

/**
 * Lazy Three.js signature field. Mounts only when capability gate passes.
 * Canvas is aria-hidden; all meaning stays in HTML.
 */
export default function SignatureField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reason, setReason] = useState<string>('pending');

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let handle: SignatureHandle | null = null;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const start = async () => {
      const gate = canRunSignature();
      if (cancelled) return;
      setReason(gate.reason);
      if (!gate.ok) {
        setActive(false);
        return;
      }

      try {
        const mod = await import('@/webgl/signature-scene');
        if (cancelled || !hostRef.current) return;
        handle = mod.mountSignatureScene(hostRef.current);
        setActive(true);
        hostRef.current.dataset.signatureState = 'live';
      } catch {
        if (!cancelled) {
          setActive(false);
          setReason('import-failed');
          host.dataset.signatureState = 'failed';
        }
      }
    };

    const schedule = () => {
      const ric = window.requestIdleCallback as
        | ((cb: () => void, opts?: { timeout: number }) => number)
        | undefined;
      if (typeof ric === 'function') {
        idleId = ric(() => void start(), { timeout: 1200 });
      } else {
        timeoutId = window.setTimeout(() => void start(), 200) as unknown as number;
      }
    };

    // Prefer waiting until hero is near viewport
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            schedule();
          }
        },
        { rootMargin: '20% 0px' },
      );
      io.observe(host);
      return () => {
        cancelled = true;
        io.disconnect();
        if (idleId !== undefined && 'cancelIdleCallback' in window) {
          window.cancelIdleCallback(idleId);
        }
        if (timeoutId !== undefined) window.clearTimeout(timeoutId);
        handle?.unmount();
      };
    }

    schedule();
    return () => {
      cancelled = true;
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      handle?.unmount();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="signature-field"
      data-signature-field
      data-signature-active={active ? 'true' : 'false'}
      data-signature-reason={reason}
      aria-hidden="true"
    />
  );
}
