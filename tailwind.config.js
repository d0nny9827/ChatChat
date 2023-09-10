/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-coal": "#0f0d0e",
        "brand-charcoal": "#231f20",
        "brand-charcoal-muted": "#1b1918",
        "brand-gray": "#262522",
        "brand-yua": "#fcba28",
        "brand-ena": "#f38ba3",
        "brand-shiori": "#0ba95b",
        "brand-luna": "#7b5ea7",
        "brand-ice": "#f9f4da",
        "brand-ramu": "#12b5e5",
        "brand-riri": "#ed203d",
        "brand-orange": "#fc7428",
        "brand-peach": "#f99157",
        "brand-lightpurple": "#9d7dce",
        "brand-white": "#fff",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
