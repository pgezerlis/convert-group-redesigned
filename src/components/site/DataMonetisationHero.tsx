/**
 * DataMonetisationHero
 * ------------------------------------------------------------------
 * Ambient particle animation for the convertgroup.com hero.
 * ~1,800 particles morph through three formations that tell the story of
 * data monetisation:
 *
 *   01  Data           – a wireframe data cube: the retailer's / marketplace's data asset
 *   02  Collaboration  – three overlapping circles (retailer · brands · partners);
 *                        the shared overlap lights up and value flows between them
 *   03  Profit         – rising stacks of coins with a growth curve
 *
 * - Zero dependencies (React + canvas only). Works in Lovable / Vite / Next.
 * - Transparent background: place it over any section colour.
 * - Respects prefers-reduced-motion (renders a static final frame).
 * - Pauses when off-screen or when the tab is hidden.
 *
 * Usage:
 *   <DataMonetisationHero className="h-[520px] w-full" />
 *   <DataMonetisationHero ink="#DCE4F0" accent="#5B8CFF" glow="#FFCF6E" />  // dark section
 */
import { useEffect, useRef, useState } from "react";

export interface DataMonetisationHeroProps {
  className?: string;
  /** Main particle colour (structure). */
  ink?: string;
  /** Highlight colour (shared overlap, growth curve). */
  accent?: string;
  /** Warm "value" colour (coins, flowing value, sparkles). */
  glow?: string;
  /** Captions under the animation. Pass `false` to hide. */
  labels?: [string, string, string] | false;
  /** How long each formation holds (ms). */
  holdMs?: number;
  /** How long a morph takes (ms). */
  morphMs?: number;
  /** Particle count on desktop (reduced automatically on small screens). */
  particleCount?: number;
  /** Show a small pause / play button (recommended for accessibility). */
  controls?: boolean;
}

/** a = accent weight, g = glow weight (0..1) */
type P3 = { x: number; y: number; z: number; a: number; g: number };

const DEFAULT_LABELS: [string, string, string] = ["Data", "Collaboration", "Profit"];

/* ---------- helpers ---------- */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/* ---------- 01 Data: wireframe cube ---------- */
function dataFormation(n: number, r: () => number): P3[] {
  const S = 0.6, g = 4, pts: P3[] = [];
  for (let i = 0; i < n; i++) {
    const c = [0, 0, 0];
    if (r() < 0.38) {
      // crisp outline: a point on one of the 12 edges
      const e = Math.floor(r() * 12), axis = Math.floor(e / 4);
      c[axis] = r() * 2 - 1;
      c[(axis + 1) % 3] = e & 1 ? 1 : -1;
      c[(axis + 2) % 3] = e & 2 ? 1 : -1;
    } else {
      // inner grid lines on the faces
      const face = Math.floor(r() * 6), axis = face % 3;
      const k = -1 + (2 * Math.floor(r() * (g + 1))) / g, t = r() * 2 - 1;
      const [u, v] = r() < 0.5 ? [k, t] : [t, k];
      c[axis] = face < 3 ? 1 : -1;
      c[(axis + 1) % 3] = u;
      c[(axis + 2) % 3] = v;
    }
    pts.push({ x: (c[0] ?? 0) * S, y: (c[1] ?? 0) * S, z: (c[2] ?? 0) * S, a: r() < 0.05 ? 1 : 0, g: 0 });
  }
  return pts;
}

/* ---------- 02 Collaboration: three overlapping circles ---------- */
const VENN_R = 0.46, VENN_D = 0.27;
const vennCentre = (k: number) => {
  const ang = Math.PI / 2 + (k * Math.PI * 2) / 3;
  return { x: Math.cos(ang) * VENN_D, y: Math.sin(ang) * VENN_D - 0.04 };
};
const insideCount = (x: number, y: number) => {
  let c = 0;
  for (let k = 0; k < 3; k++) {
    const p = vennCentre(k);
    if ((x - p.x) ** 2 + (y - p.y) ** 2 < VENN_R * VENN_R) c++;
  }
  return c;
};
function collaborationFormation(n: number, r: () => number): P3[] {
  const pts: P3[] = [];
  for (let i = 0; i < n; i++) {
    if (r() < 0.6) {
      // circle outlines – each party
      const k = Math.floor(r() * 3), p = vennCentre(k), ang = r() * Math.PI * 2;
      const rr = VENN_R + (r() - 0.5) * 0.012;
      pts.push({ x: p.x + Math.cos(ang) * rr, y: p.y + Math.sin(ang) * rr, z: (r() - 0.5) * 0.04, a: 0, g: 0 });
    } else {
      // the shared space: points where at least two circles overlap
      let x = 0, y = 0, c = 0;
      for (let tries = 0; tries < 40 && c < 2; tries++) {
        x = (r() * 2 - 1) * 0.55; y = (r() * 2 - 1) * 0.55; c = insideCount(x, y);
      }
      pts.push({ x, y, z: (r() - 0.5) * 0.08, a: 1, g: c === 3 ? 0.55 : 0 });
    }
  }
  return pts;
}

