export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","_headers","admin/config.json","admin/index.html","admin/oldconfig.yml","assets/.DS_Store","assets/fonts/mariupol-regular-webfont.woff","assets/fonts/mariupol-regular-webfont.woff2","assets/media/.DS_Store","assets/media/MDC_019_gistel_005_LR-1250x1536.jpg","assets/media/POSTER_fresh_new_wouter-1449x2048.jpg","assets/media/basilica-site.jpg","assets/media/franzel-site.jpg","assets/media/lazimari.jpg","assets/media/reservoir-smallres.jpg","assets/media/reservoir019.jpg","assets/media/test.png","assets/media/wouter_paijmans.jpg","assets/placeholder/pattern_checkerboard.png","assets/test/testdata.json","images/.DS_Store","images/socials/favicon.svg","images/socials/oxomoto_opengraph.png"]),
	mimeTypes: {".json":"application/json",".html":"text/html",".yml":"text/yaml",".woff":"font/woff",".woff2":"font/woff2",".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.DXuogg3Z.js",app:"_app/immutable/entry/app.DWyyt1Ga.js",imports:["_app/immutable/entry/start.DXuogg3Z.js","_app/immutable/chunks/B037S7ni.js","_app/immutable/chunks/xfLgTK4A.js","_app/immutable/chunks/X0JpEXVY.js","_app/immutable/entry/app.DWyyt1Ga.js","_app/immutable/chunks/X0JpEXVY.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/xfLgTK4A.js","_app/immutable/chunks/BbfINOrt.js","_app/immutable/chunks/CGfC2kHw.js","_app/immutable/chunks/ma3jAdGW.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/contact",
				pattern: /^\/api\/contact\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/contact/_server.ts.js'))
			},
			{
				id: "/info",
				pattern: /^\/info\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/log",
				pattern: /^\/log\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/now",
				pattern: /^\/now\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
