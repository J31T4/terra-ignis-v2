import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { staggerContainer, fadeRise, Reveal, FlameFlash } from '../components/motion';
import { Users, Target, Award } from 'lucide-react';

const CARDS = [
  {
    icon: Users,
    title: 'Originální choreografie',
    text: 'Při tvorbě vystoupení klademe důraz na to, aby každé bylo jiné a jedinečné — prvky, kostýmy, muzika. Vždy máme pevně stanovenou choreografii bez freestylů, se zaměřením na příběh, dějovost a synchronizaci.',
  },
  {
    icon: Target,
    title: 'Výrazné kostýmy',
    text: 'Vizuální styl je pro nás klíčový. Každé vystoupení má vlastní kostýmovou koncepci, která podtrhuje atmosféru a charakter představení.',
  },
  {
    icon: Award,
    title: 'Malé i velké akce',
    text: 'Zvládneme intimní vystoupení na soukromé oslavě i velkou show na festivalu. Přizpůsobíme se prostoru, publiku i příležitosti.',
  },
];

/** O nás — představení skupiny Terra Ignis. */
export const AboutPage: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section className="py-14 md:py-20 bg-[#C8102E] text-white relative overflow-hidden woodcut-hatch-dark border-b-4 border-[#1A1512]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <Reveal className="border-b-2 border-white/30 pb-6 mb-12">
          <FlameFlash blend="screen">
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight">
              O nás
            </h1>
          </FlameFlash>
        </Reveal>

        <Reveal className="bg-[#FAF6EE] text-[#1A1512] p-6 sm:p-8 border-4 border-[#1A1512] shadow-[8px_8px_0px_0px_rgba(26,21,18,1)] mb-12">
          <p className="font-serif-body text-xl sm:text-2xl leading-snug">
            Jsme parta kamarádů, kterou baví historie, šerm, divadlo, žonglování… a nejlépe všechno naráz a zapálené! Každý se specializujeme na hračky podle svého gusta — poi, tyče, míčky, dragon staff, vějíře a další. Neustále se snažíme posouvat svoje možnosti, ať už na individuální rovině, nebo při hromadných choreografiích či párovém a skupinovém žonglování.
          </p>
        </Reveal>

        <Reveal className="mb-12">
          <div className="bg-neutral-950 border-2 border-white/20 p-6 sm:p-8">
            <h2 className="font-display font-bold text-2xl uppercase tracking-wide mb-4">
              Náš příběh
            </h2>
            <p className="font-serif-body text-lg text-neutral-200 leading-relaxed">
              Různí lidé, různé zájmy, různé zkušenosti — avšak společná láska k žonglování. Začali jsme v roce 2023 a i za tu krátkou dobu jsme urazili pořádný kus cesty. A rozhodně nechceme usnout na růžích.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.14)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
        >
          {CARDS.map((c) => (
            <motion.div key={c.title} variants={fadeRise} className="bg-neutral-950 text-white p-7 border-2 border-white">
              <c.icon className="w-8 h-8 text-[#C8102E] mb-4" />
              <h3 className="font-display font-bold text-xl uppercase tracking-wide mb-3">
                {c.title}
              </h3>
              <p className="font-serif-body text-lg text-neutral-200 leading-relaxed">
                {c.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
