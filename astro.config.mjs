import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'

export default defineConfig({
	output: 'server',
	adapter: cloudflare(),
	// ({
	// 	imageService: 'cloudflare'
	// }),
	integrations: [tailwind(), partytown()]
})
