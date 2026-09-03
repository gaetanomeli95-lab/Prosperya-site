'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function SectionCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const prefersReduced = motionQuery.matches;
    setReduceMotion(prefersReduced);

    if (!prefersReduced) {
      video.src = mobileQuery.matches
        ? '/videos/prosperya-cinematic-mobile.mp4'
        : '/videos/prosperya-cinematic-desktop.mp4';
      video.load();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (prefersReduced || paused) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: '180px 0px', threshold: 0.16 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [paused]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    if (video.paused) {
      setPaused(false);
      void video.play().catch(() => undefined);
    } else {
      setPaused(true);
      video.pause();
    }
  };

  return (
    <section ref={sectionRef} aria-label="Prosperya strategic advisory" className="relative isolate overflow-hidden bg-[#0B1112] text-white">
      <div className="relative min-h-[78svh] sm:min-h-[82svh] lg:min-h-[88svh]">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-[1.035] object-cover opacity-80 sm:scale-[1.025]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,13,.58)_0%,rgba(8,12,13,.20)_38%,rgba(8,12,13,.48)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,13,.82)_0%,rgba(8,12,13,.40)_48%,rgba(8,12,13,.18)_100%)] lg:bg-[linear-gradient(90deg,rgba(8,12,13,.80)_0%,rgba(8,12,13,.32)_43%,rgba(8,12,13,.12)_100%)]" />
        <div className="absolute inset-0 prosperya-grid opacity-20" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sand/35 to-transparent" />

        <div className="section-frame relative z-10 flex min-h-[78svh] flex-col justify-between py-14 sm:min-h-[82svh] sm:py-16 lg:min-h-[88svh] lg:py-20">
          <div className="flex items-center justify-between gap-5">
            <p className="text-[9px] font-semibold uppercase tracking-[.24em] !text-white/55 sm:text-[10px]">Prosperya / Strategic advisory</p>
            <span className="hidden text-[9px] uppercase tracking-[.2em] !text-white/35 sm:block">Governance · controllo · sviluppo</span>
          </div>

          <div className="max-w-5xl py-12 sm:py-16">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.24em] !text-sand/90 sm:text-[11px]">
              <span className="h-px w-8 bg-sand/80" /> Una visione integrata
            </p>
            <h2 className="max-w-[9.5ch] text-[clamp(3.3rem,13vw,6rem)] font-heading leading-[0.88] tracking-[-.05em] !text-white sm:text-[clamp(4.5rem,9vw,8rem)] lg:text-[clamp(5.8rem,8.5vw,9.5rem)]">
              Un’impresa è <span className="italic !text-white/72">un sistema.</span>
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-[1.8] !text-white/68 sm:text-base lg:mt-9 lg:text-lg">
              Governo, patrimonio, strategia, finanza e controllo non sono compartimenti separati. Prosperya li legge come parti della stessa architettura.
            </p>
          </div>

          <div className="flex flex-col gap-5 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex max-w-3xl flex-wrap gap-x-5 gap-y-2 text-[9px] font-semibold uppercase tracking-[.16em] !text-white/48 sm:text-[10px]">
              <span>Governo</span>
              <span>Patrimonio</span>
              <span>Governance</span>
              <span>Piano strategico</span>
              <span>Finanza</span>
              <span>Controllo</span>
            </div>

            {!reduceMotion && (
              <button
                type="button"
                onClick={togglePlayback}
                className="group inline-flex min-h-10 w-fit items-center gap-2 border border-white/15 bg-black/15 px-3 text-[9px] font-semibold uppercase tracking-[.18em] !text-white/58 backdrop-blur-sm transition-colors hover:border-white/30 hover:!text-white"
                aria-label={paused ? 'Riprendi animazione' : 'Metti in pausa animazione'}
              >
                {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                {paused ? 'Play motion' : 'Pause motion'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
