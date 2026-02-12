import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import partytown from '@astrojs/partytown'

import svelte from '@astrojs/svelte'

export default defineConfig({
	output: 'server',
	adapter: cloudflare({
		imageService: 'passthrough',
		platformProxy: {
			enabled: true,
			configPath: './wrangler.toml'
		}
	}),

	// ({
	// }),
	integrations: [tailwindcss(), partytown(), svelte()],

	vite: {
		plugins: [tailwindcss()]
	}
})
