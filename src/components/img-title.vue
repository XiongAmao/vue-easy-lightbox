<template>
  <div :class="`${prefixCls}-img-title`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { prefixCls } from '../constant'

  export default Vue.extend({
    data() {
      return {
        prefixCls
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  .#{$prefix-cls}-img-title {
    overflow: hidden;
    position: absolute;
    left: 50%;
    bottom: 60px;
    transform: translate(-50%);
    max-width: 80%;
    font-size: 12px;
    line-height: 1;
    text-align: center;
    text-overflow: ellipsis;
    color: #ccc;
    opacity: 0.8;
    white-space: nowrap;
    cursor: default;
    transition: opacity 0.15s;

    &:hover {
      opacity: 1;
    }
  }
</style>
