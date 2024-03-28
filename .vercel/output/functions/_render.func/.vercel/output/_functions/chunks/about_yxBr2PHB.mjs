import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DGO1z0xe.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Design and development practice of Louis Desmet. Brussels based.\nOpen for freelance work &#x26; collaboration starting Q2 2024 🟢.</p>";

				const frontmatter = {"title":"About","links":[{"label":"instagram","url":"https://www.instagram.com/oxomoto/","handle":"@oxomoto"},{"label":"github","url":"https://github.com/0x0m0t0","handle":"@0x0m0t0"},{"label":"are.na","url":"https://www.are.na/oxomoto/index","handle":"@oxomoto"},{"label":"twitter","url":"https://twitter.com/oxomoto","handle":"@oxomoto"},{"label":"mastodon","url":"https://post.lurk.org/@oxomoto","handle":"@oxomoto@post.lurk.org"}],"url":"oxomoto.co"};
				const file = "/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/about/about.md";
				const url = undefined;
				function rawContent() {
					return "\nDesign and development practice of Louis Desmet. Brussels based.\nOpen for freelance work & collaboration starting Q2 2024 🟢.\n";
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
