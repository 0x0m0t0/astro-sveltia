/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent, j as renderSlot, k as renderHead, A as AstroError, l as UnknownContentCollectionError, n as renderUniqueStylesheet, o as renderScriptElement, p as createHeadAndContent, u as unescapeHTML } from '../astro_DGO1z0xe.mjs';
import 'kleur/colors';
import { p as prependForwardSlash } from '../astro/assets-service_F4D4PgSQ.mjs';
/* empty css                          */
import 'clsx';
import { $ as $$Image } from './generic_LdIbM130.mjs';

const $$Astro$6 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Footer;
  const date = (/* @__PURE__ */ new Date()).toDateString();
  return renderTemplate`${maybeRenderHead()}<p>
No cookies. Last updated <span>${date}</span> </p>`;
}, "/Users/oxomoto/Desktop/projects/astro-sveltia/src/components/Footer.astro", void 0);

const $$Astro$5 = createAstro();
const $$Darkmode = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Darkmode;
  return renderTemplate`${maybeRenderHead()}<div id="dark-mode-toggle" class="select-none hover:cursor-pointer"> <svg id="sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> <svg id="moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> <svg id="system" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sunrise"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline></svg> </div> `;
}, "/Users/oxomoto/Desktop/projects/astro-sveltia/src/components/Darkmode.astro", void 0);

const $$Astro$4 = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Nav;
  const Links = [
    {
      path: "/",
      label: "Home"
    },
    {
      path: "/about",
      label: "About"
    },
    {
      path: "/now",
      label: "Now"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="text-darkSand absolute right-0 top-0 p-4 dark:text-darkText"> <ul> ${Links.length > 0 ? Links.map((l) => {
    return renderTemplate`<li class="pb-2"> <a${addAttribute(l.path, "href")}${addAttribute(`relative ${l.path === Astro2.url.pathname ? "text-darkSand text-opacity-40 dark:text-darkText dark:text-opacity-40" : ""}`, "class")}> ${l.label} </a> </li>`;
  }) : null} </ul> ${renderComponent($$result, "Darkmode", $$Darkmode, {})} </div>`;
}, "/Users/oxomoto/Desktop/projects/astro-sveltia/src/components/Nav.astro", void 0);

const $$Astro$3 = createAstro();
const $$SecHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SecHeader;
  return renderTemplate`${maybeRenderHead()}<header class="grid w-full grid-cols-4 gap-4 md:grid-cols-8"> ${renderComponent($$result, "Nav", $$Nav, {})} </header>`;
}, "/Users/oxomoto/Desktop/projects/astro-sveltia/src/components/SecHeader.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title><script>\n			const theme = localStorage.getItem('theme'),\n				isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches\n			theme === 'dark' || (!theme && isSystemDark)\n				? document.documentElement.classList.add('dark')\n				: theme === 'light'\n					? document.documentElement.classList.remove('dark')\n					: theme === 'system' && isSystemDark && document.documentElement.classList.add('dark')\n		<\/script>", '</head> <body class="align-between bg-mauve text-darkSand flex h-screen flex-col p-4 pt-0 dark:bg-dark dark:text-darkText"> ', " ", ' <footer class="mt-auto w-full"> ', " </footer> </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "SecHeader", $$SecHeader, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/oxomoto/Desktop/projects/astro-sveltia/src/layouts/Layout.astro", void 0);

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/about/about.md": () => import('../about_CO5F_pH4.mjs'),"/src/content/authors/joe.md": () => import('../joe_DLDRU2DN.mjs'),"/src/content/now/now.md": () => import('../now_CUOnzMU4.mjs'),"/src/content/posts/test.md": () => import('../test_C4zkvqYA.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"authors":{"type":"content","entries":{"joe":"/src/content/authors/joe.md"}},"now":{"type":"content","entries":{"now":"/src/content/now/now.md"}},"posts":{"type":"content","entries":{"test":"/src/content/posts/test.md"}},"about":{"type":"content","entries":{"about":"/src/content/about/about.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/about/about.md": () => import('../about_BMxQadnS.mjs'),"/src/content/authors/joe.md": () => import('../joe_C6BiZdjg.mjs'),"/src/content/now/now.md": () => import('../now_TKax6x6j.mjs'),"/src/content/posts/test.md": () => import('../test_CcIX3Os-.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$1 = createAstro();
const $$Movies = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Movies;
  const api = process.env.APIURI;
  const token = process.env.APITOKEN;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const movies = await data.response;
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21)
      return "th";
    switch (day) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return renderTemplate`${maybeRenderHead()}<section class="movies flex flex-col pt-12"> <h2 class="underline">Last 5 movies</h2> <ul class="flex flex-wrap"> ${movies.length > 0 ? movies.map((m, i) => {
    const date = new Date(m.watchedOn);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const suffix = getOrdinalSuffix(day);
    const monthName = monthNames[month - 1];
    const humanReadableDate = `${day}${suffix} of ${monthName} ${date.getFullYear()}`;
    return i < 5 ? renderTemplate`<li class="flex w-[200px] flex-col flex-wrap  px-2 pb-8 first:pl-0 last:pr-0"${addAttribute(m.title, "title")}> <a class="h-[300px]"${addAttribute(m.link, "href")}> ${m.poster ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": m?.poster, "alt": m.title + `poster`, "width": 200, "height": 300 })}` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": "/public/assets/placeholder/pattern_checkerboard.png", "alt": "Checkerboard Pattern", "width": 200, "height": 300 })}`} </a> ${m.stars ? renderTemplate`<p class="h-6 font-bold">${m?.stars}</p>` : renderTemplate`<p class="h-6"> ${` `}</p>`} <a${addAttribute(m.link, "href")}> ${" "} <h3 class="inline-block">${m.title}</h3> </a> <p>${m.year}</p> <p class="text-sm">${humanReadableDate}</p> ${m?.stars === "★" || m.stars === "½" ? renderTemplate`<span class="text-primary-700 dark:text-darkSand inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none">
Avoid
</span>` : null} </li>` : null;
  }) : null} </ul> </section>`;
}, "/Users/oxomoto/Desktop/projects/astro-sveltia/src/components/Movies.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Now = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Now;
  const now = await getCollection("now");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "now page" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex flex-col gap-4 pt-4"> <section> <ul aria-label="about links"></ul> ${now[0].data.activities.map((a) => {
    return renderTemplate`<li>${a.activity}</li>`;
  })} </section> <section class="flex items-center justify-between"> ${renderComponent($$result2, "Movies", $$Movies, { "when:load": true })} </section> </main> ` })}`;
}, "/Users/oxomoto/Desktop/projects/astro-sveltia/src/pages/now.astro", void 0);

const $$file = "/Users/oxomoto/Desktop/projects/astro-sveltia/src/pages/now.astro";
const $$url = "/now";

const now = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Now,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, $$Nav as a, $$Footer as b, getCollection as g, now as n };
