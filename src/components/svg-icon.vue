<template>
  <svg
    :class="`${prefixCls}-icon icon`"
    aria-hidden="true"
  >
    <use :xlink:href="`#icon-${type}`"></use>
  </svg>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        prefixCls: 'vel'
      }
    }
  })
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  .#{$prefix-cls}-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
