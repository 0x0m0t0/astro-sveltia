import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.CZ1fDSXH.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/X0JpEXVY.js","_app/immutable/chunks/BYUMDdvB.js","_app/immutable/chunks/xfLgTK4A.js","_app/immutable/chunks/BbfINOrt.js","_app/immutable/chunks/D--dvHR-.js","_app/immutable/chunks/bUTzJhUB.js"];
export const stylesheets = ["_app/immutable/assets/2.CKki1VHh.css"];
export const fonts = [];
