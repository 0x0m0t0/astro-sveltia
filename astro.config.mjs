import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
	output: 'hybrid',
	adapter: cloudflare({
		imageService: 'cloudflare'
	}),
	integrations: [tailwind()]
})
