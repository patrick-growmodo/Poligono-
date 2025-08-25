import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable manual dark mode via class
  theme: {
    extend: {
        colors: {
            light: '#FFFFFF',
            dark: '#0B0A09',
            dark_2: '#11100D',
            primary: '#DA46F8',
            secondary: '#7B51F8',
            tertiary: '#6940E4',
            quaternary: '#242424',
            quinary: '#1A1A1A',
            senary: '#2F2F2F',
        },
        background: {
          'gradient-dark': 'linear-gradient(146deg, #191919 0.2%, #0B0A09 73.63%), #FFF;',
        },
        fontFamily: {
          'inter': ['var(--font-inter)', 'sans-serif'],
          'poppins': ['var(--font-poppins)', 'sans-serif'],
          'montserrat': ['var(--font-montserrat)', 'sans-serif'],
          'roboto': ['var(--font-roboto)', 'sans-serif'],
        },
        borderRadius: {
          '20': '20px', '13': '13.573px',
        },
        boxShadow: {
          'custom': '0px 2.172px 5.429px 0px rgba(0, 0, 0, 0.10)',
          'custom-2': '0px 2.152px 3.767px 0px rgba(30, 12, 84, 0.38) inset, -2.152px 2.152px 11.3px 0px rgba(105, 64, 228, 0.35);',
          'custom-3': '0px 2px 3.5px 0px rgba(30, 12, 84, 0.38) inset, -2px 2px 10.5px 0px rgba(105, 64, 228, 0.35)',
          'custom-4': 'linear-gradient(90deg, #6940E4 -8.03%, #DA46F8 105.34%);',
          'custom-5': 'linear-gradient(90deg, #DA46F8, #6940E4)',
        },
        animation: {
          'marquee': 'marquee 20s linear infinite',
          'fade-in': 'fade-in 0.3s ease-in-out',
          'fade-out': 'fade-out 0.15s ease-in-out',
        },
        screens:{
          'xs': '375px',
          'sm': '425px', 
          'md': '768px',
          'lg': '1024px',
          'xl': '1440px',
        },

        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          'fade-in': {
            '0%': { opacity: '0', transform: 'scale(0.95)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
          'fade-out': {
            '0%': { opacity: '1', transform: 'scale(1)' },
            '100%': { opacity: '0', transform: 'scale(0.95)' },
          },
        },
    },
  },
  plugins: [],
}
export default config 