import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://hr-for-impact.github.io',
  // base: 'mazi-doc',
	integrations: [
		starlight({
			title: 'mazi doc',
			social: {
				github: 'https://github.com/hr-for-impact',
			},
			sidebar: [
				{
					label: 'Bienvenue',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Bienvenue', link: '/guides/bienvenue/' },
					],
				},
				{
					label: 'Ressources',
					autogenerate: { directory: 'ressources' },
				},
			],
		}),
	],
});
