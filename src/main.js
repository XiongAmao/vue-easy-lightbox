import VueEasyLightbox from './components/Lightbox.vue'

const Lightbox = {
  installed: false,
  install (Vue, opt = {}) {
    if (Lightbox.installed) return

    Vue.component('vue-easy-lightbox', VueEasyLightbox)

    Lightbox.installed = true
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Lightbox)
}

export default Lightbox
