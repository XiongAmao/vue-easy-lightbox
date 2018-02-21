<template>
  <transition name="fade-in">
    <div
      v-show="visible"
      class="img-swiper modal"
      @click.self="closeDialog"
    >
      <div
        class="img-wrapper"
        :class="{transition: imgTransitionStatus}"
        :style="imgStyle">
        <!-- START: Imgs -->
        <img
          class="img"
          v-if="imgIndex === index"
          v-for="(img, index) in imgList"
          :key="index"
          :src="img"
          alt=""
          draggable="false"
          @mousedown="handleMouseDown($event)"
          @mouseup="handleMouseUp($event)"
          @mousemove="handleMouseMove($event)"
        >
        <!-- END: Imgs -->
      </div>
      <!-- START: btns -->
        <div class="btns">
          <div
            v-if="imgList.length !== 1"
            class="btn-prev"
            :class="{disable: imgIndex === 0}"
            @click="prev"
          >prev</div>
          <div
            v-if="imgList.length !== 1"
            class="btn-next"
            :class="{disable: imgIndex === imgList.length - 1}"
            @click="next"
          >next</div>
          <div
            class="btn-close"
            @click="closeDialog"
          ><i class="el-icon-close"></i></div>
          <div class="btns-toolbar">
              <button @click="zoomIn()">放大</button>
              <button @click="zoomOut()">缩小</button>
              <button @click="rotate()">rotate</button>
          </div>
        </div>
        <!-- END: btns -->

        <!-- START: total -->
        <div
          v-if="imgList.length !== 1"
          class="pagination-total">{{ imgIndex + 1 }}/{{ imgTotal }}</div>
        <!-- END: total -->
    </div>
  </transition>
</template>

<script>
export default {
  name: 'vue-easy-lightbox',
  props: {
    imgs: {
      type: [Array, Boolean]
    },
    visible: {
      type: Boolean
    }
  },
  components: {},
  data() {
    return {
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
      this.scale -= 0.25
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
      this.reset()
      this.$emit('dialogClose')
    }
  },
  computed: {
    imgList() {
      if (Object.prototype.toString.call(this.imgs) === '[object Array]') {
        return this.imgs
      } else {
        return [this.imgs]
      }
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
  }
}
</script>

<style .scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.3s linear;
}
.fade-in-enter,
.fade-in-leave-to {
  opacity: 1;
}
.img-swiper {
  position: relative;
}
.modal {
  z-index: 9998;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.img-wrapper {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% -50%);
  box-shadow: #555 0px 5px 20px 2px;
  cursor: move;
}
.img-wrapper.transition {
  transition: transform 0.3s ease-in-out;
}
.img {
  max-width: 80vw;
  max-height: 80vh;
  vertical-align: middle;
  position: relative;
}

.btn-prev,
.btn-next,
.btn-close {
  cursor: pointer;
  position: absolute;
  font-size: 60px;
  color: #fff;
  opacity: 0.6;
  transition: 0.15s linear;
}
.btn-prev:hover,
.btn-next:hover,
.btn-close:hover {
  opacity: 1;
}
.btn-prev.disable:hover,
.btn-next.disable:hover,
.btn-prev.disable,
.btn-next.disable {
  cursor: default;
  opacity: 0.2;
}
.btn-next {
  top: 50%;
  right: 20px;
}
.btn-prev {
  top: 50%;
  left: 20px;
}
.btn-close {
  top: 10px;
  right: 10px;
  font-size: 40px;
}
.pagination-total {
  position: absolute;
  font-size: 16px;
  top: 16px;
  left: 16px;
  color: #000;
}
.btns-toolbar {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  font-size: 50px;
}
</style>
