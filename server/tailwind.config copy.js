/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "/views/**/*.{html,js,hbs}",
    "/views/all.hbs",
  ],
  theme: {
    extend: {
      listStyleImage: {
        checkmark: 'url("/img/checkmark.png")',
      },
    },
  },
  plugins: [],
}

