import { a6 as bind_props, e as escape_html, b as attr, a5 as head } from "../../../chunks/renderer.js";
import "clsx";
function Lightbox($$renderer, $$props) {
  let lightboxOpen = false;
  let lightboxImages = [];
  let lightboxIndex = 0;
  let lightboxImage = "";
  let lightboxAlt = "";
  function open(images, index) {
    lightboxImages = images;
    lightboxIndex = index;
    lightboxImage = images[index].src;
    lightboxAlt = images[index].alt;
    lightboxOpen = true;
    document.body.style.overflow = "hidden";
  }
  if (lightboxOpen) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95" role="button" tabindex="0"><button class="absolute top-4 right-4 z-[100000] text-white text-3xl hover:text-gray-300" aria-label="Close">×</button> `);
    if (lightboxImages.length > 1) {
      $$renderer.push("<!--[0-->");
      $$renderer.push(`<button class="absolute left-4 top-1/2 -translate-y-1/2 z-[100000] text-white text-3xl hover:text-gray-300" aria-label="Previous">←</button> <button class="absolute right-4 top-1/2 -translate-y-1/2 z-[100000] text-white text-3xl hover:text-gray-300" aria-label="Next">→</button> <span class="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100000] text-white text-sm">${escape_html(lightboxIndex + 1)} / ${escape_html(lightboxImages.length)}</span>`);
    } else {
      $$renderer.push("<!--[-1-->");
    }
    $$renderer.push(`<!--]--> <div role="presentation"><img${attr("src", lightboxImage)}${attr("alt", lightboxAlt)} class="max-h-[90vh] max-w-[90vw] object-contain"/></div></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, { open });
}
function MemosLog($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Lightbox($$renderer2, {});
    $$renderer2.push(`<!----> <div class="flex flex-col w-full gap-2 items-center">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="text-gray-500">Loading...</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  head("b2zgdd", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Log — oxomoto</title>`);
    });
  });
  $$renderer.push(`<main class="flex h-full flex-col items-center gap-4 px-4"><section class="h-full w-full max-w-5xl">`);
  MemosLog($$renderer);
  $$renderer.push(`<!----></section></main>`);
}
export {
  _page as default
};
