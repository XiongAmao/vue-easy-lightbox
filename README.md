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

Include the CDN link in the html file.

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

`ES5` build is converted by `Babel`. If you don't need to support an es5 environment, you can choose a non`ES5` build with smaller size.

<table>
  <thead>
    <tr>
      <th></th>
      <th>ES5(default in package.json)</th>
      <th>ES6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>UMD(for browsers)</td>
      <td>vue-easy-lightbox.es5.umd.min.js</td>
      <td>vue-easy-lightbox.umd.min.js</td>
    </tr>
    <tr>
      <td>CommonJS</td>
      <td>vue-easy-lightbox.es5.common.min.js (pkg.main)</td>
      <td>vue-easy-lightbox.common.min.js</td>
    </tr>
    <tr>
      <td>ES Module(for bundlers)</td>
      <td>vue-easy-lightbox.es5.esm.min.js (pkg.module)</td>
      <td>vue-easy-lightbox.esm.min.js</td>
    </tr>
  </tbody>
</table>


### External CSS Build `^1.2.3`

By default, CSS is included in `dist/*.min.js`. In some special cases you may want to import CSS individually to avoid some problems ([CSP Violation](https://github.com/XiongAmao/vue-easy-lightbox/issues/75)). You can import builds without CSS and individual `.css` file from `dist/external-css/`.

```js
// in this path vue-easy-lightbox/dist/external-css/*.js
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.es5.esm.min.js'

// you need to import css yourself
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
```

#### TypeScript Checking error:

If your project is TypeScript project and you get this error message:

> `Could not find the declaration file for module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.es5.esm.min.js'`

Here are two ways to solve it.

Way 1: add `d.ts` locally:
```ts
declare module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.es5.common.min' {
  import VueEasyLightbox from 'vue-easy-lightbox'
  export default VueEasyLightbox
}
```

Way 2:
if you're using webpack:  [webpack alias docs](https://webpack.js.org/configuration/resolve/#resolvealias)

```js
// wepback.config.js
module.exports = {
  //...
  resolve: {
    alias: {
      'vue-easy-lightbox$': 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.es5.common.min.js',
    },
  },
};

// in your component
import VueEasyLightbox from 'vue-easy-lightbox' // work
```

## Usage

### Direct `<script>` Include

example:

```html
<!-- in html -->
<div id="app">
  <div>
    <div
      v-for="(img, index) in imgs"
      :key="index"
      class="pic"
      @click="() => showImg(index)"
    >
      <img :src="typeof img === 'string' ? img : img.src" />
    </div>
  </div>
  <vue-easy-lightbox
    :visible="visible"
    :imgs="imgs"
    :index="index"
    @hide="handleHide"
  ></vue-easy-lightbox>
</div>

<script src="https://unpkg.com/vue@next"></script>
<script src="https://unpkg.com/vue-easy-lightbox@next/dist/vue-easy-lightbox.umd.min.js"></script>
<script>
  // Note: The Global Vue Constructor is no longer available in Vue 3.0.
  // https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp
  const app = Vue.createApp({
    data() {
      return {
        visible: false,
        index: 0, // default: 0
        imgs: [
          'https://via.placeholder.com/450.png/',
          'https://via.placeholder.com/300.png/',
          'https://via.placeholder.com/150.png/',
          { src: 'https://via.placeholder.com/450.png/', title: 'this is title' }
        ]
      }
    },
    methods: {
      showImg(index) {
        this.index = index
        this.visible = true
      },
      handleHide() {
        this.visible = false
      }
    }
  })
  // Registering VueEasyLightbox for your VueApp.
  app.use(VueEasyLightbox)
  // or
  app.component(VueEasyLightbox.name, VueEasyLightbox)

  app.mount('#app')
</script>
```

### Register VueApp component

The Global Vue Constructor is no longer available in `Vue.js` 3.0. You need to register the `vue-easy-lightbox` for each `VueApp` you use.
https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp

```javascript
import Vue from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const app = Vue.createApp({
  ...
})
app.use(VueEasyLightbox)
app.mount('#app')
```

#### Usage of Component

```html
<template>
  <div>
    <button @click="showSingle">Show single picture.</button>
    <button @click="showMultiple">Show a group of pictures.</button>

    <!-- all props & events -->
    <vue-easy-lightbox
      scrollDisabled
      escDisabled
      moveDisabled
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
  // If VueApp is already registered with VueEasyLightbox, there is no need to register it here.
  import VueEasyLightbox from 'vue-easy-lightbox'

  export default {
    components: {
      VueEasyLightbox
    },
    data() {
      return {
        imgs: '', // Img Url , string or Array of string
        visible: false,
        index: 0 // default: 0
      }
    },
    methods: {
      showSingle() {
        this.imgs = 'http://via.placeholder.com/350x150'
        // or
        this.imgs = {
          title: 'this is a placeholder',
          src: 'http://via.placeholder.com/350x150'
        }
        this.show()
      },
      showMultiple() {
        this.imgs = [
          'http://via.placeholder.com/350x150',
          'http://via.placeholder.com/350x150'
        ]
        // or
        this.imgs = [
          { title: 'test img', src: 'http://via.placeholder.com/350x150' },
          'http://via.placeholder.com/350x150'
        ]
        // allow mixing

        this.index = 1 // index of imgList
        this.show()
      },
      show() {
        this.visible = true
      },
      handleHide() {
        this.visible = false
      }
    }
  }
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

Reference: [Slots-Vue.js](https://v3.vuejs.org/guide/component-slots.html)

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
      <td>String/String[]/ImgObject:{ src: string, title: string }/ImgObject[]</td>
      <td>required</td>
      <td>Image's src / array of src / ImgObject:{ src, title } / array of ImgObject / array of ImgObject.</td>
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
      <td>false</td>
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
