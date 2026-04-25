import * as server from '../entries/pages/info/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/info/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/info/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.C_IshfcE.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/X0JpEXVY.js","_app/immutable/chunks/D--dvHR-.js","_app/immutable/chunks/BYUMDdvB.js"];
export const stylesheets = ["_app/immutable/assets/3.CrLSbkZv.css"];
export const fonts = [];
