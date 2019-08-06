<template>
  <transition :name="`${prefixCls}-fade`">
    <div
      v-if="visible"
      :class="[`${prefixCls}-img-modal`, `${prefixCls}-modal`]"
      @click.self="closeDialog"
    >
      <div
        :class="imgWrapperClasses"
        :style="imgStyle"
      >
        <img
          :class="`${prefixCls}-img`"
          :src="visibleImgSrc"
          draggable="false"
          @mousedown="handleMouseDown($event)"
          @mouseup="handleMouseUp($event)"
          @mousemove="handleMouseMove($event)"
        >
      </div>

      <!-- btns -->
      <div :class="`${prefixCls}-btns-wrapper`">
        <slot
          name="prev-btn"
          :prev="onPrevClick"
        >
          <div
            v-if="imgList.length !== 1"
            class="btn__prev"
            :class="{disable: imgIndex === 0}"
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
            :class="{disable: imgIndex === imgList.length - 1}"
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
            :prefix-cls="prefixCls"
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

<script>
  import './assets/svg/iconfont'
  import SvgIcon from './components/svg-icon.vue'
  import Toolbar from './components/toobar.vue'
  import { prefixCls } from './constant'
  import { on, off } from './utils/index'

  export default {
    name: 'vue-easy-lightbox',
    components: {
      SvgIcon,
      Toolbar
    },
    props: {
      imgs: {
        type: [Array, String]
      },
      visible: {
        type: Boolean
      },
      index: {
        type: Number,
        default: 0
      },
      escDisabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        prefixCls,
        scale: 1,
        rotateDeg: 0,
        imgIndex: 0,
        imgTransitionStatus: true,
        top: 0,
        left: 0,
        lastX: 0,
        lastY: 0,
        isDraging: false
      }
    },
    methods: {
      checkBtn(btn) {
        if (btn === 0) return true
        return false
      },

      // events handler
      handleMouseDown(e) {
        if (!this.checkBtn(e.button)) return
        this.lastX = e.clientX
        this.lastY = e.clientY
        this.isDraging = true
        e.stopPropagation()
      },
      handleMouseUp(e) {
        if (!this.checkBtn(e.button)) return
        this.isDraging = false
        this.lastX = this.lastY = 0
      },
      handleMouseMove(e) {
        if (!this.checkBtn(e.button)) return
        if (this.isDraging) {
          this.top = this.top - this.lastY + e.clientY
          this.left = this.left - this.lastX + e.clientX
          this.lastX = e.clientX
          this.lastY = e.clientY
        }
        e.stopPropagation()
      },
      escapePressHandler(e) {
        if (e.key === 'Escape' && this.visible) {
          this.closeDialog()
        }
      },

      // action handler
      zoomIn(e) {
        this.scale += 0.25
      },
      zoomOut() {
        if (this.scale !== 0) {
          this.scale -= 0.25
        }
      },
      rotate() {
        this.rotateDeg += 90
      },
      onNextClick() {
        if (this.imgIndex === this.imgList.length - 1) return
        this.reset()
        this.imgIndex += 1
        setTimeout(() => {
          this.imgTransitionStatus = !this.imgTransitionStatus
        }, 0)
      },
      onPrevClick() {
        if (this.imgIndex === 0) return
        this.reset()
        this.imgIndex -= 1
        setTimeout(() => {
          this.imgTransitionStatus = !this.imgTransitionStatus
        }, 0)
      },
      closeDialog() {
        this.$emit('hide')
      },

      reset() {
        this.imgTransitionStatus = !this.imgTransitionStatus
        this.scale = 1
        this.rotateDeg = 0
      },
      init() {
        this.imgIndex = this.index
        this.imgTransitionStatus = true
        this.scale = 1
        this.rotateDeg = 0
        this.top = 0
        this.left = 0
        this.isDraging = false
      }
    },
    computed: {
      imgWrapperClasses() {
        return [
          `${this.prefixCls}-img-wrapper`,
          {
            transition: this.imgTransitionStatus
          }
        ]
      },
      imgList() {
        if (Array.isArray(this.imgs)) {
          return this.imgs
        } else {
          return [this.imgs]
        }
      },
      visibleImgSrc() {
        return this.imgList[this.imgIndex]
      },
      imgTotal() {
        return this.imgList.length || 0
      },
      imgStyle: {
        get() {
          return {
            transform: `
                    translate(-50%, -50%)
                    scale(${this.scale})
                    rotate(-${this.rotateDeg}deg)
                  `,
            top: `calc(50% + ${this.top}px)`,
            left: `calc(50% + ${this.left}px)`
          }
        }
      }
    },
    watch: {
      visible(visible) {
        if (visible === true) {
          this.init()
        }
      }
    },
    mounted() {
      if (!this.escDisabled) {
        on(document, 'keydown', this.escapePressHandler)
      }
    },
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
    box-shadow: rgba(0, 0, 0, 0.7) 0px 5px 20px 2px;
    cursor: move;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .#{$prefix-cls}-img-wrapper.transition {
    transition: transform 0.3s ease-in-out;
  }

  .#{$prefix-cls}-img {
    max-width: 80vw;
    max-height: 80vh;
    vertical-align: middle;
    position: relative;
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
      right: 20px;
      font-size: 40px;
    }
    .btn__prev {
      top: 50%;
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
