/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			// fontFamily: {
			//   sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
			// },
			colors: {
				mauve: '#FDFCFD',
				darkSand: '#21201C',
				dark: '#161613',
				darkText: '#E8E8E8',
				tomato: '#DD4425'
			}
		}
	},
	plugins: []
}
