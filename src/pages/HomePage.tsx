import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogoImg } from '../components/LogoImg';
import {
  Sun, Moon, Flame, Sparkles, Music, Heart, Users, Star,
  ArrowRight, Mail,
} from 'lucide-react';

/* --- OBSAH: DEN --- */
const DAY_ITEMS = [
  { icon: Users, title: 'Kejklířské vystoupení', text: 'Žonglování s míčky, kužely, kruhy a dalšími hračkami. Energické a interaktivní.' },
  { icon: Sparkles, title: 'Kejklířská školička', text: 'Workshop pro návštěvníky — nejen děti si vyzkoušejí žonglování.' },
  { icon: Star, title: 'Program na míru', text: 'Denní vystoupení přesně podle vaší akce — festival, slavnost, rodinný den.' },
];

/* --- OBSAH: NOC --- */
const NIGHT_ITEMS = [
  { icon: Flame, title: 'Klasická tavern show', text: 'Energické vystoupení inspirované historickou atmosférou. 10–15 min, 5–6 performerů.' },
  { icon: Music, title: 'Filmové melodie', text: 'Hromadné choreografie ve stylu známých filmů. 15 min, 5–6 performerů.' },
  { icon: Heart, title: 'Za soumraku', text: 'Romantické divadelné vystoupení s příběhem. 15 min, 6 performerů.' },
];

