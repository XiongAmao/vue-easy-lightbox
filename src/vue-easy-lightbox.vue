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
          name="toolbar"
          :toolbarMethods="{
            zoomIn,
            zoomOut,
            rotate
          }"
        >
          <toolbar
            :prefixCls="prefixCls"
            :zoomIn="zoomIn"
            :zoomOut="zoomOut"
            :rotate="rotate"
          />
        </slot>
      </div>

      <!-- total -->
      <div
        v-if="imgList.length !== 1"
        :class="`${prefixCls}-pagination-total`"
      >{{ imgIndex + 1 }}/{{ imgTotal }}</div>
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
  import { prefixCls } from './constant'
  import { on, off } from './utils/index'

  @Component({
    name: 'vue-easy-lightbox',
    components: {
      SvgIcon,
      Toolbar,
      ImgLoading,
      ImgOnError
    }
  })
  export default class VueEasyLightbox extends Vue {
    @Prop({ type: [Array, String], default: () => '' }) readonly imgs!:
      | string
      | string[]

    @Prop({ type: Boolean, default: false }) readonly visible!: boolean
    @Prop({ type: Number, default: 0 }) readonly index!: number
    @Prop({ type: Boolean, default: false }) readonly escDisabled!: boolean
    @Prop({ type: Boolean, default: false }) readonly moveDisabled!: boolean

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

    get imgList() {
      if (Array.isArray(this.imgs)) {
        return this.imgs
      }
      return [this.imgs]
    }
    get visibleImgSrc() {
      return this.imgList[this.imgIndex]
    }
    get imgTotal() {
      return this.imgList.length || 0
    }
    get imgWrapperStyle() {
      const { scale, top, left, rotateDeg, moveDisabled, loadError } = this
      return {
        transform: `translate(-50%, -50%) scale(${scale})`,
        top: `calc(50% + ${top}px)`,
        left: `calc(50% + ${left}px)`,
        cursor: moveDisabled || loadError ? 'default' : 'move'
      }
    }
    get imgStyle() {
      const { rotateDeg } = this
      return {
        transform: `rotate(-${rotateDeg}deg)`
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
      this.isDraging = false
      this.lastX = this.lastY = 0
    }
    handleMouseMove(e: MouseEvent) {
      if (!this.checkMouseEventPropButton(e.button)) return
      if (this.isDraging) {
        this.top = this.top - this.lastY + e.clientY
        this.left = this.left - this.lastX + e.clientX
        this.lastX = e.clientX
        this.lastY = e.clientY
      }
      e.stopPropagation()
    }
    escapePressHandler(e: KeyboardEvent) {
      if (e.key === 'Escape' && this.visible) {
        this.closeDialog()
      }
    }
    handleImgLoad(e: Event) {
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
    rotate() {
      this.rotateDeg += 90
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
        on(document, 'keydown', this.escapePressHandler)
      }
    }
    beforeDestroy() {
      if (!this.escDisabled) {
        off(document, 'keydown', this.escapePressHandler)
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
      cursor: pointer;
      position: absolute;
      font-size: 60px;
      color: #fff;
      opacity: 0.6;
      transition: 0.15s linear;
    }
    .btn__prev:hover,
    .btn__next:hover,
    .btn__close:hover {
      opacity: 1;
    }
    .btn__prev.disable:hover,
    .btn__next.disable:hover,
    .btn__prev.disable,
    .btn__next.disable {
      cursor: default;
      opacity: 0.2;
    }
    .btn__next {
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
      font-size: 40px;
    }
    .btn__prev {
      top: 50%;
      transform: translateY(-50%);
      left: 20px;
      font-size: 40px;
    }
    .btn__close {
      top: 10px;
      right: 10px;
      font-size: 40px;
    }
  }

  .#{$prefix-cls}-pagination-total {
    position: absolute;
    font-size: 16px;
    top: 16px;
    left: 16px;
    color: #000;
  }
</style>
