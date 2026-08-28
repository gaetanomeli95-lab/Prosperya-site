'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const dots = [
  { color: '#F6C515', x: 0, y: -112, fromX: -150, fromY: -210, delay: 0.05 },
  { color: '#55B57A', x: 76, y: -94, fromX: 165, fromY: -185, delay: 0.10 },
  { color: '#2C83C7', x: 118, y: -30, fromX: 245, fromY: -65, delay: 0.15 },
  { color: '#D42375', x: 102, y: 50, fromX: 220, fromY: 125, delay: 0.20 },
  { color: '#FF7A1A', x: 52, y: 108, fromX: 120, fromY: 230, delay: 0.25 },
  { color: '#F6C515', x: -28, y: 120, fromX: -55, fromY: 250, delay: 0.30 },
  { color: '#55B57A', x: -96, y: 90, fromX: -210, fromY: 200, delay: 0.35 },
  { color: '#2C83C7', x: -124, y: 20, fromX: -250, fromY: 40, delay: 0.40 },
  { color: '#D42375', x: -105, y: -54, fromX: -235, fromY: -115, delay: 0.45 },
  { color: '#FF7A1A', x: -62, y: -100, fromX: -115, fromY: -225, delay: 0.50 },
];

export function BrandIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = window.sessionStorage.getItem('prosperya-intro-seen');

    if (reduceMotion || seen) return;

    setVisible(true);
    window.sessionStorage.setItem('prosperya-intro-seen', '1');

    const timer = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="prosperya-brand-intro"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#080C0D]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.035, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background:
                'radial-gradient(circle at 50% 47%, rgba(49,95,103,.20), transparent 28%), radial-gradient(circle at 50% 50%, rgba(255,255,255,.035), transparent 48%)',
            }}
          />

          <motion.div
            className="absolute h-[430px] w-[430px] rounded-full border border-white/10 sm:h-[520px] sm:w-[520px]"
            initial={{ opacity: 0, scale: 0.72, rotate: -18 }}
            animate={{ opacity: [0, 0.65, 0.2], scale: [0.72, 1, 1.08], rotate: [-18, 0, 12] }}
            transition={{ duration: 2.15, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="relative h-[340px] w-[340px] sm:h-[390px] sm:w-[390px]"
            initial={{ scale: 0.92 }}
            animate={{ scale: [0.92, 1, 1] }}
            transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 sm:h-[285px] sm:w-[285px]"
              initial={{ rotate: -34 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {dots.map((dot, i) => (
                <motion.span
                  key={`${dot.color}-${i}`}
                  className="absolute left-1/2 top-1/2 h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[84px] sm:w-[84px]"
                  style={{
                    backgroundColor: dot.color,
                    mixBlendMode: 'screen',
                    boxShadow: `0 0 34px ${dot.color}22`,
                  }}
                  initial={{ x: dot.fromX, y: dot.fromY, opacity: 0, scale: 0.35 }}
                  animate={{
                    x: [dot.fromX, dot.x * 1.15, dot.x],
                    y: [dot.fromY, dot.y * 1.15, dot.y],
                    opacity: [0, 0.9, 0.78],
                    scale: [0.35, 1.08, 1],
                  }}
                  transition={{
                    duration: 1.05,
                    delay: dot.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              className="absolute inset-0 grid place-items-center"
              initial={{ opacity: 0, scale: 0.94, letterSpacing: '0.34em' }}
              animate={{ opacity: 1, scale: 1, letterSpacing: '0.17em' }}
              transition={{ duration: 0.65, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="pl-[0.17em] text-[22px] font-semibold tracking-[0.17em] text-white sm:text-[27px]">
                PROSPERYA
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-[12vh] left-1/2 h-px w-28 -translate-x-1/2 bg-white/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.25 }}
          />

          <motion.p
            className="absolute bottom-[8vh] text-[9px] uppercase tracking-[0.34em] text-white/36"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.45 }}
          >
            Advisory · Governance · Growth
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
