import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    }),
    AutoImport({
      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router'
      ],
      // generates type declarations for IDE autocomplete
      dts: 'src/auto-imports.d.ts',
      // Enable auto-import inside Vue templates
      vueTemplate: true,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
