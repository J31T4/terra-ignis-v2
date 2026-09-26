import React from 'react';

/**
 * LogoImg — heraldický znak Terra Ignis (PNG s alpha, zpracovaný z dodaného loga).
 * variant 'full'   = štít se stuhou „Terra Ignis" (hero, patička)
 * variant 'shield' = jen štít (hlavička a malé velikosti — stuha by byla nečitelná)
 * Transparentní pozadí → čistý drop-shadow + teplá aura (okrová).
 */

const SRC_FULL = `${import.meta.env.BASE_URL}assets/logo-terra-ignis.png`;
const SRC_SHIELD = `${import.meta.env.BASE_URL}assets/logo-terra-ignis-shield.png`;

/** poměry šířka/výška zdrojových assetů (dle kompletního dodaného loga) */
const RATIO_FULL = 900 / 621;
const RATIO_SHIELD = 620 / 649;

interface LogoImgProps {
  /** px výška renderovaného loga; šířka auto dle poměru varianty */
  size?: number;
  className?: string;
  /** volitelné id pro animace cílené na konkrétní instanci */
  id?: string;
  /** 'full' = znak se stuhou, 'shield' = jen štít */
  variant?: 'full' | 'shield';
}

export const LogoImg: React.FC<LogoImgProps> = ({
  size = 48,
  className = '',
  id,
  variant = 'full',
}) => {
  const src = variant === 'shield' ? SRC_SHIELD : SRC_FULL;
  const ratio = variant === 'shield' ? RATIO_SHIELD : RATIO_FULL;
  return (
    <img
      src={src}
      alt="Terra Ignis — znak"
      id={id}
      width={Math.round(size * ratio)}
      height={size}
      className={`block ${className}`}
      style={{
        height: size,
        width: 'auto',
        objectFit: 'contain',
        filter:
          'drop-shadow(0 2px 5px rgba(26, 21, 18, 0.22)) drop-shadow(0 0 18px rgba(232, 160, 32, 0.30))',
      }}
    />
  );
};
