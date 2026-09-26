import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

/**
 * Sdilene animacni primitivy pro vizitku Terra Ignis.
 * Vse respektuje prefers-reduced-motion (fade bez pohybu, nebo nic).
 */

export const EASE_OUT: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** Stagger container — deti postupne "vyplouvaji" */
export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Fade + rise — zakladni reveal prvek */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

/**
 * Reveal — wrap na whileInView scroll-reveal.
 * Pouziti: <Reveal> ... </Reveal> nebo <Reveal variants={staggerContainer()} as="div">
 */
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'footer';
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  className,
  variants = fadeRise,
  delay = 0,
  as = 'div',
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as as React.ElementType;
    return (
      <Tag className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

/** Props pro primo motion prvky s fade-rise chovanim */
export const revealViewport = { once: true, amount: 0.25 } as const;

/**
 * FlameFlash — one-shot "plamene prohozeni" blesk na sekcnich nadpisech.
 * Kratky scale + opacity zazehu v cervene (text-shadow) pri scrollu do view.
 * Pri reduced motion se vyrenderuje jako obycejny prvek bez animace.
 */
export function FlameFlash({
  children,
  className,
  blend = 'multiply',
}: {
  children: React.ReactNode;
  className?: string;
  blend?: 'multiply' | 'screen';
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.span
      className={`inline-block ${className ?? ''}`}
      initial={{ opacity: 0.2, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.span
        className="inline-block"
        initial={{ textShadow: '0 0 26px rgba(255,140,66,0.95), 0 0 46px rgba(200,16,46,0.85)' }}
        whileInView={{ textShadow: '0 0 0px rgba(255,140,66,0), 0 0 0px rgba(200,16,46,0)' }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        data-blend={blend}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
