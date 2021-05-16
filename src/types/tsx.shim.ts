import 'vue'

type EventHandler = (...args: any[]) => void

declare module 'vue' {
  interface ComponentCustomProps {
    // should be removed after Vue supported component events typing
    // see: https://github.com/vuejs/vue-next/issues/1553
    //      https://github.com/vuejs/vue-next/issues/3029
    onHide?: EventHandler
    ['onOnIndexChange']?: EventHandler
    ['onOnError']?: EventHandler
    ['onOnNext']?: EventHandler
    ['onOnPrev']?: EventHandler
    ['onOnNextClick']?: EventHandler
    ['onOnPrevClick']?: EventHandler
  }
}

// https://github.com/ezolenko/rollup-plugin-typescript2/issues/85
