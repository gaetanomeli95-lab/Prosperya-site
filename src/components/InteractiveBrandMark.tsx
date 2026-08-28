'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const colors = [
  '#C81A69', '#1976D2', '#4CAF50', '#F2C94C', '#FF7F2A', '#D84A13',
  '#F2C94C', '#4CAF50', '#1976D2', '#C81A69', '#FF7F2A', '#1976D2',
];

export function InteractiveBrandMark() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 70, damping: 18, mass: 0.5 });
  const springY = useSpring(py, { stiffness: 70, damping: 18, mass: 0.5 });
  const ringX = useTransform(springX, (v) => v * 0.55);
  const ringY = useTransform(springY, (v) => v * 0.55);
  const coreX = useTransform(springX, (v) => v * -0.22);
  const coreY = useTransform(springY, (v) => v * -0.22);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    px.set(x * 22);
    py.set(y * 22);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className="group relative aspect-square w-full select-none"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      aria-label="Marchio Prosperya interattivo"
    >
      <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,.09),rgba(255,255,255,.025)_34%,transparent_68%)]" />

      <motion.div style={{ x: ringX, y: ringY }} className="absolute inset-[5%]">
        <div className="absolute inset-0 rounded-full border border-white/20" />
        <div className="absolute inset-[9%] rounded-full border border-white/10" />
        <div className="absolute inset-[19%] rounded-full border border-dashed border-white/15" />

        <motion.div
          className="absolute inset-[1%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
        >
          {colors.map((color, index) => {
            const angle = (index / colors.length) * Math.PI * 2 - Math.PI / 2;
            const left = 50 + Math.cos(angle) * 35.5;
            const top = 50 + Math.sin(angle) * 35.5;

            return (
              <motion.span
                key={`${color}-${index}`}
                className="absolute block h-[12.5%] w-[12.5%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 shadow-[0_10px_28px_rgba(0,0,0,.25)]"
                style={{ left: `${left}%`, top: `${top}%`, backgroundColor: color }}
                whileHover={{ scale: 1.22 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              />
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div style={{ x: coreX, y: coreY }} className="absolute inset-[28%] grid place-items-center rounded-full border border-white/15 bg-[#0A0F10]/55 shadow-[0_20px_60px_rgba(0,0,0,.28)] backdrop-blur-sm">
        <div className="text-center">
          <div className="text-[clamp(.68rem,1.1vw,1rem)] font-semibold tracking-[.18em] text-white">PROSPERYA</div>
          <div className="mx-auto mt-3 h-px w-8 bg-sand/80" />
          <div className="mt-3 text-[clamp(.42rem,.7vw,.62rem)] font-medium uppercase tracking-[.18em] text-white/55">Business advisory</div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-[1%] rounded-full opacity-0 ring-1 ring-sand/30 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[.28em] text-white/40 sm:text-[9px]">
        Governance · Strategy · Growth
      </div>
    </div>
  );
}
