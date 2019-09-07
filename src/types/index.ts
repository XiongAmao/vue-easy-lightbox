import Vue from 'vue'

declare global {
  interface Window {
    Vue: typeof Vue
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    install: Install
  }
}

export type Install = (vue: typeof Vue) => void
