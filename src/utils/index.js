import Vue from 'vue'

export const isServer = Vue.prototype.$isServer

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
    window.addEventListener('test-passive', null, options)
  } catch (e) {}
}

export const on = (target, event, handler, passive = false) => {
  if (!isServer) {
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    )
  }
}

export const off = (target, event, handler) => {
  if (!isServer) {
    target.removeEventListener(event, handler)
  }
}
