'use client';

import { motion } from 'framer-motion';

const nodes = [
  { label: 'Sicilia', x: 51, y: 78, color: 'bg-logo-magenta' },
  { label: 'Italia', x: 52, y: 68, color: 'bg-logo-blue' },
  { label: 'Paesi Bassi', x: 44, y: 34, color: 'bg-logo-yellow' },
  { label: 'Francia', x: 40, y: 48, color: 'bg-logo-green' },
  { label: 'Germania', x: 49, y: 40, color: 'bg-logo-orange' },
  { label: 'Spagna', x: 34, y: 58, color: 'bg-logo-magenta' },
  { label: 'Romania', x: 58, y: 46, color: 'bg-logo-blue' },
  { label: 'Bulgaria', x: 60, y: 52, color: 'bg-logo-yellow' },
  { label: 'Tunisia', x: 46, y: 74, color: 'bg-logo-green' },
];

const mobileNodes = nodes.filter((node) => node.label !== 'Sicilia');

export function MapNetwork() {
  return (
    <div aria-label="Mappa delle aree operative">
      <div className="relative md:hidden">
        <div className="relative mx-auto max-w-sm px-1 pb-2 pt-2">
          <div className="absolute bottom-5 left-1/2 top-[70px] w-px -translate-x-1/2 bg-gradient-to-b from-logo-magenta/60 via-white/15 to-transparent" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 mx-auto mb-7 grid h-[92px] w-[92px] place-items-center rounded-full border border-white/15 bg-[#0B1011] shadow-[0_15px_45px_rgba(0,0,0,.3)]"
          >
            <span className="absolute inset-2 rounded-full border border-logo-magenta/25" />
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-logo-magenta" />
            <div className="relative text-center">
              <span className="block text-[8px] font-semibold uppercase tracking-[.2em] !text-white/36">Hub</span>
              <span className="mt-1 block font-heading text-xl !text-white">Sicilia</span>
            </div>
          </motion.div>

          <div className="relative z-10 space-y-3">
            {mobileNodes.map((node, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: left ? -14 : 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.38, delay: i * 0.04 }}
                  className={`relative grid grid-cols-[1fr_28px_1fr] items-center ${left ? '' : ''}`}
                >
                  <div className={left ? 'pr-3 text-right' : ''}>
                    {left && (
                      <div className="ml-auto inline-flex max-w-[145px] items-center gap-2 border border-white/10 bg-white/[0.025] px-3 py-2.5">
                        <span className="text-[11px] font-medium !text-white/78">{node.label}</span>
                        <span className={`h-2 w-2 shrink-0 rounded-full ${node.color}`} />
                      </div>
                    )}
                  </div>

                  <div className="relative flex h-full items-center justify-center">
                    <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                    <span className={`relative z-10 h-2.5 w-2.5 rounded-full ring-4 ring-[#0B1011] ${node.color}`} />
                  </div>

                  <div className={!left ? 'pl-3 text-left' : ''}>
                    {!left && (
                      <div className="inline-flex max-w-[145px] items-center gap-2 border border-white/10 bg-white/[0.025] px-3 py-2.5">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${node.color}`} />
                        <span className="text-[11px] font-medium !text-white/78">{node.label}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 mx-auto mt-7 w-fit border-t border-white/10 pt-4 text-center">
            <p className="text-[8px] font-semibold uppercase tracking-[.2em] !text-white/28">Europe · Mediterranean</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-3xl md:block">
        <svg
          className="absolute inset-0 h-full w-full text-white/10"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M52 68 C48 60 46 52 49 40 C50 36 46 34 44 34 C42 34 40 36 40 38 C38 42 38 46 40 48 C42 52 40 56 38 58 C36 60 34 60 34 58 M52 68 C54 64 52 60 48 58 C46 56 46 52 49 50 C52 48 54 50 58 46 C60 44 60 48 60 52 M52 68 C52 72 50 74 51 78 M51 78 C50 76 48 75 46 74"
            stroke="currentColor"
            strokeWidth="0.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {nodes.map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span className={`inline-block h-3 w-3 rounded-full shadow-sm ${node.color}`} />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs !text-white/80">
              {node.label}
            </span>
          </motion.div>
        ))}

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[
            [51, 78, 52, 68],
            [52, 68, 44, 34],
            [52, 68, 40, 48],
            [52, 68, 49, 40],
            [52, 68, 34, 58],
            [52, 68, 58, 46],
            [52, 68, 60, 52],
            [51, 78, 46, 74],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
