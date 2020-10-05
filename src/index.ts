import type { App } from 'vue'
import VueEasyLightbox from './vue-easy-lightbox.vue'

export const install = (app: App): void => {
  app.component(VueEasyLightbox.name, VueEasyLightbox)
}

VueEasyLightbox.install = install

export default VueEasyLightbox