/* --- HVĚZDY: deterministické pozice --- */
const STARS = Array.from({ length: 70 }, (_, i) => ({
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 3) % 88}%`,
  size: 1 + (i % 3),
  opacity: 0.35 + (i % 5) * 0.13,
  dur: 2 + (i % 4) * 1.2,
  delay: (i % 7) * 0.6,
}));

/* --- OBLAČNÉ STÍHY pro den --- */
const CLOUDS = [
  { left: '6%', top: '10%', w: 190, h: 55, opacity: 0.4 },
  { left: '58%', top: '16%', w: 230, h: 50, opacity: 0.3 },
  { left: '32%', top: '30%', w: 160, h: 44, opacity: 0.22 },
];

export const HomePage: React.FC = () => {
  const [hovered, setHovered] = useState<'day' | 'night' | null>(null);

  /* Odkrývání: obě vrstvy jsou přes celou obrazovku, clip-path odhaluje.
     Pozadí se NEROZTAHUJE — jen se odkrývá/ukrývá.
     Druhá strana zůstává vidět jako úzký pruh (12 %), ať je vidět,
     že je tam druhá možnost, a myš má kam se vrátit. */
  const dayReveal = hovered === 'night' ? 12 : hovered === 'day' ? 88 : 50;

  /* Nastaví data-theme na <html> pro přepnutí barev headeru atd. */
  useEffect(() => {
    const t = hovered === 'day' ? 'day' : hovered === 'night' ? 'night' : '';
    if (t) {
      document.documentElement.dataset.theme = t;
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, [hovered]);

  return (
    <>
      <section className="relative overflow-hidden" style={{ minHeight: 'calc(100vh - 72px)' }}>

        {/* ===== VRSTVA 1: DEN (clip-path odhaluje) ===== */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(0% 0%, ${dayReveal}% 0%, ${dayReveal}% 100%, 0% 100%)`,
            transition: 'clip-path 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
            background: 'linear-gradient(170deg, #EAF4FF 0%, #E0EDFA 15%, #F0EDD8 35%, #FDF2DA 55%, #FBE8BC 75%, #F7CE8C 100%)',
          }}
        >
          {/* Sluneční záře — větší kontejner, ať nemá tvrdou hranu */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 70% 80% at 78% 8%, rgba(255,214,102,0.55) 0%, rgba(255,186,66,0.22) 35%, rgba(255,210,120,0.08) 60%, transparent 85%)',
            }}
          />
          {/* Paprsky */}
          <div
            className="absolute opacity-[0.04]"
            style={{
              top: '-20%', right: '-20%', width: '110%', height: '110%',
              background: 'conic-gradient(from 200deg at 82% 12%, transparent 0deg, #E8A020 12deg, transparent 26deg, #E8A020 44deg, transparent 58deg, #E8A020 76deg, transparent 90deg, #E8A020 108deg, transparent 122deg, #E8A020 140deg, transparent 154deg, #E8A020 172deg, transparent 186deg, #E8A020 204deg, transparent 220deg)',
            }}
          />
          {/* Obláčky */}
          {CLOUDS.map((c, i) => (
            <div
              key={`cloud-${i}`}
              style={{
                position: 'absolute',
                left: c.left, top: c.top,
                width: c.w, height: c.h,
                borderRadius: '50%',
                background: `radial-gradient(ellipse, rgba(255,255,255,${c.opacity}) 0%, transparent 70%)`,
                filter: 'blur(14px)',
              }}
            />
          ))}
          {/* Zářivé slunce — uvnitř viditelné části i při roztažení (88 %) */}
          <div
            style={{
              position: 'absolute',
              top: '7%', right: '16%',
              width: 110, height: 110,
              background: 'radial-gradient(circle, #FFF3C4 0%, #FFD24D 48%, transparent 72%)',
              borderRadius: '50%',
              boxShadow: '0 0 70px 26px rgba(255,200,70,0.4)',
            }}
          />
          {/* Jemná textura */}
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1A1512 0, #1A1512 1px, transparent 1px, transparent 18px)' }} />
        </div>

        {/* ===== VRSTVA 2: NOC (nad dnem, clip-path odhaluje) ===== */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(${dayReveal}% 0%, 100% 0%, 100% 100%, ${dayReveal}% 100%)`,
            transition: 'clip-path 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
            background: 'linear-gradient(170deg, #060A1E 0%, #0B1030 30%, #141238 65%, #1A0E2A 100%)',
          }}
        >
          {/* Hvězdy */}
          {STARS.map((s, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                left: s.left, top: s.top,
                width: s.size, height: s.size,
                background: '#FFFFFF',
                opacity: s.opacity,
                animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
              }}
            />
          ))}
          {/* Mlhovina */}
          <div
            style={{
              position: 'absolute',
              top: '8%', left: '15%',
              width: '70%', height: '50%',
              background: 'radial-gradient(ellipse, rgba(90,110,190,0.22) 0%, rgba(60,50,120,0.08) 50%, transparent 75%)',
              filter: 'blur(40px)',
            }}
          />
          {/* Měsíc — uvnitř viditelné části i při roztažení noci (za 12 %) */}
          <div
            style={{
              position: 'absolute',
              top: '9%', left: '18%',
              width: 84, height: 84,
              background: 'radial-gradient(circle at 38% 36%, #FFFDF2 0%, #F0E9CE 48%, #C9C0A2 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 60px 20px rgba(230,225,200,0.22), 0 0 140px 50px rgba(180,180,220,0.1)',
            }}
          />
          <div className="absolute" style={{ top: '12%', left: '21%', width: 16, height: 13, background: 'rgba(185,178,150,0.35)', borderRadius: '50%' }} />
          <div className="absolute" style={{ top: '15.5%', left: '26%', width: 9, height: 9, background: 'rgba(185,178,150,0.25)', borderRadius: '50%' }} />
          {/* Noční opar */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: 'linear-gradient(to top, rgba(10,6,22,0.65), transparent)' }} />
        </div>

        {/* ===== HOVER ZÓNA: jedna vrstva, strana se určí z clientX.
             (Dva oddělené onMouseEnter/Leave se rvaly — mouseleave
             jedné zóny přepisoval mouseenter druhé → návrat na 50/50.) ===== */}
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setHovered((e.clientX - rect.left) < rect.width / 2 ? 'day' : 'night');
          }}
          onMouseLeave={() => setHovered(null)}
        />

        {/* ===== OBSAH: rozdělený text overlay (pointer-events: none, ať
             hover zóny v z-10 dostávají myš) ===== */}
        <div
          className="relative z-20 flex flex-col md:flex-row"
          style={{ minHeight: 'calc(100vh - 72px)', pointerEvents: 'none' }}
        >

          {/* DEN text */}
          <div
            className="flex flex-col justify-end p-6 sm:p-10"
            style={{
              width: `${dayReveal}%`,
              transition: 'width 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
              opacity: dayReveal < 20 ? 0 : 1,
            }}
          >
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-7 h-7 text-[#D4760A]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4760A]">Den</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#1A1512] leading-[1.05] mb-4">
                Žonglování<br />bez ohně
              </h2>

              <p className="text-sm sm:text-base text-[#3A312A] font-serif-body leading-relaxed mb-6">
                Energické denní vystoupení plné žonglování, kejklířských kousků a interakce s diváky.
              </p>

              <AnimatePresence>
                {hovered === 'day' && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="space-y-3 mb-6"
                  >
                    {DAY_ITEMS.map((item) => (
                      <div key={item.title} className="flex items-start gap-3 bg-white/75 backdrop-blur-sm border border-[#1A1512]/15 p-3 rounded-sm">
                        <item.icon className="w-5 h-5 text-[#D4760A] mt-0.5 shrink-0" />
                        <div>
                          <h3 className="font-display font-bold text-sm uppercase tracking-wide text-[#1A1512]">{item.title}</h3>
                          <p className="text-xs text-[#3A312A] font-serif-body leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                to="/vystoupeni"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1A1512] border-b-2 border-[#D4760A] pb-1 hover:gap-3 transition-all w-fit pointer-events-auto"
              >
                Denní vystoupení <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* NOC text */}
          <div
            className="flex flex-col justify-end p-6 sm:p-10"
            style={{
              width: `${100 - dayReveal}%`,
              transition: 'width 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
              opacity: 100 - dayReveal < 20 ? 0 : 1,
            }}
          >
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="w-7 h-7 text-[#FFE9A8]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFE9A8]">Noc</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-[1.05] mb-4">
                Tři podoby<br />ohně
              </h2>

              <p className="text-sm sm:text-base text-[#B9C0D8] font-serif-body leading-relaxed mb-6">
                Choreografická ohnivá show s poi, holemi, vějíři a fakírskými čísly.
              </p>

              <AnimatePresence>
                {hovered === 'night' && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="space-y-3 mb-6"
                  >
                    {NIGHT_ITEMS.map((item) => (
                      <div key={item.title} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm border border-white/15 p-3 rounded-sm">
                        <item.icon className="w-5 h-5 text-[#FFE9A8] mt-0.5 shrink-0" />
                        <div>
                          <h3 className="font-display font-bold text-sm uppercase tracking-wide text-white">{item.title}</h3>
                          <p className="text-xs text-[#B9C0D8] font-serif-body leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                to="/vystoupeni"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white border-b-2 border-[#FFE9A8] pb-1 hover:gap-3 transition-all w-fit pointer-events-auto"
              >
                Noční vystoupení <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ===== ERB UPROSTŘED ===== */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <motion.div
            className="relative"
            animate={{ scale: hovered ? 0.8 : 1, opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-[#FAF6EE] rounded-full scale-[1.14] shadow-2xl border-2 border-[#1A1512] hidden md:block" />
            <LogoImg size={160} className="relative z-10 drop-shadow-2xl max-md:!h-[100px]" />
          </motion.div>
        </div>
      </section>

      {/* ===== SPODNÍ CTA PÁS ===== */}
      <section className="bg-[#C8102E] text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6" />
            <h3 className="font-display font-bold text-lg uppercase tracking-wide">
              Chcete nás na svou akci?
            </h3>
          </div>
          <div className="flex gap-3">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-[#C8102E] px-6 py-3 text-sm font-bold uppercase tracking-wider border-2 border-[#1A1512] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Mail className="w-4 h-4" /> Kontakt
            </Link>
            <Link
              to="/vystoupeni"
              className="inline-flex items-center gap-2 bg-transparent text-white px-6 py-3 text-sm font-bold uppercase tracking-wider border-2 border-white hover:bg-white hover:text-[#C8102E] transition-all"
            >
              Vystoupení <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
