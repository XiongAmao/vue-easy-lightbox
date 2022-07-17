import type { PropsImgs } from 'src/types'
import { ref } from 'vue'

export interface UseEasyLightboxOptions {
  /**
   * Image's src / array of src / ImgObject:{ src, title?, alt? } / array of ImgObject / array of ImgObject.
   */
  imgs: PropsImgs
  /**
   * initial index of imgList
   * @default 0
   */
  initIndex?: number
}

export const useEasyLightbox = (options: UseEasyLightboxOptions) => {
  const { imgs = '', initIndex } = options

  const imgsRef = ref(imgs)
  const indexRef = ref(initIndex)
  const visibleRef = ref(false)

  const show = (index = indexRef.value) => {
    changeIndex(index)
    visibleRef.value = true
  }
  const changeIndex = (index = indexRef.value) => {
    indexRef.value = index
  }
  const onHide = () => {
    visibleRef.value = false
  }

  return {
    imgsRef,
    indexRef,
    visibleRef,
    show,
    onHide,
    changeIndex
  }
}
