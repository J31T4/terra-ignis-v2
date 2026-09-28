import React, { useState, useMemo } from 'react';
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
  { icon: Heart, title: 'Za soumraku', text: 'Romantické divadelní vystoupení s příběhem. 15 min, 6 performerů.' },
];

/* --- HVĚZDY: deterministické pozice (žádný random při renderu) --- */
const STARS = Array.from({ length: 60 }, (_, i) => ({
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 3) % 85}%`,
  size: 1 + (i % 3),
  opacity: 0.3 + (i % 5) * 0.14,
  dur: 2 + (i % 4) * 1.2,
  delay: (i % 7) * 0.6,
}));

/* --- OBLAČNÉ STÍNY pro den --- */
const CLOUDS = [
  { left: '5%', top: '8%', w: 180, h: 60, opacity: 0.25 },
  { left: '55%', top: '15%', w: 220, h: 50, opacity: 0.18 },
  { left: '30%', top: '28%', w: 150, h: 45, opacity: 0.12 },
];

export const HomePage: React.FC = () => {
  const [hovered, setHovered] = useState<'day' | 'night' | null>(null);

  // Šířky přes CSS transition (plynulejší než framer-motion flex)
  const dayWidth = hovered === 'day' ? 82 : hovered === 'night' ? 18 : 50;
  const nightWidth = hovered === 'night' ? 82 : hovered === 'day' ? 18 : 50;

  return (
    <>
      {/* HLAVNÍ DEN/NOC SPLIT */}
      <section className="relative flex flex-col md:flex-row overflow-hidden" style={{ minHeight: 'calc(100vh - 72px)' }}>

        {/* ===== DEN ===== */}
        <div
          className="relative overflow-hidden cursor-pointer border-b-2 md:border-b-0 md:border-r-2 border-[#1A1512]"
          style={{
            width: `${dayWidth}%`,
            transition: 'width 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)',
            background: 'linear-gradient(175deg, #FDF8EE 0%, #F8EFD4 35%, #EDD9A0 70%, #E0C480 100%)',
          }}
          onMouseEnter={() => setHovered('day')}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Sluneční záře — velký měkký glow */}
          <div
            className="absolute"
            style={{
              top: '-15%', right: '-10%',
              width: '65%', height: '65%',
              background: 'radial-gradient(circle, rgba(255,210,80,0.55) 0%, rgba(255,180,50,0.2) 45%, transparent 70%)',
            }}
          />

          {/* Paprsky slunce */}
          <div
            className="absolute top-0 right-0 w-[80%] h-[80%] opacity-[0.08]"
            style={{
              background: 'conic-gradient(from 200deg at 85% 15%, transparent 0deg, #C8102E 15deg, transparent 30deg, #C8102E 50deg, transparent 65deg, #C8102E 85deg, transparent 100deg, #C8102E 120deg, transparent 135deg, #C8102E 155deg, transparent 180deg, #C8102E 200deg, transparent 220deg)',
            }}
          />

          {/* Obláčky */}
          {CLOUDS.map((c, i) => (
            <div
              key={`cloud-${i}`}
              className="absolute rounded-full"
              style={{
                left: c.left, top: c.top,
                width: c.w, height: c.h,
                background: `radial-gradient(ellipse, rgba(255,255,255,${c.opacity}) 0%, transparent 70%)`,
                filter: 'blur(12px)',
              }}
            />
          ))}

          {/* Jemná textura */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1A1512 0, #1A1512 1px, transparent 1px, transparent 16px)' }} />

          {/* Slunce — velké, zářící */}
          <motion.div
            className="absolute"
            style={{
              top: '6%', right: '8%',
              width: 120, height: 120,
              background: 'radial-gradient(circle, #FFE066 0%, #FFB830 50%, transparent 72%)',
              borderRadius: '50%',
              boxShadow: '0 0 60px 20px rgba(255,190,50,0.35)',
            }}
            animate={{ scale: hovered === 'day' ? 1.25 : 1, opacity: hovered === 'day' ? 1 : 0.85 }}
            transition={{ duration: 0.6 }}
          />

          {/* Obsah dne */}
          <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <Sun className="w-7 h-7 text-[#C8102E]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">Den</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#1A1512] leading-[1.05] mb-4">
              Žonglování<br />bez ohně
            </h2>

            <p className="text-sm sm:text-base text-[#3A312A] font-serif-body leading-relaxed mb-6 max-w-md">
              Energické denní vystoupení plné žonglování, kejklířských kousků a interakce s diváky.
            </p>

            <AnimatePresence>
              {hovered === 'day' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className="space-y-3 mb-6 max-w-lg"
                >
                  {DAY_ITEMS.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 bg-white/70 backdrop-blur-sm border border-[#1A1512]/15 p-3 rounded-sm">
                      <item.icon className="w-5 h-5 text-[#C8102E] mt-0.5 shrink-0" />
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
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1A1512] border-b-2 border-[#C8102E] pb-1 hover:gap-3 transition-all w-fit"
            >
              Denní vystoupení <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ===== NOC ===== */}
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{
            width: `${nightWidth}%`,
            transition: 'width 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)',
            background: 'linear-gradient(175deg, #0B0614 0%, #120A20 35%, #1A0E18 70%, #0D0504 100%)',
          }}
          onMouseEnter={() => setHovered('night')}
          onMouseLeave={() => setHovered(null)}
        >
          {/* HVĚZDY */}
          {STARS.map((s, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                left: s.left, top: s.top,
                width: s.size, height: s.size,
                background: '#fff',
                opacity: s.opacity,
                animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
              }}
            />
          ))}

          {/* Mlhovina / galaxie — jemný fialovo-modrý opar */}
          <div
            className="absolute"
            style={{
              top: '10%', left: '20%',
              width: '60%', height: '45%',
              background: 'radial-gradient(ellipse, rgba(80,50,120,0.25) 0%, rgba(40,30,80,0.1) 50%, transparent 75%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Měsíc — zářící s halo */}
          <div
            className="absolute"
            style={{
              top: '8%', left: '12%',
              width: 90, height: 90,
              background: 'radial-gradient(circle at 38% 38%, #F5F0DC 0%, #E8DFC0 45%, #C8BEA0 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 50px 18px rgba(220,210,180,0.2), 0 0 120px 40px rgba(180,170,140,0.08)',
            }}
          />
          {/* Krátery měsíce */}
          <div className="absolute" style={{ top: '11%', left: '15%', width: 18, height: 14, background: 'rgba(180,170,140,0.35)', borderRadius: '50%' }} />
          <div className="absolute" style={{ top: '14%', left: '20%', width: 10, height: 10, background: 'rgba(180,170,140,0.25)', borderRadius: '50%' }} />

          {/* Noční opar dole */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: 'linear-gradient(to top, rgba(26,10,12,0.6), transparent)' }} />

          {/* Spodní záře ohně */}
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to top, rgba(200,16,46,0.5), transparent)' }} />

          {/* Obsah noci */}
          <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <Moon className="w-7 h-7 text-[#E8A020]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8A020]">Noc</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-[1.05] mb-4">
              Ohnivá show<br />plná ohně
            </h2>

            <p className="text-sm sm:text-base text-[#B9AA94] font-serif-body leading-relaxed mb-6 max-w-md">
              Choreografická ohnivá show s poi, holemi, vějíři a fakírskými čísly.
            </p>

            <AnimatePresence>
              {hovered === 'night' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className="space-y-3 mb-6 max-w-lg"
                >
                  {NIGHT_ITEMS.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-sm">
                      <item.icon className="w-5 h-5 text-[#E8A020] mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-display font-bold text-sm uppercase tracking-wide text-white">{item.title}</h3>
                        <p className="text-xs text-[#B9AA94] font-serif-body leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              to="/vystoupeni"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white border-b-2 border-[#E8A020] pb-1 hover:gap-3 transition-all w-fit"
            >
              Noční vystoupení <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ===== ERB UPROSTŘED ===== */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <motion.div
            className="relative"
            animate={{
              scale: hovered ? 0.82 : 1,
              opacity: hovered ? 0.5 : 1,
            }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-[#FAF6EE] rounded-full scale-[1.12] shadow-2xl border-2 border-[#1A1512] hidden md:block" />
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
