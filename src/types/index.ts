export interface IImgState {
  width: number
  height: number
  maxScale: number
}

export interface IImgWrapperState {
  scale: number
  lastScale: number
  rotateDeg: number
  top: number
  left: number
  initX: number
  initY: number
  lastX: number
  lastY: number
  touches: TouchList | []
}

export interface IStatus {
  loadError: boolean
  loading: boolean
  dragging: boolean
  gesturing: boolean
}

export interface Img {
  src?: string
  title?: string
  alt?: string
}

export type PropsImgs = Img | string | (Img | string)[]

export type MouseEventHandler = (e: MouseEvent) => void
export type TouchEventHandler = (e: TouchEvent) => void
