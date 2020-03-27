<template>
  <div id="app">
    <github-conner />
    <div class="container">
      <h1> vue-easy-lightbox </h1>
      <div class="gallery">
        <div
          v-for="(img, idx) in imgs"
          :key="idx"
          class="pic"
          @click="() => show(idx)"
        >
          <div v-if="idx === 5">
            This is error image url.
          </div>
          <img :src="img.src ? img.src : img">
        </div>
      </div>

      <vue-easy-lightbox
        :visible="visible"
        :index="index"
        :imgs="imgs"
        :moveDisabled="false"
        @hide="handleHide"
        @on-index-change="handleIndexChange"
      />
    </div>
  </div>
</template>

<script>
  import GithubConner from './github-conner.vue'

  export default {
    components: {
      GithubConner
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
          'https://example.com/asdf.jpeg'
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
      handleHide() {
        this.visible = false
      },
      handleIndexChange(old, newIndex) {
        if (newIndex === 5) {
          setTimeout(() => {
            this.imgs.push('https://i.loli.net/2018/11/10/5be6852e33f19.jpeg')
          }, 1000)
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    color: #50d1c1;
  }
  .gallery {
    width: 80%;
    max-width: 980px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .pic {
    width: calc(50% - 30px);
    margin: 15px;
    cursor: pointer;
  }
  .pic:hover img {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0);
    transform: scale(1.01);
  }
  img {
    width: 100%;
    transition: 0.3s ease;
  }
  .btn {
    cursor: pointer;
    outline: none;
    text-decoration: none;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    height: 50px;
    padding: 0 8px;
    margin-left: 20px;
    background-color: #50d1c1;
    border-color: #50d1c1;
    border-radius: 4px;
    color: #fff;
    transition: 0.3s;
  }
  .btn:active {
    color: #ccc;
    background-color: #6ab5ae;
    border-color: #6ab5ae;
    outline: none;
  }
</style>
