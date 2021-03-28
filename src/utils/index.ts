export const isServer = typeof Window === undefined

export const voidFn = () => {
  return
}

// TODO: prepare for mobile touch event
export let supportsPassive = false

if (!isServer) {
  try {
    const options = {}
    Object.defineProperty(options, 'passive', {
      get() {
        supportsPassive = true
      }
    })
    window.addEventListener('test-passive', voidFn, options)
  } catch (e) {
    voidFn()
  }
}

export const on = (
  target: Element | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  passive = false
) => {
  if (!isServer) {
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    )
  }
}

export const off = (
  target: Element | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject
) => {
  if (!isServer) {
    target.removeEventListener(event, handler)
  }
}

const toString = Object.prototype.toString
const isType = (type: string) => (arg: unknown) =>
  toString.call(arg).slice(8, -1) === type

export function isArray(arg: unknown): arg is unknown[] {
  return isType('Array')(arg)
}

export const isObject = (arg: unknown): arg is Record<string, unknown> => {
  return !!arg && isType('Object')(arg)
}

export const isString = (arg: unknown): arg is string => {
  return !!arg && isType('String')(arg)
}

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

export function getDistance(p1: Touch, p2: Touch) {
  const x = p1.clientX - p2.clientX
  const y = p1.clientY - p2.clientY
  return Math.sqrt(x * x + y * y)
}
