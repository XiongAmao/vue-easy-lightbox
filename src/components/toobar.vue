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

    <!-- rotate -->
    <div
      class="toobar-btn toolbar-btn__rotate"
      @click="rotate"
    >
      <svg-icon type="rotate" />
    </div>
  </div>
</template>

<script>
  import SvgIcon from './svg-icon.vue'
  import { prefixCls } from '../constant'

  const voidFn = () => {}

  export default {
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
      rotate: {
        type: Function,
        default: voidFn
      }
    },
    data() {
      return {
        prefixCls
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  .#{$prefix-cls}-toolbar {
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
      padding: 2px 4px;
    }
    .toobar-btn {
      font-size: 32px;
      color: #fff;
    }
    .toobar-btn:hover {
      color: #54b4ee;
    }
  }
</style>
