import type { Config } from "tailwindcss";

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // 🟢 Main brand palette
                primary: {
                    DEFAULT: "#00B2A9", // main teal
                    light: "#33C1BA",   // lighter accent
                    dark: "#00958E",    // deeper shade for hover/focus
                },

                // 🟡 Accent for highlights or CTAs
                accent: {
                    DEFAULT: "#FFD166",
                    dark: "#E6B94E",
                    light: "#FFE59A",
                },

                // ⚪ Neutral palette for backgrounds & typography
                neutral: {
                    50: "#F9FAFA",
                    100: "#F3F4F4",
                    200: "#E5E7E7",
                    300: "#D1D5D5",
                    400: "#9CA3A3",
                    500: "#6B7272",
                    600: "#4B5151",
                    700: "#374040",
                    800: "#1F2525",
                    900: "#111414",
                },
            },
        },
    },
} satisfies Config;
