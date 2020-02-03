<template>
  <div id="app">
    <img
      class="img-cat"
      alt="Cat 200"
      :src="staticPath"
      @click="() => showImg(staticPath)"
    >

    <img
      class="img-cat"
      alt="Cat 403"
      :src="importFromAssetsPath"
      @click="() => showImg(importFromAssetsPath)"
    >

    <img
      class="img-cat"
      alt="Cat 404"
      :src="requireFromAssetsPath"
      @click="() => showImg(requireFromAssetsPath)"
    >

    <vue-easy-lightbox
      :visible="visible"
      :imgs="imgs"
      @hide="visible = false"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
  // https://webpack.js.org/guides/asset-management/#loading-images
  // There is webpack's feature, which helps us handle the image and file path,
  // and returns an image path relative to the publicPath.
  import cat403Path from '@/assets/403.jpeg'
  const cat404Path = require('./assets/404.jpeg')

  // Here is vue-cli(built on top of webpack), you can refer to its configuration
  // https://cli.vuejs.org/config/#publicpath
  export default {
    name: 'app',
    data() {
      return {
        visible: false,
        imgs: '',
        // Placed in the public directory and referenced via absolute paths. Image path will not be changed.
        // https://cli.vuejs.org/guide/html-and-static-assets.html#static-assets-handling
        staticPath: '/200.jpeg',
        importFromAssetsPath: cat403Path,
        requireFromAssetsPath: cat404Path
      }
    },
    mounted() {
      // check what the console prints
      console.log(`static path: ${this.staticPath}`)
      console.log(`import from assets's path: ${this.importFromAssetsPath}`)
      console.log(`require assets's path: ${this.requireFromAssetsPath}`)
    },
    methods: {
      showImg(url) {
        this.imgs = url // vue-easylightbox just receive a string or an array of strings of the image url
        this.visible = true
      }
    }
  }
</script>

<style>
  .img-cat {
    width: 200px;
    margin-right: 20px;
  }
</style>
