import { useLayoutEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ShowsPage } from './pages/ShowsPage';
import { ContactPage } from './pages/ContactPage';

/**
 * Návrat na vršek stránky při přechodu mezi routes. Layout effect = dřív než
 * první paint přechodu (ať hoření startuje už na srolovaném topu); 'instant'
 * přebíjí CSS scroll-behavior: smooth, jinak by se stránka vlnila nahoru
 * během 600ms masky.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/**
 * V5.1 Ilustrovaný oheň — deterministická data pro plameny, jiskry, uhlíky.
 * Trvání: hoření 0.7s, celý přechod 0.7s (exit tween končí s maskou,
 * posledních 0.1s fade — žádný tmavý závoj po dohoření).
 */

/* Flame tongues: { left%, width, height, color (gold/orange/red), dur, delay } */
const BURN_TONGUES: {
  left: string; w: number; h: number; bot: number;
  color: 'gold' | 'orange' | 'red'; dur: number; delay: number;
}[] = [
  // GOLDEN tips — méně & širší (8 ks jako na referenci), esíčka čitelná.
  // bot = roztřepený spodek: každý jazyk začíná jinde, žádná rovná linka.
  { left: '1%',  w: 66, h: 265, bot: -12, color: 'gold', dur: 0.38, delay: 0.00 },
  { left: '13%', w: 58, h: 300, bot: -35, color: 'gold', dur: 0.32, delay: 0.06 },
  { left: '26%', w: 70, h: 280, bot: -20, color: 'gold', dur: 0.40, delay: 0.02 },
  { left: '38%', w: 60, h: 295, bot: -42, color: 'gold', dur: 0.35, delay: 0.08 },
  { left: '51%', w: 70, h: 270, bot: -15, color: 'gold', dur: 0.42, delay: 0.00 },
  { left: '63%', w: 59, h: 290, bot: -38, color: 'gold', dur: 0.30, delay: 0.10 },
  { left: '76%', w: 66, h: 275, bot: -22, color: 'gold', dur: 0.36, delay: 0.04 },
  { left: '88%', w: 58, h: 285, bot: -30, color: 'gold', dur: 0.40, delay: 0.05 },
  // ORANGE mid-layer — offset, širší
  { left: '7%',  w: 72, h: 230, bot: -8,  color: 'orange', dur: 0.30, delay: 0.03 },
  { left: '20%', w: 66, h: 210, bot: -25, color: 'orange', dur: 0.28, delay: 0.07 },
  { left: '32%', w: 74, h: 240, bot: -12, color: 'orange', dur: 0.32, delay: 0.01 },
  { left: '45%', w: 68, h: 215, bot: -30, color: 'orange', dur: 0.26, delay: 0.09 },
  { left: '57%', w: 74, h: 245, bot: -10, color: 'orange', dur: 0.34, delay: 0.04 },
  { left: '70%', w: 66, h: 220, bot: -22, color: 'orange', dur: 0.28, delay: 0.02 },
  { left: '82%', w: 70, h: 235, bot: -18, color: 'orange', dur: 0.32, delay: 0.06 },
  // RED core — široká oblá hmota vzadu
  { left: '0%',  w: 48, h: 160, bot: -5,  color: 'red', dur: 0.25, delay: 0.05 },
  { left: '18%', w: 52, h: 175, bot: -15, color: 'red', dur: 0.22, delay: 0.08 },
  { left: '36%', w: 50, h: 155, bot: -8,  color: 'red', dur: 0.28, delay: 0.02 },
  { left: '54%', w: 52, h: 180, bot: -18, color: 'red', dur: 0.24, delay: 0.06 },
  { left: '72%', w: 50, h: 160, bot: -6,  color: 'red', dur: 0.26, delay: 0.00 },
  { left: '88%', w: 46, h: 170, bot: -12, color: 'red', dur: 0.22, delay: 0.07 },
];

