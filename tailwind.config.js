/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Spectral"', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        paper: '#fdfcf9',
        paper2: '#f3efe6',
        ink: '#16130e',
        body: '#423c33',
        muted: '#6e685c',
        faint: '#918b7d',
        faint2: '#b3ac9d',
        rule: '#e4dfd4',
        rule2: '#d3ccbd',
        track: '#e7e2d6',
        accent: '#c0271f',
        accentdark: '#9c1c15',
        accentsoft: '#f8ebe7',
        gold: '#97670f',
        goldsoft: '#f5ead2',
        navy: '#2f4858',
        navysoft: '#e7edf0',
        codebg: '#f4f0e7',
        codebar: '#eae4d8',
        codeink: '#2c2820',
      },
    },
  },
  plugins: [],
}
