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
  target: Element | Document,
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
  target: Element | Document,
  event: string,
  handler: any
) => {
  if (!isServer) {
    target.removeEventListener(event, handler)
  }
}
