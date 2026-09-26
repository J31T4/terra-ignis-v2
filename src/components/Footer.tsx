import React from 'react';
import { Link } from 'react-router-dom';
import { LogoImg } from './LogoImg';
import { Phone, Mail, ExternalLink, MapPin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-edge bg-neutral-950 text-white pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Single simplified row: logo | navigation | contact | FB */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-10 border-b border-[#33281E]">

          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-4">
              <LogoImg size={54} variant="shield" />
              <div>
                <span className="font-display font-black text-2xl tracking-widest block text-white">
                  TERRA IGNIS
                </span>
                <span className="text-xs uppercase tracking-wider text-[#C8102E] font-bold block">
                  Ohnivá show od roku 2023
                </span>
              </div>
            </div>
            <p className="font-serif-body text-base text-[#B9AA94] max-w-md leading-relaxed">
              Parta kamarádů, kterou baví historie, šerm, divadlo a žonglování — a nejlépe všechno naráz a zapálené!
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B9AA94] mt-3">
              <MapPin className="w-4 h-4 text-[#C8102E]" />
              <span>Mohelnice • Česká republika</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A7A66] block mb-3">
              Stránky
            </span>
            <nav className="flex flex-col space-y-2" aria-label="Navigace v patičce">
              <Link to="/" className="text-sm font-semibold text-[#CFC2AE] hover:text-[#C8102E] transition-colors">
                Domů
              </Link>
              <Link to="/o-nas" className="text-sm font-semibold text-[#CFC2AE] hover:text-[#C8102E] transition-colors">
                O nás
              </Link>
              <Link to="/vystoupeni" className="text-sm font-semibold text-[#CFC2AE] hover:text-[#C8102E] transition-colors">
                Vystoupení
              </Link>
              <Link to="/kontakt" className="text-sm font-semibold text-[#CFC2AE] hover:text-[#C8102E] transition-colors">
                Kontakt
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-2">
            <a
              href="mailto:terraignismohelnice@gmail.com"
              className="flex items-center gap-3 p-3 bg-[#171310] border border-[#33281E] hover:border-[#C8102E] transition-colors text-sm font-bold text-white group"
            >
              <Mail className="w-4 h-4 text-[#C8102E] group-hover:scale-110 transition-transform" />
              <span className="truncate">terraignismohelnice@gmail.com</span>
            </a>
            <a
              href="tel:+420606310100"
              className="flex items-center gap-3 p-3 bg-[#171310] border border-[#33281E] hover:border-[#C8102E] transition-colors text-sm font-bold text-white group"
            >
              <Phone className="w-4 h-4 text-[#C8102E] group-hover:scale-110 transition-transform" />
              <span>+420 606 310 100</span>
            </a>
            <a
              href="tel:+420704792974"
              className="flex items-center gap-3 p-3 bg-[#171310] border border-[#33281E] hover:border-[#C8102E] transition-colors text-sm font-bold text-white group"
            >
              <Phone className="w-4 h-4 text-[#C8102E] group-hover:scale-110 transition-transform" />
              <span>+420 704 792 974</span>
            </a>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <a
              href="https://www.facebook.com/p/Terra-Ignis-61550985457315/?locale=cs_CZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider border border-white hover:bg-[#A30D25] transition-colors w-full justify-center"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A7A66]">
          <div>
            © {new Date().getFullYear()} Terra Ignis. Všechna práva vyhrazena.
          </div>
          <div className="text-[#C8102E] font-semibold">
            Ohnivá show • Mohelnice
          </div>
        </div>

      </div>
    </footer>
  );
};
