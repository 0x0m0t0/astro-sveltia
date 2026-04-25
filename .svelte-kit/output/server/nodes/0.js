import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CGt761Be.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xfLgTK4A.js","_app/immutable/chunks/X0JpEXVY.js","_app/immutable/chunks/BbfINOrt.js","_app/immutable/chunks/D--dvHR-.js","_app/immutable/chunks/bUTzJhUB.js","_app/immutable/chunks/CGfC2kHw.js","_app/immutable/chunks/GU5Y7YZB.js","_app/immutable/chunks/ma3jAdGW.js","_app/immutable/chunks/B037S7ni.js"];
export const stylesheets = ["_app/immutable/assets/0.D6DMpw9U.css"];
export const fonts = [];
