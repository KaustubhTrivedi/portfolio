/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'body': ['"Quicksand"', 'sans-serif'],
        'story': ['"Crimson Text"', 'serif'],
      },
      colors: {
        parchment: {
          50: '#FFFEF9',
          100: '#FDF6EC',
          200: '#FAF0E1',
          300: '#F7E9D4',
          400: '#F3E1C7',
          500: '#EFDBBA',
          600: '#E5C896',
          700: '#DAB572',
          800: '#CFA24E',
          900: '#B8904A',
          dark: {
            50: '#1a1a1a',
            100: '#2d2d2d',
            200: '#404040',
            300: '#525252',
            400: '#666666',
            500: '#7a7a7a',
            600: '#8f8f8f',
            700: '#a3a3a3',
            800: '#b8b8b8',
            900: '#cccccc'
          }
        },
        blush: {
          50: '#FDF2F3',
          100: '#FCE7E9',
          200: '#F9D3D7',
          300: '#F3B5BC',
          400: '#F1989E',
          500: '#E97A81',
          600: '#DC5C65',
          700: '#C54751',
          800: '#A53E47',
          900: '#8A3A42',
          dark: {
            50: '#2d1a1b',
            100: '#3d2526',
            200: '#4d3031',
            300: '#5d3b3c',
            400: '#6d4647',
            500: '#7d5152',
            600: '#8d5c5d',
            700: '#9d6768',
            800: '#ad7273',
            900: '#bd7d7e'
          }
        },
        sky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          dark: {
            50: '#0a1a2a',
            100: '#0f2a3d',
            200: '#143a50',
            300: '#194a63',
            400: '#1e5a76',
            500: '#236a89',
            600: '#287a9c',
            700: '#2d8aaf',
            800: '#329ac2',
            900: '#37aad5'
          }
        },
        mint: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          dark: {
            50: '#0a2a1a',
            100: '#0f3d2a',
            200: '#14503a',
            300: '#19634a',
            400: '#1e765a',
            500: '#23896a',
            600: '#289c7a',
            700: '#2daf8a',
            800: '#32c29a',
            900: '#37d5aa'
          }
        },
        lavender: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7C3AED',
          800: '#6B21A8',
          900: '#581C87',
          dark: {
            50: '#2a1a3d',
            100: '#3d2a5a',
            200: '#503a77',
            300: '#634a94',
            400: '#765ab1',
            500: '#896ace',
            600: '#9c7aeb',
            700: '#af8a08',
            800: '#c29a25',
            900: '#d5aa42'
          }
        },
        butter: {
          50: '#FFFEF7',
          100: '#FFFBEB',
          200: '#FEF3C7',
          300: '#FDE68A',
          400: '#FCD34D',
          500: '#FBBF24',
          600: '#F59E0B',
          700: '#D97706',
          800: '#B45309',
          900: '#92400E',
          dark: {
            50: '#3d2a0a',
            100: '#5a3d0f',
            200: '#775014',
            300: '#946319',
            400: '#b1761e',
            500: '#ce8923',
            600: '#eb9c28',
            700: '#08af2d',
            800: '#25c232',
            900: '#42d537'
          }
        },
        ink: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          dark: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a'
          }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'flip': 'flip 0.6s ease-in-out',
        'page-turn': 'pageTurn 0.8s ease-in-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '50%': { transform: 'rotateY(-90deg)' },
          '100%': { transform: 'rotateY(0)' }
        },
        pageTurn: {
          '0%': { transform: 'rotateY(0) scale(1)' },
          '50%': { transform: 'rotateY(-90deg) scale(0.8)' },
          '100%': { transform: 'rotateY(0) scale(1)' }
        }
      },
      boxShadow: {
        'story': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'chapter': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      backdropBlur: {
        'story': '12px'
      }
    },
  },
  plugins: [],
} 