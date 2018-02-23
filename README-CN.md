# vue-easy-lightbox

> 纯Vue组件构建的图片阅览插件， 提供了旋转、放大、拖拽功能。

<a href="https://spdx.org/licenses/MIT.html"><img src="https://img.shields.io/npm/l/vue-pure-lightbox.svg" alt="License"></a>

[English](https://github.com/XiongAmao/vue-easy-lightbox)

## [DEMO](https://xiongamao.github.io/vue-easy-lightbox/example/index.html)

## 安装

### With NPM:
```
npm i vue-easy-lightbox --save
```

## Usage

使用 `script` 标签引入

```html
<script src="path/to/vue-easy-lightbox.min.js"></script>
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
Just use it. For free. Forever.
