import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: mode !== "production",
    },
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      tailwindcss(),
      Components({
        resolvers: [
          PrimeVueResolver(),
          IconsResolver({
            prefix: "icon",
            alias: {
              mdi: "mdi-light",
            },
            enabledCollections: ["mdi"],
          }),
        ],
      }),

      // Enables icon component generation
      Icons({
        compiler: "vue3",
        autoInstall: true,
        defaultClass: "icon",
        scale: 1.2,
        defaultStyle: "display: inline-block;",
      }),

      AutoImport({
        // global imports to register
        imports: [
          // presets
          "vue",
          "vue-router",
        ],
        // generates type declarations for IDE autocomplete
        dts: "src/auto-imports.d.ts",
        // Enable auto-import inside Vue templates
        vueTemplate: true,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    optimizeDeps: {
      entries: ["./src/**/*.vue"],
    },
  };
});
