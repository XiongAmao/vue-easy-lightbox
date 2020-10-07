<template>
  <div :class="`${prefixCls}-on-error`">
    <svg-icon
      clas="icon"
      type="img-broken"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SvgIcon from './svg-icon.vue'
  import { prefixCls } from '../constant'

  export default defineComponent({
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
