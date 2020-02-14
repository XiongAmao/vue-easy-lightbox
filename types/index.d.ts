import Vue from 'vue'

export interface ImgObject {
  url: string
  title: string
}

export declare class VueEasyLightbox extends Vue {
  /**
   * Image's Url
   * @requires
   */
  imgs: string[] | string | ImgObject | ImgObject[]

  /**
   * Control lightbox display
   * @default false
   */
  visible?: boolean

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

  /**
   * Disable image movement.
   * @default false
   */
  moveDisabled?: boolean

  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

export default VueEasyLightbox
