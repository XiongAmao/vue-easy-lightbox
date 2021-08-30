# vue-easy-lightbox

> 基于Vue.js 3.0 与 TypeScript 构建的图片阅览插件， 提供了旋转、放大、拖拽功能。可自定义各种功能。

[![npm](https://img.shields.io/npm/v/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)
[![npm](https://img.shields.io/npm/l/vue-easy-lightbox.svg)](https://www.npmjs.com/package/vue-easy-lightbox)
[![npm](https://img.badgesize.io/https://unpkg.com/vue-easy-lightbox@next/dist/vue-easy-lightbox.esm.min.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d)](https://www.npmjs.com/package/vue-easy-lightbox)


简体中文 | [English](https://github.com/XiongAmao/vue-easy-lightbox) | [Homepage](https://xiongamao.github.io/vue-easy-lightbox/)

> `Vue-easy-lightbox@1.x` 只支持Vue.js 3, 如果你需要使用Vue.js 2版本，请点击[这里](https://github.com/XiongAmao/vue-easy-lightbox/tree/vue2.x)查看.

## 安装

### 包管理器

```shell
$ npm install --save vue-easy-lightbox@next
# OR
$ yarn add vue-easy-lightbox@next
```

### 直接下载

在html中直接引入CDN链接文件。

```html
<script src="https://unpkg.com/vue@next"></script>
<script src="https://unpkg.com/vue-easy-lightbox@next/dist/vue-easy-lightbox.umd.min.js"></script>
<script>
  const app = Vue.createApp({
    // ... 根组件选项
  })
  app.use(VueEasyLightbox) // 全局变量
  app.mount('#app')
</script>
```

### 不同构建版本的区别
`ES5` 构建是`Babel`编译后的版本。如果你不需要支持`ES5`或更低版本的环境，可以使用非`ES5`的构建，它们提供了更小的文件。

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


### 单独导入CSS文件 `^1.2.3`

默认情况下， CSS被包含在了  `dist/*.min.js`. 在一些特殊情况，你可能需要单独引入CSS文件来避免一些问题 ([CSP Violation](https://github.com/XiongAmao/vue-easy-lightbox/issues/75)). 你可以从`dist/external-css/`导入不包含CSS的构建文件和单独的样式文件.

```js
// in this path vue-easy-lightbox/dist/external-css/*.js
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.es5.esm.min.js'

// 单独引入组件样式
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
```

#### TypeScript Checking error:

如果你使用TypeScript，并遇到了以下报错：

> `Could not find the declaration file for module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.es5.esm.min.js'`

这里有两种办法解决这个问题

方法 1: 项目本地添加 `d.ts`，补充模块信息:
```ts
declare module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.es5.common.min' {
  import VueEasyLightbox from 'vue-easy-lightbox'
  export default VueEasyLightbox
}
```

方法 2:
如果你使用的是Webpack工程，参考以下方法:  [webpack alias docs](https://webpack.js.org/configuration/resolve/#resolvealias)

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

## 使用方式

### html中使用 `<script />` 标签引入

例子：

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
  // 注意: Vue.js 3.0中不再提供Vue的全局共享实例，请为单个VueApp实例注册组件.
  // https://v3.cn.vuejs.org/guide/migration/global-api.html#%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%85%A8%E5%B1%80-api-createapp
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
  // 通过插件方式注册
  app.use(VueEasyLightbox)
  // 或使用组件注册的方式
  app.component(VueEasyLightbox.name, VueEasyLightbox)

  app.mount('#app')
</script>
```

### 注册VueApp组件
Vue.js 3.0中不再提供Vue的全局共享实例，请为单个VueApp实例注册组件.
[createApp](https://v3.cn.vuejs.org/guide/migration/global-api.html#%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E5%85%A8%E5%B1%80-api-createapp)

```javascript
import Vue from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const app = Vue.createApp({
  // ... 根组件选项
})
app.use(VueEasyLightbox)
app.mount('#app')
```

#### 以组件形式使用

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
// 如果VueApp已经注册组件，则这里不需要单独引入
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
  <template v-slot:prev-btn="{ prev }">
    <button @click="prev">上一张</button>
  </template>

  <template v-slot:next-btn="{ next }">
    <button @click="next">下一张</button>
  </template>

  <template v-slot:close-btn="{ close }">
    <button @click="close">关闭</button>
  </template>

  <template v-slot:toolbar="{ toolbarMethods }">
    <button @click="toolbarMethods.zoomIn">放大图片</button>
    <button @click="toolbarMethods.zoomOut">缩小图片</button>
    <button @click="toolbarMethods.rotateLeft">逆时针旋转</button>
    <button @click="toolbarMethods.rotateRight">顺时针旋转</button>
  </template>
</vue-easy-lightbox>
```

参考：[插槽 - Vue.js](https://v3.cn.vuejs.org/guide/component-slots.html#%E6%8F%92%E6%A7%BD%E5%86%85%E5%AE%B9)

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
      <td>loop</td>
      <td>Boolean</td>
      <td>false</td>
      <td>允许循环切换图片</td>
    </tr>
    <tr>
      <td>scrollDisabled (scroll-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>传true时，禁用背景滚动</td>
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
      <td>传true时，禁用拖动图片功能，并启用swipe功能</td>
    </tr>
    <tr>
      <td>teleport</td>
      <td>string | Element</td>
      <td>-</td>
      <td>指定挂载的节点</td>
    </tr>
    <tr>
      <td>swipeTolerance (swipe-tolerance)</td>
      <td>Number</td>
      <td>50</td>
      <td>指定swipe距离，单位为px</td>
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
      <td>on-prev / <br> on-prev-click</td>
      <td>切换上一张图片时触发</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-next / <br> on-next-click</td>
      <td>切换下一张图片时触发</td>
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
