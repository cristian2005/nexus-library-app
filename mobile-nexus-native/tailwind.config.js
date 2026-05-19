/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e5aa8",
          dark: "#123a70",
          light: "#3b78c4"
        },
        accent: {
          DEFAULT: "#f5a524",
          dark: "#e08a00"
        },
        surface: "#ffffff",
        "surface-alt": "#f6f7fb",
        ink: "#1f2937",
        muted: "#6b7280",
        border: "#e4e7ef"
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-bold": ["Inter_700Bold"],
        serif: ["Lora_400Regular"],
        "serif-bold": ["Lora_700Bold"]
      }
    }
  },
  plugins: []
};
