import {
  defineComponent,
  PropType,
  nextTick,
  computed,
  ref,
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  Transition,
  withModifiers
} from 'vue'

import './assets/svg/iconfont'
import SvgIcon from './components/svg-icon'
import Toolbar from './components/toolbar'
import ImgLoading from './components/img-loading'
import ImgOnError from './components/img-on-error'
import ImgTitle from './components/img-title'

import { prefixCls } from './constant'
import { on, off, isObject, isString, notEmpty, isArray } from './utils/index'
import { useImage, useMouse, useTouch } from './utils/hooks'
import { Img, IImgWrapperState, PropsImgs } from './types'

function isImg(arg: Img): arg is Img {
  return isObject(arg) && isString(arg.src)
}

export default defineComponent({
  name: 'VueEasyLightbox',
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
  setup(props, { emit, slots }) {
    const { imgRef, imgState, setImgSize } = useImage()
    const imgIndex = ref(0)

    const imgWrapperState = reactive<IImgWrapperState>({
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

    // check img moveable
    const canMove = (button = 0) => {
      if (props.moveDisabled) return false
      // mouse left btn click
      return button === 0
    }

    // mouse
    const { onMouseDown, onMouseMove, onMouseUp } = useMouse(
      imgWrapperState,
      status,
      canMove
    )

    const { onTouchStart, onTouchMove, onTouchEnd } = useTouch(
      imgState,
      imgWrapperState,
      status,
      canMove
    )

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

    onMounted(() => {
      on(document, 'keydown', onKeyPress)
      on(window, 'resize', onWindowResize)
    })

    onBeforeUnmount(() => {
      off(document, 'keydown', onKeyPress)
      off(window, 'resize', onWindowResize)
    })

    const renderLoading = () => {
      return slots.loading ? (
        slots.loading({
          key: 'loading'
        })
      ) : (
        <ImgLoading key="img-loading" />
      )
    }
    const renderOnError = () => {
      return slots.onerror ? (
        slots.onerror({
          key: 'onerror'
        })
      ) : (
        <ImgOnError key="img-on-error" />
      )
    }
    const renderImgWrapper = () => {
      return (
        <div
          class={`${prefixCls}-img-wrapper`}
          style={imgWrapperStyle.value}
          key="img-wrapper"
        >
          <img
            ref={imgRef}
            draggable="false"
            class={`${prefixCls}-img`}
            src={currentImgSrc.value}
            onMousedown={onMouseDown}
            onMouseup={onMouseUp}
            onMousemove={onMouseMove}
            onTouchstart={onTouchStart}
            onTouchmove={onTouchMove}
            onTouchend={onTouchEnd}
            onLoad={onImgLoad}
          />
        </div>
      )
    }

    const renderWrapper = () => {
      if (status.loading) {
        return renderLoading()
      } else if (status.loadError) {
        return renderOnError()
      }
      return renderImgWrapper()
    }

    const renderTestImg = () => (
      <img
        style="display:none;"
        src={currentImgSrc.value}
        onError={onTestImgError}
        onLoad={onTestImgLoad}
      />
    )

    const renderPrevBtn = () => {
      if (slots['prev-btn']) {
        return slots['prev-btn']({
          prev: onPrevClick
        })
      }

      if (imgList.value.length <= 1) return

      const isDisabled =
        imgIndex.value === 0 || imgIndex.value > imgList.value.length
      return (
        <div
          class={`btn__prev ${isDisabled ? 'disable' : ''}`}
          onClick={onPrevClick}
        >
          <SvgIcon type="prev" />
        </div>
      )
    }
    const renderNextBtn = () => {
      if (slots['next-btn']) {
        return slots['next-btn']({
          prev: onNextClick
        })
      }

      if (imgList.value.length <= 1) return

      const isDisabled = imgIndex.value >= imgList.value.length - 1
      return (
        <div
          class={`btn__next ${isDisabled ? 'disable' : ''}`}
          onClick={onNextClick}
        >
          <SvgIcon type="next" />
        </div>
      )
    }
    const renderCloseBtn = () => {
      return slots['close-btn'] ? (
        slots['close-btn']({
          close: closeDialog
        })
      ) : (
        <div class={`btn__close`} onClick={closeDialog}>
          <SvgIcon type="close" />
        </div>
      )
    }

    const renderToolbar = () => {
      return slots.toolbar ? (
        slots.toolbar({
          zoomOut,
          rotate: rotateLeft,
          rotateLeft,
          rotateRight,
          resize
        })
      ) : (
        <Toolbar
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          resize={resize}
          rotateLeft={rotateLeft}
          rotateRight={rotateRight}
        />
      )
    }
    const renderImgTitle = () => {
      if (
        !imgTitle.value ||
        props.titleDisabled ||
        status.loading ||
        status.loadError
      ) {
        return
      }

      return slots.title ? slots.title() : <ImgTitle>{imgTitle.value}</ImgTitle>
    }

    const renderModal = () => {
      if (!props.visible) {
        return
      }

      return (
        <div
          class={[`${prefixCls}-img-modal`, `${prefixCls}-modal`]}
          onClick={withModifiers(closeDialog, ['self'])}
        >
          <Transition name={`${prefixCls}-fade`} mode="out-in">
            {renderWrapper()}
          </Transition>
          {renderTestImg()}
          <div class={`${prefixCls}-btns-wrapper`}>
            {renderPrevBtn()}
            {renderNextBtn()}
            {renderImgTitle()}
            {renderCloseBtn()}
            {renderToolbar()}
          </div>
        </div>
      )
    }

    return () => {
      return <Transition name={`${prefixCls}-fade`}>{renderModal()}</Transition>
    }
  }
})