/* Down-licking drops: malé plamínky pod čarou (stránka "hoří" i dolů) */
const BURN_DROPS: {
  left: string; w: number; h: number; bot: number;
  color: 'gold' | 'orange'; dur: number; delay: number;
}[] = [
  { left: '6%',  w: 24, h: 110, bot: -70,  color: 'gold',   dur: 0.22, delay: 0.02 },
  { left: '19%', w: 20, h: 90,  bot: -55,  color: 'orange', dur: 0.26, delay: 0.07 },
  { left: '32%', w: 26, h: 120, bot: -85,  color: 'gold',   dur: 0.20, delay: 0.00 },
  { left: '45%', w: 21, h: 95,  bot: -60,  color: 'orange', dur: 0.24, delay: 0.05 },
  { left: '58%', w: 26, h: 125, bot: -88,  color: 'gold',   dur: 0.22, delay: 0.09 },
  { left: '71%', w: 20, h: 92,  bot: -58,  color: 'orange', dur: 0.26, delay: 0.03 },
  { left: '83%', w: 24, h: 115, bot: -78,  color: 'gold',   dur: 0.20, delay: 0.06 },
  { left: '94%', w: 20, h: 88,  bot: -55,  color: 'orange', dur: 0.24, delay: 0.01 },
];

/* Vločky k mlze: 6 ks, krátký snos s oparem (after-fáze ≤1.2s,
   ať nová stránka nezůstává pod šedým závojem) */
const BURN_ASH_AFTER: {
  left: string; top: string; size: number; tone: 'grey' | 'dark';
  delay: number; dur: number; dx: number; dy: number; drift: number;
}[] = [
  { left: '7%',  top: '6%',  size: 5, tone: 'grey', delay: 0.10, dur: 1.1,  dx: 24,  dy: 320, drift: 12 },
  { left: '25%', top: '3%',  size: 4, tone: 'dark', delay: 0.05, dur: 1.2,  dx: 18,  dy: 350, drift: 14 },
  { left: '47%', top: '8%',  size: 5, tone: 'grey', delay: 0.15, dur: 1.1,  dx: -20, dy: 330, drift: 12 },
  { left: '65%', top: '5%',  size: 4, tone: 'dark', delay: 0.20, dur: 1.0,  dx: 16,  dy: 310, drift: 14 },
  { left: '84%', top: '7%',  size: 4, tone: 'grey', delay: 0.10, dur: 1.15, dx: -18, dy: 340, drift: -12 },
  { left: '91%', top: '24%', size: 4, tone: 'dark', delay: 0.30, dur: 0.95, dx: 20,  dy: 300, drift: 10 },
];

/* Mlha po shoření: 2 jemné teplé plochy (krátce — žádný šedý závoj) */
const BURN_MIST: {
  left: string; top: string; w: number; h: number; tone: 'grey' | 'dark';
  delay: number; dur: number; dx: number; dy: number;
}[] = [
  { left: '-5%', top: '5%',  w: 550, h: 340, tone: 'grey', delay: 0.10, dur: 1.2, dx: 60,  dy: 180 },
  { left: '30%', top: '25%', w: 520, h: 320, tone: 'dark', delay: 0.20, dur: 1.0, dx: -70, dy: 200 },
];
const BURN_SPARKS = [
  { left: '4%', size: 4, delay: 0.03, dur: 0.30, dx: 14, dy: -160 },
  { left: '12%', size: 3, delay: 0.08, dur: 0.28, dx: -10, dy: -130 },
  { left: '22%', size: 5, delay: 0.04, dur: 0.35, dx: 18, dy: -200 },
  { left: '33%', size: 3, delay: 0.12, dur: 0.26, dx: -14, dy: -120 },
  { left: '44%', size: 4, delay: 0.05, dur: 0.32, dx: 8, dy: -170 },
  { left: '55%', size: 3, delay: 0.10, dur: 0.30, dx: -8, dy: -140 },
  { left: '66%', size: 5, delay: 0.03, dur: 0.38, dx: 16, dy: -210 },
  { left: '76%', size: 3, delay: 0.14, dur: 0.25, dx: -12, dy: -110 },
  { left: '85%', size: 4, delay: 0.06, dur: 0.30, dx: 10, dy: -180 },
  { left: '93%', size: 4, delay: 0.04, dur: 0.28, dx: -6, dy: -150 },
  { left: '8%',  size: 3, delay: 0.11, dur: 0.25, dx: 6, dy: -120 },
  { left: '50%', size: 4, delay: 0.03, dur: 0.35, dx: -16, dy: -190 },
  { left: '16%', size: 3, delay: 0.07, dur: 0.28, dx: 12, dy: -135 },
  { left: '62%', size: 4, delay: 0.05, dur: 0.32, dx: -8, dy: -175 },
  { left: '80%', size: 3, delay: 0.09, dur: 0.26, dx: 8, dy: -125 },
];

