import "clsx";
import { a as attr_class, b as attr, e as escape_html, s as stringify, c as attr_style, d as ensure_array_like } from "../../chunks/renderer.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
function Contact($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", marginY = "my-10" } = $$props;
    let name = "";
    let email = "";
    let message = "";
    let submitting = false;
    $$renderer2.push(`<button id="open-modal" data-track="Contact Form Open"${attr_class(`bg-mauve dark:bg-dark z-10 ${stringify(marginY)} max-w-80 cursor-pointer rounded border p-2 text-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${stringify(className)}`, "svelte-wt4tt0")}>Get in touch</button> <dialog class="bg-dark dark:bg-mauve rounded-md border text-green-500 svelte-wt4tt0"><form><h2 class="my-10 text-center">Get in touch or just say hello</h2> <div class="form-group svelte-wt4tt0"><label for="name" class="svelte-wt4tt0">( name )</label> <input class="border svelte-wt4tt0" type="text" id="name" name="name"${attr("value", name)} required=""/></div> <div class="form-group svelte-wt4tt0"><label for="email" class="svelte-wt4tt0">( email )</label> <input class="border svelte-wt4tt0" type="email" id="email" name="email"${attr("value", email)} required=""/></div> <div class="form-group svelte-wt4tt0"><label for="message" class="svelte-wt4tt0">( message )</label> <textarea class="border svelte-wt4tt0" id="message" name="message"${attr("rows", 4)} required="">`);
    const $$body = escape_html(message);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="form-actions svelte-wt4tt0"><button type="button" class="btn-secondary border svelte-wt4tt0">Cancel</button> <button type="submit" class="btn-primary border bg-green-500/40 dark:bg-green-500/40 svelte-wt4tt0"${attr("disabled", submitting, true)}>${escape_html("Send Message")}</button></div></form></dialog>`);
  });
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const links = [
      { path: "/", label: "index" },
      { path: "/info", label: "info" },
      { path: "/now", label: "now" }
    ];
    let menuOpen = false;
    $$renderer2.push(`<header class="sticky top-2 z-100 flex w-full justify-center svelte-1elxaub"><nav class="bg-mauve dark:bg-dark relative flex w-80 flex-wrap justify-between rounded-md border px-4 svelte-1elxaub"><div class="flex w-full items-center justify-between svelte-1elxaub"><a href="/" class="w-1/3 cursor-pointer p-2 text-center svelte-1elxaub">oxomoto</a> <button id="togglez"${attr_class("w-1/3 cursor-pointer p-2 svelte-1elxaub", void 0, { "show": menuOpen })} aria-label="Menu" data-track="Menu open"><svg width="15" height="7" viewBox="0 0 15 7" fill="none" xmlns="http://www.w3.org/2000/svg" class="hamburger m-auto h-6 w-6 cursor-pointer"><path d="M0 0.5H15M0 3.5H15M0 6.5H15"></path></svg></button></div> <div id="navz" class="bg-mauve dark:bg-dark fixed left-1/2 w-80 -translate-x-1/2 transform overflow-hidden rounded-b-md border border-t-0 transition-all duration-300 ease-in-out svelte-1elxaub"${attr_style(`top: calc(var(--nav-height, 48px) + 0.1rem); max-height: ${stringify("0")}; opacity: ${stringify("0")};`)}><div class="flex flex-col gap-1 p-4 svelte-1elxaub"><!--[-->`);
    const each_array = ensure_array_like(links);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let l = each_array[i];
      $$renderer2.push(`<a${attr("href", l.path)} class="btn w-full rounded-md p-3 text-center svelte-1elxaub"${attr_style(`--order: ${stringify(i)};`)}>${escape_html(l.label)}</a>`);
    }
    $$renderer2.push(`<!--]--> `);
    Contact($$renderer2, { marginY: "my-1" });
    $$renderer2.push(`<!----></div></div></nav></header>`);
  });
}
function Darkmode($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", style = "" } = $$props;
    $$renderer2.push(`<div id="dark-mode-toggle"${attr_style(style)}${attr_class(`bg-mauve dark:bg-dark w-80 flex justify-center rounded-md border p-2 px-4 hover:cursor-pointer ${stringify(className)}`)} role="button" tabindex="0">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p>theme: system</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Footer($$renderer) {
  $$renderer.push(`<footer class="text-s mt-auto flex flex-col items-center gap-4">`);
  Darkmode($$renderer, { class: "mt-20" });
  $$renderer.push(`<!----> <p class="pb-4 text-center text-xs">no cookies.</p></footer>`);
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    $$renderer2.push(`<div class="bg-mauve text-darkSand dark:bg-dark dark:text-darkText flex flex-grow flex-col">`);
    Header($$renderer2);
    $$renderer2.push(`<!----> `);
    children($$renderer2);
    $$renderer2.push(`<!----> `);
    Footer($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _layout as default
};
