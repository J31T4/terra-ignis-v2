import React, { useEffect, useRef } from 'react';

/**
 * FireParticles — subtle rising embers/sparks behind the hero content.
 *
 * Performance guardrails (per task spec):
 *  - max 25 particles, sizes 2-6 px, palette #FF8C42 / #C8102E / #FFD9A0
 *  - single requestAnimationFrame loop, paused on visibilitychange and on unmount
 *  - capped devicePixelRatio (2), canvas sized to the host section only
 *  - fully disabled when prefers-reduced-motion is set (renders nothing)
 */

const PALETTE = ['#FF8C42', '#C8102E', '#FFD9A0'];
const MAX_PARTICLES = 25;
const MAX_AGE_MS = 7000;

interface Particle {
  x: number;      // px
  y: number;      // px
  vx: number;     // px/s horizontal drift
  vy: number;     // px/s upward speed (negative = up)
  r: number;      // radius px
  color: string;
  age: number;    // ms
  life: number;   // total lifetime ms
  tw: number;     // flicker frequency
  twPhase: number;
}

export const FireParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return; // reduced motion -> no particles at all

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find the hosting <section> (Hero) to size the canvas to.
    sectionRef.current = canvas.closest('section');
    const section = sectionRef.current;

    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let lastT = performance.now();
    let running = true;
    let dpr = 1;

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: height + 8,
      vx: (Math.random() - 0.5) * 16,        // gentle drift
      vy: -(26 + Math.random() * 42),        // 26-68 px/s upward
      r: 1 + Math.random() * 2,              // 2-6 px diameter
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      age: 0,
      life: MAX_AGE_MS * (0.55 + Math.random() * 0.45),
      tw: 5 + Math.random() * 9,             // flicker speed
      twPhase: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const rect = section
        ? section.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const step = (t: number) => {
      if (!running) return;
      const dt = Math.min(64, t - lastT) / 1000;
      lastT = t;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      while (particles.length < MAX_PARTICLES) particles.push(spawn());

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt * 1000;
        if (p.age > p.life || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Ease in, fade out + flicker
        const fadeIn = Math.min(1, p.age / 500);
        const fadeOut = 1 - p.age / p.life;
        const flicker = 0.55 + 0.45 * Math.sin(p.twPhase + p.tw * (t / 1000));
        const alpha = Math.max(0, fadeIn * Math.max(0, fadeOut)) * flicker;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.85;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        // soft glow halo
        ctx.globalAlpha = alpha * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (!running) return;
      lastT = performance.now();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    resize();
    start();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[5]"
    />
  );
};
