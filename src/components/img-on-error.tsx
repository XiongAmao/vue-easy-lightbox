import { prefixCls } from '../constant'
import SvgIcon from './svg-icon'

export default () => (
  <div class={`${prefixCls}-on-error`}>
    <div class="ring"></div>
    <SvgIcon type="img-broken" />
  </div>
)
