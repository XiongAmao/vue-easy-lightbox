export const inBrowser = typeof window !== 'undefined'

export const voidFn = () => {
  return
}

// TODO: prepare for mobile touch event
export let supportsPassive = false

if (inBrowser) {
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
  if (inBrowser) {
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
  if (inBrowser) {
    target.removeEventListener(event, handler)
  }
}

export const preventDefault = (e: Event) => {
  e.preventDefault()
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
