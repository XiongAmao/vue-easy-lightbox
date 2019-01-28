# vue-easy-lightbox

> 纯Vue组件构建的图片阅览插件， 提供了旋转、放大、拖拽功能。

[![npm](https://img.shields.io/npm/v/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)
[![npm](https://img.shields.io/npm/l/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)

[English](https://github.com/XiongAmao/vue-easy-lightbox)

## [DEMO](https://xiongamao.github.io/vue-easy-lightbox/)

## 安装 & 使用

### 使用 `script` 标签引入

引入压缩后的构建版本`dist/vue-easy-lightbox.umd.min.js`, 它会为你注册全局组件。

```html
<script src="path/to/vue-easy-lightbox.umd.min.js"></script>
```

例子：

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

### 通过 NPM包 安装

```shell
$ npm install --save vue-easy-lightbox
```

`vue-easy-lightbox`可以使用 `Vue.use()` 方法加载。

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

以组件形式使用

```html
<template>
  <div>
    <button @click="showSingle">Show single picture.</button>
    <button @click="showMultiple">Show a group of pictures.</button>
    <VueEasyLightbox
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    ></VueEasyLightbox>

    <!-- Component name: 'vue-easy-lightbox' -->
    <!--
      <vue-easy-lightbox
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
      ></vue-easy-lightbox>
     -->
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

## 配置项

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
      <td>控制组件的显示</td>
    </tr>
    <tr>
      <td>imgs</td>
      <td>String/Array</td>
      <td>required</td>
      <td>图片的url，传入数组则可以轮播显示</td>
    </tr>
    <tr>
      <td>index</td>
      <td>Number</td>
      <td>0</td>
      <td>打开图片组时，展示的图片位置</td>
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
      <td>当点击遮罩或者关闭按钮时，会触发该事件</td>
    </tr>
  </tbody>
</table>

## License

[MIT](http://opensource.org/licenses/MIT)
