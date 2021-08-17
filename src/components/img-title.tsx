import { prefixCls } from '../constant'
import { SetupContext } from 'vue'

export const ImgTitle = (props: Record<string, unknown>, { slots }: SetupContext) => (
  <div class={`${prefixCls}-img-title`}>
    {slots.default ? slots.default() : ''}
  </div>
)
