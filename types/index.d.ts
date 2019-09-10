import Vue from 'vue'

export function install (vue: typeof Vue): void
export declare class VueEasyLightbox extends Vue {
  /**
   * Image's Url
   * @requires
   */
  imgs: string[] | string;

  /**
   * Control lightbox display
   * @default false
   */
  visible?: boolean;

  /**
   * Index of imgList
   * @default 0
   */
  index?: number

  /**
   * By default, press the esc key to close Modal during presentation.
   * @default false
   */
  escDisabled?: boolean
}

export default VueEasyLightbox
