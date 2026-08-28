'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const circles = [
  { color: '#F6C515', left: 42, top: 20, fromX: -420, fromY: -260, delay: 0.05 },
  { color: '#55B57A', left: 59, top: 20, fromX: 340, fromY: -300, delay: 0.11 },
  { color: '#2C83C7', left: 72, top: 34, fromX: 520, fromY: -80, delay: 0.17 },
  { color: '#D42375', left: 78, top: 52, fromX: 540, fromY: 120, delay: 0.23 },
  { color: '#FF7A1A', left: 73, top: 70, fromX: 380, fromY: 340, delay: 0.29 },
  { color: '#F6C515', left: 60, top: 79, fromX: 120, fromY: 440, delay: 0.35 },
  { color: '#55B57A', left: 43, top: 79, fromX: -180, fromY: 430, delay: 0.41 },
  { color: '#2C83C7', left: 29, top: 68, fromX: -500, fromY: 260, delay: 0.47 },
  { color: '#D42375', left: 23, top: 50, fromX: -560, fromY: 10, delay: 0.53 },
  { color: '#FF7A1A', left: 29, top: 33, fromX: -500, fromY: -220, delay: 0.59 },
];

export function BrandIntro() {
  // Deliberately true on the server and on the first client render: this prevents
  // the underlying page from flashing before React hydrates the intro.
  const [visible, setVisible] = useState(true);
  const [revealing, setRevealing] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false);
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const revealTimer = window.setTimeout(() => setRevealing(true), 3000);
    const finishTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    }, 3900);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="prosperya-intro-v5"
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
          aria-hidden="true"
        >
          {/* The two opaque panels exist from the very first rendered frame. */}
          <motion.div
            className="absolute inset-y-0 left-0 w-[calc(50%+1px)] bg-[#080C0D]"
            animate={{ x: revealing ? '-101%' : '0%' }}
            transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-[calc(50%+1px)] bg-[#080C0D]"
            animate={{ x: revealing ? '101%' : '0%' }}
            transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: revealing ? 0 : 1 }}
            transition={{ duration: 0.34, ease: 'easeOut' }}
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(49,95,103,.22), transparent 28%), radial-gradient(circle at 50% 50%, rgba(255,255,255,.025), transparent 55%)',
            }}
          />

          <motion.div
            className="pointer-events-none absolute left-1/2 top-0 z-20 h-full w-px -translate-x-1/2 bg-white/0"
            animate={{
              opacity: revealing ? [0, 0.7, 0] : 0,
              boxShadow: revealing
                ? ['0 0 0 rgba(255,255,255,0)', '0 0 36px rgba(255,255,255,.32)', '0 0 0 rgba(255,255,255,0)']
                : '0 0 0 rgba(255,255,255,0)',
            }}
            transition={{ duration: 0.62, ease: 'easeOut' }}
          />

          <motion.div
            className="absolute inset-0 z-10 grid place-items-center px-4"
            animate={{ opacity: revealing ? 0 : 1 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <motion.div
              className="relative aspect-square shrink-0"
              style={{ width: 'min(78vw, 66svh, 520px)' }}
              initial={{ scale: 0.9 }}
              animate={{
                scale: revealing ? 1.1 : [0.9, 1, 1.015, 1],
                filter: revealing ? 'blur(4px)' : 'blur(0px)',
              }}
              transition={revealing
                ? { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
                : { duration: 2.85, times: [0, 0.47, 0.78, 1], ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.svg
                className="pointer-events-none absolute left-1/2 top-1/2 h-[128%] w-[128%] -translate-x-1/2 -translate-y-1/2 sm:h-[132%] sm:w-[132%]"
                viewBox="0 0 100 100"
                fill="none"
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="rgba(255,255,255,.28)"
                  strokeWidth="0.35"
                  pathLength="1"
                  initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
                  animate={{ pathLength: 1, opacity: [0, 0.55, 0.28], rotate: -90 }}
                  transition={{
                    pathLength: { duration: 0.95, delay: 1.72, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 1.15, delay: 1.72 },
                  }}
                />
              </motion.svg>

              {circles.map((circle, i) => (
                <motion.div
                  key={`${circle.color}-${i}`}
                  className="absolute h-[27%] w-[27%]"
                  style={{ left: `${circle.left}%`, top: `${circle.top}%` }}
                  initial={{
                    x: circle.fromX,
                    y: circle.fromY,
                    opacity: 0,
                    scale: 0.35,
                    filter: 'blur(10px)',
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: [0.35, 1.08, 1],
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 1.18,
                    delay: circle.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div
                    className="h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 34% 30%, rgba(255,255,255,.12), transparent 38%), ${circle.color}`,
                      opacity: 0.9,
                      boxShadow: `0 16px 44px ${circle.color}20`,
                    }}
                  />
                </motion.div>
              ))}

              <motion.div
                className="absolute inset-0 grid place-items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.52 }}
              >
                <motion.span
                  className="font-body font-semibold !text-white"
                  style={{ fontSize: 'clamp(15px, 3.2vw, 34px)' }}
                  initial={{ opacity: 0, scale: 0.92, letterSpacing: '0.30em', y: 8 }}
                  animate={{ opacity: 1, scale: 1, letterSpacing: '0.14em', y: 0 }}
                  transition={{ duration: 0.7, delay: 1.52, ease: [0.22, 1, 0.36, 1] }}
                >
                  PROSPERYA
                </motion.span>
              </motion.div>

              <motion.div
                className="pointer-events-none absolute inset-[7%] rounded-full"
                initial={{ opacity: 0, boxShadow: '0 0 0 rgba(118,160,165,0)' }}
                animate={{
                  opacity: [0, 1, 0],
                  boxShadow: [
                    '0 0 0 rgba(118,160,165,0)',
                    '0 0 110px rgba(118,160,165,.16)',
                    '0 0 0 rgba(118,160,165,0)',
                  ],
                }}
                transition={{ duration: 0.95, delay: 2.08 }}
              />
            </motion.div>

            <motion.div
              className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 sm:gap-4"
              style={{ bottom: 'max(20px, 6svh)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.1 }}
            >
              <div className="h-px w-16 bg-white/15 sm:w-20" />
              <p className="whitespace-nowrap text-[8px] uppercase tracking-[0.22em] !text-white/38 sm:text-[9px] sm:tracking-[0.32em]">
                Advisory · Governance · Growth
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
