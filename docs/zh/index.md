---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vue-easy-lightbox"
  tagline: A Vue.js 3.0 image lightbox component with Zoom / Drag / Rotate / Switch .
  actions:
    - theme: brand
      text: 快速上手 →
      link: /zh/guide/index.html

---

## 简单例子

<ClientOnly>
  <HomepageDemo />
</ClientOnly>


<script setup>
import HomepageDemo from '../components/HomepageDemo.vue'
</script>
