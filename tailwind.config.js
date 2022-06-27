module.exports = {
  content: [
    './**/*.{html,js,ejs}'
  ],
  theme: {
    extend: {
        colors: {
            primary: '#f2b366',
        },
        fontFamily: {
            'sans': ['Helvetica', 'Arial', 'sans-serif'],
        },
        screens: {
            'sm': '480px'
        },
        dropShadow: {
          'light': '1px 1px 1px rgba(255, 255, 255, 0.9)',
        }
    }
},
  plugins: [
    require('@tailwindcss/forms')
  ],
}
