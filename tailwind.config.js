/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: 'var(--color-bg-dark, #05070B)',
          card: 'var(--color-bg-card, rgba(13, 17, 24, 0.75))',
          cardHover: 'var(--color-bg-card-hover, rgba(20, 26, 38, 0.9))',
        },
        primary: {
          DEFAULT: 'var(--color-primary, #60A5FA)',
          glow: 'var(--color-primary-glow, rgba(96, 165, 250, 0.35))',
        },
        accent: {
          DEFAULT: 'var(--color-accent, #38BDF8)',
          glow: 'var(--color-accent-glow, rgba(56, 189, 248, 0.35))',
        },
        text: {
          main: 'var(--color-text-main, #F8FAFC)',
          muted: 'var(--color-text-muted, #94A3B8)',
          subtle: 'var(--color-text-subtle, #64748B)',
        },
        border: {
          subtle: 'var(--color-border, rgba(255, 255, 255, 0.08))',
          glow: 'var(--color-border-glow, rgba(96, 165, 250, 0.3))',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'sans-serif']
      }
    },
  },
  plugins: [],
};
