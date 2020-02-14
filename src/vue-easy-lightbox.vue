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
            :class="`${prefixCls}-img`"
            :src="visibleImgSrc"
            :style="imgStyle"
            draggable="false"
            @mousedown="handleMouseDown($event)"
            @mouseup="handleMouseUp($event)"
            @mousemove="handleMouseMove($event)"
          >
        </div>
      </transition>

      <!-- use for load -->
      <img
        ref="loadImg"
        style="display:none;"
        :src="visibleImgSrc"
        @error="handleImgError"
        @load="handleImgLoad"
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
            :class="{ disable: imgIndex === 0 }"
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
            :class="{ disable: imgIndex === imgList.length - 1 }"
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
          <img-title>
            {{ imgTitle }}
          </img-title>
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
    return isObject(arg)
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
    imgBaseInfo = {
      width: 0,
      height: 0
    }

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
      return this.imgList[this.imgIndex].src
    }
    get imgTitle() {
      return this.imgList[this.imgIndex].title
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
        isDraging
      } = this
      return {
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotateDeg}deg)`,
        top: `calc(50% + ${top}px)`,
        left: `calc(50% + ${left}px)`,
        cursor: moveDisabled || loadError ? 'default' : 'move',
        transition: isDraging ? 'none' : ''
      }
    }
    get imgStyle() {
      const { rotateDeg } = this
      return {
        // transform: `rotate(-${rotateDeg}deg)`
      }
    }

    checkMouseEventPropButton(button: number) {
      if (this.moveDisabled) return false

      // mouse left btn click
      return button === 0
    }

    // events handler
    handleMouseDown(e: MouseEvent) {
      if (!this.checkMouseEventPropButton(e.button)) return
      this.lastX = e.clientX
      this.lastY = e.clientY
      this.isDraging = true
      e.stopPropagation()
    }
    handleMouseUp(e: MouseEvent) {
      if (!this.checkMouseEventPropButton(e.button)) return
      requestAnimationFrame(() => {
        this.isDraging = false
      })
    }
    handleMouseMove(e: MouseEvent) {
      if (!this.checkMouseEventPropButton(e.button)) return
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
    handleEscapePress(e: KeyboardEvent) {
      if (e.key === 'Escape' && this.visible) {
        this.closeDialog()
      }
    }
    handleResize(e: UIEvent) {
      console.log(e)
    }

    // load event handler
    handleImgLoad(e: HTMLMediaElementEventMap) {
      const imgElement = this.$refs.loadImg as HTMLImageElement | undefined
      if (imgElement) {
        const { naturalWidth, naturalHeight } = imgElement
        this.imgBaseInfo = {
          width: naturalWidth,
          height: naturalHeight
        }
      }
      this.loading = false
    }
    handleImgError(e: Event) {
      this.loading = false
      this.loadError = true
      this.$emit('on-error', e)
    }

    // action handler
    zoomIn() {
      this.scale += 0.25
    }
    zoomOut() {
      if (this.scale !== 0) {
        this.scale -= 0.25
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
      this.onIndexChange(this.imgIndex + 1)
    }
    onPrevClick() {
      this.onIndexChange(this.imgIndex - 1)
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
      this.imgIndex = this.index
      this.reset()
      // this.loading = true
    }

    // watch
    @Watch('visible', { immediate: true })
    onVisibleChanged(visible: boolean) {
      if (this.visible) this.init()
    }

    @Watch('index')
    onIndexChange(index: number) {
      if (!this.visible) return
      if (index > this.imgList.length - 1 || index < 0) return
      this.reset()
      this.imgIndex = index

      // same url
      if (this.imgList[this.imgIndex] === this.imgList[index]) {
        this.$nextTick(() => {
          this.loading = false
        })
      }
    }

    // life cycle
    mounted() {
      if (!this.escDisabled) {
        on(document, 'keydown', this.handleEscapePress)
        on(window, 'resize', this.handleResize)
      }
    }
    beforeDestroy() {
      if (!this.escDisabled) {
        off(document, 'keydown', this.handleEscapePress)
      }
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
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% -50%);
    transition: 0.3s ease-in-out;
    will-change: transform opacity;
  }

  .#{$prefix-cls}-img {
    max-width: 80vw;
    max-height: 80vh;
    vertical-align: middle;
    position: relative;
    transition: transform 0.3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 5px 20px 2px;
    background-color: rgba(0, 0, 0, 0.7);
  }

  /* prev/next/close btns */
  .#{$prefix-cls}-btns-wrapper {
    .btn__prev,
    .btn__next,
    .btn__close {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      opacity: 0.6;
      font-size: 32px;
      color: #fff;
      transition: 0.15s linear;

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
        right: 6px;
      }
      .btn__prev {
        left: 6px;
      }
    }
  }
</style>
