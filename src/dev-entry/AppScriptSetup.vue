<template>
  <div>
    <button @click="showSingle">Show single picture.</button>
    <button @click="showMultiple">Show a group of pictures.</button>
    <br />
    <button @click="test">test1</button>
    <button @click="test2">test2</button>
    <button @click="show">test show</button>

    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
      @on-index-change="onIndexChange"
    ></vue-easy-lightbox>
  </div>
</template>

<script lang="ts" setup>
import { isReactive, ref } from 'vue'
import { useEasyLightbox } from '../composables'

const imgList = ref([
  'http://via.placeholder.com/350x150',
  'http://via.placeholder.com/250x150'
])

const { visibleRef, indexRef, imgsRef, show, changeIndex, onHide } =
  useEasyLightbox({
    imgs: imgList.value,
    initIndex: 0
  })

const test = () => {
  console.log(isReactive(imgList.value))
  console.log(imgList.value)
  show()
}
const test2 = () => {
  imgList.value.push('http://via.placeholder.com/250x150')
  show()
}

const showSingle = () => {
  imgsRef.value = 'http://it-does-not-matter.png/'
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
// const showImg = () => show()

const onIndexChange = (old: number, newN: number) => {
  console.log(old, newN)
}
</script>
