import { defineComponent, PropType } from 'vue'
import { prefixCls } from '../constant'
import { voidFn } from '../utils'
import { MouseEventHandler } from '../types'

import { SvgIcon } from './svg-icon'

export const Toolbar = defineComponent({
  name: 'Toolbar',
  props: {
    zoomIn: {
      type: Function as PropType<MouseEventHandler>,
      default: voidFn
    },
    zoomOut: {
      type: Function as PropType<MouseEventHandler>,
      default: voidFn
    },
    rotateLeft: {
      type: Function as PropType<MouseEventHandler>,
      default: voidFn
    },
    rotateRight: {
      type: Function as PropType<MouseEventHandler>,
      default: voidFn
    },
    resize: {
      type: Function as PropType<MouseEventHandler>,
      default: voidFn
    }
  },
  setup(props) {
    return () => {
      return (
        <div class={`${prefixCls}-toolbar`}>
          <div class="toolbar-btn toolbar-btn__zoomin" onClick={props.zoomIn}>
            <SvgIcon type="zoomin" />
          </div>

          <div class="toolbar-btn toolbar-btn__zoomout" onClick={props.zoomOut}>
            <SvgIcon type="zoomout" />
          </div>

          <div class="toolbar-btn toolbar-btn__resize" onClick={props.resize}>
            <SvgIcon type="resize" />
          </div>

          <div
            class="toolbar-btn toolbar-btn__rotate"
            onClick={props.rotateLeft}
          >
            <SvgIcon type="rotate-left" />
          </div>

          <div
            class="toolbar-btn toolbar-btn__rotate"
            onClick={props.rotateRight}
          >
            <SvgIcon type="rotate-right" />
          </div>
        </div>
      )
    }
  }
})
