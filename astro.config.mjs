import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

export default defineConfig({
	output: 'hybrid',
	adapter: vercel(),
	adapter: node({
		mode: 'standalone'
	}),
	integrations: [tailwind()]
})
