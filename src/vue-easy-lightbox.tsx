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
  withModifiers,
  TeleportProps,
  Teleport
} from 'vue'

import { SvgIcon } from './components/svg-icon'
import { Toolbar } from './components/toolbar'
import { ImgLoading } from './components/img-loading'
import { ImgOnError } from './components/img-on-error'
import { ImgTitle } from './components/img-title'
import { DefaultIcons } from './components/default-icons'

import { prefixCls } from './constant'
import {
  on,
  off,
  isObject,
  isString,
  notEmpty,
  isArray,
  preventDefault
} from './utils/index'
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
    scrollDisabled: {
      type: Boolean,
      default: true
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
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    teleport: {
      type: [String, Object] as PropType<TeleportProps['to']>,
      default: null
    },
    swipeTolerance: {
      type: Number,
      default: 50
    },
    loop: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    },
    zoomScale: {
      type: Number,
      default: 0.12
    },
    maxZoom: {
      type: Number,
      default: 3
    },
    minZoom: {
      type: Number,
      default: 0.1
    },
    rotateDisabled: {
      type: Boolean,
      default: false
    },
    zoomDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    hide: () => true,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    'on-error': (e: Event) => true,
    'on-prev': (oldIndex: number, newIndex: number) => true,
    'on-next': (oldIndex: number, newIndex: number) => true,
    'on-prev-click': (oldIndex: number, newIndex: number) => true,
    'on-next-click': (oldIndex: number, newIndex: number) => true,
    'on-index-change': (oldIndex: number, newIndex: number) => true,
    'on-rotate': (deg: number) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  setup(props, { emit, slots }) {
    const { imgRef, imgState, setImgSize } = useImage()
    const imgIndex = ref(0)
    const lastBodyStyleOverflowY = ref('')

    const imgWrapperState = reactive<IImgWrapperState>({
      scale: 1,
      lastScale: 1,
      rotateDeg: 0,
      top: 0,
      left: 0,
      initX: 0,
      initY: 0,
      lastX: 0,
      lastY: 0,
      touches: [] as TouchList | []
    })

    const status = reactive({
      loadError: false,
      loading: false,
      dragging: false,
      gesturing: false,
      wheeling: false
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

    const currentImgSrc = computed(() => {
      const src = imgList.value[imgIndex.value]?.src
      return src
    })

    const currentImgTitle = computed(() => {
      return imgList.value[imgIndex.value]?.title
    })
    const currentImgAlt = computed(() => {
      return imgList.value[imgIndex.value]?.alt
    })

    const currCursor = () => {
      if (status.loadError) return 'default'

      if (props.moveDisabled) {
        return status.dragging ? 'grabbing' : 'grab'
      }

      return 'move'
    }

    const imgWrapperStyle = computed(() => {
      return {
        cursor: currCursor(),
        top: `calc(50% + ${imgWrapperState.top}px)`,
        left: `calc(50% + ${imgWrapperState.left}px)`,
        transition: status.dragging || status.gesturing ? 'none' : '',
        transform: `translate(-50%, -50%) scale(${imgWrapperState.scale}) rotate(${imgWrapperState.rotateDeg}deg)`
      }
    })

    const closeModal = () => {
      emit('hide')
    }

    const initImg = () => {
      imgWrapperState.scale = 1
      imgWrapperState.lastScale = 1
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
      emitsCallback?: (oldIdx: number, newIdx: number) => void
    ) => {
      const oldIndex = imgIndex.value

      initImg()

      imgIndex.value = newIndex

      // handle same Img
      if (imgList.value[imgIndex.value] === imgList.value[newIndex]) {
        nextTick(() => {
          status.loading = false
        })
      }

      // No emit event when hidden or same index
      if (!props.visible || oldIndex === newIndex) return

      if (emitsCallback) {
        emitsCallback(oldIndex, newIndex)
      }
      emit('on-index-change', oldIndex, newIndex)
    }

    const onNext = () => {
      const oldIndex = imgIndex.value
      const newIndex = props.loop
        ? (oldIndex + 1) % imgList.value.length
        : oldIndex + 1

      if (!props.loop && newIndex > imgList.value.length - 1) return

      changeIndex(newIndex, (oldIdx, newIdx) => {
        emit('on-next', oldIdx, newIdx)
        emit('on-next-click', oldIdx, newIdx)
      })
    }

    const onPrev = () => {
      const oldIndex = imgIndex.value
      let newIndex = oldIndex - 1

      if (oldIndex === 0) {
        if (!props.loop) return
        newIndex = imgList.value.length - 1
      }
      changeIndex(newIndex, (oldIdx, newIdx) => {
        emit('on-prev', oldIdx, newIdx)
        emit('on-prev-click', oldIdx, newIdx)
      })
    }

    // actions for changing img
    const zoom = (newScale: number) => {
      if (Math.abs(1 - newScale) < 0.05) {
        newScale = 1
      } else if (Math.abs(imgState.maxScale - newScale) < 0.05) {
        newScale = imgState.maxScale
      }
      imgWrapperState.lastScale = imgWrapperState.scale
      imgWrapperState.scale = newScale
    }

    const zoomIn = () => {
      const newScale = imgWrapperState.scale + props.zoomScale
      if (newScale < imgState.maxScale * props.maxZoom) {
        zoom(newScale)
      }
    }

    const zoomOut = () => {
      const newScale = imgWrapperState.scale - props.zoomScale
      if (newScale > props.minZoom) {
        zoom(newScale)
      }
    }

    const emitRotate = () => {
      const deg = imgWrapperState.rotateDeg % 360
      emit('on-rotate', Math.abs(deg < 0 ? deg + 360 : deg))
    }

    const rotateLeft = () => {
      imgWrapperState.rotateDeg -= 90
      emitRotate()
    }

    const rotateRight = () => {
      imgWrapperState.rotateDeg += 90
      emitRotate()
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

    const onDblclick = () => {
      if (imgWrapperState.scale !== imgState.maxScale) {
        imgWrapperState.lastScale = imgWrapperState.scale
        imgWrapperState.scale = imgState.maxScale
      } else {
        imgWrapperState.scale = imgWrapperState.lastScale
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (
        status.loadError ||
        status.gesturing ||
        status.loading ||
        status.dragging ||
        status.wheeling ||
        !props.scrollDisabled ||
        props.zoomDisabled
      ) {
        return
      }

      status.wheeling = true

      setTimeout(() => {
        status.wheeling = false
      }, 80)

      if (e.deltaY < 0) {
        zoomIn()
      } else {
        zoomOut()
      }
    }

    // key press events handler
    const onKeyPress = (e: Event) => {
      const evt = e as KeyboardEvent

      if (!props.visible) return

      if (!props.escDisabled && evt.key === 'Escape' && props.visible) {
        closeModal()
      }
      if (evt.key === 'ArrowLeft') {
        props.rtl ? onNext() : onPrev()
      }
      if (evt.key === 'ArrowRight') {
        props.rtl ? onPrev() : onNext()
      }
    }

    const onMaskClick = () => {
      if (props.maskClosable) {
        closeModal()
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
      if (!props.visible) return
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

    watch(
      () => status.dragging,
      (newStatus, oldStatus) => {
        const dragged = !newStatus && oldStatus

        if (!canMove() && dragged) {
          const xDiff = imgWrapperState.lastX - imgWrapperState.initX
          const yDiff = imgWrapperState.lastY - imgWrapperState.initY

          const tolerance = props.swipeTolerance
          const movedHorizontally = Math.abs(xDiff) > Math.abs(yDiff)

          if (movedHorizontally) {
            if (xDiff < tolerance * -1) onNext()
            else if (xDiff > tolerance) onPrev()
          }
        }
      }
    )

    // init
    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          initImg()
          const len = imgList.value.length
          if (len === 0) {
            imgIndex.value = 0
            status.loading = false
            nextTick(() => (status.loadError = true))
            return
          }
          imgIndex.value =
            props.index >= len ? len - 1 : props.index < 0 ? 0 : props.index

          if (props.scrollDisabled) {
            disableScrolling()
          }
        } else {
          if (props.scrollDisabled) {
            enableScrolling()
          }
        }
      }
    )

    const disableScrolling = () => {
      if (!document) return
      lastBodyStyleOverflowY.value = document.body.style.overflowY
      document.body.style.overflowY = 'hidden'
    }

    const enableScrolling = () => {
      if (!document) return
      document.body.style.overflowY = lastBodyStyleOverflowY.value
    }

    onMounted(() => {
      on(document, 'keydown', onKeyPress)
      on(window, 'resize', onWindowResize)
    })

    onBeforeUnmount(() => {
      off(document, 'keydown', onKeyPress)
      off(window, 'resize', onWindowResize)
      enableScrolling()
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
            alt={currentImgAlt.value}
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
            onDblclick={onDblclick}
            onDragstart={(e) => {
              e.preventDefault()
            }}
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
          prev: onPrev
        })
      }

      if (imgList.value.length <= 1) return

      const isDisabled = !props.loop && imgIndex.value <= 0

      return (
        <div
          role="button"
          aria-label="previous image button"
          class={`btn__prev ${isDisabled ? 'disable' : ''}`}
          onClick={onPrev}
        >
          {props.rtl ? <SvgIcon type="next" /> : <SvgIcon type="prev" />}
        </div>
      )
    }

    const renderNextBtn = () => {
      if (slots['next-btn']) {
        return slots['next-btn']({
          next: onNext
        })
      }

      if (imgList.value.length <= 1) return

      const isDisabled =
        !props.loop && imgIndex.value >= imgList.value.length - 1

      return (
        <div
          role="button"
          aria-label="next image button"
          class={`btn__next ${isDisabled ? 'disable' : ''}`}
          onClick={onNext}
        >
          {props.rtl ? <SvgIcon type="prev" /> : <SvgIcon type="next" />}
        </div>
      )
    }

    const renderCloseBtn = () => {
      return slots['close-btn'] ? (
        slots['close-btn']({
          close: closeModal
        })
      ) : (
        <div
          role="button"
          aria-label="close image preview button"
          class={`btn__close`}
          onClick={closeModal}
        >
          <SvgIcon type="close" />
        </div>
      )
    }

    const renderToolbar = () => {
      return slots.toolbar ? (
        slots.toolbar({
          toolbarMethods: {
            zoomIn,
            zoomOut,
            rotate: rotateLeft,
            rotateLeft,
            rotateRight,
            resize
          },
          zoomIn,
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
          rotateDisabled={props.rotateDisabled}
          zoomDisabled={props.zoomDisabled}
        />
      )
    }
    const renderImgTitle = () => {
      if (
        !currentImgTitle.value ||
        props.titleDisabled ||
        status.loading ||
        status.loadError
      ) {
        return
      }

      return slots.title ? (
        slots.title()
      ) : (
        <ImgTitle>{currentImgTitle.value}</ImgTitle>
      )
    }

    const renderModal = () => {
      if (!props.visible) {
        return
      }

      return (
        <div
          onTouchmove={preventDefault}
          class={[`${prefixCls}-modal`, props.rtl ? 'is-rtl' : '']}
          onClick={withModifiers(onMaskClick, ['self'])}
          onWheel={onWheel}
        >
          <DefaultIcons />
          <Transition
            name={`${prefixCls}-fade`}
            mode="out-in"
          >
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
      if (props.teleport) {
        return (
          <Teleport to={props.teleport}>
            <Transition name={`${prefixCls}-fade`}>{renderModal()}</Transition>
          </Teleport>
        )
      }

      return <Transition name={`${prefixCls}-fade`}>{renderModal()}</Transition>
    }
  }
})
