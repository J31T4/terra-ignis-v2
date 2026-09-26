import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { staggerContainer, fadeRise, Reveal, FlameFlash } from '../components/motion';
import { Flame, Music, Heart, Sparkles, Users, Sun } from 'lucide-react';

const SHOWS = [
  {
    icon: Flame,
    name: 'Klasická tavern show',
    duration: '10–15 min',
    performers: '5–6',
    text: 'Energické vystoupení inspirované historickou atmosférou, plné dynamiky a interakce s diváky. Ohňová show pro každou příležitost a každé publikum.',
  },
  {
    icon: Music,
    name: 'Filmové melodie',
    duration: '15 min',
    performers: '5–6',
    text: 'Ohňová show s velkým množstvím efektních hromadných choreografií ve stylu známých filmů. Důraz na dramatickou hudbu, přesnou synchronizaci a vizuální zážitek. Vystoupení se spoustou ohně a účinkujících.',
  },
  {
    icon: Heart,
    name: 'Za soumraku',
    duration: '15 min',
    performers: '6',
    text: 'Ohňové divadelní romantické vystoupení s příběhem o smrtelníkovi, uhrančivých vílách, mocném pánovi palouku a nepřemožitelné síle lásky. Ideální volba pro slavnostní nebo večerní program.',
  },
];

const EXTRA = [
  { icon: Sparkles, name: 'Kejklířské vystoupení', text: 'Denní žonglérské vystoupení bez ohně — míčky, kužele, kruhy a další kejklířské kousky.' },
  { icon: Users, name: 'Kejklířská školička', text: 'Interaktivní program nebo workshop pro návštěvníky — nejen děti si mohou vyzkoušet žonglování s různými hračkami.' },
  { icon: Sun, name: 'Program na míru', text: 'Vytvoříme vystoupení přesně podle vaší akce — od svatby přes firemní večírek až po festival.' },
];

const DISCIPLINES = [
  'Kompletní choreografická ohnivá show',
  'Fire poi',
  'Ohnivé hole / staff',
  'Ohnivé vějíře',
  'Fakírská čísla',
  'Plivání ohně',
  'Dragon staff, lana, kostka',
  'Denní žonglérské vystoupení bez ohně',
];

/** Vystoupení — nabídka show a balíčků. */
export const ShowsPage: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section className="py-14 md:py-20 bg-neutral-900 text-white relative woodcut-hatch-dark border-b-4 border-[#1A1512]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="border-b-2 border-white/20 pb-6 mb-10">
          <FlameFlash blend="screen">
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              Vystoupení
            </h1>
          </FlameFlash>
        </Reveal>

        <Reveal className="mb-10">
          <p className="font-serif-body text-xl text-neutral-300 leading-relaxed max-w-3xl">
            Nabízíme tři hlavní varianty ohnivých vystoupení, doplněné o kejklířský program a workshopy. Každé vystoupení je originál — nekopírujeme cizí choreografie ani nápady.
          </p>
        </Reveal>

        {/* Tři hlavní varianty */}
        <motion.div
          variants={staggerContainer(0.12)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
        >
          {SHOWS.map((s) => (
            <motion.article
              key={s.name}
              variants={fadeRise}
              whileHover={reduced ? undefined : { y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative bg-neutral-950 border-2 border-neutral-700 p-6 hover:border-[#C8102E] transition-colors"
            >
              <s.icon className="w-8 h-8 text-[#C8102E] mb-4" />
              <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-white mb-2">
                {s.name}
              </h2>
              <div className="flex gap-4 text-xs text-[#B9AA94] mb-4 font-semibold uppercase tracking-wider">
                <span>⏱ {s.duration}</span>
                <span>👥 {s.performers} performerů</span>
              </div>
              <p className="font-serif-body text-base text-neutral-300 leading-relaxed">
                {s.text}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Další možnosti */}
        <Reveal className="mb-12">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-white mb-6 border-b border-white/20 pb-3">
            Další možnosti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXTRA.map((e) => (
              <div key={e.name} className="bg-neutral-950 border border-neutral-700 p-5">
                <e.icon className="w-6 h-6 text-[#C8102E] mb-3" />
                <h3 className="font-display font-bold text-lg uppercase tracking-wide text-white mb-2">
                  {e.name}
                </h3>
                <p className="font-serif-body text-sm text-neutral-300 leading-relaxed">
                  {e.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Disciplíny */}
        <Reveal>
          <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-white mb-6 border-b border-white/20 pb-3">
            Disciplíny
          </h2>
          <div className="flex flex-wrap gap-3">
            {DISCIPLINES.map((d) => (
              <span
                key={d}
                className="px-4 py-2 bg-[#C8102E]/20 border border-[#C8102E]/40 text-white text-sm font-semibold rounded-sm"
              >
                {d}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Ceny */}
        <Reveal className="mt-12">
          <div className="bg-[#FAF6EE] text-[#1A1512] p-6 sm:p-8 border-4 border-[#1A1512] shadow-[8px_8px_0px_0px_rgba(26,21,18,1)]">
            <h2 className="font-display font-bold text-2xl uppercase tracking-wide mb-3">
              Ceny
            </h2>
            <p className="font-serif-body text-lg leading-relaxed">
              Ceny nezveřejňujeme — každou akci naceňujeme individuálně podle počtu performerů, délky vystoupení a dopravy. Neváhejte nás kontaktovat a rádi vám připravíme nabídku na míru.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
