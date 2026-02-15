/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                clinic: {
                    primary: '#0D9488', // Teal
                    primaryDark: '#0F766E',
                    secondary: '#F8FAFC', // Near white
                    dark: '#0F172A', // Dark blue contrast
                    text: '#1E293B', // Slate 800
                    muted: '#64748B', // Slate 500
                    border: '#E2E8F0', // Slate 200
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
                outfit: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                'section': '120px',
            }
        },
    },
    plugins: [],
}
