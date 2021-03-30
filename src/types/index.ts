export interface IImgState {
  width: number,
  height: number,
  maxScale: number
}

export interface IImgWrapperState {
  scale: number
  rotateDeg: number
  top: number
  left: number
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
}

export type PropsImgs = Img | string | (Img | string)[]
