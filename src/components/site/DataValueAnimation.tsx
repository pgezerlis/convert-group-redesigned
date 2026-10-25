import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_ANIMATION } from "@/lib/content";

/** Original abstract data sculpture. Three.js is loaded only in the browser. */
export function DataValueAnimation() {
  const host = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const reset = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};

    void import("three").then((THREE) => {
      if (disposed) return;
      const tokens = getComputedStyle(document.documentElement);
      const colors = ["--cg-navy", "--cg-cyan", "--cg-muted", "--cg-pale-blue"].map((key) =>
        new THREE.Color(tokens.getPropertyValue(key).trim()),
      );
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
      camera.position.z = 6.4;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      element.appendChild(renderer.domElement);

      const count = 1120;
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial();
      const particles = new THREE.InstancedMesh(geometry, material, count);
      const group = new THREE.Group();
      group.add(particles);
      scene.add(group);
      const sphere: number[][] = [];
      const columns: number[][] = [];
      const network: number[][] = [];
      const links: number[][] = [];
      const nodes = [[-1.15, -0.7, 0], [1.15, -0.7, 0], [0, 1.05, 0]];
      const dummy = new THREE.Object3D();
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        sphere.push([Math.cos(theta) * radius * 1.55, y * 1.55, Math.sin(theta) * radius * 1.55]);
        const column = i % 6;
        const row = Math.floor(i / 6) % 24;
        const depth = Math.floor(i / 144);
        const height = [0.55, 0.85, 1.15, 1.5, 1.9, 2.4][column] ?? 1;
        columns.push([(column - 2.5) * 0.46, (row / 23) * height - 1.2, (depth - 3.5) * 0.12]);
        const node = nodes[i % 3] ?? [0, 0, 0];
        const ny = 1 - ((Math.floor(i / 3) % 320) / 319) * 2;
        const nr = Math.sqrt(1 - ny * ny);
        const nt = goldenAngle * i;
        network.push([(node[0] ?? 0) + Math.cos(nt) * nr * 0.5, (node[1] ?? 0) + ny * 0.5, Math.sin(nt) * nr * 0.5]);
        links.push(i % 5 === 0 ? [i % 3, (i * 0.618) % 1] : []);
        const color = colors[i % 13 === 0 ? 1 : i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 0];
        if (color) particles.setColorAt(i, color);
      }
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let elapsed = 0;
      let last = performance.now();
      let frame = 0;
      let visible = true;
      const pointer = { x: 0, y: 0 };
      const resize = new ResizeObserver(() => {
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      });
      resize.observe(element);
      const intersection = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
      intersection.observe(element);
      const move = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.35;
        pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.2;
      };
      const leave = () => { pointer.x = 0; pointer.y = 0; };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);

      const draw = (now: number) => {
        frame = requestAnimationFrame(draw);
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (reset.current) { elapsed = 0; reset.current = false; }
        if (!paused.current && !motion.matches && visible) elapsed += delta;
        if (!visible) return;
        // Data (sphere) -> collaboration (linked partners) -> value (rising columns) -> data
        const shapes = [sphere, network, columns];
        const phase = motion.matches ? 1 : elapsed % 18;
        const segment = Math.floor(phase / 6);
        const local = phase % 6;
        const blend = local < 3.5 ? 0 : (local - 3.5) / 2.5;
        const eased = blend * blend * (3 - 2 * blend);
        const current = motion.matches ? 1 : eased < 0.5 ? segment : (segment + 1) % 3;
        if (current !== stageRef.current) { stageRef.current = current; setStage(current); }
        const from = shapes[segment] ?? sphere;
        const to = shapes[(segment + 1) % 3] ?? sphere;
        const flow = (i: number, base: number[], shared: boolean) => {
          const link = links[i];
          if (!shared || !link || link.length < 2) return base;
          const s0 = nodes[link[0] ?? 0] ?? [0, 0, 0];
          const s1 = nodes[((link[0] ?? 0) + 1) % 3] ?? [0, 0, 0];
          const t = ((link[1] ?? 0) + elapsed * 0.18) % 1;
          return [(s0[0] ?? 0) + ((s1[0] ?? 0) - (s0[0] ?? 0)) * t, (s0[1] ?? 0) + ((s1[1] ?? 0) - (s0[1] ?? 0)) * t, 0];
        };
        const spin = segment === 0 ? 1 - eased : segment === 2 ? eased : 0;
        for (let i = 0; i < count; i++) {
          const fa = from[i];
          const fb = to[i];
          if (!fa || !fb) continue;
          const a = motion.matches ? flow(i, fb, to === network) : flow(i, fa, from === network);
          const b = flow(i, fb, to === network);
          const ripple = motion.matches ? 1 : 1 + Math.sin(elapsed * 1.2 + i * 0.03) * 0.025 * spin;
          dummy.position.set(
            ((a[0] ?? 0) * (1 - eased) + (b[0] ?? 0) * eased) * ripple,
            ((a[1] ?? 0) * (1 - eased) + (b[1] ?? 0) * eased) * ripple,
            ((a[2] ?? 0) * (1 - eased) + (b[2] ?? 0) * eased) * ripple,
          );
          dummy.scale.set(0.026 + (i % 4) * 0.011, 0.012 + (i % 3) * 0.004, 0.015);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          particles.setMatrixAt(i, dummy.matrix);
        }
        particles.instanceMatrix.needsUpdate = true;
        if (motion.matches) {
          group.rotation.set(-0.08, 0.2, 0);
        } else if (!paused.current) {
          group.rotation.y = Math.sin(elapsed * 0.3) * 0.5 * spin + 0.2 * (1 - spin) + pointer.x;
          group.rotation.x += ((-0.08 + pointer.y) - group.rotation.x) * 0.04;
        }
        renderer.render(scene, camera);
      };
      draw(performance.now());
      setReady(true);
      cleanup = () => {
        cancelAnimationFrame(frame);
        resize.disconnect();
        intersection.disconnect();
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
        geometry.dispose();
        material.dispose();
        particles.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <figure className="data-value-animation w-full" aria-label={HERO_ANIMATION.description}>
      <div ref={host} className="data-value-scene" aria-hidden="true">
        {!ready && (
          <svg className="data-value-fallback" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="135" />
            <ellipse cx="200" cy="200" rx="70" ry="135" />
            <ellipse cx="200" cy="200" rx="135" ry="48" />
            <path d="M65 200h270M200 65v270" />
          </svg>
        )}
      </div>
      <div className="flex min-h-11 items-center justify-between gap-2 border-t border-border pt-3">
        <figcaption className="font-mono text-xs text-muted-foreground sm:text-sm">{HERO_ANIMATION.stages[stage] ?? HERO_ANIMATION.label}</figcaption>
        <div className="flex shrink-0 gap-1">
          <Button variant="ghost" size="icon" title={isPaused ? "Play animation" : "Pause animation"} aria-label={isPaused ? "Play animation" : "Pause animation"} onClick={() => {
            paused.current = !isPaused;
            setIsPaused(!isPaused);
          }}>{isPaused ? <Play /> : <Pause />}</Button>
          <Button variant="ghost" size="icon" title="Replay animation" aria-label="Replay animation" onClick={() => {
            reset.current = true;
            paused.current = false;
            setIsPaused(false);
          }}><RotateCcw /></Button>
        </div>
      </div>
    </figure>
  );
}