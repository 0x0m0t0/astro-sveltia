import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import partytown from '@astrojs/partytown'

export default defineConfig({
	output: 'server',
	adapter: cloudflare({
		imageService: 'cloudflare',
		platformProxy: {
			enabled: true,
			configPath: './wrangler.toml'
		}
	}),

	// ({
	// }),
	integrations: [tailwindcss(), partytown()],

	vite: {
		plugins: [tailwindcss()]
	}
})
