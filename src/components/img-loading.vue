<template>
  <div :class="`${prefixCls}-loading`">
    <div class="ring"></div>
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
