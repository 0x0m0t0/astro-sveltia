import { a5 as head, e as escape_html, d as ensure_array_like, b as attr } from "../../../chunks/renderer.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1r7g8g9", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>info — oxomoto</title>`);
      });
    });
    $$renderer2.push(`<main class="flex h-full flex-grow flex-col items-center justify-between p-4"><section class="flex max-w-2xl flex-col gap-2"><div class="flex w-80 flex-col items-center gap-4"><h2 class="bg-dark/10 w-80 rounded-md p-2 text-center dark:bg-white/10">info</h2> <div class="flex w-full flex-col gap-4"><p>${escape_html(data.info.body)} <span class="relative inline-flex h-3 w-3"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-80"></span> <span class="relative inline-flex h-3 w-3 rounded-full bg-green-300"></span></span></p> <p>For inquiries get in touch at ↗ <a href="mailto:i%6efo@oxomoto%2eco" class="mail svelte-1r7g8g9">info <span class="at svelte-1r7g8g9"></span> <span class="dom svelte-1r7g8g9"></span></a></p></div></div> <div class="mt-10 flex flex-col items-center gap-4"><h3 class="bg-dark/10 w-80 rounded-md p-2 text-center dark:bg-white/10">Links</h3> <ul class="links flex w-full flex-col items-center gap-2 svelte-1r7g8g9" aria-label="about links"><!--[-->`);
    const each_array = ensure_array_like(data.info.links);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<li class="w-80 rounded-md border p-2 text-center svelte-1r7g8g9"><a${attr("href", link.url)} class="hover:text-darkSand hover:underline">${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div class="mt-10 flex flex-col items-center gap-4"><h3 class="bg-dark/10 w-80 rounded-md p-2 text-center dark:bg-white/10">Services</h3> <ul class="services flex w-full flex-col items-center gap-2 svelte-1r7g8g9" aria-label="services"><!--[-->`);
    const each_array_1 = ensure_array_like(data.info.services);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let service = each_array_1[$$index_1];
      $$renderer2.push(`<li class="w-80 p-2 text-center svelte-1r7g8g9">${escape_html(service)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></section></main>`);
  });
}
export {
  _page as default
};
