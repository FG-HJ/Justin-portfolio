/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                hero: "url('/src/assets/backgrounds/hero-bg.jpg')",
                blurry: "url('/src/assets/backgrounds/bg-blurry-2.jpg')",
                blurrytmp: "url('/src/assets/backgrounds/bg-blurry-tmp.jpg')",
            },
            colors: {
                "dark-gray": "#0C0C0F",
            },
        },
        fontFamily: {
            sans: [
                "Josefin Sans",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "sans-serif",
            ],
        },
        patterns: {
            opacities: {
                100: "1",
                80: ".80",
                60: ".60",
                40: ".40",
                20: ".20",
                10: ".10",
                5: ".05",
            },
            sizes: {
                1: "0.25rem",
                2: "0.5rem",
                4: "1rem",
                6: "1.5rem",
                8: "2rem",
                16: "4rem",
                20: "5rem",
                24: "6rem",
                32: "8rem",
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [
        require("tailwindcss-bg-patterns"),
        require("@tailwindcss/aspect-ratio"),
    ],
};