const BURN_EMBERS = [
  // hot (golden/orange)
  { left: '10%', bottom: '8%', w: 7, h: 9, delay: 0.03, dur: 0.38, dx: 20, dy: -160, rot: 60, type: 'hot' as const },
  { left: '30%', bottom: '5%', w: 6, h: 8, delay: 0.07, dur: 0.35, dx: -14, dy: -140, rot: -40, type: 'hot' as const },
  { left: '58%', bottom: '6%', w: 8, h: 10, delay: 0.03, dur: 0.40, dx: 12, dy: -180, rot: 35, type: 'hot' as const },
  { left: '78%', bottom: '7%', w: 6, h: 7, delay: 0.10, dur: 0.30, dx: -8, dy: -120, rot: -55, type: 'hot' as const },
  { left: '45%', bottom: '4%', w: 5, h: 7, delay: 0.05, dur: 0.38, dx: 10, dy: -155, rot: 45, type: 'hot' as const },
  { left: '90%', bottom: '6%', w: 6, h: 8, delay: 0.08, dur: 0.35, dx: -16, dy: -135, rot: -35, type: 'hot' as const },
  // cool (red/dark red)
  { left: '18%', bottom: '10%', w: 6, h: 7, delay: 0.05, dur: 0.40, dx: 10, dy: -110, rot: 25, type: 'cool' as const },
  { left: '42%', bottom: '4%', w: 7, h: 8, delay: 0.03, dur: 0.42, dx: -18, dy: -130, rot: -30, type: 'cool' as const },
  { left: '65%', bottom: '9%', w: 5, h: 6, delay: 0.08, dur: 0.38, dx: 14, dy: -100, rot: 45, type: 'cool' as const },
  { left: '88%', bottom: '6%', w: 6, h: 7, delay: 0.03, dur: 0.45, dx: -10, dy: -125, rot: -20, type: 'cool' as const },
  { left: '52%', bottom: '8%', w: 5, h: 6, delay: 0.07, dur: 0.40, dx: 8, dy: -105, rot: 30, type: 'cool' as const },
  // char (dark burning)
  { left: '25%', bottom: '3%', w: 5, h: 5, delay: 0.04, dur: 0.38, dx: 8, dy: -90, rot: 30, type: 'char' as const },
  { left: '48%', bottom: '2%', w: 6, h: 6, delay: 0.07, dur: 0.40, dx: -12, dy: -100, rot: -45, type: 'char' as const },
  { left: '72%', bottom: '5%', w: 5, h: 5, delay: 0.10, dur: 0.35, dx: 6, dy: -80, rot: 15, type: 'char' as const },
  { left: '35%', bottom: '4%', w: 4, h: 5, delay: 0.06, dur: 0.38, dx: -6, dy: -95, rot: -25, type: 'char' as const },
];

/**
 * V5.1 Ilustrovaný oheň — při exit fázi (0.4s):
 * 1. Paper mask hoří shora dolů — vršek zmizí první
 * 2. Flame-band stoupá zdola nahoru s individual flame-tongues
 * 3. Charred-edge strip, glow, embers, sparks
 */
