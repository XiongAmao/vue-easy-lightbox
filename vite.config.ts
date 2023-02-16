/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig({
  server: {
    port: 8888
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/\.[jt]sx$/]
    }
  },
  plugins: [vue(), vueJsx()]
})
