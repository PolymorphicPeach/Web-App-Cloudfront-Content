/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
    // List of files for Tailwind to target
    content: ["./index.html", "./src/**/*.{vue,js,ts}"],
    theme: {
        extend: {
            // Extending (adjusting) a theme
            fontfamily:{
                sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
            },
            // Set custom colors for Tailwind classes
            colors:{
                "peach-black": "#403C3C",
                "peach-gray": "#D5CCD9",
                "peach-peach": "#ECBD99",
                "peach-pink":  "#F8BCBC",
                "peach-pink-darker": "#E0AFAF",
                "peach-pink-lighter": "#FED5D6"
            }
        },
    },
    plugins: [],
}