export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        primary: "SF Pro",
        primaryBold: "SF Pro_Bold",
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
};