import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DGO1z0xe.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>An author amongst authors</p>";

				const frontmatter = {"name":"Joe","image":"//BIT_MAP_RETINA.png"};
				const file = "/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/authors/joe.md";
				const url = undefined;
				function rawContent() {
					return "\nAn author amongst authors\n";
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
