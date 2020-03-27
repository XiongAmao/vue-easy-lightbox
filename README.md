# vue-easy-lightbox

> A Vue.js image lightbox component with Zoom / Drag / Rotate / Switch .

[![npm](https://img.shields.io/npm/v/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)
[![npm](https://img.shields.io/npm/l/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)

[中文文档](https://github.com/XiongAmao/vue-easy-lightbox/blob/master/README-CN.md)

## [DEMO](https://xiongamao.github.io/vue-easy-lightbox/)

## Installation

### Different Builds
`ES5` build is converted by `Babel`. If you need to compile it yourself, you can use a non`ES5` build.

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


### use `script` tag

Grab the minified version under `dist/vue-easy-lightbox.umd.min.js`. It will register components globally.

```html
<script src="path/to/vue-easy-lightbox.umd.min.js"></script>
```

example:

```html
<div id="app">
  <div class="">
    <div
      v-for="(src, index) in imgs"
      :key="index"
      class="pic"
      @click="() => showImg(index)"
    >
      <img :src="src">
    </div>
  </div>
  <vue-easy-lightbox
    :visible="visible"
    :imgs="imgs"
    :index="index"
    @hide="handleHide"
  ></vue-easy-lightbox>
</div>

<script src="path/to/vue.js"></script>
<script src="path/to/vue-easy-lightbox.umd.min.js"></script>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      visible: false,
      index: 0,   // default: 0
      imgs: [
        'https://via.placeholder.com/450.png/',
        'https://via.placeholder.com/300.png/',
        'https://via.placeholder.com/150.png/',
        { src: 'https://via.placeholder.com/450.png/', title: 'this is title' }
      ]
    },
    methods: {
      showImg (index) {
        this.index = index
        this.visible = true
      },
      handleHide () {
        this.visible = false
      }
    }
  })
</script>
```

### With NPM

```shell
$ npm install --save vue-easy-lightbox
```

`vue-easy-lightbox` can be loading all with the Vue.use() method as same as the other vue plugin.

```javascript
import Vue from 'vue'
import Lightbox from 'vue-easy-lightbox'

Vue.use(Lightbox)
```

```html
<template>
  <vue-easy-lightbox
    :visible="visible"
    :imgs="imgs"
    :index="index"
    @hide="handleHide"
  ></vue-easy-lightbox>
</template>
```

Usage of Component

```html
<template>
  <div>
    <button @click="showSingle">Show single picture.</button>
    <button @click="showMultiple">Show a group of pictures.</button>

    <!-- all props & events -->
    <vue-easy-lightbox
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
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  components: {
    VueEasyLightbox
  },
  data() {
    return {
      imgs: '',  // Img Url , string or Array of string
      visible: false,
      index: 0   // default: 0
    }
  },
  methods: {
    showSingle() {
      this.imgs = 'http://via.placeholder.com/350x150'
      // or
      this.imgs = { title: 'this is a placeholder', src: 'http://via.placeholder.com/350x150' }
      this.show()
    },
    showMultiple() {
      this.imgs = ['http://via.placeholder.com/350x150', 'http://via.placeholder.com/350x150']
      // or
      this.imgs = [
        { title: 'test img', src: 'http://via.placeholder.com/350x150' },
        'http://via.placeholder.com/350x150'
      ]
      // allow mixing

      this.index = 1  // index of imgList
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
<vue-easy-lightbox
  ...
>
  <!-- v-slot in vue@2.6.0+ -->
  <template v-slot:prev-btn="{ prev }">
    <button @click="prev">show the prev</button>
  </template>

  <template v-slot:next-btn="{ next }">
    <button @click="next">show the next</button>
  </template>

  <template v-slot:next-btn="{ close }">
    <button @click="close">close lightbox</button>
  </template>

  <template v-slot:toolbar="{ toolbarMethods }">
    <button @click="toolbarMethods.zoomIn">zoom in</button>
    <button @click="toolbarMethods.zoomOut">zoom out</button>
    <button @click="toolbarMethods.rotateLeft">Anticlockwise rotation</button>
    <button @click="toolbarMethods.rotateRight">clockwise rotation</button>
  </template>
</vue-easy-lightbox>


<!-- Deprecated in 2.6.0+ -->
<vue-easy-lightbox>
  <template slot="prev-btn" slot-scope="props">
    <button @click="props.prev">show the prev</button>
  </template>

  <template slot="next-btn" slot-scope="props">
    <button @click="props.next">show the next</button>
  </template>

  <template slot="close-btn" slot-scope="props">
    <button @click="props.close">close lightbox</button>
  </template>

  <template slot="toolbar" slot-scope="props">
    <button @click="props.toolbarMethods.zoomIn">zoom in</button>
    <button @click="props.toolbarMethods.zoomOut">zoom out</button>
    <button @click="props.toolbarMethods.rotateLeft">Anticlockwise rotation</button>
    <button @click="props.toolbarMethods.rotateRight">clockwise rotation</button>
  </template>
</vue-easy-lightbox>
```

Reference: [Slots-Vue.js](https://cn.vuejs.org/v2/guide/components-slots.html)

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
      <td>escDisabled (esc-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>By default, press the esc key to close Modal during presentation.</td>
    </tr>
    <tr>
      <td>moveDisabled (move-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Pass true to disable image movement.</td>
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
      <td>on-prev-click</td>
      <td>Emit when prev btn is clicked</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-next-click</td>
      <td>Emit when next btn is clicked</td>
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
