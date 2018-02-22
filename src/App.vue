<template>
  <div id="app">
    <button @click="showSingle">Show single picture.</button>
    <button @click="showMultiple">Show a group of pictures.</button>
    <vue-easy-lightbox :visible="visible" :imgs="imgs" @hide="handleHide"></vue-easy-lightbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: ['https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-243411.png', 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-243411.png'],
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    showSingle() {
      this.imgs = 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-243411.png'
      this.show()
    },
    showMultiple() {
      this.imgs = ['https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-243411.png', 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-45604.jpg']
      this.show()
    },
    handleHide() {
      this.visible = false
    }
  }
}
</script>

<style>

</style>
