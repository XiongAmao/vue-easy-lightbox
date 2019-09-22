import VueEasyLightbox from './vue-easy-lightbox.vue'
import Vue from 'vue'
import { Install } from './types/index'

const install: Install = (
  vue: typeof Vue
) => {
  // Terser plugin break VueEasylightbox.name, I didn't find solution yet.
  // So use constants here.
  vue.component('vue-easy-lightbox', VueEasyLightbox)
}

VueEasyLightbox.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueEasyLightbox.install)
}

export default VueEasyLightbox
