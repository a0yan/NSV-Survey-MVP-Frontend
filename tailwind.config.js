/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F46E5',   // indigo-600
          dark: '#6366F1',    // indigo-500
        },
        background: {
          light: '#FFFFFF',
          dark: '#0F172A',   // slate-900
        },
        text: {
          light: '#1E293B',  // slate-800
          dark: '#F1F5F9',   // slate-100
        },
        accent: '#10B981',   // emerald-500
      },
    },
  plugins: [],
}
}