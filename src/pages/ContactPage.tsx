import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, FlameFlash } from '../components/motion';
import { Mail, Phone, MapPin, ExternalLink, Facebook } from 'lucide-react';

/** Kontakt — kontaktní údaje Terra Ignis. */
export const ContactPage: React.FC = () => {
  return (
    <section className="py-14 md:py-20 bg-[#C8102E] text-white relative overflow-hidden woodcut-hatch-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <Reveal className="border-b-2 border-white/30 pb-6 mb-10">
          <FlameFlash blend="screen">
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight">
              Kontakt
            </h1>
          </FlameFlash>
        </Reveal>

        <Reveal>
          <p className="font-serif-body text-xl sm:text-2xl text-white/95 leading-relaxed mb-10">
            Chcete nás na svou akci? Napište nám nebo zavolejte — rádi se domluvíme na detailech.
          </p>
        </Reveal>

        <div className="space-y-4 text-left max-w-md mx-auto">
          <Reveal>
            <a
              href="mailto:terraignismohelnice@gmail.com"
              className="flex items-center gap-4 p-4 bg-[#1A1512] border-2 border-white/20 hover:border-white transition-colors group"
            >
              <Mail className="w-6 h-6 text-[#E8A020] group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xs uppercase tracking-wider text-[#B9AA94] block">E-mail</span>
                <span className="text-lg font-bold">terraignismohelnice@gmail.com</span>
              </div>
            </a>
          </Reveal>

          <Reveal>
            <a
              href="tel:+420606310100"
              className="flex items-center gap-4 p-4 bg-[#1A1512] border-2 border-white/20 hover:border-white transition-colors group"
            >
              <Phone className="w-6 h-6 text-[#E8A020] group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xs uppercase tracking-wider text-[#B9AA94] block">Telefon</span>
                <span className="text-lg font-bold">+420 606 310 100</span>
              </div>
            </a>
          </Reveal>

          <Reveal>
            <a
              href="tel:+420704792974"
              className="flex items-center gap-4 p-4 bg-[#1A1512] border-2 border-white/20 hover:border-white transition-colors group"
            >
              <Phone className="w-6 h-6 text-[#E8A020] group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xs uppercase tracking-wider text-[#B9AA94] block">Telefon 2</span>
                <span className="text-lg font-bold">+420 704 792 974</span>
              </div>
            </a>
          </Reveal>

          <Reveal>
            <div className="flex items-center gap-4 p-4 bg-[#1A1512] border-2 border-white/20">
              <MapPin className="w-6 h-6 text-[#E8A020]" />
              <div>
                <span className="text-xs uppercase tracking-wider text-[#B9AA94] block">Město</span>
                <span className="text-lg font-bold">Mohelnice</span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <a
              href="https://www.facebook.com/p/Terra-Ignis-61550985457315/?locale=cs_CZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-[#C8102E] border-2 border-white hover:bg-[#A30D25] transition-colors group"
            >
              <Facebook className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xs uppercase tracking-wider text-white/70 block">Sociální sítě</span>
                <span className="text-lg font-bold">Facebook — Terra Ignis</span>
              </div>
              <ExternalLink className="w-5 h-5 ml-auto text-white/70" />
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FAF6EE] text-[#C8102E] font-bold uppercase tracking-wider border-2 border-[#1A1512] flame-shadow hover:bg-[#F3ECDC] transition-colors"
          >
            <span>Zpět na úvod</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
