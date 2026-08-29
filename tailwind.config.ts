import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#090D0E',
        'night-light': '#141A1B',
        anthracite: '#2A3031',
        'warm-ivory': '#F3F0E9',
        'stone-warm': '#DDD7CD',
        paper: '#FBFAF7',
        sand: '#C9B991',
        mediterranean: '#315F67',
        'mediterranean-light': '#76A0A5',
        'logo-yellow': '#F2C94C',
        'logo-green': '#4CAF50',
        'logo-orange': '#FF7F2A',
        'logo-magenta': '#C81A69',
        'logo-blue': '#1976D2',
      },
      opacity: {
        8: '0.08',
        12: '0.12',
        13: '0.13',
        14: '0.14',
        15: '0.15',
        18: '0.18',
        28: '0.28',
        32: '0.32',
        34: '0.34',
        35: '0.35',
        36: '0.36',
        38: '0.38',
        42: '0.42',
        46: '0.46',
        48: '0.48',
        52: '0.52',
        55: '0.55',
        56: '0.56',
        58: '0.58',
        62: '0.62',
        64: '0.64',
        65: '0.65',
        66: '0.66',
        67: '0.67',
        68: '0.68',
        72: '0.72',
        78: '0.78',
        85: '0.85',
        88: '0.88',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter2: '-0.055em',
      },
      boxShadow: {
        float: '0 20px 70px rgba(9, 13, 14, 0.14)',
        soft: '0 12px 45px rgba(9, 13, 14, 0.08)',
      },
      screens: {
        xs: '320px',
      },
    },
  },
  plugins: [],
};

export default config;
