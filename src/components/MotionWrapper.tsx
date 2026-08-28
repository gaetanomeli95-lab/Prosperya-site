'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function useMobilePerformanceMode() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => setMobile(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return mobile;
}

export function FadeIn({ children, className = '', delay = 0 }: Props) {
  const mobile = useMobilePerformanceMode();
  const reduceMotion = useReducedMotion();
  const lightweight = mobile || reduceMotion;

  return (
    <motion.div
      initial={lightweight ? false : { opacity: 0, y: 18 }}
      animate={lightweight ? { opacity: 1, y: 0 } : undefined}
      whileInView={lightweight ? undefined : { opacity: 1, y: 0 }}
      viewport={lightweight ? undefined : { once: true, margin: '-60px' }}
      transition={lightweight
        ? { duration: 0.01 }
        : { duration: 0.52, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
