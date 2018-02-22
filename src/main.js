import Lightbox from './components/Lightbox.vue'

Lightbox.install = function(Vue) {
  Vue.component('vue-easy-lightbox', Lightbox)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Lightbox)
}

export default Lightbox
