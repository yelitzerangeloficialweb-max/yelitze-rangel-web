import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                "primary-light": "var(--color-primary-light)",
                secondary: "var(--color-secondary)",
                "secondary-light": "var(--color-secondary-light)",
                accent: "var(--color-accent)",
                background: "var(--color-background)",
                surface: "var(--color-surface)",
                text: "var(--color-text)",
                "text-light": "var(--color-text-light)",
                neutral: "var(--color-neutral)",
                white: "#FFFFFF",
                black: "#2D2926",
            },
            fontFamily: {
                heading: ["var(--font-playfair)", "serif"],
                body: ["var(--font-inter)", "sans-serif"],
                script: ["var(--font-allison)", "cursive"],
                editorial: ["var(--font-cormorant)", "serif"],
                guide: ["var(--font-montserrat)", "sans-serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
