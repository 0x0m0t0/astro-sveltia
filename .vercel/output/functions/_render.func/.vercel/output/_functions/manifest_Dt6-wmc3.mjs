import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_DGO1z0xe.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const m=document.getElementById(\"dark-mode-toggle\"),t=document.getElementById(\"moon\"),s=document.getElementById(\"sun\"),d=document.getElementById(\"system\"),n=()=>{const e=localStorage.getItem(\"theme\");return e||\"system\"},c=window.matchMedia(\"(prefers-color-scheme: dark)\").matches,a=e=>{e===\"light\"?(t?.classList.add(\"hidden\"),s?.classList.remove(\"hidden\"),d?.classList.add(\"hidden\")):e===\"dark\"?(t?.classList.remove(\"hidden\"),s?.classList.add(\"hidden\"),d?.classList.add(\"hidden\")):(t?.classList.add(\"hidden\"),s?.classList.add(\"hidden\"),d?.classList.remove(\"hidden\"))};if(m){const e=n();a(e),m.addEventListener(\"click\",()=>{const o=n();o===\"dark\"?(localStorage.setItem(\"theme\",\"light\"),document.documentElement.classList.remove(\"dark\")):o===\"light\"?(localStorage.setItem(\"theme\",\"system\"),c?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\")):(localStorage.setItem(\"theme\",\"dark\"),document.documentElement.classList.add(\"dark\")),a(n())})}\n"}],"styles":[{"type":"external","src":"/_astro/about.CF4xC1jH.css"},{"type":"external","src":"/_astro/index.DP-EPYFu.css"}],"routeData":{"route":"/now","isIndex":false,"type":"page","pattern":"^\\/now\\/?$","segments":[[{"content":"now","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/now.astro","pathname":"/now","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/oxomoto/Desktop/projects/astro-sveltia/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["/Users/oxomoto/Desktop/projects/astro-sveltia/src/pages/now.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/oxomoto/Desktop/projects/astro-sveltia/src/components/AboutContent.astro",{"propagation":"in-tree","containsHead":false}],["/Users/oxomoto/Desktop/projects/astro-sveltia/src/components/Header.astro",{"propagation":"in-tree","containsHead":false}],["/Users/oxomoto/Desktop/projects/astro-sveltia/src/layouts/HomeLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/oxomoto/Desktop/projects/astro-sveltia/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/now@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/oxomoto/Desktop/projects/astro-sveltia/src/pages/admin.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-manifest":"manifest_Dt6-wmc3.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_1rs4oAaZ.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_CO8Z77HM.mjs","\u0000@astro-page:src/pages/admin@_@astro":"chunks/admin_Tlp90CJj.mjs","\u0000@astro-page:src/pages/now@_@astro":"chunks/now_D_I0m6yN.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DIoRcB0m.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/about/about.md?astroContentCollectionEntry=true":"chunks/about_CO5F_pH4.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/authors/joe.md?astroContentCollectionEntry=true":"chunks/joe_DLDRU2DN.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/now/now.md?astroContentCollectionEntry=true":"chunks/now_CUOnzMU4.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/posts/test.md?astroContentCollectionEntry=true":"chunks/test_C4zkvqYA.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/about/about.md?astroPropagatedAssets":"chunks/about_BMxQadnS.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/authors/joe.md?astroPropagatedAssets":"chunks/joe_C6BiZdjg.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/now/now.md?astroPropagatedAssets":"chunks/now_TKax6x6j.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/posts/test.md?astroPropagatedAssets":"chunks/test_CcIX3Os-.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/about/about.md":"chunks/about_yxBr2PHB.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/authors/joe.md":"chunks/joe_CAd8zMWd.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/now/now.md":"chunks/now_zGc4OnxH.mjs","/Users/oxomoto/Desktop/projects/astro-sveltia/src/content/posts/test.md":"chunks/test_DY5ygAS-.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DEi-TXAe.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/about.CF4xC1jH.css","/_astro/index.DP-EPYFu.css","/favicon.svg","/admin/config.yml","/assets/fonts/mariupol-regular-webfont.woff","/assets/fonts/mariupol-regular-webfont.woff2","/assets/placeholder/pattern_checkerboard.png","/images/uploads/BIT_MAP_RETINA.png","/images/uploads/image.jpg","/about/index.html","/admin/index.html","/index.html"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
