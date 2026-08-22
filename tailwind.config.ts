import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Warm charcoal — dark bands, and the colour of body text on bone. */
        ink: { DEFAULT: '#1A1A16', 2: '#26261F' },
        /* Page ground. */
        bone: '#F5F1E7',
        /* Raised / alternate surfaces against bone. */
        clay: '#E8E4D8',
        /* Primary accent. Only ever a *background* behind ink, or a mark on
           the dark band — lime on bone is ~1.2:1 and unreadable as text. */
        lime: '#D8FF3E',
        /* Secondary accent. Passes AA on bone, so it may carry small text. */
        teal: '#0F9E8E',
        grey: '#6E6A5E',
        line: '#D6D1C2',
        /* Hairline on the dark band. */
        'line-dark': '#34342C',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo-black)', 'Arial Black', 'sans-serif'],
        serif: ['var(--font-instrument)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
      },
      maxWidth: {
        wrap: '1240px',
      },
      animation: {
        'stripes-lime': 'stripesLime 8s linear infinite',
        'stripes-teal': 'stripesTeal 13s linear infinite',
        roll: 'roll 7.5s steps(1, end) infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        /* Travel values are measured, not derived. A whole multiple of the
           pattern period does NOT survive the browser's rasterising of a 45°
           gradient — textbook-correct values visibly snapped on screen. These
           two were verified to render pixel-identical one cycle apart. Changing
           them makes the loop restart visible. */
        stripesLime: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(339.41px)' },
        },
        stripesTeal: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(622.25px)' },
        },
        roll: {
          '0%, 24%': { transform: 'translateY(0)' },
          '33%, 57%': { transform: 'translateY(-0.92em)' },
          '66%, 90%': { transform: 'translateY(-1.84em)' },
          '100%': { transform: 'translateY(0)' },
        },
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
