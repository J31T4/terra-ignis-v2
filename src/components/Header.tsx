import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogoImg } from './LogoImg';
import { Menu, X } from 'lucide-react';

const NAV = [
  { to: '/o-nas', label: 'O nás' },
  { to: '/vystoupeni', label: 'Vystoupení' },
  { to: '/kontakt', label: 'Kontakt' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF6EE]/90 backdrop-blur-lg shadow-md border-b-2 border-[#C8102E] py-1.5'
          : 'bg-[#FAF6EE] border-b-2 border-[#1A1512] py-3'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand — štít ~44px, klik = home */}
        <Link
          to="/"
          className="flex items-center gap-3 group text-left"
          title="Terra Ignis — domů"
        >
          <LogoImg size={44} variant="shield" className="shrink-0 transition-all duration-300" />
          <div>
            <div className="flex items-center gap-2">
              <span
                className="brand-title font-display font-black tracking-widest text-[#1A1512] group-hover:text-[#C8102E] transition-colors"
                data-scrolled={isScrolled}
              >
                TERRA IGNIS
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#C8102E] text-white">
                Ohnivá show
              </span>
            </div>
            <p className="text-xs text-[#6B5E52] font-serif-body italic tracking-wide hidden md:block">
              Ohnivá, kejklířská a fakírská show
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Hlavní navigace">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors border-b-2 pb-0.5 ${
                  isActive
                    ? 'text-[#C8102E] border-[#C8102E]'
                    : 'text-[#2E2722] border-transparent hover:text-[#C8102E]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Zavřít menu' : 'Otevřít menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2 text-[#1A1512] hover:text-[#C8102E] focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6EE] border-b-2 border-[#C8102E] px-6 py-5 shadow-xl">
          <nav className="flex flex-col space-y-3 font-semibold text-base" aria-label="Mobilní navigace">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-1 ${isActive ? 'text-[#C8102E]' : 'text-[#2E2722] hover:text-[#C8102E]'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
