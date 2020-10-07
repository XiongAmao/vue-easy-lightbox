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
