'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function SectionCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = motionQuery.matches;
    setReduceMotion(prefersReduced);

    if (prefersReduced) {
      desktopVideoRef.current?.pause();
      mobileVideoRef.current?.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const videos = [desktopVideoRef.current, mobileVideoRef.current].filter(Boolean) as HTMLVideoElement[];
        if (paused || !entry.isIntersecting) {
          videos.forEach((video) => video.pause());
          return;
        }
        videos.forEach((video) => void video.play().catch(() => undefined));
      },
      { rootMargin: '160px 0px', threshold: 0.18 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [paused]);

  const togglePlayback = () => {
    if (reduceMotion) return;
    const nextPaused = !paused;
    setPaused(nextPaused);
    [desktopVideoRef.current, mobileVideoRef.current].forEach((video) => {
      if (!video) return;
      if (nextPaused) video.pause();
      else void video.play().catch(() => undefined);
    });
  };

  return (
    <section ref={sectionRef} aria-label="Visione integrata Prosperya" className="relative isolate overflow-hidden bg-[#0B1112] text-white">
      <div className="relative min-h-[74svh] sm:min-h-[80svh] lg:min-h-[86svh]">
        <video
          ref={mobileVideoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero1.webp"
          className="absolute inset-0 h-full w-full object-cover opacity-78 md:hidden"
          aria-hidden="true"
        >
          <source src="/videos/prosperya-cinematic-mobile.mp4" type="video/mp4" />
        </video>

        <video
          ref={desktopVideoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero1.webp"
          className="absolute inset-0 hidden h-full w-full object-cover opacity-82 md:block"
          aria-hidden="true"
        >
          <source src="/videos/prosperya-cinematic-desktop.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,12,.62)_0%,rgba(7,11,12,.18)_38%,rgba(7,11,12,.58)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,12,.88)_0%,rgba(7,11,12,.46)_46%,rgba(7,11,12,.18)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,11,12,.84)_0%,rgba(7,11,12,.34)_43%,rgba(7,11,12,.10)_100%)]" />
        <div className="absolute inset-0 prosperya-grid opacity-20" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sand/35 to-transparent" />

        <div className="section-frame relative z-10 flex min-h-[74svh] flex-col justify-between py-12 sm:min-h-[80svh] sm:py-16 lg:min-h-[86svh] lg:py-20">
          <div className="flex items-center justify-between gap-5">
            <p className="text-[9px] font-semibold uppercase tracking-[.24em] !text-white/55 sm:text-[10px]">Prosperya / Strategic advisory</p>
            <span className="hidden text-[9px] uppercase tracking-[.2em] !text-white/35 sm:block">Governance · controllo · sviluppo</span>
          </div>

          <div className="max-w-5xl py-10 sm:py-14 lg:py-16">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.24em] !text-sand/90 sm:text-[11px]">
              <span className="h-px w-8 bg-sand/80" /> Una visione integrata
            </p>
            <h2 className="max-w-[9.2ch] text-[clamp(3.15rem,12.6vw,5.9rem)] font-heading leading-[0.89] tracking-[-.048em] !text-white sm:text-[clamp(4.4rem,8.7vw,7.8rem)] lg:text-[clamp(5.6rem,8vw,9rem)]">
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
