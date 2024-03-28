import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DGO1z0xe.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>body body body body</p>";

				const frontmatter = {"title":"Test Page for Astro","date":"2023-10-03T20:27","author":"Joe","summary":"This is a testing page, seeing where this will end up.","tags":["post","bla"],"image":"/public/images/uploads/4493awq5iagb1.jpg","imageAltText":"a brutalist like building"};
				const file = "/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/posts/test.md";
				const url = undefined;
				function rawContent() {
					return "body body body body\n";
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
