/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      },
      colors: {
        bg: {
          canvas: '#000000',
          surface1: '#151515',
          surface2: 'rgba(28, 28, 30, 0.6)'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1A6',
          tertiary: '#6E6E73'
        },
        border: {
          glass: 'rgba(255, 255, 255, 0.08)'
        }
      },
      boxShadow: {
        neo: '8px 8px 16px #0a0a0a, -8px -8px 16px #202020',
        'neo-pressed': 'inset 6px 6px 12px #0a0a0a, inset -6px -6px 12px #202020',
        'glass-inner': 'inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 rgba(255, 255, 255, 0.04)'
      },
      backdropBlur: {
        glass: '40px'
      },
      saturate: {
        150: '1.5'
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.2, 1, 0.22, 1)'
      }
    }
  },
  plugins: [
    function glassmorphismUtilities({ addUtilities }) {
      addUtilities({
        '.glass-panel': {
          backgroundColor: 'rgba(28, 28, 30, 0.6)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 rgba(255, 255, 255, 0.04)'
        },
        '.neo-surface': {
          backgroundColor: '#151515',
          boxShadow: '8px 8px 16px #0a0a0a, -8px -8px 16px #202020'
        },
        '.neo-surface-pressed': {
          backgroundColor: '#151515',
          boxShadow: 'inset 6px 6px 12px #0a0a0a, inset -6px -6px 12px #202020'
        }
      });
    }
  ]
};
