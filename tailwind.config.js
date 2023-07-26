/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "cb-primary": "#131E39",
      "cb-secondary": "#344A6A",
      "cb-red": "#DD1650",
      "cb-base": "#F7F7F7",
      "cb-info": "#21ACBE",
    },
  },
  plugins: [require("flowbite/plugin")],
};
