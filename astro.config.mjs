import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
	output: 'hybrid',
	adapter: vercel(),
	integrations: [tailwind()]
})
