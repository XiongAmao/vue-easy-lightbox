import './styles/index'
import type { App } from 'vue'
import _VueEasyLightBox from './vue-easy-lightbox'

export type WithInstall<T> = T & {
  install(app: App): void
}

const VueEasyLightBox = _VueEasyLightBox as WithInstall<typeof _VueEasyLightBox>

VueEasyLightBox.install =  (app: App) => {
  app.component(_VueEasyLightBox.name, _VueEasyLightBox)
}

export default VueEasyLightBox
