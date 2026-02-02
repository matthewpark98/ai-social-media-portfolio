/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './client/components/App.tsx',
    './client/components/CreatePost.tsx',
    './client/components/Feed.tsx',
    './client/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
