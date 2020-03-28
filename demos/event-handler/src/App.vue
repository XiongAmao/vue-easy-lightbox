<template>
  <div id="app">
    <div class="gallery">
      <div
        v-for="(img, idx) in imgs"
        :key="idx"
        class="pic"
        @click="() => show(idx)"
      >
        <img :src="img.src ? img.src : img">
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
          'https://via.placeholder.com/250.png/09f/fff?text=first+img',
          'https://via.placeholder.com/250.png/09f/fff?text=second+img',
          'https://via.placeholder.com/250.png/09f/fff?text=third+img',
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
        if (newIndex === this.imgs.length - 1) {
          this.addImg()
        }
      },
      addImg() {
        this.imgs.push('https://via.placeholder.com/250.png/00a26e/fff?text=new+img')
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  .gallery {
    display: flex;
  }

  .pic {
    cursor: pointer;
    margin-right: 8px;
  }
</style>
