'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const dots = [
  { color: '#F6C515', x: 0, y: -112, delay: 0.04 },
  { color: '#55B57A', x: 76, y: -94, delay: 0.09 },
  { color: '#2C83C7', x: 118, y: -30, delay: 0.14 },
  { color: '#D42375', x: 102, y: 50, delay: 0.19 },
  { color: '#FF7A1A', x: 52, y: 108, delay: 0.24 },
  { color: '#F6C515', x: -28, y: 120, delay: 0.29 },
  { color: '#55B57A', x: -96, y: 90, delay: 0.34 },
  { color: '#2C83C7', x: -124, y: 20, delay: 0.39 },
  { color: '#D42375', x: -105, y: -54, delay: 0.44 },
  { color: '#FF7A1A', x: -62, y: -100, delay: 0.49 },
];

export function BrandIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = window.sessionStorage.getItem('prosperya-intro-v2-seen');

    if (reduceMotion || seen) return;

    setVisible(true);
    window.sessionStorage.setItem('prosperya-intro-v2-seen', '1');

    const timer = window.setTimeout(() => setVisible(false), 3150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="prosperya-brand-intro-v2"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#080C0D]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{
              background:
                'radial-gradient(circle at 50% 49%, rgba(49,95,103,.24), transparent 27%), radial-gradient(circle at 50% 50%, rgba(255,255,255,.04), transparent 50%)',
            }}
          />

          <motion.div
            className="absolute h-[430px] w-[430px] rounded-full border border-white/10 sm:h-[520px] sm:w-[520px]"
            initial={{ opacity: 0, scale: 0.76, rotate: -16 }}
            animate={{ opacity: [0, 0.5, 0.16], scale: [0.76, 1, 1.06], rotate: [-16, 0, 8] }}
            transition={{ duration: 2.35, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="relative h-[350px] w-[350px] sm:h-[410px] sm:w-[410px]"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.015, 1] }}
            transition={{ duration: 1.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ rotate: -32 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {dots.map((dot, i) => (
                <motion.span
                  key={`${dot.color}-${i}`}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: [0, dot.x * 1.1, dot.x],
                    y: [0, dot.y * 1.1, dot.y],
                    opacity: [0, 1, 1],
                  }}
                  transition={{
                    duration: 0.9,
                    delay: dot.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.span
                    className="absolute left-0 top-0 block h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[84px] sm:w-[84px]"
                    style={{
                      backgroundColor: dot.color,
                      mixBlendMode: 'screen',
                      boxShadow: `0 0 30px ${dot.color}25`,
                    }}
                    initial={{ scale: 0.18 }}
                    animate={{ scale: [0.18, 1.08, 1] }}
                    transition={{
                      duration: 0.9,
                      delay: dot.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="absolute inset-0 grid place-items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 1.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="pl-[0.17em] text-[22px] font-semibold text-white sm:text-[27px]"
                initial={{ letterSpacing: '0.32em', opacity: 0 }}
                animate={{ letterSpacing: '0.17em', opacity: 1 }}
                transition={{ duration: 0.65, delay: 1.48, ease: [0.22, 1, 0.36, 1] }}
              >
                PROSPERYA
              </motion.span>
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ boxShadow: '0 0 0 0 rgba(255,255,255,0)' }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(255,255,255,0)',
                  '0 0 90px 10px rgba(118,160,165,.10)',
                  '0 0 0 0 rgba(255,255,255,0)',
                ],
              }}
              transition={{ duration: 0.85, delay: 1.85 }}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-[12vh] left-1/2 h-px w-28 -translate-x-1/2 bg-white/10"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.85 }}
          />

          <motion.p
            className="absolute bottom-[8vh] text-[9px] uppercase tracking-[0.34em] text-white/36"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.02 }}
          >
            Advisory · Governance · Growth
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
