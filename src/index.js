import VueEasyLightbox from './vue-easy-lightbox.vue'

VueEasyLightbox.install = function (Vue) {
  if (VueEasyLightbox.installed) return

  Vue.component(VueEasyLightbox.name, VueEasyLightbox)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueEasyLightbox)
}

export default VueEasyLightbox
