import {
  AmbientLight,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  Fog,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

export type SignatureHandle = {
  unmount: () => void;
};

type Theme = {
  paper: string;
  ink: string;
  amber: string;
  green: string;
  blue: string;
};

function readTheme(): Theme {
  const css = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) => {
    const v = css.getPropertyValue(name).trim();
    return v || fallback;
  };
  return {
    paper: pick('--paper', '#f2ecde'),
    ink: pick('--ink', '#181915'),
    amber: pick('--amber', '#ef9e2f'),
    green: pick('--green', '#26734d'),
    blue: pick('--blue', '#315da8'),
  };
}

function readProgress(hero: HTMLElement | null): { page: number; draw: number } {
  const root = document.documentElement;
  const page = Number.parseFloat(root.style.getPropertyValue('--page-progress') || '0') || 0;
  const draw =
    Number.parseFloat(hero?.style.getPropertyValue('--hero-draw') || '0') ||
    Number.parseFloat(getComputedStyle(hero ?? root).getPropertyValue('--hero-draw') || '0') ||
    0;
  // When storytelling hasn't hydrated, infer mild progress from scroll
  if (page === 0 && draw === 0 && typeof window !== 'undefined') {
    const y = window.scrollY || 0;
    const h = Math.max(1, window.innerHeight);
    return { page: Math.min(1, y / (document.documentElement.scrollHeight - h || 1)), draw: Math.min(1, 0.35 + y / h) };
  }
  return { page, draw: Math.min(1, Math.max(draw, page * 0.85)) };
}

