import adapter_old from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			edge: false, // Use Node-based Netlify Functions (default for SSR)
			split: true // Generate separate functions for each route (recommended for SSR)
		})
	}
};

export default config;
