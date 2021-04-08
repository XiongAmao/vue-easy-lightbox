import './types/tsx.shim'

import './styles/index'

import type { App } from 'vue'
import _VueEasyLightbox from './vue-easy-lightbox'

export type WithInstall<T> = T & {
  install(app: App): void
}

const VueEasyLightbox = _VueEasyLightbox as WithInstall<typeof _VueEasyLightbox>

VueEasyLightbox.install = (app: App) => {
  app.component(_VueEasyLightbox.name, _VueEasyLightbox)
}

export default VueEasyLightbox
