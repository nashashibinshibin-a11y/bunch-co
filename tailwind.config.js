/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1f7',
          100: '#d5dced',
          200: '#adb9db',
          300: '#7f93c5',
          400: '#5a72b0',
          500: '#3d5a99',
          600: '#2d4580',
          700: '#1e2f5e',
          800: '#152147',
          900: '#0d1530',
          950: '#0a1028',
        },
        brand: {
          navy: '#1a2d5a',
          'navy-dark': '#0f1e3d',
          'navy-light': '#243872',
          orange: '#e8671a',
          'orange-light': '#f07a30',
          'orange-dark': '#c5540f',
          ivory: '#faf8f4',
          'ivory-dark': '#f2ede4',
          cream: '#f7f4ee',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)',
        'nav': '0 2px 20px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
