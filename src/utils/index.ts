/* eslint-disable */
import Vue from 'vue'

export const isServer = Vue.prototype.$isServer as boolean

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
    window.addEventListener('test-passive', () => {}, options)
  } catch (e) {}
}

export const on = (
  target: Element | Document | Window,
  event: string,
  handler: any,
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
  handler: any
) => {
  if (!isServer) {
    target.removeEventListener(event, handler)
  }
}

const toString = Object.prototype.toString
const isType = (type: string) => (arg: any) =>
  toString.call(arg).slice(8, -1) === type

export function isArray(arg: any): arg is any[] {
  return isType('Array')(arg)
}

export const isObject = (arg: any): arg is Object => {
  return !!arg && isType('Object')(arg)
}

export const isString = (arg: any): arg is string => {
  return !!arg && isType('String')(arg)
}

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
