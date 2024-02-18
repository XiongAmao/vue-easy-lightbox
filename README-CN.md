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

由于 `Vue 3.x` 使用 `ES2015` ([docs faq](https://staging-cn.vuejs.org/about/faq.html#what-browsers-does-vue-support)), 不再需要构建`ES5`版本，`1.6.0`版本开始不再提供`ES5`构建包.

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


### 单独导入CSS文件

> Added in: `v1.2.3`

默认情况下， CSS被包含在了  `dist/*.min.js`. 在一些特殊情况，你可能需要单独引入CSS文件来避免一些问题 ([CSP Violation](https://github.com/XiongAmao/vue-easy-lightbox/issues/75)). 你可以从`dist/external-css/`导入不包含CSS的构建文件和单独的样式文件.

```js
import VueEasyLightbox from 'vue-easy-lightbox/external-css'
// or
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'

// 单独引入组件样式
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
// or
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'
```

#### TypeScript Checking error:

如果你使用TypeScript，并遇到了以下报错：

> `Could not find the declaration file for module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'`

这里有两种办法解决这个问题

方法 1: 项目本地添加 `d.ts`，补充模块信息:
```ts
declare module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js' {
  import VueEasyLightbox from 'vue-easy-lightbox'
  export * from 'vue-easy-lightbox'
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
      'vue-easy-lightbox$': 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js',
    },
  },
};

// in your component
import VueEasyLightbox from 'vue-easy-lightbox' // work
```

or vitejs: [vitejs alias](https://cn.vitejs.dev/config/shared-options.html#resolve-alias)

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

## 使用方式

### HTML中使用 `UMD` 包导入

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
      // 注册全局组件
      app.use(VueEasyLightbox)
      app.mount('#app')
    </script>
  </body>
</html>
```

### 注册VueApp组件

```javascript
import Vue from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const app = Vue.createApp({
  // ... 根组件选项
})
app.use(VueEasyLightbox)
app.mount('#app')
```

#### 单文件组件中使用


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
// 如果VueApp已经注册组件，则这里不需要单独引入
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
    // 'src' 是必须值
    // 允许混合

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
      indexRef.value = 0 // 图片顺序索引
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

参考：[插槽 - Vue.js](https://staging-cn.vuejs.org/guide/components/slots.html)

### 组合式函数 Composables

> Added in `v1.7.0`

`useEasyLightbox` 提供了一些简单的方法和state，方便你使用`setup()`。
这个composable是可选的。你可以自定义自己的状态和方法。

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
      <td>String/String[]/ImgObject:{ src: string, title?: string, alt?: string }/ImgObject[]</td>
      <td>required</td>
      <td>图片的src字符串或图片对象(地址和标题) { src, title?, alt? }，传入数组则可以轮播显示</td>
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
      <td>true</td>
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
      <td>rotateDisabled (rotate-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>传true时，禁用图片旋转功能</td>
    </tr>
    <tr>
      <td>zoomDisabled (zoom-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>传true时，禁用图片缩放功能</td>
    </tr>
    <tr>
      <td>pinchDisabled (pinch-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>传true时，禁用双指触摸缩放功能</td>
    </tr>
    <tr>
      <td>maskClosable (mask-closable)</td>
      <td>Boolean</td>
      <td>true</td>
      <td>控制点击蒙板关闭预览.</td>
    </tr>
    <tr>
      <td>dblclickDisabled (dblclick-closable)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>控制双击缩放功能.</td>
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
    <tr>
      <td>zoomScale</td>
      <td>Number</td>
      <td>0.12</td>
      <td>指定缩放步进的比例</td>
    </tr>
    <tr>
      <td>maxZoom</td>
      <td>Number</td>
      <td>3</td>
      <td>指定图片最大缩放比例</td>
    </tr>
    <tr>
      <td>minZoom</td>
      <td>Number</td>
      <td>0.1</td>
      <td>指定图片最小缩放比例.</td>
    </tr>
    <tr>
      <td>rtl</td>
      <td>Boolean</td>
      <td>false</td>
      <td>指定RTL布局</td>
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
    <tr>
      <td>on-rotate</td>
      <td>当图片旋转时触发事件</td>
      <td>deg: number (顺时针角度)</td>
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
