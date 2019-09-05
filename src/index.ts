import VueEasyLightbox from './vue-easy-lightbox.vue'
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
type Install = (vue: typeof Vue) => void

const install: Install = (
  vue: typeof Vue
) => {
  vue.component(VueEasyLightbox.name, VueEasyLightbox)
}

VueEasyLightbox.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueEasyLightbox.install)
}

export default VueEasyLightbox
