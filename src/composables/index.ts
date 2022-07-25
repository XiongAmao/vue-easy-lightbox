import { ref } from 'vue'
import type { PropsImgs } from '../types'

export interface UseEasyLightboxOptions {
  /**
   * image src/ImgObj or list of images src/ImgObj
   * imgObj: { src: string, title?: string, alt?: string }
   * @default ''
   */
  imgs: PropsImgs
  /**
   * initial index of imgList
   * @default 0
   */
  initIndex?: number
}

export const useEasyLightbox = (
  options: UseEasyLightboxOptions = { imgs: '' }
) => {
  const { imgs = '', initIndex = 0 } = options

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
