import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { LogoImg } from '../components/LogoImg';
import { staggerContainer, fadeRise } from '../components/motion';
import { Sun, Moon, Flame, Sparkles } from 'lucide-react';

/** Home — rozdělené hero: denní vs noční vystoupení, erb uprostřed. */
export const HomePage: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero — dvě svislé poloviny */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh] md:min-h-[80vh]">
          {/* Levá polovina — DEN */}
          <Link
            to="/vystoupeni"
            className="relative group flex items-end p-8 sm:p-12 bg-gradient-to-b from-[#FAF6EE] via-[#F5EDD6] to-[#E8D5A8] border-b-2 md:border-b-0 md:border-r-2 border-[#1A1512] overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1A1512 0, #1A1512 1px, transparent 1px, transparent 12px)' }} />
            <motion.div
              className="relative z-10 max-w-md"
              variants={staggerContainer(0.12, 0.1)}
              initial={reduced ? false : 'hidden'}
              animate={reduced ? undefined : 'visible'}
            >
              <motion.div variants={fadeRise} className="flex items-center gap-3 mb-4">
                <Sun className="w-8 h-8 text-[#C8102E]" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#C8102E]">Denní vystoupení</span>
              </motion.div>
              <motion.h2 variants={fadeRise} className="font-display font-black text-3xl sm:text-4xl text-[#1A1512] leading-tight mb-4">
                Žonglování<br />bez ohně
              </motion.h2>
              <motion.p variants={fadeRise} className="text-base text-[#3A312A] font-serif-body leading-relaxed mb-6">
                Energické denní vystoupení plné žonglování, kejklířských kousků a interakce s diváky. Ideální pro festivaly, slavnosti a rodinné akce.
              </motion.p>
              <motion.span variants={fadeRise} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1A1512] border-b-2 border-[#C8102E] pb-1 group-hover:gap-3 transition-all">
                Zjistit více →
              </motion.span>
            </motion.div>
          </Link>

          {/* Pravá polovina — NOC */}
          <Link
            to="/vystoupeni"
            className="relative group flex items-end p-8 sm:p-12 bg-gradient-to-b from-[#1A0A08] via-[#2A0E08] to-[#0D0504] overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #C8102E 0, #C8102E 1px, transparent 1px, transparent 12px)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#C8102E]/40 to-transparent" />
            <motion.div
              className="relative z-10 max-w-md"
              variants={staggerContainer(0.12, 0.1)}
              initial={reduced ? false : 'hidden'}
              animate={reduced ? undefined : 'visible'}
            >
              <motion.div variants={fadeRise} className="flex items-center gap-3 mb-4">
                <Moon className="w-8 h-8 text-[#E8A020]" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E8A020]">Noční vystoupení</span>
              </motion.div>
              <motion.h2 variants={fadeRise} className="font-display font-black text-3xl sm:text-4xl text-white leading-tight mb-4">
                Ohnivá show<br />plná ohně
              </motion.h2>
              <motion.p variants={fadeRise} className="text-base text-[#B9AA94] font-serif-body leading-relaxed mb-6">
                Kompletní choreografická ohnivá show s poi, holemi, vějíři a fakírskými čísly. Dramatická hudba, přesná synchronizace a maximální vizuální zážitek.
              </motion.p>
              <motion.span variants={fadeRise} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white border-b-2 border-[#E8A020] pb-1 group-hover:gap-3 transition-all">
                Zjistit více →
              </motion.span>
            </motion.div>
          </Link>
        </div>

        {/* Erb uprostřed — překrývá obě poloviny */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FAF6EE] rounded-full scale-[1.15] shadow-2xl border-2 border-[#1A1512] hidden md:block" />
            <LogoImg size={180} className="relative z-10 drop-shadow-2xl max-md:!h-[120px]" />
          </div>
        </div>
      </section>

      {/* Úvodní text */}
      <section className="bg-[#FAF6EE] text-[#1A1512] py-14 border-b-4 border-[#C8102E]">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center"
          variants={staggerContainer(0.14, 0.1)}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={fadeRise} className="flex justify-center gap-4 mb-6">
            <Flame className="w-6 h-6 text-[#C8102E]" />
            <Sparkles className="w-6 h-6 text-[#C8102E]" />
          </motion.div>
          <motion.h2 variants={fadeRise} className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide mb-6">
            Různí lidé, společná láska k žonglování
          </motion.h2>
          <motion.p variants={fadeRise} className="text-lg text-[#3A312A] font-serif-body leading-relaxed max-w-3xl mx-auto">
            Jsme parta kamarádů, kterou baví historie, šerm, divadlo, žonglování… a nejlépe všechno naráz a zapálené! Každý se specializujeme na hračky podle svého gusta — poi, tyče, míčky, dragon staff, vějíře a další.
          </motion.p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-[#C8102E] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide mb-6">
            Chcete nás na svou akci?
          </h3>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-3 bg-white text-[#C8102E] px-8 py-4 text-base sm:text-lg font-bold tracking-wider uppercase border-2 border-[#1A1512] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
          >
            <span>Napište nám</span>
          </Link>
        </div>
      </section>
    </>
  );
};
