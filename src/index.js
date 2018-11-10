import vueEasyLightbox from './index.vue'

vueEasyLightbox.install = function (Vue) {
  if (vueEasyLightbox.installed) return

  Vue.component(vueEasyLightbox.name, vueEasyLightbox)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueEasyLightbox)
}

export default vueEasyLightbox
