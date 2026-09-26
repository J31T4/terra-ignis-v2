import React, { useEffect, useRef } from 'react';

/**
 * ScrollProgress — thin red bar at the very top that grows with scroll.
 * Pure rAF-throttled scroll listener; decorative (aria-hidden), honors reduced motion
 * by simply staying a passive bar (it only reflects scroll position, no autonomous motion).
 */
export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-[#C8102E] origin-left"
        style={{ transform: 'scaleX(0)', boxShadow: '0 0 8px rgba(200,16,46,0.55)' }}
      />
    </div>
  );
};
