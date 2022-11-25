<template>
  <div class="homepage-demo">
    <div class="gallery">
      <div
        v-for="(img, idx) in imgs"
        :key="idx"
        class="pic"
        @click="() => onShowClick(idx)"
      >
        <img :src="img.src ? img.src : img" />
      </div>
    </div>

    <vue-easy-lightbox
      :visible="visibleRef"
      :index="imgIndexRef"
      :imgs="imgs"
      @hide="onHideClick"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

export default defineComponent({
  name: 'HomepageDemo',
  components: {
    VueEasyLightbox
  },
  setup() {
    const imgIndexRef = ref(0)
    const visibleRef = ref(false)
    const imgs = [
      {
        title: "img's url: https://i.loli.net/2018/11/10/5be6852cdb002.jpeg",
        src: ' https://i.loli.net/2018/11/10/5be6852cdb002.jpeg'
      },
      {
        title: "There is img's description",
        src: 'https://i.loli.net/2018/11/10/5be6852ce6965.jpeg'
      },
      'https://i.loli.net/2018/11/10/5be6852dec46e.jpeg'
    ]

    const onShowClick = (index) => {
      imgIndexRef.value = index
      visibleRef.value = true
    }
    const onHideClick = () => {
      visibleRef.value = false
    }

    onMounted(() => {})

    return {
      imgIndexRef,
      visibleRef,
      imgs,
      onShowClick,
      onHideClick
    }
  }
})
</script>

<style scoped lang="scss">
.homepage-demo {
  :deep(img.vel-img) {
    max-width: 80vw;

    @media screen and (max-width: 750px) {
      max-width: 85vw;
    }
  }
  .gallery {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .pic {
    cursor: pointer;
    margin: 4px;

    img {
      height: 100px;
      width: 100px;
      object-fit: cover;

      @media screen and (min-width: 800px) {
        height: 200px;
        width: 200px;
      }
    }
  }
}
</style>
