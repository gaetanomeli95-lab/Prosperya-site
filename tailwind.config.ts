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
        night: '#0B1220',
        'night-light': '#121B2B',
        anthracite: '#2A2F35',
        'warm-ivory': '#F7F5F0',
        'stone-warm': '#E8E4DC',
        'mediterranean': '#1E5A7D',
        'mediterranean-light': '#2C7AA8',
        'logo-yellow': '#F2C94C',
        'logo-green': '#4CAF50',
        'logo-orange': '#FF7F2A',
        'logo-magenta': '#C81A69',
        'logo-blue': '#1976D2',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '320px',
      },
    },
  },
  plugins: [],
};

export default config;
