# vue-easy-lightbox

>A pure JS lightbox component for Vue.js . You can drag / view / rotate pictures.

[![npm](https://img.shields.io/npm/v/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)
[![npm](https://img.shields.io/npm/l/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)

[中文文档](https://github.com/XiongAmao/vue-easy-lightbox/blob/master/README-CN.md)

## [DEMO](https://xiongamao.github.io/vue-easy-lightbox/example/index.html)

## Installation

### With NPM:
```
npm i vue-easy-lightbox --save
```

## Usage

use `script` tag

```html
<script src="path/to/vue-easy-lightbox.min.js"></script>
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
    <Lightbox
      :visible="visible"
      :imgs="imgs"
      @hide="handleHide"
    ></Lightbox>
  </div>
</template>

<script>
import Lightbox from 'vue-easy-lightbox'
export default {
  data() {
    return {
      imgs: '',  // Img Url , string or Array
      visible: false
    }
  },
  methods: {
    showSingle() {
      this.imgs = 'http://via.placeholder.com/350x150'
      this.show()
    },
    showMultiple() {
      this.imgs = ['http://via.placeholder.com/350x150', 'http://via.placeholder.com/350x150']
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

## License
Just use it. For free. Forever.
