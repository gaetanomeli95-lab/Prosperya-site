'use client';

const dots = [
  { color: '#F2C94C', x: 50, y: 7 },
  { color: '#4CAF50', x: 75, y: 15 },
  { color: '#1976D2', x: 91, y: 36 },
  { color: '#C81A69', x: 88, y: 65 },
  { color: '#FF7F2A', x: 68, y: 86 },
  { color: '#D84A13', x: 40, y: 92 },
  { color: '#F2C94C', x: 16, y: 76 },
  { color: '#4CAF50', x: 7, y: 49 },
  { color: '#1976D2', x: 16, y: 23 },
  { color: '#C81A69', x: 34, y: 10 },
];

export function MiniBrandMark() {
  return (
    <span className="group/mark relative block h-10 w-10 shrink-0 sm:h-11 sm:w-11" aria-hidden="true">
      <span className="absolute inset-[3%] rounded-full border border-white/10 transition-transform duration-700 ease-out group-hover/mark:rotate-[12deg]" />
      <span className="absolute inset-[16%] rounded-full border border-white/10" />

      <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover/mark:rotate-[18deg]">
        {dots.map((dot, index) => (
          <span
            key={`${dot.color}-${index}`}
            className="absolute h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 shadow-[0_3px_8px_rgba(0,0,0,.25)]"
            style={{ left: `${dot.x}%`, top: `${dot.y}%`, backgroundColor: dot.color }}
          />
        ))}
      </span>

      <span className="absolute inset-[28%] grid place-items-center rounded-full border border-white/15 bg-[#090D0E] shadow-[0_4px_12px_rgba(0,0,0,.35)]">
        <span className="text-[7px] font-semibold tracking-[0.08em] text-white">P</span>
      </span>
    </span>
  );
}
