<template>
  <div>
    <button @click="() => visible = true">show</button>
    <vue-easy-lightbox
      :visible="visible"
      :imgs="imgs"
      @hide="() => visible = false"
    >
      <template #toolbar="{ toolbarMethods }">
        <button @click="toolbarMethods.zoomIn">zoom in</button>
        <button @click="toolbarMethods.zoomOut">zoom out</button>
        <button @click="toolbarMethods.rotateLeft">Anticlockwise rotation</button>
        <button @click="toolbarMethods.rotateRight">clockwise rotation</button>
      </template>
    </vue-easy-lightbox>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import VueEasyLightbox from '../index'

  export default defineComponent({
    components: {
      VueEasyLightbox
    },
    data() {
      return {
        imgs: [
          {
            title: "img's url: https://i.loli.net/2018/11/10/5be6852cdb002.jpeg",
            src: ' https://i.loli.net/2018/11/10/5be6852cdb002.jpeg'
          },
          {
            title: "There is img's description",
            src: 'https://i.loli.net/2018/11/10/5be6852ce6965.jpeg'
          },
          'https://i.loli.net/2018/11/10/5be6852dec46e.jpeg',
          'https://i.loli.net/2018/11/10/5be6852e1366d.jpeg',
          'https://i.loli.net/2018/11/10/5be6852e33f19.jpeg',
          'https://i.loli.net/2018/11/10/5be6852dec46e.jpeg',
          'https://i.loli.net/2018/11/10/5be6852e1366d.jpeg',
          'https://i.loli.net/2018/11/10/5be6852e33f19.jpeg',
          'https://example.com/asdf.jpeg'
        ],
        visible: false,
        index: 0 // default
      }
    }
  })
</script>
