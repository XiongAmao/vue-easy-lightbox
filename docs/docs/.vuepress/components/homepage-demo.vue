<template>
  <div class="homepage-demo">
    <div class="gallery">
      <div
        v-for="(img, idx) in imgs"
        :key="idx"
        class="pic"
        @click="() => show(idx)"
      >
        <img :src="img.src ? img.src : img" />
      </div>
    </div>

    <vue-easy-lightbox
      :visible="visible"
      :index="index"
      :imgs="imgs"
      @hide="visible = false"
      @on-prev-click="handlePrevClick"
      @on-next-click="handleNextClick"
    />
  </div>
</template>

<script>
  import VueEasyLightbox from 'vue-easy-lightbox'

  export default {
    name: 'App',
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
          'https://i.loli.net/2018/11/10/5be6852dec46e.jpeg'
        ],
        visible: false,
        index: 0 // default
      }
    },
    methods: {
      show(index) {
        this.index = index
        this.visible = true
      },
      handlePrevClick(oldIndex, newIndex) {
        console.log('when next btn click ----')
        console.log('oldIndex of imgs:', oldIndex)
        console.log('newIndex of imgs:', newIndex)
      },
      handleNextClick(oldIndex, newIndex) {
        console.log('when next btn click ----')
        console.log('oldIndex of imgs:', oldIndex)
        console.log('newIndex of imgs:', newIndex)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .homepage-demo
    .gallery
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

    .pic
      cursor: pointer;
      margin: 4px;

      img
        height: 100px;
        width: 100px;
        object-fit: cover;

        @media screen and (min-width: 800px)
          height: 200px;
          width: 200px;
</style>
