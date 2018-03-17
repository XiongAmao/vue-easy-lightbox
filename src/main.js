import Lightbox from './components/Lightbox.vue'

const install = function(Vue, opt = {}) {
  if (install.installed) return;

  Vue.component('vue-easy-lightbox', Lightbox);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Lightbox);
}

export default {
  install,
  Lightbox
}
