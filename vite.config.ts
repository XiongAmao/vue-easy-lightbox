/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

export default defineConfig({
  server: {
    port: 8888
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      // entry: resolve(__dirname, 'src/index.umd.ts'),
      entry: [],
      name: 'vue-easy-lightbox',
      formats: ['umd'],
      fileName: 'vue-easy-lightbox'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  // test: {
  //   globals: true,
  //   environment: 'happy-dom',
  //   transformMode: {
  //     web: [/\.[jt]sx$/]
  //   }
  // },
  plugins: [vue(), vueJsx()]
})