/* ---------- 03 Profit: rising coin stacks + growth curve ---------- */
const STACKS = 5, COIN_R = 0.12, COIN_H = 0.072, BASE = -0.62;
const stackX = (k: number) => -0.68 + (k * 1.36) / (STACKS - 1);
const coins = (k: number) => 3 + k * 3; // 3, 6, 9, 12, 15
function curveAt(t: number) {
  const x = -0.84 + t * 1.68;
  const y = BASE + 0.42 + Math.pow(t, 1.7) * 1.02;
  return { x, y, z: 0 };
}
function profitFormation(n: number, r: () => number): P3[] {
  const pts: P3[] = [];
  const total = Array.from({ length: STACKS }, (_, k) => coins(k)).reduce((a, b) => a + b, 0);
  for (let i = 0; i < n; i++) {
    const roll = r();
    if (roll < 0.76) {
      let pick = r() * total, k = 0;
      for (; k < STACKS - 1; k++) { pick -= coins(k); if (pick <= 0) break; }
      const m = Math.floor(r() * coins(k));
      const top = m === coins(k) - 1;
      const ang = r() * Math.PI * 2;
      const y = BASE + m * COIN_H + (r() < 0.5 ? 0 : COIN_H * 0.8);
      // top coin: also fill its face a little
      const rad = top && r() < 0.35 ? COIN_R * Math.sqrt(r()) : COIN_R;
      pts.push({ x: stackX(k) + Math.cos(ang) * rad, y, z: Math.sin(ang) * rad, a: 0, g: top ? 1 : 0.18 });
    } else if (roll < 0.95) {
      pts.push({ ...curveAt(r()), a: 1, g: 0 });
    } else {
      pts.push({ x: -0.9 + r() * 1.8, y: BASE - 0.02, z: 0, a: 0, g: 0 }); // baseline
    }
  }
  return pts;
}

/* preferred camera yaw per formation (Venn faces the viewer) */
const YAW = [-0.6, -0.08, -0.35];

