import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";

const base = process.env.BASE_PATH ?? "";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: "404.html"
		}),
		paths: {
			base
		}
	},
	preprocess: [mdsvex()],
	extensions: [".svelte", ".svx"]
};

export default config;
