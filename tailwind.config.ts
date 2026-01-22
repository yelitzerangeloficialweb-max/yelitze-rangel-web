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
            },
            fontFamily: {
                heading: ["'Dancing Script'", "cursive"],
                body: ["'Ranade'", "sans-serif"],
                script: ["'Dancing Script'", "cursive"],
                sans: ["'Ranade'", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
