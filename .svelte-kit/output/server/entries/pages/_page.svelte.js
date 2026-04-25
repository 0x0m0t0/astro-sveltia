import { d as ensure_array_like, e as escape_html, a4 as derived, b as attr, a as attr_class, s as stringify, a5 as head } from "../../chunks/renderer.js";
function Select($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let options = derived(() => () => {
      const tagSet = /* @__PURE__ */ new Set(["selected"]);
      data.forEach((item) => {
        if (Array.isArray(item.tags)) {
          item.tags.forEach((tag) => tagSet.add(tag));
        }
      });
      return Array.from(tagSet);
    });
    $$renderer2.push(`<select id="tag-filter" aria-label="Filter by category" class="bg-mauve dark:bg-dark sticky z-10 my-10 max-w-80 rounded border p-2 text-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] md:w-[50vw]">`);
    $$renderer2.option({ value: "selected" }, ($$renderer3) => {
      $$renderer3.push(`selected work`);
    });
    $$renderer2.push(`<!--[-->`);
    const each_array = ensure_array_like(options()());
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      if (item !== "selected") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.option({ value: item }, ($$renderer3) => {
          $$renderer3.push(`${escape_html(item)}`);
        });
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></select>`);
  });
}
function Work($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { projects } = $$props;
    let visibleProjects = derived(
      () => projects
    );
    $$renderer2.push(`<section class="work-section mt-20 flex w-full flex-col items-center">`);
    Select($$renderer2, {
      data: (
        // Re-run observer when visible projects change
        // Use microtask to wait for DOM update
        projects
      )
    });
    $$renderer2.push(`<!----> <ul class="flex max-w-6xl flex-col gap-20"><!--[-->`);
    const each_array = ensure_array_like(visibleProjects());
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let p = each_array[$$index_1];
      $$renderer2.push(`<li${attr("data-tags", p.tags ? p.tags.join(",") : "")} class="work-item projects flex w-full flex-col items-center justify-end pb-8 transition-all duration-500 ease-out svelte-17ndl8v"><div class="parent-element project-images mb-4 flex w-full max-w-full basis-auto flex-col items-end justify-center gap-4 transition-all duration-700 ease-out md:flex-row svelte-17ndl8v"><!--[-->`);
      const each_array_1 = ensure_array_like(p.images);
      for (let index = 0, $$length2 = each_array_1.length; index < $$length2; index++) {
        let media = each_array_1[index];
        $$renderer2.push(`<div${attr_class(`relative flex ${stringify(p.images.length === 1 ? "mx-auto w-full" : "flex-1")} group`)}>`);
        if (p.link) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<a${attr("href", p.link)} target="_blank" rel="noopener"${attr("data-track", p.title)}><img${attr("src", "/assets/media" + media.image)}${attr("alt", `${stringify(media.alt)} - image ${stringify(index + 1)}`)}${attr("width", 1200)}${attr("height", 600)} class="h-auto w-full rounded-md object-contain transition-all duration-700"${attr("loading", index === 0 ? "eager" : "lazy")} decoding="async"/> <span class="extlink text-darkSand/70 m-1 hidden rounded bg-white/40 px-4 py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block svelte-17ndl8v">view project ↗</span></a>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<img${attr("src", "/assets/media" + media.image)}${attr("alt", `${stringify(media.alt)} - image ${stringify(index + 1)}`)}${attr("width", 1200)}${attr("height", 600)} class="h-auto w-full rounded-md object-contain transition-all duration-700"${attr("loading", index === 0 ? "eager" : "lazy")} decoding="async"/>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="flex w-full flex-col items-center gap-2 px-1"><div class="bg-mauve dark:bg-dark sticky bottom-10 z-10 w-full max-w-6xl rounded border p-2 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"><h3 class="text-center">${escape_html(p.title)}</h3> <p class="pt-1 text-center leading-4">${escape_html(p.description)}</p></div> `);
      if (p.link) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<a class="mobile-link inline-block w-45 rounded border px-8 py-2 text-center hover:bg-white/40 md:hidden svelte-17ndl8v"${attr("href", p.link)} target="_blank" rel="noopener"${attr("data-track", p.title)}>view project ↗</a>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></li>`);
    }
    $$renderer2.push(`<!--]--></ul></section>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>oxomoto</title>`);
      });
      $$renderer3.push(`<meta name="description" content="oxomoto is a web developer and designer based in Brussels, Belgium. Graphic design, web development, typography, ux/ui design and branding."/> <meta property="og:title" content="oxomoto web developer and graphic designer"/> <meta property="og:type" content="website"/> <meta name="twitter:creator" content="@oxomoto"/>`);
    });
    $$renderer2.push(`<main class="flex flex-col"><p class="desc prose rounded-md border p-4 svelte-1uha8ag">Freelance webdeveloper &amp; graphic designer, based in Brussels, Belgium.</p> `);
    Work($$renderer2, { projects: data.projects });
    $$renderer2.push(`<!----></main> <a rel="me" class="hidden" href="https://indieweb.social/@oxomoto">Mastodon</a>`);
  });
}
export {
  _page as default
};
