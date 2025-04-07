// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'color-fade': {
          '0%, 100%': { color: '#ffffff' },
          '50%': { color: '#000000' },
        },
        
      },
      animation: {
        'text-fade': 'color-fade 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
