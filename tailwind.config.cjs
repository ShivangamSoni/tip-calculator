/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "hsl(172, 67%, 45%)",
                neutral: {
                    50: "hsl(189, 41%, 97%)",
                    100: "hsl(185, 41%, 84%)",
                    200: "hsl(184, 14%, 56%)",
                    300: "hsl(186, 14%, 43%)",
                    700: "hsl(183, 100%, 15%)",
                },
                error: " hsl(12, 50%, 60%)",
            },
            fontFamily: {
                space: ["Space Mono", "monospace"],
            },
        },
    },
    plugins: [],
};
