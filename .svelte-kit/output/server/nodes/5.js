import * as server from '../entries/pages/now/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/now/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/now/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.lBjhlO5M.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/X0JpEXVY.js","_app/immutable/chunks/BbfINOrt.js","_app/immutable/chunks/D--dvHR-.js","_app/immutable/chunks/BYUMDdvB.js","_app/immutable/chunks/DpEsy7-c.js","_app/immutable/chunks/bUTzJhUB.js","_app/immutable/chunks/ma3jAdGW.js"];
export const stylesheets = ["_app/immutable/assets/5.CTev-xmx.css"];
export const fonts = [];
