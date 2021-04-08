import { prefixCls } from '../constant'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => (
      <svg class={`${prefixCls}-icon icon`} aria-hidden="true">
        <use xlinkHref={`#icon-${props.type}`}></use>
      </svg>
    )
  }
})
