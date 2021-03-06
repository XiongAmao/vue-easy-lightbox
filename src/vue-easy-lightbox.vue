<template>
  <transition :name="`${prefixCls}-fade`">
    <div
      v-if="visible"
      :class="[`${prefixCls}-img-modal`, `${prefixCls}-modal`]"
      @click.self="closeDialog"
    >
      <transition
        :name="`${prefixCls}-fade`"
        mode="out-in"
      >
        <slot
          v-if="loading"
          name="loading"
          key="loading"
        >
          <img-loading key="img-loading" />
        </slot>

        <slot
          v-else-if="loadError"
          name="onerror"
          key="onerror"
        >
          <img-on-error key="img-on-error" />
        </slot>

        <div
          v-else-if="!loading && !loadError"
          :class="`${prefixCls}-img-wrapper`"
          :style="imgWrapperStyle"
          key="img-wrapper"
        >
          <img
            ref="realImg"
            :class="`${prefixCls}-img`"
            :src="visibleImgSrc"
            draggable="false"
            @mousedown="handleMouseDown($event)"
            @mouseup="handleMouseUp($event)"
            @mousemove="handleMouseMove($event)"
            @touchstart="handleTouchStart($event)"
            @touchmove="handleTouchMove($event)"
            @touchend="handleTouchEnd($event)"
            @load="handleRealImgLoad"
          />
        </div>
      </transition>

      <!-- use for load -->
      <img
        style="display:none;"
        :src="visibleImgSrc"
        @error="handleImgError"
        @load="handleTestImgLoad"
      />

      <!-- btns -->
      <div :class="`${prefixCls}-btns-wrapper`">
        <slot
          name="prev-btn"
          :prev="onPrevClick"
        >
          <div
            v-if="imgList.length !== 1"
            class="btn__prev"
            :class="{ disable: imgIndex === 0 || imgIndex > imgList.length }"
            @click="onPrevClick"
          >
            <svg-icon type="prev" />
          </div>
        </slot>

        <slot
          name="next-btn"
          :next="onNextClick"
        >
          <div
            v-if="imgList.length !== 1"
            class="btn__next"
            :class="{ disable: imgIndex >= imgList.length - 1 }"
            @click="onNextClick"
          >
            <svg-icon type="next" />
          </div>
        </slot>

        <slot
          name="close-btn"
          :close="closeDialog"
        >
          <div
            class="btn__close"
            @click="closeDialog"
          >
            <svg-icon type="close" />
          </div>
        </slot>

        <slot
          v-if="imgTitle && !titleDisabled && !loading && !loadError"
          name="title"
        >
          <img-title>{{ imgTitle }}</img-title>
        </slot>

        <slot
          name="toolbar"
          :toolbarMethods="{
            zoomOut,
            rotate: rotateLeft,
            rotateLeft,
            rotateRight,
            resize
          }"
        >
          <toolbar
            :prefixCls="prefixCls"
            :zoomIn="zoomIn"
            :zoomOut="zoomOut"
            :rotateLeft="rotateLeft"
            :rotateRight="rotateRight"
            :resize="resize"
          />
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, PropType, nextTick } from 'vue'
  import './assets/svg/iconfont'
  import SvgIcon from './components/svg-icon.vue'
  import Toolbar from './components/toobar.vue'
  import ImgLoading from './components/img-loading.vue'
  import ImgOnError from './components/img-on-error.vue'
  import ImgTitle from './components/img-title.vue'
  import { prefixCls } from './constant'
  import { on, off, isObject, isString, notEmpty, isArray } from './utils/index'

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
        prefixCls,
        scale: 1,
        rotateDeg: 0,
        imgIndex: 0,
        top: 0,
        left: 0,
        lastX: 0,
        lastY: 0,
        isDraging: false,
        loading: false,
        loadError: false,
        isTicking: false,
        isGesturing: false,
        imgBaseInfo: {
          width: 0,
          height: 0,
          maxScale: 1
        },
        touches: [] as TouchList | []
      }
    },
    computed: {
      imgList(): Img[] {
        if (isArray(this.imgs)) {
          return this.imgs
            .map((img) => {
              if (typeof img === 'string') {
                return { src: img }
              } else if (isImg(img)) {
                return img
              }
            })
            .filter(notEmpty)
        } else if (isString(this.imgs)) {
          return [{ src: this.imgs }]
        }
        return []
      },
      visibleImgSrc(): string | undefined {
        const src = this.imgList[this.imgIndex]?.src
        return src
      },
      imgTitle(): string | undefined {
        return this.imgList[this.imgIndex]?.title
      },
      imgTotal() {
        return this.imgList.length || 0
      },
      imgWrapperStyle(): {
        [key: string]: string
      } {
        return {
          transform: `translate(-50%, -50%) scale(${this.scale}) rotate(${this.rotateDeg}deg)`,
          top: `calc(50% + ${this.top}px)`,
          left: `calc(50% + ${this.left}px)`,
          cursor: this.moveDisabled || this.loadError ? 'default' : 'move',
          transition: this.isDraging || this.isGesturing ? 'none' : ''
        }
      }
    },
    watch: {
      visible: {
        handler(visible: boolean) {
          if (visible) this.init()
        },
        immediate: true
      },
      index: {
        handler(newIndex: number) {
          if (newIndex < 0 || newIndex >= this.imgList.length) {
            return
          }
          this.setIndex(newIndex)
        }
      }
    },
    mounted() {
      on(document, 'keydown', this.handleKeyPress)
      on(window, 'resize', this.handleWindowResize)
    },
    beforeUnmount() {
      off(document, 'keydown', this.handleKeyPress)
      off(window, 'resize', this.handleWindowResize)
    },
    methods: {
      checkMoveable(button = 0) {
        if (this.moveDisabled) return false

        // mouse left btn click
        return button === 0
      },

      // mouse events handler
      handleMouseDown(e: MouseEvent) {
        if (!this.checkMoveable(e.button)) return
        this.lastX = e.clientX
        this.lastY = e.clientY
        this.isDraging = true
        e.stopPropagation()
      },
      handleMouseUp(e: MouseEvent) {
        if (!this.checkMoveable(e.button)) return
        requestAnimationFrame(() => {
          this.isDraging = false
        })
      },
      handleMouseMove(e: MouseEvent) {
        if (!this.checkMoveable(e.button)) return
        if (this.isDraging && !this.isTicking) {
          this.isTicking = true
          requestAnimationFrame(() => {
            this.top = this.top - this.lastY + e.clientY
            this.left = this.left - this.lastX + e.clientX
            this.lastX = e.clientX
            this.lastY = e.clientY
            this.isTicking = false
          })
        }
        e.stopPropagation()
      },

      // touch events handler
      handleTouchStart(e: TouchEvent) {
        const { touches } = e
        if (touches.length > 1) {
          this.isGesturing = true
          this.touches = touches
        } else {
          this.lastX = touches[0].clientX
          this.lastY = touches[0].clientY
          this.isDraging = true
        }
        e.stopPropagation()
      },
      handleTouchMove(e: TouchEvent) {
        if (this.isTicking) return
        const { touches } = e
        if (this.checkMoveable() && !this.isGesturing && this.isDraging) {
          this.isTicking = true
          requestAnimationFrame(() => {
            if (!touches[0]) return
            const lastX = touches[0].clientX
            const lastY = touches[0].clientY
            this.top = this.top - this.lastY + lastY
            this.left = this.left - this.lastX + lastX
            this.lastX = lastX
            this.lastY = lastY
            this.isTicking = false
          })
        } else if (
          this.isGesturing &&
          this.touches.length > 1 &&
          touches.length > 1
        ) {
          this.isTicking = true
          requestAnimationFrame(() => {
            const scale =
              (this.getDistance(this.touches[0], this.touches[1]) -
                this.getDistance(touches[0], touches[1])) /
              this.imgBaseInfo.width
            this.touches = touches
            const newScale = this.scale - scale * 1.3
            if (newScale > 0.5 && newScale < this.imgBaseInfo.maxScale * 1.5) {
              this.scale = newScale
            }
            this.isTicking = false
          })
        }
      },
      handleTouchEnd() {
        requestAnimationFrame(() => {
          this.isDraging = false
          this.isGesturing = false
        })
      },

      // key press events handler
      handleKeyPress(e: Event) {
        const evt = e as KeyboardEvent
        if (!this.escDisabled && evt.key === 'Escape' && this.visible) {
          this.closeDialog()
        }
        if (evt.key === 'ArrowLeft') {
          this.onPrevClick()
        }
        if (evt.key === 'ArrowRight') {
          this.onNextClick()
        }
      },

      // window resize
      handleWindowResize() {
        this.getImgSize()
      },

      // load event handler
      handleTestImgLoad() {
        this.loading = false
      },
      handleRealImgLoad() {
        this.getImgSize()
      },
      handleImgError(e: Event) {
        this.loading = false
        this.loadError = true
        this.$emit('on-error', e)
      },

      // common methods
      getImgSize() {
        const imgElement = this.$refs.realImg as HTMLImageElement | undefined
        if (imgElement) {
          const { width, height, naturalWidth } = imgElement
          this.imgBaseInfo.maxScale = naturalWidth / width
          this.imgBaseInfo.width = width
          this.imgBaseInfo.height = height
        }
      },
      getDistance(p1: Touch, p2: Touch) {
        const x = p1.clientX - p2.clientX
        const y = p1.clientY - p2.clientY
        return Math.sqrt(x * x + y * y)
      },

      // action handler
      zoomIn() {
        const newScale = this.scale + 0.2
        if (newScale < this.imgBaseInfo.maxScale * 3) {
          this.scale = newScale
        }
      },
      zoomOut() {
        const newScale = this.scale - 0.2
        if (newScale > 0.1) {
          this.scale = newScale
        }
      },
      rotateLeft() {
        this.rotateDeg -= 90
      },
      rotateRight() {
        this.rotateDeg += 90
      },
      resize() {
        this.scale = 1
        this.top = 0
        this.left = 0
      },

      onNextClick() {
        const oldIndex = this.imgIndex
        const newIndex = oldIndex + 1

        if (newIndex > this.imgList.length - 1) return

        this.setIndex(newIndex, 'on-next-click')
      },

      onPrevClick() {
        const oldIndex = this.imgIndex
        const newIndex = oldIndex - 1

        if (newIndex < 0) return

        this.setIndex(newIndex, 'on-prev-click')
      },

      setIndex(newIndex: number, clickEvent?: 'on-prev-click' | 'on-next-click') {
        const oldIndex = this.imgIndex
        // reset style
        this.reset()
        // setIndex
        this.imgIndex = newIndex

        // handle same url
        if (this.imgList[this.imgIndex] === this.imgList[newIndex]) {
          nextTick(() => {
            this.loading = false
          })
        }

        // No emit event when hidden or same index
        if (!this.visible || oldIndex === newIndex) return
        if (clickEvent) {
          this.$emit(clickEvent, oldIndex, newIndex)
        }
        this.$emit('on-index-change', oldIndex, newIndex)
      },

      closeDialog() {
        this.$emit('hide')
      },

      // reset
      reset() {
        this.scale = 1
        this.rotateDeg = 0
        this.top = 0
        this.left = 0
        this.isDraging = false
        this.loading = true
        this.loadError = false
      },
      init() {
        this.reset()

        const length = this.imgList.length

        if (length === 0) {
          this.imgIndex = 0
          this.loading = false
          nextTick(() => {
            this.loadError = true
          })
          return
        }
        this.imgIndex =
          this.index >= length ? length - 1 : this.index < 0 ? 0 : this.index
      }
    }
  })
</script>