function buildGrid(ink: string): Line {
  const positions: number[] = [];
  const size = 24;
  const step = 1.2;
  const half = (size * step) / 2;
  for (let i = 0; i <= size; i++) {
    const t = -half + i * step;
    positions.push(-half, 0, t, half, 0, t);
    positions.push(t, 0, -half, t, 0, half);
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
  const mat = new LineBasicMaterial({
    color: new Color(ink),
    transparent: true,
    opacity: 0.12,
  });
  const line = new Line(geo, mat);
  line.position.y = -0.35;
  return line;
}

/**
 * Mount the “state lattice” signature scene into `host`.
 * Host should be an empty element sized by CSS; canvas is pointer-events: none.
 */
export function mountSignatureScene(host: HTMLElement): SignatureHandle {
  const hero = host.closest('[data-parallax-hero]') as HTMLElement | null;
  const theme = readTheme();
  const scene = new Scene();
  scene.background = null;
  scene.fog = new Fog(new Color(theme.paper), 8, 22);

  const camera = new PerspectiveCamera(38, 1, 0.1, 80);
  camera.position.set(0.4, 2.8, 7.2);
  camera.lookAt(0, 0.4, 0);

  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.dataset.signatureCanvas = 'true';
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  host.appendChild(renderer.domElement);

  scene.add(new AmbientLight(new Color(theme.paper), 0.85));
  const key = new DirectionalLight(0xffffff, 0.65);
  key.position.set(4, 8, 3);
  scene.add(key);

  const root = new Group();
  scene.add(root);
  root.add(buildGrid(theme.ink));

  const points = [
    new Vector3(-3.2, -0.2, 1.4),
    new Vector3(-1.4, 0.55, 0.2),
    new Vector3(0.3, -0.15, -0.6),
    new Vector3(2.1, 0.7, -0.1),
    new Vector3(3.4, 0.25, 0.9),
  ];
  const curve = new CatmullRomCurve3(points, false, 'catmullrom', 0.45);
  const tubeGeo = new TubeGeometry(curve, 96, 0.028, 8, false);
  const tubeMat = new MeshStandardMaterial({
    color: new Color(theme.amber),
    emissive: new Color(theme.amber),
    emissiveIntensity: 0.25,
    metalness: 0.15,
    roughness: 0.45,
    transparent: true,
    opacity: 0.92,
  });
  const tube = new Mesh(tubeGeo, tubeMat);
  root.add(tube);

  const nodeMats: MeshStandardMaterial[] = [];
  const nodeMeshes: Mesh[] = [];
  const nodePositions = [0, 0.28, 0.55, 0.82].map((t) => curve.getPointAt(t));
  const sphere = new SphereGeometry(0.11, 20, 20);
  nodePositions.forEach((pos, i) => {
    const isLast = i === nodePositions.length - 1;
    const mat = new MeshStandardMaterial({
      color: new Color(isLast ? theme.green : theme.amber),
      emissive: new Color(isLast ? theme.green : theme.amber),
      emissiveIntensity: 0.35,
      metalness: 0.2,
      roughness: 0.35,
    });
    const mesh = new Mesh(sphere, mat);
    mesh.position.copy(pos);
    root.add(mesh);
    nodeMats.push(mat);
    nodeMeshes.push(mesh);
  });

  // Soft path glow line (extra read of the curve)
  const linePts = curve.getPoints(64);
  const lineGeo = new BufferGeometry().setFromPoints(linePts);
  const glow = new Line(
    lineGeo,
    new LineBasicMaterial({ color: new Color(theme.blue), transparent: true, opacity: 0.22 }),
  );
  root.add(glow);

  let raf = 0;
  let running = true;
  let visible = true;
  let disposed = false;

  const resize = () => {
    if (disposed) return;
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  const onContextLost = (event: Event) => {
    event.preventDefault();
    running = false;
  };

  const tick = (time: number) => {
    if (!running || disposed) return;
    raf = requestAnimationFrame(tick);
    if (!visible) return;

    const { page, draw } = readProgress(hero);
    const t = time * 0.001;

    // Gentle lattice drift + scroll-driven yaw
    root.rotation.y = -0.18 + draw * 0.22 + Math.sin(t * 0.12) * 0.03;
    root.rotation.x = 0.18 + page * 0.06;
    root.position.y = Math.sin(t * 0.2) * 0.04;

    tubeMat.emissiveIntensity = 0.18 + draw * 0.45;
    tubeMat.opacity = 0.35 + draw * 0.6;

    nodeMats.forEach((mat, i) => {
      const threshold = i / 3.2;
      const on = draw >= threshold ? 1 : Math.max(0, (draw - threshold + 0.15) / 0.15);
      const isLast = i === nodeMats.length - 1;
      mat.emissiveIntensity = 0.15 + on * (isLast ? 0.85 : 0.55);
      const s = 0.85 + on * 0.35 + Math.sin(t * 2 + i) * 0.02 * on;
      nodeMeshes[i].scale.setScalar(s);
      if (isLast && draw > 0.85) {
        mat.color.set(theme.green);
        mat.emissive.set(theme.green);
      }
    });

    camera.position.x = 0.4 + Math.sin(t * 0.08) * 0.12;
    camera.lookAt(0, 0.35 + draw * 0.1, 0);
    renderer.render(scene, camera);
  };

  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          ([entry]) => {
            visible = Boolean(entry?.isIntersecting);
          },
          { rootMargin: '10% 0px' },
        )
      : null;
  io?.observe(host);

  const ro =
    'ResizeObserver' in window
      ? new ResizeObserver(() => resize())
      : null;
  ro?.observe(host);

  const onContrast = () => {
    const next = readTheme();
    scene.fog = new Fog(new Color(next.paper), 8, 22);
    tubeMat.color.set(next.amber);
    tubeMat.emissive.set(next.amber);
    nodeMats.forEach((mat, i) => {
      const isLast = i === nodeMats.length - 1;
      mat.color.set(isLast ? next.green : next.amber);
      mat.emissive.set(isLast ? next.green : next.amber);
    });
    Object.assign(theme, next);
  };
  const mo = new MutationObserver(onContrast);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-contrast'] });

  renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);
  window.addEventListener('resize', resize, { passive: true });
  resize();
  raf = requestAnimationFrame(tick);

  return {
    unmount: () => {
      if (disposed) return;
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      tubeGeo.dispose();
      tubeMat.dispose();
      sphere.dispose();
      nodeMats.forEach((m) => m.dispose());
      lineGeo.dispose();
      (glow.material as LineBasicMaterial).dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    },
  };
}
