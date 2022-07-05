<template>
  <div class="container">
    <div class="gallery">
      <div
        v-for="(img, idx) in imgs"
        :key="idx"
        class="pic"
        @click="() => onShow(idx)"
      >
        <img :src="img.src ? img.src : img" />
      </div>
    </div>

    <client-only>
      <vue-easy-lightbox
        :visible="visibleRef"
        :index="indexRef"
        :imgs="imgs"
        @hide="onHide"
        @on-prev="onPrev"
        @on-next="onNext"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

// import VueEasyLightbox from 'vue-easy-lightbox'

/**
 * register component here or /plugins/vue-easy-lightbox.client.ts
 **/

export default defineComponent({
  name: 'App',
  components: {
    // VueEasyLightbox
  },
  setup() {
    const visibleRef = ref(false)
    const indexRef = ref(0)
    const imgs = reactive([
      'https://via.placeholder.com/250.png/09f/fff?text=first+img',
      'https://via.placeholder.com/250.png/09f/fff?text=second+img',
      'https://via.placeholder.com/250.png/09f/fff?text=third+img'
    ])

    const onPrev = (oldIndex: number, newIndex: number) => {
      console.log('when next btn click ----')
      console.log('oldIndex of imgs:', oldIndex)
      console.log('newIndex of imgs:', newIndex)
    }
    const onNext = (oldIndex: number, newIndex: number) => {
      console.log('when next btn click ----')
      console.log('oldIndex of imgs:', oldIndex)
      console.log('newIndex of imgs:', newIndex)

      if (newIndex === imgs.length - 1) {
        addImg()
      }
    }

    const onShow = (index: number) => {
      indexRef.value = index
      visibleRef.value = true
    }
    const onHide = () => (visibleRef.value = false)

    const addImg = () => {
      imgs.push('https://via.placeholder.com/250.png/00a26e/fff?text=new+img')
    }

    return {
      onShow,
      onHide,
      onPrev,
      onNext,
      indexRef,
      visibleRef,
      imgs
    }
  }
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.gallery {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.pic {
  cursor: pointer;
  margin-right: 8px;
}
</style>
