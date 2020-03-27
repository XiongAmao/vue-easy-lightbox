# vue-easy-lightbox

> 纯Vue组件构建的图片阅览插件， 提供了旋转、放大、拖拽功能。

[![npm](https://img.shields.io/npm/v/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)
[![npm](https://img.shields.io/npm/l/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)

[English](https://github.com/XiongAmao/vue-easy-lightbox)

## [DEMO](https://xiongamao.github.io/vue-easy-lightbox/)

## 安装 & 使用

### 不同构建版本的区别
`ES5` 构建是`Babel`编译后的版本。如果你需要自己编译，可以使用非`ES5`的版本。

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
      index: 0,  // default : 0
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
    :index="index"
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
      imgs: '',  // Img Url , string or Array
      visible: false,
      index: 0   // default: 0
    }
  },
  methods: {
    showSingle() {
      this.imgs = 'http://via.placeholder.com/350x150'
      // 或者传递一个图片配置对象
      this.imgs = { title: 'this is a placeholder', src: 'http://via.placeholder.com/350x150' }
      this.show()
    },
    showMultiple() {
      this.imgs = ['http://via.placeholder.com/350x150', 'http://via.placeholder.com/350x150']
      // 或者传递一组图片配置对象
      this.imgs = [
        { title: 'test img', src: 'http://via.placeholder.com/350x150' },
        'http://via.placeholder.com/350x150'
      ]
      // 允许混合

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

### 使用slot定制你的按钮或者工具栏

```html
<vue-easy-lightbox
  ...
>
  <!-- vue@2.6.0+ 你应该使用 v-slot -->
  <template v-slot:prev-btn="{ prev }">
    <button @click="prev">上一张</button>
  </template>

  <template v-slot:next-btn="{ next }">
    <button @click="next">下一张</button>
  </template>

  <template v-slot:next-btn="{ close }">
    <button @click="close">关闭</button>
  </template>

  <template v-slot:toolbar="{ toolbarMethods }">
    <button @click="toolbarMethods.zoomIn">放大图片</button>
    <button @click="toolbarMethods.zoomOut">缩小图片</button>
    <button @click="toolbarMethods.rotateLeft">逆时针旋转</button>
    <button @click="toolbarMethods.rotateRight">顺时针旋转</button>
  </template>
</vue-easy-lightbox>

<!-- 即将被废弃的语法，推荐升级到vue@2.6.0+ -->
<vue-easy-lightbox>
  <template slot="prev-btn" slot-scope="props">
    <button @click="props.prev">上一张</button>
  </template>

  <template slot="next-btn" slot-scope="props">
    <button @click="props.next">上一张</button>
  </template>

  <template slot="close-btn" slot-scope="props">
    <button @click="props.close">关闭</button>
  </template>

  <template slot="toolbar" slot-scope="props">
    <button @click="props.toolbarMethods.zoomIn">放大图片</button>
    <button @click="props.toolbarMethods.zoomOut">缩小图片</button>
    <button @click="props.toolbarMethods.rotateLeft">逆时针旋转</button>
    <button @click="props.toolbarMethods.rotateRight">顺时针旋转</button>
  </template>
</vue-easy-lightbox>
```

参考：[插槽 - Vue.js](https://cn.vuejs.org/v2/guide/components-slots.html)

## 配置项

Props
<table>
  <thead>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>默认值</th>
      <th>说明</th>
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
      <td>String/String[]/ImgObject:{ src: string, title: string }/ImgObject[]</td>
      <td>required</td>
      <td>图片的src字符串或图片对象(地址和标题) { src, title }，传入数组则可以轮播显示</td>
    </tr>
    <tr>
      <td>index</td>
      <td>Number</td>
      <td>0</td>
      <td>打开图片组时，展示索引位置的图片</td>
    </tr>
    <tr>
      <td>escDisabled (esc-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>默认情况下，展示时按下esc键关闭Modal</td>
    </tr>
    <tr>
      <td>moveDisabled (move-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>传true时，禁用拖动图片功能</td>
    </tr>
  </tbody>
</table>

Event
<table>
  <thead>
    <tr>
      <th>事件名</th>
      <th>说明</th>
      <th>返回值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>hide</td>
      <td>当点击遮罩或者关闭按钮时，会触发该事件</td>
      <td>-</td>
    </tr>
    <tr>
      <td>on-error</td>
      <td>图片加载错误，触发error事件</td>
      <td>event (event.target 不是实际展示的图片)</td>
    </tr>
    <tr>
      <td>on-prev-click</td>
      <td>点击上一张图片按钮时触发</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-next-click</td>
      <td>点击下一张图片按钮时触发</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-index-change</td>
      <td>当图片索引被改变时触发，比如点击或更改传给组件index</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
  </tbody>
</table>

Slot & Scoped Slot
<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>slot props</th>
      <th>slot props 类型</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>prev-btn</td>
      <td>prev</td>
      <td>Function</td>
      <td>当点击时显示上一页</td>
    </tr>
    <tr>
      <td>next-btn</td>
      <td>next</td>
      <td>Function</td>
      <td>当点击时显示下一页</td>
    </tr>
    <tr>
      <td>close-btn</td>
      <td>close</td>
      <td>Function</td>
      <td>当点击时关闭弹窗</td>
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
      <td>放大、缩小、逆时针/顺时针旋转</td>
    </tr>
    <tr>
      <td>loading</td>
      <td>-</td>
      <td>-</td>
      <td>加载图标</td>
    </tr>
    <tr>
      <td>onerror</td>
      <td>-</td>
      <td>-</td>
      <td>图片加载错误占位图</td>
    </tr>
  </tbody>
</table>

## License

[MIT](http://opensource.org/licenses/MIT)
