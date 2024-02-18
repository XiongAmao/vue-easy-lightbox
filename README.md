# vue-easy-lightbox

> A Vue.js 3.0 image lightbox component with Zoom / Drag / Rotate / Switch .

[![npm](https://img.shields.io/npm/v/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)
[![npm](https://img.shields.io/npm/l/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)
[![npm](https://img.badgesize.io/https://unpkg.com/vue-easy-lightbox@next/dist/vue-easy-lightbox.esm.min.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d)](https://www.npmjs.com/package/vue-easy-lightbox)


English | [中文文档](https://github.com/XiongAmao/vue-easy-lightbox/blob/master/README-CN.md) | [Homepage](https://xiongamao.github.io/vue-easy-lightbox/)




> `Vue-easy-lightbox@1.x` only supports Vue.js 3, if you need Vue.js 2 version please check [here](https://github.com/XiongAmao/vue-easy-lightbox/tree/vue2.x).

## Installation

### Package managers

```shell
$ npm install --save vue-easy-lightbox@next
# OR
$ yarn add vue-easy-lightbox@next
```


### Direct Download

Include the CDN link in HTML.

```html
<script src="https://unpkg.com/vue@next"></script>
<script src="https://unpkg.com/vue-easy-lightbox@next/dist/vue-easy-lightbox.umd.min.js"></script>
<script>
  const app = Vue.createApp({
    // ... root component options
  })
  app.use(VueEasyLightbox) // global variable
  app.mount('#app')
</script>
```

### Different Builds

Since `Vue 3.x` uses `ES2015` ([docs faq](https://vuejs.org/about/faq.html#what-browsers-does-vue-support)), there is no need to build `ES5` bundle, and `ES5` build is removed from version `1.6.0`.


<table>
  <thead>
    <tr>
      <th>Module</th>
      <th>Filename</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>UMD(for browsers)</td>
      <td>vue-easy-lightbox.umd.min.js</td>
    </tr>
    <tr>
      <td>CommonJS</td>
      <td>vue-easy-lightbox.common.min.js (pkg.main)</td>
    </tr>
    <tr>
      <td>ES Module(for bundlers)</td>
      <td>vue-easy-lightbox.esm.min.js (pkg.module)</td>
    </tr>
  </tbody>
</table>


### External CSS Build

> Added in: `v1.2.3`

By default, CSS is included in `dist/*.min.js`. In some special cases you may want to import CSS individually to avoid some problems ([CSP Violation](https://github.com/XiongAmao/vue-easy-lightbox/issues/75)). You can import builds without CSS and individual `.css` file from `dist/external-css/`.

```js
import VueEasyLightbox from 'vue-easy-lightbox/external-css'
// or
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'

// you need to import css
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
// or
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'
```

#### TypeScript Checking error:

If your project is TypeScript project and you get this error message:

> `Could not find the declaration file for module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'`

Here are two ways to solve it.

Way 1: add `d.ts` in your project:

```ts
declare module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js' {
  import VueEasyLightbox from 'vue-easy-lightbox'
  export * from 'vue-easy-lightbox'
  export default VueEasyLightbox
}
```

Way 2: alias

If you're using webpack:  [webpack alias docs](https://webpack.js.org/configuration/resolve/#resolvealias)

```js
// wepback.config.js
module.exports = {
  //...
  resolve: {
    alias: {
      'vue-easy-lightbox$': 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js',
    },
  },
};

// in your component
import VueEasyLightbox from 'vue-easy-lightbox' // work
```

Or vitejs: [vitejs alias](https://vitejs.dev/config/shared-options.html#resolve-alias)

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      'vue-easy-lightbox$': 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'
    }
  }
})
```

## Usage

### Using `UMD` in browser

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/vue@next"></script>
    <script src="https://unpkg.com/vue-easy-lightbox@next/dist/vue-easy-lightbox.umd.min.js"></script>
  </head>
  <body>
    <div id="app">
      <div class="">
        <div v-for="(src, index) in imgs" :key="index" class="pic" @click="() => showImg(index)">
          <img :src="src" />
        </div>
      </div>
      <vue-easy-lightbox :visible="visibleRef" :imgs="imgs" :index="indexRef" @hide="onHide"></vue-easy-lightbox>
    </div>
    <script>
      const { ref } = Vue
      const app = Vue.createApp({
        setup() {
          const visibleRef = ref(false)
          const indexRef = ref(0)
          const imgs = [
            'https://via.placeholder.com/450.png/',
            'https://via.placeholder.com/300.png/',
            'https://via.placeholder.com/150.png/',
            { src: 'https://via.placeholder.com/450.png/', title: 'this is title' }
          ]
          const showImg = (index) => {
            indexRef.value = index
            visibleRef.value = true
          }
          const onHide = () => visibleRef.value = false
          return {
            visibleRef,
            indexRef,
            imgs,
            showImg,
            onHide
          }
        }
      })
      // Registering VueEasyLightbox for your VueApp.
      app.use(VueEasyLightbox)
      app.mount('#app')
    </script>
  </body>
</html>
```

### Register VueApp component

```javascript
import Vue from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const app = Vue.createApp({
  // ... app options
})
app.use(VueEasyLightbox)
app.mount('#app')
```

### Basic Usage in SFC

```html
<template>
  <div>
    <button @click="showSingle">Show single picture.</button>
    <button @click="showMultiple">Show a group of pictures.</button>

    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
// If VueApp is already registered with VueEasyLightbox, there is no need to register it here.
import VueEasyLightbox from 'vue-easy-lightbox'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  components: {
    VueEasyLightbox
  },
  setup() {
    const visibleRef = ref(false)
    const indexRef = ref(0) // default 0
    const imgsRef = ref([])
    // Img Url , string or Array of string
    // ImgObj { src: '', title: '', alt: '' }
    // 'src' is required
    // allow mixing

    const onShow = () => {
      visibleRef.value = true
    }
    const showSingle = () => {
      imgsRef.value = 'http://via.placeholder.com/350x150'
      // or
      // imgsRef.value  = {
      //   title: 'this is a placeholder',
      //   src: 'http://via.placeholder.com/350x150'
      // }
      onShow()
    }
    const showMultiple = () => {
      imgsRef.value = [
        'http://via.placeholder.com/350x150',
        'http://via.placeholder.com/350x150'
      ]
      // or
      // imgsRef.value = [
      //   { title: 'test img', src: 'http://via.placeholder.com/350x150' },
      //   'http://via.placeholder.com/350x150'
      // ]
      indexRef.value = 0 // index of imgList
      onShow()
    }
    const onHide = () => (visibleRef.value = false)

    return {
      visibleRef,
      indexRef,
      imgsRef,
      showSingle,
      showMultiple,
      onHide
    }
  }
})
</script>
```

### Use vue slot custom buttons or toolbar

```html
<vue-easy-lightbox ...>
  <template v-slot:prev-btn="{ prev }">
    <button @click="prev">show the prev</button>
  </template>

  <template v-slot:next-btn="{ next }">
    <button @click="next">show the next</button>
  </template>

  <template v-slot:close-btn="{ close }">
    <button @click="close">close lightbox</button>
  </template>

  <template v-slot:toolbar="{ toolbarMethods }">
    <button @click="toolbarMethods.zoomIn">zoom in</button>
    <button @click="toolbarMethods.zoomOut">zoom out</button>
    <button @click="toolbarMethods.rotateLeft">Anticlockwise rotation</button>
    <button @click="toolbarMethods.rotateRight">clockwise rotation</button>
  </template>
</vue-easy-lightbox>
```

Reference: [Slots](https://vuejs.org/guide/components/slots.html)

### Composables

> Added in `v1.7.0`

`useEasyLightbox` provides some simple methods and states to help you use `setup()`.
It is optional. You can customize your state.

Usage:

```html
<template>
  <div>
    <button @click="show">show</button>
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import VueEasyLightbox, { useEasyLightbox } from 'vue-easy-lightbox'

export default defineComponent({
  components: {
    VueEasyLightbox
  },
  setup() {
    const {
      // methods
      show, onHide, changeIndex,
      // refs
      visibleRef, indexRef, imgsRef
    } = useEasyLightbox({
      // src / src[]
      imgs: [
        'http://via.placeholder.com/250x150',
        'http://via.placeholder.com/300x150',
        'http://via.placeholder.com/350x150'
      ],
      // initial index
      initIndex: 0
    })

    return {
      visibleRef,
      indexRef,
      imgsRef,
      show,
      onHide
    }
  }
})
</script>
```

#### Type declaration

```ts
export interface Img {
  src?: string
  title?: string
  alt?: string
}
export interface UseEasyLightboxOptions {
  /**
   * image src/Img or list of images src/Img
   * @default ''
   */
  imgs: Img | string | (Img | string)[];
  /**
   * initial index of imgList
   * @default 0
   */
  initIndex?: number;
}
export declare const useEasyLightbox: (options: UseEasyLightboxOptions) => {
  imgsRef: Ref<Img | string | (Img | string)[]>;
  indexRef: Ref<number | undefined>;
  visibleRef: Ref<boolean>;
  show: (index?: Ref<number> | number | Event) => void;
  onHide: () => void;
  changeIndex: (index?: number) => void;
};
```


## Options

Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>visible</td>
      <td>Boolean</td>
      <td>required</td>
      <td>Control lightbox display</td>
    </tr>
    <tr>
      <td>imgs</td>
      <td>String/String[]/ImgObject:{ src: string, title?: string, alt?: string }/ImgObject[]</td>
      <td>required</td>
      <td>Image's src / array of src / ImgObject:{ src, title?, alt? } / array of ImgObject / array of ImgObject.</td>
    </tr>
    <tr>
      <td>index</td>
      <td>Number</td>
      <td>0</td>
      <td>Index of imgList</td>
    </tr>
    <tr>
      <td>loop</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Pass true to enable continuous loop mode.</td>
    </tr>
    <tr>
      <td>scrollDisabled (scroll-disabled)</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Pass true to disable scrolling when modal is visible.</td>
    </tr>
    <tr>
      <td>escDisabled (esc-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>By default, press the esc key to close Modal during presentation.</td>
    </tr>
    <tr>
      <td>moveDisabled (move-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Pass true to disable image movement and enable swipe.</td>
    </tr>
    <tr>
      <td>rotateDisabled (rotate-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Pass true to disable image rotation.</td>
    </tr>
    <tr>
      <td>zoomDisabled (zoom-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Pass true to disable image zooming.</td>
    </tr>
    <tr>
      <td>pinchDisabled (pinch-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Pass true to disable pinching.</td>
    </tr>
    <tr>
      <td>maskClosable (mask-closable)</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Enable or disable click mask to close vue-easy-lightbox.</td>
    </tr>
    <tr>
      <td>dblclickDisabled (dblclick-closable)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Enable or disable double-click on img to zoom in/out.</td>
    </tr>
    <tr>
      <td>teleport</td>
      <td>string | Element</td>
      <td>-</td>
      <td>Specify the mount node for vue-easy-lightbox.</td>
    </tr>
    <tr>
      <td>swipeTolerance (swipe-tolerance)</td>
      <td>Number</td>
      <td>50</td>
      <td>Specify the number of pixel you have to swipe.</td>
    </tr>
    <tr>
      <td>zoomScale</td>
      <td>Number</td>
      <td>0.12</td>
      <td>Specify the step between zoom levels.</td>
    </tr>
    <tr>
      <td>maxZoom</td>
      <td>Number</td>
      <td>3</td>
      <td>Specify the maximum level of zoom scale.</td>
    </tr>
    <tr>
      <td>minZoom</td>
      <td>Number</td>
      <td>0.1</td>
      <td>Specify the minimum level of zoom scale.</td>
    </tr>
    <tr>
      <td>rtl</td>
      <td>Boolean</td>
      <td>false</td>
      <td>support RTL (right to left) languages</td>
    </tr>
  </tbody>
</table>

Event

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Return Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>hide</td>
      <td>When you click modal mask or close Btn, component will emit this event</td>
      <td>-</td>
    </tr>
    <tr>
      <td>on-error</td>
      <td>Image loading error</td>
      <td>event (event.target is not the image to be displayed)</td>
    </tr>
    <tr>
      <td>on-prev / <br> on-prev-click</td>
      <td>Emit when prev btn is clicked or when the user swiped right</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-next / <br> on-next-click</td>
      <td>Emit when next btn is clicked or when the user swiped left</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-index-change</td>
      <td>Emit when imgs's index is changed</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-rotate</td>
      <td>Emit when image rotate</td>
      <td>deg: number (clockwise angle deg)</td>
    </tr>
  </tbody>
</table>

Slot & Scoped Slot

<table>
  <thead>
    <tr>
      <th>Slot Name</th>
      <th>Slot Props</th>
      <th>Slot Props Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>prev-btn</td>
      <td>prev</td>
      <td>Function</td>
      <td>Show the prev img</td>
    </tr>
    <tr>
      <td>next-btn</td>
      <td>next</td>
      <td>Function</td>
      <td>Show the next img</td>
    </tr>
    <tr>
      <td>close-btn</td>
      <td>close</td>
      <td>Function</td>
      <td>Close modal</td>
    </tr>
    <tr>
      <td>toolbar</td>
      <td>
          toolbarMethods: {
            zoomIn,
            zoomOut,
            rotate(rotateLeft),
            rotateLeft,
            rotateRight
          }
      </td>
      <td>{ Function }</td>
      <td>Zoom in, zoom out, rotate(rotateLeft), rotateLeft, rotateRight</td>
    </tr>
    <tr>
      <td>loading</td>
      <td>-</td>
      <td>-</td>
      <td>Loading icon</td>
    </tr>
    <tr>
      <td>onerror</td>
      <td>-</td>
      <td>-</td>
      <td>Error Placeholder</td>
    </tr>
  </tbody>
</table>

## License

[MIT](http://opensource.org/licenses/MIT)
