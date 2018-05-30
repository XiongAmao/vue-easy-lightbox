import Lightbox from './components/Lightbox.vue'

Lightbox.installed = false

Lightbox.install = function (Vue) {
  if (Lightbox.installed) return

  Vue.component('vue-easy-lightbox', Lightbox)

  Lightbox.installed = true
}


if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Lightbox)
}

export default Lightbox
