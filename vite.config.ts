/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

export default defineConfig(() => {
  return {
    server: {
      port: 8888
    },
    plugins: [vue(), vueJsx()],
    envDir: resolve(__dirname, './.env')
  }
})
