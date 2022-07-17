<template>
  <div>
    <button @click="showSingle">Show single picture.</button>
    <button @click="showMultiple">Show a group of pictures.</button>

    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEasyLightbox } from '../composables'
import VueEasyLightbox from '../index'

export default defineComponent({
  components: {
    VueEasyLightbox
  },
  setup() {
    const { visibleRef, indexRef, imgsRef, show, changeIndex, onHide } =
      useEasyLightbox({
        imgs: []
      })

    const showSingle = () => {
      imgsRef.value = 'http://via.placeholder.com/350x150'
      show()
    }
    const showMultiple = () => {
      imgsRef.value = [
        'http://via.placeholder.com/350x150',
        'http://via.placeholder.com/350x150'
      ]
      changeIndex()
      show()
    }

    return {
      visibleRef,
      indexRef,
      imgsRef,
      showSingle,
      showMultiple,
      onHide
    }
  }
})
</script>
