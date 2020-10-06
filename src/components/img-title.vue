<template>
  <div :class="`${prefixCls}-img-title`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { prefixCls } from '../constant'

  export default defineComponent({
    data() {
      return {
        prefixCls
      }
    }
  })
</script>
