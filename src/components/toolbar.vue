<template>
  <div :class="`${prefixCls}-toolbar`">
    <!-- zoom-in -->
    <div
      class="toobar-btn toolbar-btn__zoomin"
      @click="zoomIn"
    >
      <svg-icon type="zoomin" />
    </div>

    <!-- zoom-out -->
    <div
      class="toobar-btn toolbar-btn__zoomout"
      @click="zoomOut"
    >
      <svg-icon type="zoomout" />
    </div>

    <!-- resize -->
    <div
      class="toobar-btn toolbar-btn__resize"
      @click="resize"
    >
      <svg-icon type="resize" />
    </div>

    <!-- rotate -->
    <div
      class="toobar-btn toolbar-btn__rotate"
      @click="rotateLeft"
    >
      <svg-icon type="rotate-left" />
    </div>

    <div
      class="toobar-btn toolbar-btn__rotate"
      @click="rotateRight"
    >
      <svg-icon type="rotate-right" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SvgIcon from './svg-icon.vue'
  import { prefixCls } from '../constant'
  import { voidFn } from '../utils'

  export default defineComponent({
    components: {
      SvgIcon
    },
    props: {
      zoomIn: {
        type: Function,
        default: voidFn
      },
      zoomOut: {
        type: Function,
        default: voidFn
      },
      rotateLeft: {
        type: Function,
        default: voidFn
      },
      rotateRight: {
        type: Function,
        default: voidFn
      },
      resize: {
        type: Function,
        default: voidFn
      }
    },
    data() {
      return {
        prefixCls
      }
    }
  })
</script>
