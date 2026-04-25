import { b as attr, e as escape_html, d as ensure_array_like, a as attr_class, s as stringify, a4 as derived, a5 as head } from "../../../chunks/renderer.js";
function getFileUrl(name, filename, apiUrl = "") {
  return `${apiUrl}/file/${name}/${filename}`;
}
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function extractTags(content) {
  const matches = content.match(/#([a-zA-Z0-9_一-龥]+)/g);
  return matches ? [...new Set(matches.map((t) => t.slice(1)))] : [];
}
function isImage(attachment) {
  const exts = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"];
  return exts.some((ext) => attachment.filename.toLowerCase().endsWith(ext));
}
function isVideo(attachment) {
  const exts = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
  return exts.some((ext) => attachment.filename.toLowerCase().endsWith(ext));
}
function getAttachmentType(attachment) {
  if (isImage(attachment)) return "image";
  if (isVideo(attachment)) return "video";
  return "other";
}
function hasLocation(memo) {
  return !!(memo.location && (memo.location.placeholder || memo.location.latitude && memo.location.longitude));
}
function MemoCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { memo, selectedTags, apiUrl = "" } = $$props;
    let tags = derived(() => memo.tags || extractTags(memo.content));
    let images = derived(() => (memo.attachments || []).filter(isImage).map((a) => ({ src: getFileUrl(a.name, a.filename, apiUrl), alt: a.filename })));
    $$renderer2.push(`<article class="bg-white dark:bg-white/5 transition-colors duration-500 p-2 border-b border-darkSand/10 dark:border-darkText/10"${attr("data-memo-id", memo.name || memo.uid)}><p class="text-base leading-relaxed whitespace-pre-wrap">${escape_html(memo.content)}</p> `);
    if (tags().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array = ensure_array_like(tags());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer2.push(`<button${attr_class(`text-xs px-2 py-0.5 rounded-full transition-colors ${stringify(selectedTags.includes(tag) ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50")}`)}>#${escape_html(tag)}</button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (memo.attachments?.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex flex-wrap gap-4"><!--[-->`);
      const each_array_1 = ensure_array_like(memo.attachments);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let attachment = each_array_1[$$index_1];
        const src = getFileUrl(attachment.name, attachment.filename, apiUrl);
        const type = getAttachmentType(attachment);
        if (type === "image") {
          $$renderer2.push("<!--[0-->");
          images().findIndex((img) => img.src === src);
          $$renderer2.push(`<button type="button" class="block rounded overflow-hidden hover:opacity-90 transition-opacity"><img${attr("src", src)}${attr("alt", attachment.filename)}${attr_class(`${stringify(images().length === 1 ? "" : "max-h-48")} rounded object-cover`)}/></button>`);
        } else if (type === "video") {
          $$renderer2.push("<!--[1-->");
          $$renderer2.push(`<video${attr("src", src)} controls="" class="max-h-64 rounded" preload="metadata"><track kind="captions"/></video>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<a${attr("href", src)}${attr("download", attachment.filename)} class="inline-flex items-center gap-2 text-sm px-3 py-2 rounded bg-darkSand/10 hover:bg-darkSand/20 dark:bg-darkText/10 dark:hover:bg-darkText/20"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> ${escape_html(attachment.filename)}</a>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400"><time class="mt-2">${escape_html(formatDate(memo.displayTime || memo.createTime))}</time> `);
    if (hasLocation(memo) && memo.location) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> `);
      if (memo.location.placeholder) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p>${escape_html(memo.location.placeholder)}</p> <button type="button" class="hover:text-darkSand dark:hover:text-darkText transition-colors" aria-label="Copy address">`);
        {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path><path d="M16 4h2a2 2 0 0 1 2 2v4"></path><path d="M21 14H11"></path><path d="m15 10-4 4 4 4"></path></svg>`);
        }
        $$renderer2.push(`<!--]--></button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></article>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
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
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th";
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
    head("1hd9bsn", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Now — oxomoto</title>`);
      });
    });
    $$renderer2.push(`<main class="flex h-full flex-col items-center gap-4 px-0 md:px-4"><section class="w-80"><h2 class="bg-dark/10 my-4 w-full rounded-md p-2 text-center dark:bg-white/10">Now</h2> <ul aria-label="now activities" class="now svelte-1hd9bsn"><!--[-->`);
    const each_array = ensure_array_like(data.activities);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let a = each_array[$$index];
      $$renderer2.push(`<li class="svelte-1hd9bsn">${escape_html(a.activity)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></section> <section class="w-80"><h2 class="bg-dark/10 my-4 w-full rounded-md p-2 text-center dark:bg-white/10">Log</h2> `);
    if (data.latestMemo) {
      $$renderer2.push("<!--[0-->");
      MemoCard($$renderer2, {
        memo: data.latestMemo,
        selectedTags: [],
        apiUrl: data.memosApiUrl
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <a class="text-xs svelte-1hd9bsn" href="/log">view more</a></section> <section class="flex w-80 flex-col items-center justify-between"><h2 class="bg-dark/10 my-4 w-full rounded-md p-2 text-center dark:bg-white/10">Films</h2> <article class="flex flex-col w-full"><div class="flex gap-2 pb-2"><p class="bg-dark/10 w-full rounded-md p-2 text-center dark:bg-white/10 svelte-1hd9bsn">Last logged on <a data-track="letterboxd" href="https://letterboxd.com/oxomoto/" rel="noopener" class="underline svelte-1hd9bsn">letterboxd</a></p></div> <ul class="flex flex-wrap gap-4"><!--[-->`);
    const each_array_1 = ensure_array_like(data.movies);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let m = each_array_1[$$index_1];
      const date = new Date(m.watchedOn);
      const day = date.getDate();
      const suffix = getOrdinalSuffix(day);
      const monthName = monthNames[date.getMonth()];
      const humanReadableDate = `${day}${suffix} of ${monthName} ${date.getFullYear()}`;
      $$renderer2.push(`<li class="movie flex flex-col flex-wrap pb-8 svelte-1hd9bsn"${attr("title", m.title)}><a${attr("href", m.link)} class="svelte-1hd9bsn">`);
      if (m.poster) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<img${attr("src", m.poster)}${attr("alt", `${stringify(m.title)} poster`)}${attr("width", 200)}${attr("height", 300)} class="aspect-2/3 rounded-sm object-cover"/>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<img src="/assets/placeholder/pattern_checkerboard.png" alt="Checkerboard Pattern"${attr("width", 200)}${attr("height", 300)} class="aspect-2/3 rounded-sm"/>`);
      }
      $$renderer2.push(`<!--]--></a> `);
      if (m.stars) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p class="h-6 pt-1 font-bold svelte-1hd9bsn">${escape_html(m.stars)}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<p class="h-6 pt-1 svelte-1hd9bsn"> </p>`);
      }
      $$renderer2.push(`<!--]--> <a${attr("href", m.link)} class="svelte-1hd9bsn"><h3>${escape_html(m.title)}</h3></a> <p class="svelte-1hd9bsn">${escape_html(m.year)}</p> <p class="text-xs md:text-sm svelte-1hd9bsn">${escape_html(humanReadableDate)}</p> `);
      if (m.stars === "★" || m.stars === "½") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="inline-block rounded-[0.27rem] bg-red-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-xs leading-none font-bold whitespace-nowrap">Avoid</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></li>`);
    }
    $$renderer2.push(`<!--]--></ul></article></section></main>`);
  });
}
export {
  _page as default
};
