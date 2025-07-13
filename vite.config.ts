import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    ui({
      ui: {
        table: {
          slots: {
            root: 'relative overflow-auto bg-white rounded shadow',
            thead: 'sticky top-0 bg-gray-100',
            tbody: 'divide-y divide-gray-200',
            th: 'px-4 py-2 text-left font-semibold text-gray-700',
            td: 'px-4 py-2 text-gray-600 whitespace-nowrap',
            tr: 'hover:bg-gray-50',
          },
          variants: {
            sticky: {
              true: {
                thead: 'sticky top-0 bg-gray-100 shadow-sm',
              },
            },
          },
          defaultVariants: {
            sticky: true,
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
