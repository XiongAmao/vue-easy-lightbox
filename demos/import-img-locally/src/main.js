import Vue from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import App from './App.vue'

Vue.use(VueEasyLightbox)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
