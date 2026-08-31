'use client';

import { motion } from 'framer-motion';

const nodes = [
  { label: 'Sicilia', x: 51, y: 73, color: 'bg-logo-magenta' },
  { label: 'Italia', x: 52, y: 68, color: 'bg-logo-blue' },
  { label: 'Paesi Bassi', x: 44, y: 34, color: 'bg-logo-yellow' },
  { label: 'Francia', x: 40, y: 48, color: 'bg-logo-green' },
  { label: 'Germania', x: 49, y: 40, color: 'bg-logo-orange' },
  { label: 'Spagna', x: 34, y: 58, color: 'bg-logo-magenta' },
  { label: 'Romania', x: 58, y: 46, color: 'bg-logo-blue' },
  { label: 'Bulgaria', x: 60, y: 52, color: 'bg-logo-yellow' },
  { label: 'Tunisia', x: 46, y: 82, color: 'bg-logo-green' },
];

export function MapNetwork() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl sm:aspect-[4/3]" aria-label="Mappa delle aree operative">
      <svg
        className="absolute inset-0 h-full w-full text-white/10"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52 68 C48 60 46 52 49 40 C50 36 46 34 44 34 C42 34 40 36 40 38 C38 42 38 46 40 48 C42 52 40 56 38 58 C36 60 34 60 34 58 M52 68 C54 64 52 60 48 58 C46 56 46 52 49 50 C52 48 54 50 58 46 C60 44 60 48 60 52 M52 68 C52 71 51 72 51 73 M51 73 C50 76 48 79 46 82"
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
          <span className={`inline-block h-3 w-3 rounded-full shadow-sm sm:h-3 sm:w-3 ${node.color}`} />
          <span className="absolute left-3.5 top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[10px] !text-white/80 sm:left-4 sm:block sm:text-xs">
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
          [51, 73, 52, 68],
          [52, 68, 44, 34],
          [52, 68, 40, 48],
          [52, 68, 49, 40],
          [52, 68, 34, 58],
          [52, 68, 58, 46],
          [52, 68, 60, 52],
          [51, 73, 46, 82],
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

      <div className="absolute inset-x-0 bottom-1 flex items-center justify-center gap-4 sm:hidden">
        {['Sicilia', 'Italia', 'Tunisia'].map((label, i) => (
          <div key={label} className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] !text-white/62">
            <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-logo-magenta' : i === 1 ? 'bg-logo-blue' : 'bg-logo-green'}`} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
