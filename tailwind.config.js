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
      "cb-tertiary": "#1B284A",
      "cb-contrast": "#162446",
      "cb-red": "#DD1650",
      "cb-base": "#F7F7F7",
      "cb-info": "#21ACBE",
      "cb-info-dark": "#173E5E",
      "cb-success": "#4CAF50",
      "cb-modal": "#162446",
      "cb-hover-signup": "#F10B4E",
      "cb-orange": "#F39257",
      "cb-orange-light": "#F07D4217",
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/forms")],
};
