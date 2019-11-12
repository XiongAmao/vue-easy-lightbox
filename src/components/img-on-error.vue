<template>
  <div :class="`${prefixCls}-on-error`">
    <svg-icon
      clas="icon"
      type="img-broken"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import SvgIcon from './svg-icon.vue'
  import { prefixCls } from '../constant'

  export default Vue.extend({
    components: {
      SvgIcon
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

  .#{$prefix-cls}-on-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .icon {
      font-size: 80px;
      color: #aaa;
    }
  }
</style>
