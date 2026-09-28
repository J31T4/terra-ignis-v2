import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { LogoImg } from '../components/LogoImg';
import {
  Sun, Moon, Flame, Sparkles, Music, Heart, Users, Star,
  ArrowRight, Mail,
} from 'lucide-react';

/* --- OBSAH: DEN (světlá strana) --- */
const DAY_ITEMS = [
  { icon: Users, title: 'Kejklířské vystoupení', text: 'Žonglování s míčky, kužely, kruhy a dalšími hračkami. Energické a interaktivní.' },
  { icon: Sparkles, title: 'Kejklířská školička', text: 'Workshop pro návštěvníky — nejen děti si vyzkoušejí žonglování s různými hračkami.' },
  { icon: Star, title: 'Program na míru', text: 'Denní vystoupení přesně podle vaší akce — festival, slavnost, rodinný den.' },
];

/* --- OBSAH: NOC (tmavá strana) --- */
const NIGHT_ITEMS = [
  { icon: Flame, title: 'Klasická tavern show', text: 'Energické vystoupení inspirované historickou atmosférou. 10–15 min, 5–6 performerů.' },
  { icon: Music, title: 'Filmové melodie', text: 'Hromadné choreografie ve stylu známých filmů. 15 min, 5–6 performerů.' },
  { icon: Heart, title: 'Za soumraku', text: 'Romantické divadelní vystoupení s příběhem. 15 min, 6 performerů.' },
];

export const HomePage: React.FC = () => {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<'day' | 'night' | null>(null);

  // Poměr šířek: 50/50 default, 82/18 při hoveru
  const dayFlex = hovered === 'day' ? 82 : hovered === 'night' ? 18 : 50;
  const nightFlex = hovered === 'night' ? 82 : hovered === 'day' ? 18 : 50;

  return (
    <>
      {/* HLAVNÍ DEN/NOC SPLIT — plná výška viewportu */}
      <section className="relative flex flex-col md:flex-row" style={{ minHeight: 'calc(100vh - 72px)' }}>
        {/* ===== DEN ===== */}
        <motion.div
          className="relative overflow-hidden cursor-pointer border-b-2 md:border-b-0 md:border-r-2 border-[#1A1512]"
          style={{
            background: 'linear-gradient(160deg, #FAF6EE 0%, #F5EDD6 40%, #E8D5A8 100%)',
          }}
          animate={{ flex: dayFlex }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          onMouseEnter={() => setHovered('day')}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Dekorativní vzor */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1A1512 0, #1A1512 1px, transparent 1px, transparent 14px)' }} />

          {/* Slunce — dekorace nahoře */}
          <motion.div
            className="absolute top-8 right-8 opacity-20"
            animate={{ rotate: hovered === 'day' ? 90 : 0, scale: hovered === 'day' ? 1.3 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sun className="w-24 h-24 text-[#C8102E]" />
          </motion.div>

          {/* Obsah dne */}
          <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-10">
            <motion.div
              className="flex items-center gap-3 mb-4"
              animate={{ opacity: 1 }}
            >
              <Sun className="w-7 h-7 text-[#C8102E]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">Den</span>
            </motion.div>

            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#1A1512] leading-[1.05] mb-4">
              Žonglování<br />bez ohně
            </h2>

            {/* Popis — viditelný vždy */}
            <p className="text-sm sm:text-base text-[#3A312A] font-serif-body leading-relaxed mb-6 max-w-md">
              Energické denní vystoupení plné žonglování, kejklířských kousků a interakce s diváky.
            </p>

            {/* Detailní položky — objeví se při roztáhnutí */}
            <AnimatePresence>
              {hovered === 'day' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className="space-y-3 mb-6 max-w-lg"
                >
                  {DAY_ITEMS.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 bg-white/60 backdrop-blur-sm border border-[#1A1512]/20 p-3 rounded-sm">
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
        </motion.div>

        {/* ===== NOC ===== */}
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          style={{
            background: 'linear-gradient(160deg, #1A0A08 0%, #2A0E08 40%, #0D0504 100%)',
          }}
          animate={{ flex: nightFlex }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          onMouseEnter={() => setHovered('night')}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Dekorativní vzor */}
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #C8102E 0, #C8102E 1px, transparent 1px, transparent 14px)' }} />

          {/* Měsíc — dekorace nahoře */}
          <motion.div
            className="absolute top-8 left-8 opacity-20"
            animate={{ rotate: hovered === 'night' ? -90 : 0, scale: hovered === 'night' ? 1.3 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <Moon className="w-24 h-24 text-[#E8A020]" />
          </motion.div>

          {/* Spodní záře ohně */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-[#C8102E]/50 to-transparent" />

          {/* Obsah noci */}
          <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-10">
            <motion.div className="flex items-center gap-3 mb-4">
              <Moon className="w-7 h-7 text-[#E8A020]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8A020]">Noc</span>
            </motion.div>

            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-[1.05] mb-4">
              Ohnivá show<br />plná ohně
            </h2>

            <p className="text-sm sm:text-base text-[#B9AA94] font-serif-body leading-relaxed mb-6 max-w-md">
              Choreografická ohnivá show s poi, holemi, vějíři a fakírskými čísly.
            </p>

            {/* Detailní položky — objeví se při roztáhnutí */}
            <AnimatePresence>
              {hovered === 'night' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
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
        </motion.div>

        {/* ===== ERB UPROSTŘED ===== */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <motion.div
            className="relative"
            animate={{
              scale: hovered ? 0.85 : 1,
              opacity: hovered ? 0.6 : 1,
            }}
            transition={{ duration: 0.4 }}
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
