import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { staggerContainer, fadeRise, Reveal, FlameFlash } from '../components/motion';

const ITEMS = [
  { name: 'Lorem ipsum I', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Lorem ipsum II', text: 'Sed do eiusmod tempor incididunt ut labore et dolore.' },
  { name: 'Lorem ipsum III', text: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
];

/** Reference — minimal lorem demo. */
export const ReferencesPage: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section className="py-14 md:py-20 bg-neutral-900 text-white relative woodcut-hatch-dark border-b-4 border-[#1A1512]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="border-b-2 border-white/20 pb-6 mb-10">
          <FlameFlash blend="screen">
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              Lorem ipsum
            </h1>
          </FlameFlash>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.09)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {ITEMS.map((ref) => (
            <motion.article
              key={ref.name}
              variants={fadeRise}
              whileHover={reduced ? undefined : { y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative bg-neutral-950 border-2 border-neutral-700 p-6 hover:border-[#C8102E] transition-colors"
            >
              <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-white mb-2">
                {ref.name}
              </h2>
              <p className="font-serif-body text-base text-neutral-300 leading-relaxed">
                {ref.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
