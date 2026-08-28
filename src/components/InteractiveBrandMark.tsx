'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const nodes = [
  { label: 'Start Up', href: '/servizi/startup/', color: '#F2C94C' },
  { label: 'Creazione NewCo', href: '/servizi/creazione-newco/', color: '#4CAF50' },
  { label: 'Governance', href: '/servizi/governance-e-controllo/', color: '#1976D2' },
  { label: 'Market Entry', href: '/servizi/internazionalizzazione/', color: '#C81A69' },
  { label: 'Invest in Italy', href: '/servizi/internazionalizzazione/', color: '#FF7F2A' },
  { label: 'Ristrutturazione debiti', href: '/servizi/crisi-e-risanamento/', color: '#D84A13' },
  { label: 'Finanza agevolata', href: '/servizi/finanza-agevolata/', color: '#F2C94C' },
  { label: 'Growth Factors', href: '/servizi/strategia-e-crescita/', color: '#4CAF50' },
  { label: 'Controllo di gestione', href: '/servizi/governance-e-controllo/', color: '#1976D2' },
  { label: 'Executive Mentoring', href: '/servizi/strategia-e-crescita/', color: '#C81A69' },
];

export function InteractiveBrandMark() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [coarsePointer, setCoarsePointer] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 85, damping: 22, mass: 0.55 });
  const springY = useSpring(pointerY, { stiffness: 85, damping: 22, mass: 0.55 });
  const rotateY = useTransform(springX, [-1, 1], [-2.4, 2.4]);
  const rotateX = useTransform(springY, [-1, 1], [2.4, -2.4]);

  useEffect(() => {
    const media = window.matchMedia('(hover: none), (pointer: coarse)');
    const sync = () => setCoarsePointer(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (coarsePointer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
    if (!coarsePointer) setActiveIndex(null);
  };

  const activeNode = activeIndex === null ? null : nodes[activeIndex];
  const orbitPaused = activeIndex !== null;

  return (
    <div
      className="relative aspect-square w-full select-none"
      onMouseMove={handleMove}
      onMouseLeave={resetPointer}
      aria-label="Sistema Prosperya interattivo"
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
      >
        <div className="pointer-events-none absolute inset-[3%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,.10),rgba(255,255,255,.025)_36%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-[7%] rounded-full border border-white/20" />
        <div className="pointer-events-none absolute inset-[16%] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute inset-[25%] rounded-full border border-dashed border-white/10" />
        <div className="pointer-events-none absolute left-1/2 top-[7%] h-[86%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="pointer-events-none absolute left-[7%] top-1/2 h-px w-[86%] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div
          className="prosperya-orbit absolute inset-0"
          style={{ animationPlayState: orbitPaused ? 'paused' : 'running' }}
        >
          {nodes.map((node, index) => {
            const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const left = 50 + Math.cos(angle) * 39.5;
            const top = 50 + Math.sin(angle) * 39.5;
            const active = activeIndex === index;

            return (
              <Link
                key={node.label}
                href={node.href}
                aria-label={`Apri ${node.label}`}
                title={node.label}
                onMouseEnter={() => !coarsePointer && setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => !coarsePointer && setActiveIndex(null)}
                onClick={(event) => {
                  if (coarsePointer && activeIndex !== index) {
                    event.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <motion.span
                  className="relative grid h-[clamp(2.15rem,8vw,4.2rem)] w-[clamp(2.15rem,8vw,4.2rem)] place-items-center rounded-full border border-white/30 shadow-[0_12px_30px_rgba(0,0,0,.32)]"
                  style={{ backgroundColor: node.color }}
                  animate={{ scale: active ? 1.18 : 1 }}
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                >
                  <span className={`absolute inset-[-18%] rounded-full border transition-opacity duration-300 ${active ? 'border-white/60 opacity-100' : 'border-white/0 opacity-0'}`} />
                  <span className={`h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />
                </motion.span>
              </Link>
            );
          })}
        </div>

        <div className="absolute inset-[29%] z-30 grid place-items-center rounded-full border border-white/20 bg-[#090D0E]/80 shadow-[0_24px_75px_rgba(0,0,0,.38)] backdrop-blur-sm">
          <div className="w-full px-4 text-center sm:px-6">
            <p className="text-[clamp(.62rem,1.5vw,.92rem)] font-semibold tracking-[.2em] text-white">PROSPERYA</p>
            <div className="mx-auto mt-2.5 h-px w-8 bg-sand/80 sm:mt-3" />
            <div className="mt-2.5 min-h-[2.35rem] sm:mt-3 sm:min-h-[2.8rem]">
              {activeNode ? (
                <motion.div key={activeNode.label} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-[clamp(.52rem,1.45vw,.82rem)] font-medium leading-tight text-white/90">{activeNode.label}</p>
                  <p className="mt-1 hidden items-center justify-center gap-1 text-[8px] font-semibold uppercase tracking-[.16em] text-sand sm:flex">
                    Apri servizio <ArrowUpRight className="h-2.5 w-2.5" />
                  </p>
                </motion.div>
              ) : (
                <>
                  <p className="text-[clamp(.48rem,1.2vw,.72rem)] font-medium uppercase tracking-[.16em] text-white/60">Business advisory</p>
                  <p className="mt-1 hidden text-[8px] uppercase tracking-[.14em] text-white/40 sm:block">10 leve · una regia</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-[1%] rounded-full ring-1 ring-white/5" />
      </motion.div>

      <div className="pointer-events-none absolute bottom-[1%] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[.22em] text-white/50 sm:text-[9px]">
        <span className="hidden sm:inline">Interagisci con le leve strategiche</span>
        <span className="sm:hidden">Tocca un nodo per esplorare</span>
      </div>
    </div>
  );
}
