import type { Config } from "tailwindcss";

export default {
    content: [
        "./app/**/*.{js,ts,tsx}",
        "./components/**/*.{js,ts,tsx}",
        "./lib/**/*.{js,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1B449E",
                secondary: "#88d3ce",
                dark: "#1a1a2e",
                light: "#f8f9fa",
                accent: "#ff7e5f"
            },
            boxShadow: {
                soft: "0 10px 30px rgba(0,0,0,0.05)",
            },
            borderRadius: {
                xl2: "1.25rem"
            }
        }
    },
    plugins: []
} satisfies Config;