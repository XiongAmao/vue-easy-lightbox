<template>
  <transition name="fade">
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
        <div
          v-if="imgList.length !== 1"
          class="btn__prev"
          :class="{disable: imgIndex === 0}"
          @click="prev"
        >
          <svg-icon type="prev" />
        </div>

        <div
          v-if="imgList.length !== 1"
          class="btn__next"
          :class="{disable: imgIndex === imgList.length - 1}"
          @click="next"
        >
          <svg-icon type="next" />
        </div>

        <div
          class="btn__close"
          @click="closeDialog"
        >
          <svg-icon type="close" />
        </div>

        <div :class="`${prefixCls}-toolbar-btns`">
          <!-- zoom-in -->
          <div
            class="toobar-btn toolbar-btn__zoomin"
            @click="zoomIn()"
          >
            <svg-icon type="zoomin" />
          </div>

          <!-- zoom-out -->
          <div
            class="toobar-btn toolbar-btn__zoomout"
            @click="zoomOut()"
          >
            <svg-icon type="zoomout" />
          </div>

          <!-- rotate -->
          <div
            class="toobar-btn toolbar-btn__rotate"
            @click="rotate()"
          >
            <svg-icon type="rotate" />
          </div>
        </div>
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

  export default {
    name: 'vue-easy-lightbox',
    components: {
      SvgIcon
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
      }
    },
    data() {
      return {
        prefixCls: 'vel',
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
      next() {
        if (this.imgIndex === this.imgList.length - 1) return
        this.reset()
        this.imgIndex += 1
        setTimeout(() => {
          this.imgTransitionStatus = !this.imgTransitionStatus
        }, 0)
      },
      prev() {
        if (this.imgIndex === 0) return
        this.reset()
        this.imgIndex -= 1
        setTimeout(() => {
          this.imgTransitionStatus = !this.imgTransitionStatus
        }, 0)
      },
      reset() {
        this.imgTransitionStatus = !this.imgTransitionStatus
        this.scale = 1
        this.rotateDeg = 0
      },
      closeDialog() {
        this.$emit('hide')
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
            transform: `translate(-50%, -50%)
                scale(${this.scale})
                rotate(-${this.rotateDeg}deg)`,
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
    }
  }
</script>

<style scoped lang="scss">
  $prefix-cls: vel;

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fade-enter,
  .fade-leave-to {
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
    box-shadow: #555 0px 5px 20px 2px;
    cursor: move;
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

  .#{$prefix-cls}-toolbar-btns {
    user-select: none;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    background: rgba(45, 45, 44, 0.8);
    border-radius: 4px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    padding: 6px 24px 0;

    .toobar-btn {
      cursor: pointer;
      display: inline-block;
      padding: 6px;
    }
    .toobar-btn .icon {
      width: 32px;
      height: 32px;
      fill: #fff;
    }
    .toobar-btn:hover .icon {
      fill: #54b4ee;
    }
  }
</style>
