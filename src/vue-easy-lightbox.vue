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
        <!-- loading-slot -->
        <slot
          v-if="loading"
          name="loading"
        >
          <img-loading />
        </slot>

        <!-- error-slot -->
        <slot
          v-if="loadError"
          name="onerror"
        >
          <img-on-error />
        </slot>

        <!-- img-wrapper -->
        <div
          v-if="!loading && !loadError"
          :class="`${prefixCls}-img-wrapper`"
          :style="imgWrapperStyle"
        >
          <img
            ref="realImg"
            :class="`${prefixCls}-img`"
            :src="visibleImgSrc"
            :style="imgStyle"
            draggable="false"
            @mousedown="handleMouseDown($event)"
            @mouseup="handleMouseUp($event)"
            @mousemove="handleMouseMove($event)"
            @touchstart="handleTouchStart($event)"
            @touchmove="handleTouchMove($event)"
            @touchend="handleTouchEnd($event)"
            @load="handleRealImgLoad"
          >
        </div>
      </transition>

      <!-- use for load -->
      <img
        style="display:none;"
        :src="visibleImgSrc"
        @error="handleImgError"
        @load="handleTestImgLoad"
      >

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
            zoomIn,
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
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
  import './assets/svg/iconfont'
  import SvgIcon from './components/svg-icon.vue'
  import Toolbar from './components/toobar.vue'
  import ImgLoading from './components/img-loading.vue'
  import ImgOnError from './components/img-on-error.vue'
  import ImgTitle from './components/img-title.vue'
  import { prefixCls } from './constant'
  import { on, off, isArray, isObject, isString, notEmpty } from './utils/index'

  interface Img {
    src?: string
    title?: string
  }

  function isImg(arg: Img): arg is Img {
    return isObject(arg) && isString(arg.src)
  }

  @Component({
    name: 'vue-easy-lightbox',
    components: {
      SvgIcon,
      Toolbar,
      ImgLoading,
      ImgOnError,
      ImgTitle
    }
  })
  export default class VueEasyLightbox extends Vue {
    @Prop({ type: [Array, String], default: () => '' }) readonly imgs!:
      | string
      | Img
      | (Img | string)[]

    @Prop({ type: Boolean, default: false }) readonly visible!: boolean
    @Prop({ type: Number, default: 0 }) readonly index!: number
    @Prop({ type: Boolean, default: false }) readonly escDisabled!: boolean
    @Prop({ type: Boolean, default: false }) readonly moveDisabled!: boolean
    @Prop({ type: Boolean, default: false }) readonly titleDisabled!: boolean

    prefixCls = prefixCls
    scale = 1
    rotateDeg = 0
    imgIndex = 0
    top = 0
    left = 0
    lastX = 0
    lastY = 0
    isDraging = false
    loading = false
    loadError = false
    isTicking = false
    isGesturing = false
    imgBaseInfo = {
      width: 0,
      height: 0,
      maxScale: 1
    }
    touches: TouchList | [] = []

    get imgList() {
      if (isArray(this.imgs)) {
        return this.imgs
          .map((img) => {
            if (typeof img === 'string') {
              return { src: img }
            } else if (isImg(img)) {
              return img
            }
            return undefined
          })
          .filter(notEmpty)
      }
      if (isString(this.imgs)) {
        return [{ src: this.imgs }]
      }
      return []
    }
    get visibleImgSrc() {
      const src = this.imgList[this.imgIndex]?.src
      return src
    }
    get imgTitle() {
      return this.imgList[this.imgIndex]?.title
    }
    get imgTotal() {
      return this.imgList.length || 0
    }
    get imgWrapperStyle() {
      const {
        scale,
        top,
        left,
        rotateDeg,
        moveDisabled,
        loadError,
        isDraging,
        isGesturing
      } = this
      return {
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotateDeg}deg)`,
        top: `calc(50% + ${top}px)`,
        left: `calc(50% + ${left}px)`,
        cursor: moveDisabled || loadError ? 'default' : 'move',
        transition: isDraging || isGesturing ? 'none' : ''
      }
    }
    get imgStyle() {
      // const { rotateDeg } = this
      return {
        // transform: `rotate(-${rotateDeg}deg)`
      }
    }

    checkMoveable(button: number = 0) {
      if (this.moveDisabled) return false

      // mouse left btn click
      return button === 0
    }

    // mouse events handler
    handleMouseDown(e: MouseEvent) {
      if (!this.checkMoveable(e.button)) return
      this.lastX = e.clientX
      this.lastY = e.clientY
      this.isDraging = true
      e.stopPropagation()
    }
    handleMouseUp(e: MouseEvent) {
      if (!this.checkMoveable(e.button)) return
      requestAnimationFrame(() => {
        this.isDraging = false
      })
    }
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
    }

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
    }
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
    }
    handleTouchEnd(e: TouchEvent) {
      requestAnimationFrame(() => {
        this.isDraging = false
        this.isGesturing = false
      })
    }

    // key press events handler
    handleKeyPress(e: KeyboardEvent) {
      if (!this.escDisabled && e.key === 'Escape' && this.visible) {
        this.closeDialog()
      }
      if (e.key === 'ArrowLeft') {
        this.onPrevClick()
      }
      if (e.key === 'ArrowRight') {
        this.onNextClick()
      }
    }

    // window resize
    handleWindowResize(e: UIEvent) {
      this.getImgSize()
    }

    // load event handler
    handleTestImgLoad(e: Event) {
      this.loading = false
    }
    handleRealImgLoad(e: Event) {
      this.getImgSize()
    }
    handleImgError(e: Event) {
      this.loading = false
      this.loadError = true
      this.$emit('on-error', e)
    }

    // common methods
    getImgSize() {
      const imgElement = this.$refs.realImg as HTMLImageElement | undefined
      if (imgElement) {
        const { width, height, naturalWidth } = imgElement
        this.imgBaseInfo.maxScale = naturalWidth / width
        this.imgBaseInfo.width = width
        this.imgBaseInfo.height = height
      }
    }
    getDistance(p1: Touch, p2: Touch) {
      const x = p1.clientX - p2.clientX
      const y = p1.clientY - p2.clientY
      return Math.sqrt(x * x + y * y)
    }

    // action handler
    zoomIn() {
      const newScale = this.scale + 0.2
      if (newScale < this.imgBaseInfo.maxScale * 3) {
        this.scale = newScale
      }
    }
    zoomOut() {
      const newScale = this.scale - 0.2
      if (newScale > 0.1) {
        this.scale = newScale
      }
    }
    rotateLeft() {
      this.rotateDeg -= 90
    }
    rotateRight() {
      this.rotateDeg += 90
    }
    resize() {
      this.scale = 1
      this.top = 0
      this.left = 0
    }

    onNextClick() {
      const oldIndex = this.imgIndex
      const newIndex = oldIndex + 1

      if (newIndex > this.imgList.length - 1) return

      this.setIndex(newIndex, 'on-next-click')
    }

    onPrevClick() {
      const oldIndex = this.imgIndex
      const newIndex = oldIndex - 1

      if (newIndex < 0) return

      this.setIndex(newIndex, 'on-prev-click')
    }

    setIndex(newIndex: number, clickEvent?: 'on-prev-click' | 'on-next-click') {
      const oldIndex = this.imgIndex
      // reset style
      this.reset()
      // setIndex
      this.imgIndex = newIndex

      // handle same url
      if (this.imgList[this.imgIndex] === this.imgList[newIndex]) {
        this.$nextTick(() => {
          this.loading = false
        })
      }

      // No emit event when hidden or same index
      if (!this.visible || oldIndex === newIndex) return
      if (clickEvent) {
        this.$emit(clickEvent, oldIndex, newIndex)
      }
      this.$emit('on-index-change', oldIndex, newIndex)
    }

    closeDialog() {
      this.$emit('hide')
    }

    // reset
    reset() {
      this.scale = 1
      this.rotateDeg = 0
      this.top = 0
      this.left = 0
      this.isDraging = false
      this.loading = true
      this.loadError = false
    }
    init() {
      this.reset()

      const length = this.imgList.length

      if (length === 0) {
        this.imgIndex = 0
        this.loading = false
        this.$nextTick(() => {
          this.loadError = true
        })
        return
      }
      this.imgIndex =
        this.index >= length ? length - 1 : this.index < 0 ? 0 : this.index
    }

    // watch
    @Watch('visible', { immediate: true })
    onVisibleChanged(visible: boolean) {
      if (this.visible) this.init()
    }

    @Watch('index')
    onIndexChange(newIndex: number) {
      if (newIndex < 0 || newIndex >= this.imgList.length) {
        return
      }
      this.setIndex(newIndex)
    }

    // life cycle
    mounted() {
      on(document, 'keydown', this.handleKeyPress)
      on(window, 'resize', this.handleWindowResize)
    }
    beforeDestroy() {
      off(document, 'keydown', this.handleKeyPress)
      off(window, 'resize', this.handleWindowResize)
    }
  }
</script>

<style scoped lang="scss">
  @import './assets/styles/variables.scss';

  .#{$prefix-cls}-fade-enter-active,
  .#{$prefix-cls}-fade-leave-active {
    transition: all 0.3s ease;
  }
  .#{$prefix-cls}-fade-enter,
  .#{$prefix-cls}-fade-leave-to {
    opacity: 0;
  }

  /* container */
  .#{$prefix-cls}-img-swiper {
    position: relative;
    display: block;
  }

  .#{$prefix-cls}-modal {
    z-index: 9998;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .#{$prefix-cls}-img-wrapper {
    user-select: none;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% -50%);
    transition: 0.3s ease-in-out;
    will-change: transform opacity;
  }

  .#{$prefix-cls}-img {
    user-select: none;
    max-width: 80vw;
    max-height: 80vh;
    vertical-align: middle;
    position: relative;
    transition: transform 0.3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 5px 20px 2px;
    background-color: rgba(0, 0, 0, 0.7);

    @media (max-width: 750px) {
      max-width: 85vw;
      max-height: 95vh;
    }
  }

  /* prev/next/close btns */
  .#{$prefix-cls}-btns-wrapper {
    .btn__prev,
    .btn__next,
    .btn__close {
      user-select: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      opacity: 0.6;
      font-size: 32px;
      color: #fff;
      transition: 0.15s linear;
      -webkit-tap-highlight-color: transparent;
      outline: none;

      &:hover {
        opacity: 1;
      }
      &.disable,
      &.disable:hover {
        cursor: default;
        opacity: 0.2;
      }
    }

    .btn__next {
      right: 12px;
    }
    .btn__prev {
      left: 12px;
    }
    .btn__close {
      top: 24px;
      right: 10px;
    }

    @media (max-width: 750px) {
      .btn__next,
      .btn__prev {
        font-size: 20px;
      }
      .btn__close {
        font-size: 24px;
      }
      .btn__next {
        right: 4px;
      }
      .btn__prev {
        left: 4px;
      }
    }
  }
</style>
