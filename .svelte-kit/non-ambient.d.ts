
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/contact" | "/info" | "/log" | "/now";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/contact": Record<string, never>;
			"/info": Record<string, never>;
			"/log": Record<string, never>;
			"/now": Record<string, never>
		};
		Pathname(): "/" | "/api/contact" | "/info" | "/log" | "/now";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/_headers" | "/admin/config.json" | "/admin/index.html" | "/admin/oldconfig.yml" | "/assets/.DS_Store" | "/assets/fonts/mariupol-regular-webfont.woff" | "/assets/fonts/mariupol-regular-webfont.woff2" | "/assets/media/.DS_Store" | "/assets/media/MDC_019_gistel_005_LR-1250x1536.jpg" | "/assets/media/POSTER_fresh_new_wouter-1449x2048.jpg" | "/assets/media/basilica-site.jpg" | "/assets/media/franzel-site.jpg" | "/assets/media/lazimari.jpg" | "/assets/media/reservoir-smallres.jpg" | "/assets/media/reservoir019.jpg" | "/assets/media/test.png" | "/assets/media/wouter_paijmans.jpg" | "/assets/placeholder/pattern_checkerboard.png" | "/assets/test/testdata.json" | "/images/.DS_Store" | "/images/socials/favicon.svg" | "/images/socials/oxomoto_opengraph.png" | string & {};
	}
}