/* ---------- component ---------- */
export default function DataMonetisationHero({
  className = "",
  ink = "#0E2A47",
  accent = "#2F6BFF",
  glow = "#E9A21F",
  labels = DEFAULT_LABELS,
  holdMs = 3600,
  morphMs = 1900,
  particleCount = 1800,
  controls = true,
}: DataMonetisationHeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const controlRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const togglePause = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    if (next) controlRef.current?.stop();
    else controlRef.current?.start();
  };

  useEffect(() => {
    const wrap = wrapRef.current!, canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1, N = 0;
    let forms: P3[][] = [];
    let jitter: { d: number; sx: number; sy: number; sz: number; ph: number; tw: boolean }[] = [];
    let prev: Float32Array = new Float32Array(0);
    let hasPrev = false;

    const INK = hexToRgb(ink), ACC = hexToRgb(accent), GLW = hexToRgb(glow);

    const build = () => {
      N = Math.round(W < 640 ? particleCount * 0.55 : particleCount);
      const r = rng(11);
      const byY = (a: P3, b: P3) => a.y - b.y || a.x - b.x;
      forms = [dataFormation(N, r).sort(byY), collaborationFormation(N, r).sort(byY), profitFormation(N, r).sort(byY)];
      jitter = Array.from({ length: N }, () => {
        const u = r() * 2 - 1, th = r() * Math.PI * 2, s = Math.sqrt(1 - u * u);
        return { d: r(), sx: s * Math.cos(th), sy: u, sz: s * Math.sin(th), ph: r() * Math.PI * 2, tw: r() < 0.035 };
      });
      prev = new Float32Array(N * 2);
      hasPrev = false;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      build();
    };

    // pointer parallax
    let px = 0, py = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const CYCLE = holdMs + morphMs;
    let lastActive = -1;

    const draw = (now: number, still = false) => {
      const ph = still ? 2 * CYCLE : now % (3 * CYCLE);
      const idx = Math.floor(ph / CYCLE) % 3, nxt = (idx + 1) % 3;
      const local = ph - idx * CYCLE;
      const T = local < holdMs ? 0 : (local - holdMs) / morphMs;
      const from = forms[idx] ?? [], to = forms[nxt] ?? [];
      const showIdx = T > 0.5 ? nxt : idx;
      if (showIdx !== lastActive) { lastActive = showIdx; setActive(showIdx); }

      // how settled each formation is (drives the overlays)
      const settled = [0, 0, 0];
      settled[idx] = T === 0 ? 1 : clamp01(1 - T * 3);
      settled[nxt] = Math.max(settled[nxt] ?? 0, clamp01((T - 0.75) * 4));
      const s1 = settled[1] ?? 0, s2 = settled[2] ?? 0;
      const holdT = T === 0 ? local / holdMs : 0; // 0..1 progress through the hold

      px += (tx - px) * 0.04; py += (ty - py) * 0.04;
      const camE = easeInOut(T);
      const yawA = YAW[idx] ?? 0, yawB = YAW[nxt] ?? 0;
      const yaw = yawA + (yawB - yawA) * camE + Math.sin(now / 5200) * 0.28 + px * 0.25;
      const pitch = 0.3 + Math.sin(now / 7300) * 0.06 + py * 0.15;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const scale = Math.min(W, H) * 0.4 * dpr;
      const ox = (W / 2) * dpr, oy = (H / 2) * dpr;
      const F = 3.2;
      const project = (x: number, y: number, z: number) => {
        const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
        const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
        const k = F / (F + z2);
        return { sx: ox + x1 * k * scale, sy: oy - y1 * k * scale, k, z: z2 };
      };

      // fade the previous frame (keeps canvas transparent)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = still ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.34)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineCap = "round";

      for (let i = 0; i < N; i++) {
        const a = from[i], b = to[i], j = jitter[i];
        if (!a || !b || !j) continue;
        const e = easeInOut(clamp01((T - j.d * 0.35) / 0.65));
        const sw = Math.sin(Math.PI * e) * (0.22 + j.d * 0.2);
        const x = a.x + (b.x - a.x) * e + j.sx * sw;
        const y = a.y + (b.y - a.y) * e + j.sy * sw;
        const z = a.z + (b.z - a.z) * e + j.sz * sw;
        let acc = a.a + (b.a - a.a) * e;
        let glw = a.g + (b.g - a.g) * e;
        // collaboration: the shared overlap "fills up" during the hold
        if (idx === 1 && T === 0 && a.a > 0.5) acc *= 0.35 + 0.65 * clamp01(holdT * 2.2 - j.d * 0.6);
        const ink_ = 1 - Math.min(1, acc + glw);
        const p = project(x, y, z);
        const depth = clamp01((1.1 - p.z) / 2.2); // 1 = front
        const alpha = 0.2 + depth * 0.72;
        const R = INK[0] * ink_ + ACC[0] * acc + GLW[0] * glw;
        const G = INK[1] * ink_ + ACC[1] * acc + GLW[1] * glw;
        const B = INK[2] * ink_ + ACC[2] * acc + GLW[2] * glw;
        ctx.strokeStyle = `rgba(${R | 0},${G | 0},${B | 0},${alpha})`;
        ctx.lineWidth = (0.9 + depth * 0.9 + (acc + glw) * 0.4) * dpr;
        const qx = hasPrev ? (prev[i * 2] ?? 0) : p.sx - 0.6 * dpr, qy = hasPrev ? (prev[i * 2 + 1] ?? 0) : p.sy;
        const dx = p.sx - qx, dy = p.sy - qy;
        ctx.beginPath();
        if (dx * dx + dy * dy < 0.36 * dpr * dpr) { ctx.moveTo(p.sx - 0.7 * dpr, p.sy); ctx.lineTo(p.sx + 0.7 * dpr, p.sy); }
        else { ctx.moveTo(qx, qy); ctx.lineTo(p.sx, p.sy); }
        ctx.stroke();
        prev[i * 2] = p.sx; prev[i * 2 + 1] = p.sy;

        if (j.tw && !still) {
          const f = Math.pow(Math.max(0, Math.sin(now / 900 + j.ph)), 14);
          if (f > 0.05) {
            ctx.fillStyle = `rgba(${GLW[0]},${GLW[1]},${GLW[2]},${f * depth})`;
            ctx.beginPath(); ctx.arc(p.sx, p.sy, (1.5 + f * 2.2) * dpr, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
      hasPrev = true;

      const bead = (x: number, y: number, z: number, o: number, rr = 2.6, col = GLW) => {
        if (o <= 0.01) return;
        const p = project(x, y, z);
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.2 * o})`;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, rr * 2.6 * dpr * p.k, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${o})`;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, rr * dpr * p.k, 0, Math.PI * 2); ctx.fill();
      };

      // collaboration: value orbits each party and flows into the shared centre
      if (settled[1] > 0) {
        for (let k = 0; k < 3; k++) {
          const c = vennCentre(k);
          for (let m = 0; m < 2; m++) {
            const ang = now / 1500 + k * 2.1 + m * Math.PI;
            bead(c.x + Math.cos(ang) * VENN_R, c.y + Math.sin(ang) * VENN_R, 0, settled[1] * 0.9, 2.4, ACC);
          }
          const t = (now / 2200 + k / 3) % 1;
          const s = 1 - easeInOut(t);
          bead(c.x * 2.2 * s, (c.y + 0.04) * 2.2 * s - 0.04, 0, settled[1] * Math.sin(Math.PI * t), 2.8);
        }
        const pulse = 0.5 + 0.5 * Math.sin(now / 420);
        bead(0, -0.04, 0, settled[1] * (0.5 + 0.5 * pulse), 3 + pulse * 1.5);
      }
      // profit: a bead riding the growth curve
      if (settled[2] > 0) {
        const t = (now / 3000) % 1;
        const c = curveAt(t);
        bead(c.x, c.y, c.z, settled[2] * Math.min(1, Math.sin(Math.PI * t) * 2), 3.2);
      }
    };

    resize();
    let raf = 0, running = false, visible = true;
    // keep the animation clock continuous across pauses
    let offset = 0, pausedAt = -1;
    const loop = (t: number) => {
      if (pausedAt >= 0) { offset += t - pausedAt; pausedAt = -1; }
      draw(t - offset);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!running && visible && !document.hidden && !reduce && !pausedRef.current) { running = true; raf = requestAnimationFrame(loop); }
    };
    const stop = () => {
      if (running) pausedAt = performance.now();
      running = false; cancelAnimationFrame(raf);
    };
    controlRef.current = { start, stop };

    if (reduce) draw(0, true);
    else start();

    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(0, true); });
    ro.observe(wrap);
    const io = new IntersectionObserver(([en]) => { visible = en?.isIntersecting ?? false; visible ? start() : stop(); });
    io.observe(wrap);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [ink, accent, glow, holdMs, morphMs, particleCount]);

  return (
    <div ref={wrapRef} className={`relative ${className}`} style={{ minHeight: 320 }}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block" />
      {controls && (
        <button
          type="button"
          onClick={togglePause}
          aria-label={paused ? "Play animation" : "Pause animation"}
          className="absolute bottom-1 right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
          style={{ color: ink }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="currentColor">
            {paused ? <path d="M3 1.5v9l7.5-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
          </svg>
        </button>
      )}
      {labels && (
        <ol
          aria-label="Data, collaboration, profit"
          className="pointer-events-none absolute inset-x-0 bottom-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs tracking-wide"
        >
          {labels.map((l, i) => (
            <li
              key={l}
              className="flex items-center gap-2 transition-all duration-500"
              style={{ color: i === active ? accent : ink, opacity: i === active ? 1 : 0.4 }}
            >
              <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="uppercase">{l}</span>
              {i < labels.length - 1 && <span aria-hidden="true" style={{ color: ink, opacity: 0.5 }}>→</span>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
