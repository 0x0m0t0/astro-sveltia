import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DGO1z0xe.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"activities":[{"activity":"Reading The Silk Roads by Peter Frankopan"},{"activity":"Practicing my Typescript & Svelte"},{"activity":"Drinking too much coffee"},{"activity":"Integrating Sveltia CMS with Astro on this website. https://github.com/sveltia/sveltia-cms/"},{"activity":"Trying to index my library and make it reachable by API"}]};
				const file = "/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/now/now.md";
				const url = undefined;
				function rawContent() {
					return "";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
