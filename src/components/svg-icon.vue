<template>
  <svg
    :class="`${prefixCls}-icon icon`"
    aria-hidden="true"
  >
    <use :xlink:href="`#icon-${type}`"></use>
  </svg>
</template>

<script>
  export default {
    props: {
      type: {
        type: String
      }
    },
    data() {
      return {
        prefixCls: 'vel'
      }
    }
  }
</script>

<style scoped lang="scss">
  $prefix-cls: vel;

  .#{$prefix-cls}-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
