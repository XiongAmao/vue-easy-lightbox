import { reactive, ref } from 'vue'

export const useImage = () => {
  const imgRef = ref<HTMLImageElement>()
  const imgState = reactive({
    width: 0,
    height: 0,
    maxScale: 1
  })

  const setImgSize = () => {
    if (imgRef.value) {
      const { width, height, naturalWidth } = imgRef.value
      imgState.maxScale = naturalWidth / width
      imgState.width = width
      imgState.height = height
    }
  }

  return {
    imgRef,
    imgState,
    setImgSize
  }
}
