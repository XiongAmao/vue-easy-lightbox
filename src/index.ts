import VueEasyLightbox from './vue-easy-lightbox.vue'
import Vue from 'vue'
import { Install } from './types/index'

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
