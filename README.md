# vue-easy-lightbox

>A lightbox component for Vue.js 2+. You can drag / view / rotate pictures.

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
      imgs: [
        'https://via.placeholder.com/450.png/',
        'https://via.placeholder.com/300.png/',
        'https://via.placeholder.com/150.png/'
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

    <!-- default name -->
    <vue-easy-lightbox
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
      imgs: '',  // Img Url , string or Array
      visible: false,
      index: 0   // default
    }
  },
  methods: {
    showSingle() {
      this.imgs = 'http://via.placeholder.com/350x150'
      this.show()
    },
    showMultiple() {
      this.imgs = ['http://via.placeholder.com/350x150', 'http://via.placeholder.com/350x150']
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
    <button @click="toolbarMethods.rotate">rotate</button>
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
    <button @click="props.toolbarMethods.rotate">rotate</button>
  </template>
</vue-easy-lightbox>
```

Reference: [Slots-Vue.js](https://cn.vuejs.org/v2/guide/components-slots.html)

## Options

Properties
<table>
  <thead>
    <tr>
      <th>name</th>
      <th>type</th>
      <th>default</th>
      <th>description</th>
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
      <td>String/Array</td>
      <td>required</td>
      <td>Image's Url</td>
    </tr>
    <tr>
      <td>index</td>
      <td>Number</td>
      <td>0</td>
      <td>Index of imgList</td>
    </tr>
    <tr>
      <td>escDisabled</td>
      <td>Boolean</td>
      <td>false</td>
      <td>By default, press the esc key to close Modal during presentation.</td>
    </tr>
  </tbody>
</table>

Event
<table>
  <thead>
    <tr>
      <th>name</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>hide</td>
      <td>When you click modal mask or close Btn, component will emit this event</td>
    </tr>
  </tbody>
</table>

Slot & Scoped Slot
<table>
  <thead>
    <tr>
      <th>slot name</th>
      <th>slot props</th>
      <th>type</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>prev-btn</td>
      <td>prev</td>
      <td>Function</td>
      <td>show the prev img</td>
    </tr>
    <tr>
      <td>next-btn</td>
      <td>next</td>
      <td>Function</td>
      <td>show the next img</td>
    </tr>
    <tr>
      <td>close-btn</td>
      <td>close</td>
      <td>Function</td>
      <td>close modal</td>
    </tr>
    <tr>
      <td>toolbar</td>
      <td>
          toolbarMethods: {
            zoomIn,
            zoomOut,
            rotate
          }
      </td>
      <td>{ Function }</td>
      <td>zoom in, zoom out, rotate</td>
    </tr>
  </tbody>
</table>

## License

[MIT](http://opensource.org/licenses/MIT)
