import {
  defineComponent,
  PropType,
  nextTick,
  computed,
  ref,
  reactive,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './assets/svg/iconfont'
import SvgIcon from './components/svg-icon.vue'
import Toolbar from './components/toolbar.vue'
import ImgLoading from './components/img-loading.vue'
import ImgOnError from './components/img-on-error.vue'
import ImgTitle from './components/img-title.vue'

import { prefixCls } from './constant'
import {
  on,
  off,
  isObject,
  isString,
  notEmpty,
  isArray,
  getDistance
} from './utils/index'
import { useImage } from './utils/hooks'

interface Img {
  src?: string
  title?: string
}
type PropsImgs = Img | string | (Img | string)[]

function isImg(arg: Img): arg is Img {
  return isObject(arg) && isString(arg.src)
}

export default defineComponent({
  name: 'VueEasyLightbox',
  components: {
    SvgIcon,
    Toolbar,
    ImgLoading,
    ImgOnError,
    ImgTitle
  },
  props: {
    imgs: {
      type: [Array, String] as PropType<PropsImgs>,
      default: () => ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    escDisabled: {
      type: Boolean,
      default: false
    },
    moveDisabled: {
      type: Boolean,
      default: false
    },
    titleDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'hide',
    'on-error',
    'on-prev-click',
    'on-next-click',
    'on-index-change'
  ],
  data() {
    return {
      prefixCls
    }
  },
  setup(props, { emit }) {
    const { imgRef, imgState, setImgSize } = useImage()
    const imgIndex = ref(0)

    const imgWrapperState = reactive({
      scale: 1,
      rotateDeg: 0,
      top: 0,
      left: 0,
      lastX: 0,
      lastY: 0,
      touches: [] as TouchList | []
    })

    const status = reactive({
      loadError: false,
      loading: false,
      dragging: false,
      gesturing: false
    })

    const imgList = computed(() => {
      if (isArray(props.imgs)) {
        return props.imgs
          .map((img) => {
            if (typeof img === 'string') {
              return { src: img }
            } else if (isImg(img)) {
              return img
            }
          })
          .filter(notEmpty)
      } else if (isString(props.imgs)) {
        return [{ src: props.imgs }]
      }
      return []
    })

    const imgTotal = computed(() => {
      return imgList.value.length
    })

    const currentImgSrc = computed(() => {
      const src = imgList.value[imgIndex.value]?.src
      return src
    })

    const imgTitle = computed(() => {
      return imgList.value[imgIndex.value]?.title
    })

    const imgWrapperStyle = computed(() => {
      return {
        transform: `translate(-50%, -50%) scale(${imgWrapperState.scale}) rotate(${imgWrapperState.rotateDeg}deg)`,
        top: `calc(50% + ${imgWrapperState.top}px)`,
        left: `calc(50% + ${imgWrapperState.left}px)`,
        cursor: props.moveDisabled || status.loadError ? 'default' : 'move',
        transition: status.dragging || status.gesturing ? 'none' : ''
      }
    })

    const closeDialog = () => {
      emit('hide')
    }

    const initImgStatus = () => {
      imgWrapperState.scale = 1
      imgWrapperState.rotateDeg = 0
      imgWrapperState.top = 0
      imgWrapperState.left = 0
      status.loadError = false
      status.dragging = false
      status.loading = true
    }

    // switching imgs manually
    const changeIndex = (
      newIndex: number,
      action?: 'on-prev-click' | 'on-next-click'
    ) => {
      const oldIndex = imgIndex.value

      initImgStatus()

      imgIndex.value = newIndex

      // handle same Img
      if (imgList.value[imgIndex.value] === imgList.value[newIndex]) {
        nextTick(() => {
          status.loading = false
        })
      }

      // No emit event when hidden or same index
      if (!props.visible || oldIndex === newIndex) return

      if (action) {
        emit(action, oldIndex, newIndex)
      }
      emit('on-index-change', oldIndex, newIndex)
    }

    const onNextClick = () => {
      const oldIndex = imgIndex.value
      const newIndex = oldIndex + 1

      if (newIndex > imgList.value.length - 1) return

      changeIndex(newIndex, 'on-next-click')
    }

    const onPrevClick = () => {
      const oldIndex = imgIndex.value
      const newIndex = oldIndex - 1

      if (newIndex < 0) return

      changeIndex(newIndex, 'on-prev-click')
    }

    // actions for changing img
    const zoomIn = () => {
      const newScale = imgWrapperState.scale + 0.2
      if (newScale < imgState.maxScale * 3) {
        imgWrapperState.scale = newScale
      }
    }

    const zoomOut = () => {
      const newScale = imgWrapperState.scale - 0.2
      if (newScale > 0.1) {
        imgWrapperState.scale = newScale
      }
    }

    const rotateLeft = () => {
      imgWrapperState.rotateDeg -= 90
    }

    const rotateRight = () => {
      imgWrapperState.rotateDeg += 90
    }

    const resize = () => {
      imgWrapperState.scale = 1
      imgWrapperState.top = 0
      imgWrapperState.left = 0
    }

    // mouse event handler
    const canMove = (button = 0) => {
      if (props.moveDisabled) return false
      // mouse left btn click
      return button === 0
    }

    const onMouseDown = (e: MouseEvent) => {
      if (!canMove(e.button)) return
      imgWrapperState.lastX = e.clientX
      imgWrapperState.lastY = e.clientY
      status.dragging = true
      e.stopPropagation()
    }

    const onMouseUp = (e: MouseEvent) => {
      if (!canMove(e.button)) return
      nextTick(() => {
        status.dragging = false
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!canMove(e.button)) return
      if (status.dragging) {
        const { top, left, lastY, lastX } = imgWrapperState
        imgWrapperState.top = top - lastY + e.clientY
        imgWrapperState.left = left - lastX + e.clientX
        imgWrapperState.lastX = e.clientX
        imgWrapperState.lastY = e.clientY
        e.stopPropagation()
      }
    }

    // touch event handler
    const onTouchStart = (e: TouchEvent) => {
      const { touches } = e
      if (touches.length > 1) {
        status.gesturing = true
        imgWrapperState.touches = touches
      } else {
        imgWrapperState.lastX = touches[0].clientX
        imgWrapperState.lastY = touches[0].clientY
        status.dragging = true
      }
      e.stopPropagation()
    }

    const onTouchMove = (e: TouchEvent) => {
      const { touches } = e
      const { lastX, lastY, left, top, scale } = imgWrapperState

      if (canMove() && !status.gesturing && status.dragging) {
        if (!touches[0]) return
        const curX = touches[0].clientX
        const curY = touches[0].clientY
        imgWrapperState.top = top - lastY + curY
        imgWrapperState.left = left - lastX + curX
        imgWrapperState.lastX = curX
        imgWrapperState.lastY = curY
      } else if (
        status.gesturing &&
        imgWrapperState.touches.length > 1 &&
        touches.length > 1
      ) {
        const calcScale =
          (getDistance(imgWrapperState.touches[0], imgWrapperState.touches[1]) -
            getDistance(touches[0], touches[1])) /
          imgState.width
        imgWrapperState.touches = touches

        const newScale = scale - calcScale * 1.3

        if (newScale > 0.5 && newScale < imgState.maxScale * 1.5) {
          imgWrapperState.scale = newScale
        }
      }
    }

    const onTouchEnd = () => {
      status.dragging = false
      status.gesturing = false
    }

    // key press events handler
    const onKeyPress = (e: Event) => {
      const evt = e as KeyboardEvent

      if (!props.visible) return

      if (!props.escDisabled && evt.key === 'Escape' && props.visible) {
        closeDialog()
      }
      if (evt.key === 'ArrowLeft') {
        onPrevClick()
      }
      if (evt.key === 'ArrowRight') {
        onNextClick()
      }
    }

    // handle loading process
    const onImgLoad = () => {
      setImgSize()
    }

    const onTestImgLoad = () => {
      status.loading = false
    }

    const onTestImgError = (e: Event) => {
      status.loading = false
      status.loadError = true
      emit('on-error', e)
    }

    const onWindowResize = () => {
      setImgSize()
    }

    watch(
      () => props.index,
      (newIndex) => {
        if (newIndex < 0 || newIndex >= imgList.value.length) {
          return
        }
        changeIndex(newIndex)
      }
    )

    onMounted(() => {
      on(document, 'keydown', onKeyPress)
      on(window, 'resize', onWindowResize)
    })

    onBeforeUnmount(() => {
      off(document, 'keydown', onKeyPress)
      off(window, 'resize', onWindowResize)
    })

    // init
    watch(
      () => props.visible,
      (visible) => {
        if (!visible) return
        initImgStatus()
        const len = imgList.value.length
        if (len === 0) {
          imgIndex.value = 0
          status.loading = false
          nextTick(() => (status.loadError = true))
          return
        }
        imgIndex.value =
          props.index >= len ? len - 1 : props.index < 0 ? 0 : props.index
      }
    )

    return {
      imgWrapperState,
      status,
      imgIndex,
      imgRef,
      imgList,
      imgTotal,
      imgTitle,
      currentImgSrc,
      imgWrapperStyle,
      imgState,
      onPrevClick,
      onNextClick,
      zoomIn,
      zoomOut,
      rotateRight,
      rotateLeft,
      resize,
      closeDialog,
      onImgLoad,
      onTestImgError,
      onTestImgLoad,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    }
  }
})
