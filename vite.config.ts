import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { type Plugin } from "vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [sveltify(), sveltekit(), tailwindcss(), svelteTesting()],
  server: {
    host: "127.0.0.1",
    port: 8080,
  },
  test: {
    // TODO: happy-dom is not working, but jsdom is (https://github.com/sveltejs/svelte/issues/10358)
    environment: "happy-dom", // This can probably be `node`, but getLocalStorageItem is infiltrating the tests
    environmentMatchGlobs: [["**/*.dom.test.{js,ts}", "happy-dom"]],
    globals: true,
    include: [
      "src/**/*.{test,spec}.{js,ts}",
      "scripts/**/*.{test,spec}.{js,ts}",
    ],
    setupFiles: "./tests/setup-env.ts",
  },
});

const virtualModuleId = "sveltify-plugin";
const resolvedVirtualModuleId = "\0" + virtualModuleId;
function sveltify(): Plugin {
  const virtualModulesMap = new Map();

  return {
    name: "sveltify-plugin",
    enforce: "pre",
    // resolveId(id) {
    //   if (id === virtualModuleId) {
    //     return resolvedVirtualModuleId;
    //   }
    //   return null;
    // },
    // load(id) {
    //   if (id === resolvedVirtualModuleId) {
    //     return "";
    //   }
    //   return null;
    // },

    resolveId(source) {
      if (virtualModulesMap.has(source)) {
        return source; // This tells Vite that we're handling this module ID
      }
      return null;
    },

    load(id) {
      if (virtualModulesMap.has(id)) {
        return virtualModulesMap.get(id); // Return the virtual module content
      }
      return null;
    },

    transform(code, id, options) {
      // Pull this searchString out into an option
      if (!id.endsWith(".dom.test.ts") && !id.endsWith(".dom.ts")) {
        return null;
      }

      const matches = [...code.matchAll(/sveltify\(`(.*?)`\)/gs)];
      if (matches.length === 0) {
        return null;
      }

      let transformedCode = code;
      matches.forEach((match, index) => {
        const [fullMatch, svelteContent] = match;

        // Register the Svelte component string as a virtual module
        const virtualModuleId = `virtual:sveltify-component-${path.basename(id)}-${index}.svelte`;
        virtualModulesMap.set(virtualModuleId, svelteContent);

        // Replace the sveltify call with a dynamic import to the virtual module
        // TODO: Should the `await` be at call site or generated in? Because the test needs to be async else it'll fail
        transformedCode = transformedCode.replace(
          fullMatch,
          `import("${virtualModuleId}")`,
        );
      });

      return {
        code: transformedCode,
        map: null, // TODO: Might be useful for debugging
      };
    },
  };
}
