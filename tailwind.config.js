/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkPink: '#de231f',
        lightPink: '#f9b8c8',
        navPink: '#f99ca6',
        lightYellow: '#fbedb4',
        whitish: '#fff',
        lightGray: '#94a3b8',
        bgTexture: '#15b9a2',
        chamois: '#FDD26E',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
