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
				dark: '#0E1013',
				darkText: 'slate-200'
			}
		}
	},
	plugins: []
}
