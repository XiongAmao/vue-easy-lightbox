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
  import Vue from 'vue'
  import SvgIcon from './svg-icon.vue'
  import { prefixCls } from '../constant'

  const voidFn = () => {}

  export default Vue.extend({
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

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  .#{$prefix-cls}-toolbar {
    user-select: none;
    position: absolute;
    overflow: hidden;
    bottom: 8px;
    left: 50%;
    transform: translate(-50%);
    opacity: 0.9;
    display: flex;
    background-color: rgb(45, 45, 45);
    border-radius: 4px;
    padding: 0;

    .toobar-btn {
      user-select: none;
      flex-shrink: 0;
      cursor: pointer;
      padding: 6px 10px;
      font-size: 20px;
      color: #fff;
      background-color: #2D2D2D;
      -webkit-tap-highlight-color: transparent;
      outline: none;

      &:hover,
      &:active {
        background-color: rgb(61, 61, 61);
      }
    }
  }
</style>
