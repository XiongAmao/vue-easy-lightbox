import './styles/index'
import type { App } from 'vue'
import _VueEasyLightBox from './vue-easy-lightbox.vue'

type MergeInstall<T> = T & {
  install(app: App): void
}
const VueEasyLightBox: MergeInstall<typeof _VueEasyLightBox> = _VueEasyLightBox

VueEasyLightBox.install = (app) => {
  app.component(VueEasyLightBox.name, VueEasyLightBox)
}

export default VueEasyLightBox
