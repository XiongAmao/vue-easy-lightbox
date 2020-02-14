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
export function isArray(arg: any): arg is any[] {
  return toString.call(arg) === '[object Array]'
}

export const isObject = (arg: any): arg is Object => {
  return !!arg && toString.call(arg) === '[object Object]'
}

export const isString = (arg: any): arg is string => {
  return !!arg && toString.call(arg) === '[object String]'
}

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