function BurnStage({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent();
  // Oheň hraje VŽDY (nerespektujeme systémové "omezit animace" — celý web
  // je postavený na hořícím přechodu, bez něj nedává smysl).
  const burning = !isPresent;

  return (
    <div className={`page-burn${isPresent ? '' : ' is-exiting'}`}>
      <div className="page-burn-paper">{children}</div>
      {/* Mlha po shoření — hraje i po dohoření vlny */}
      {isPresent && (
        <div className="page-ash-after" aria-hidden="true">
          {BURN_MIST.map((m, i) => (
            <span
              key={`mist-${i}`}
              className={`burn-mist burn-mist--${m.tone}`}
              style={{
                left: m.left,
                top: m.top,
                width: `${m.w}px`,
                height: `${m.h}px`,
                '--mist-delay': `${m.delay}s`,
                '--mist-dur': `${m.dur}s`,
                '--mist-dx': `${m.dx}px`,
                '--mist-dy': `${m.dy}px`,
              } as CSSProperties}
            />
          ))}
          {BURN_ASH_AFTER.map((f, i) => (
            <span
              key={`ash-after-${i}`}
              className={`burn-ash burn-ash--${f.tone}`}
              style={{
                left: f.left,
                top: f.top,
                width: `${f.size}px`,
                height: `${f.size}px`,
                '--ash-delay': `${f.delay}s`,
                '--ash-dur': `${f.dur}s`,
                '--ash-dx': `${f.dx}px`,
                '--ash-dy': `${f.dy}px`,
                '--ash-drift': `${f.drift}px`,
              } as CSSProperties}
            />
          ))}
        </div>
      )}
      {burning && (
        <div className="page-burn-edge" aria-hidden="true">
          {/* Individual flame tongues */}
          {BURN_TONGUES.map((t, i) => (
            <div
              key={`tongue-${i}`}
              className={`ft ft--${t.color}`}
              style={{
                left: t.left,
                width: `${t.w}px`,
                height: `${t.h}px`,
                bottom: `${t.bot}px`,
                '--ft-dur': `${t.dur}s`,
                '--ft-delay': `${t.delay}s`,
              } as CSSProperties}
            />
          ))}

          {/* Down-licking drops — malé plamínky pod čarou */}
          {BURN_DROPS.map((d, i) => (
            <div
              key={`drop-${i}`}
              className={`ft ft--down ft--${d.color}`}
              style={{
                left: d.left,
                width: `${d.w}px`,
                height: `${d.h}px`,
                bottom: `${d.bot}px`,
                '--ft-dur': `${d.dur}s`,
                '--ft-delay': `${d.delay}s`,
                '--ft-anim': d.color === 'gold' ? 'ti-drop-gold' : 'ti-drop-orange',
              } as CSSProperties}
            />
          ))}

          {/* Charred edge strip */}
          <div className="page-burn-charred" />

          {/* Žhnoucí linka na čele ohně (pulzující zář) */}
          <div className="burn-front-line" />

          {/* Glow at the base of flames */}
          <div className="burn-glow show" />

          {/* Embers — glowing charred bits */}
          {BURN_EMBERS.map((e, i) => (
            <span
              key={`ember-${i}`}
              className={`burn-ember burn-ember--${e.type}`}
              style={{
                left: e.left,
                bottom: e.bottom,
                width: `${e.w}px`,
                height: `${e.h}px`,
                '--ember-delay': `${e.delay}s`,
                '--ember-dur': `${e.dur}s`,
                '--ember-dx': `${e.dx}px`,
                '--ember-dy': `${e.dy}px`,
                '--ember-rot': `${e.rot}deg`,
              } as CSSProperties}
            />
          ))}

          {/* Sparks — bright dots shooting upward */}
          {BURN_SPARKS.map((s, i) => (
            <span
              key={`spark-${i}`}
              className="burn-spark"
              style={{
                left: s.left,
                bottom: '50%',
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
                '--burn-dx': `${s.dx}px`,
                '--burn-dy': `${s.dy}px`,
              } as CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1512] flex flex-col font-sans-ui selection:bg-[#C8102E] selection:text-white">
      {/* Thin red scroll progress bar — jen na home (dle zadání V4) */}
      {isHome && <ScrollProgress />}
      <ScrollToTop />

      {/* Navigation Header */}
      <Header />

      {/*
        Routes — V4.2 paper-burn page transition.
        mode="sync": odchozí stránka zůstává v DOM jako absolutní překryv
        (z-30, main je relative) a shoří CSS maskou zdola nahoru (~600ms),
        pod ní už stojí nová stránka (scale 0.99->1, opacity 0.6->1).
        Oheň hraje vždy (i při systémovém "omezit animace").
      */}
      <main className="flex-grow relative">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={location.pathname}
            /* relative: ať exit zIndex:50 skutečně zdvihne odchozí stránku
               nad novou (na statickém bloku by se z-index ignoroval) */
            style={{ position: 'relative' }}
            /* Nová stránka: od prvního snímku čitelná pod hořícím papírem
               (opacity 0.85, scale 0.99) a plynule se doklidí — stojí POD
               papírem od začátku, oheň ji jen odhaluje. */
            initial={{ opacity: 0.85, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={
              // Exit končí PŘESNĚ s maskou (0.7s) + fade posledních 0.1s:
              // papír nesmí zůstat viset jako tmavý závoj po dohoření
              // (brightness 0.05 na konci masky). opacity [1,1,0] s časy
              // [0,0.85,1] = plně viditelný během hoření, rozpuštění
              // jen v ocase. zIndex 40 = papír nad papírem, pod headerem.
              {
                opacity: [1, 1, 0],
                zIndex: 40,
                transition: { duration: 0.7, times: [0, 0.85, 1], ease: 'linear' },
              }
            }
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <BurnStage>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/o-nas" element={<AboutPage />} />
                <Route path="/vystoupeni" element={<ShowsPage />} />
                <Route path="/kontakt" element={<ContactPage />} />
                {/* 404 → domů */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BurnStage>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
