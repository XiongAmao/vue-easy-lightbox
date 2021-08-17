import { prefixCls } from '../constant'
import { SvgIcon } from './svg-icon'

export const ImgOnError = () => (
  <div class={`${prefixCls}-on-error`}>
    <div class="ring"></div>
    <SvgIcon type="img-broken" />
  </div>
)
