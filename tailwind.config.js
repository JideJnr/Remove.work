/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customLightBlue: '#f8fafd',
        customDarkBlue: '#1e293b',
      },
    },
  },
  plugins: [],
};
