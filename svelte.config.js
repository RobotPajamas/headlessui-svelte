import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // TODO: Need to investigate whether accessors and/or dev are necessary
  // compilerOptions: {
  //   accessors: true,
  //   dev: true,
  //   discloseVersion: false,
  //   runes: true,
  // },
  compilerOptions: {
    runes: true,
  },

  kit: {
    adapter: adapter(),
  },
  preprocess: vitePreprocess(),
};

export default config;
