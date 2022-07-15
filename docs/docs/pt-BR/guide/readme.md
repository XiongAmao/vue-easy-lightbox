# vue-easy-lightbox

> Um componente lightbox de visualização de imagens escrito com Vue.js 3 e Typescript, fornecendo funções de rotação, slide de imagens, zoom e redução.

> `vue-easy-lightbox@1.x` suporta apenas ao Vue.js 3, se você precisar da versão em Vue.js 2, verifique [aqui](https://github.com/XiongAmao/vue-easy-lightbox/tree/vue2.x).

## Instalação

### Usando com npm ou yarn

```shell
$ npm install --save vue-easy-lightbox@next
```

```shell
$ yarn add vue-easy-lightbox@next
```

### Importando direto no navegador

Adicione a tag `script` em seu navegador e use a variável global `VueEasyLightbox`.

```html
<script src="https://unpkg.com/vue@next"></script>
<script src="https://unpkg.com/vue-easy-lightbox@next/dist/vue-easy-lightbox.umd.min.js"></script>
<script>
  const app = Vue.createApp({
    // ... Opções de componentes de raiz
  })
  app.use(VueEasyLightbox) // variável global
  app.mount('#app')
</script>
```


### Diferentes compilações

Como o `Vue 3.x` utiliza `ES2015`, não há necessidade de construir o pacote `ES5`, e o `ES5` build é removido da versão `1.6.0`.

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
// in this path vue-easy-lightbox/dist/external-css/*.js
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'

// you need to import css yourself
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
```

#### TypeScript Checking error:

If your project is TypeScript project and you get this error message:

> `Could not find the declaration file for module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'`

Here are two ways to solve it.

Way 1: add `d.ts` locally:
```ts
declare module 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.common.min' {
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
      'vue-easy-lightbox$': 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.common.min.js',
    },
  },
};

// in your component
import VueEasyLightbox from 'vue-easy-lightbox' // work
```


## Uso

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


### Componente de arquivo único `.vue`

#### 1. Registrando componente VueApp

O `Vue.js 3` não fornece mais uma instância compartilhada global do Vue, registre o componente `vue-easy-lightbox` para cada `VueApp` que você usar.
[Documentação sobre isso aqui](https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp)

```javascript
import Vue from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const app = Vue.createApp({
  // ... root component options
})
app.use(VueEasyLightbox)
app.mount('#app')
```

#### 2. Uso do componente

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

### Botões personalizados ou barra de ferramentas

```html
<vue-easy-lightbox ...>
  <template v-slot:prev-btn="{ prev }">
    <button @click="prev">Mostrar o anterior</button>
  </template>

  <template v-slot:next-btn="{ next }">
    <button @click="next">Mostrar o próximo</button>
  </template>

  <template v-slot:close-btn="{ close }">
    <button @click="close">Fechar lightbox</button>
  </template>

  <template v-slot:toolbar="{ toolbarMethods }">
    <button @click="toolbarMethods.zoomIn">Mais zoom</button>
    <button @click="toolbarMethods.zoomOut">Menos zoom</button>
    <button @click="toolbarMethods.rotateLeft">Rotação no anti-horário</button>
    <button @click="toolbarMethods.rotateRight">Rotação no sentido horário</button>
  </template>
</vue-easy-lightbox>
```

Referência: [Slots-Vue.js](https://vuejs.org/guide/components/slots.html)

## Opções

### Props

<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Tipo</th>
      <th>Padrão</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>visible</td>
      <td>Boolean</td>
      <td>requerido</td>
      <td>Controlar a exibição do lightbox</td>
    </tr>
    <tr>
      <td>imgs</td>
      <td>String/String[]/ImgObject:{ src: string, title?: string, alt?: string }/ImgObject[]</td>
      <td>requerido</td>
      <td>Src das imagens / array do src / ImgObject:{ src, title?, alt? } / array do ImgObject / array do ImgObject.</td>
    </tr>
    <tr>
      <td>index</td>
      <td>Number</td>
      <td>0</td>
      <td>Index do imgList</td>
    </tr>
    <tr>
      <td>loop</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Passe verdadeiro para permitir o modo de loop contínuo.</td>
    </tr>
    <tr>
      <td>scrollDisabled (scroll-disabled)</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Passe verdadeiro para desactivar a rolagem quando o modal é visível.</td>
    </tr>
    <tr>
      <td>escDisabled (esc-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Por padrão, pressione a tecla `esc` para fechar o Modal durante a apresentação.</td>
    </tr>
    <tr>
      <td>moveDisabled (move-disabled)</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Passe verdadeiro para desativar o movimento da imagem e permitir `swipe`.</td>
    </tr>
    <tr>
      <td>maskClosable (mask-closable)</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Habilite ou desabilite a máscara de clique para fechar a `vue-easy-lightbox`.</td>
    </tr>
    <tr>
      <td>teleport</td>
      <td>string | Element</td>
      <td>-</td>
      <td>Especificar o nó de montagem para `vue-easy-lightbox'.</td>
    </tr>
    <tr>
      <td>swipeTolerance (swipe-tolerance)</td>
      <td>Number</td>
      <td>50</td>
      <td>Especifique o número de píxeis que tem de `swipe`.</td>
    </tr>
    <tr>
      <td>rtl</td>
      <td>Boolean</td>
      <td>false</td>
      <td>suporta os idiomas RTL (da direita para a esquerda)</td>
    </tr>
  </tbody>
</table>

Referência: [Teleport](https://vuejs.org/guide/built-ins/teleport.html)

### Event

<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Descrição</th>
      <th>Valor de retorno</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>hide</td>
      <td>Quando você clica no overlay do modal ou no botão fechar, o componente irá emitir este evento</td>
      <td>-</td>
    </tr>
    <tr>
      <td>on-error</td>
      <td>Erro de carregamento de imagem</td>
      <td>event (event.target não é a imagem a ser exibida)</td>
    </tr>
    <tr>
      <td>on-prev / <br> on-prev-click</td>
      <td>Emite quando o botão anterior for clicado </td>
      <td>(oldIndex, newIndex)</td>
    </tr>
     <tr>
      <td>on-next / <br> on-next-click</td>
      <td>Emite quando o próximo botão for clicado ou quando o utilizador deslizar para a esquerda</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-index-change</td>
      <td>Emite quando o index de imgs é alterado ou quando o utilizador desliza para a direita</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
  </tbody>
</table>

### Slot

<table>
  <thead>
    <tr>
      <th>Nome do Slot</th>
      <th>Slot Props</th>
      <th>Tipo do Slot Props</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>prev-btn</td>
      <td>prev</td>
      <td>Function</td>
      <td>Mostrar a imagem anterior</td>
    </tr>
    <tr>
      <td>next-btn</td>
      <td>next</td>
      <td>Function</td>
      <td>Mostrar a próxima imagem</td>
    </tr>
    <tr>
      <td>close-btn</td>
      <td>close</td>
      <td>Function</td>
      <td>Fechar modal</td>
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
      <td>ZoomIn, zoomOut, rotate(rotateLeft), rotateLeft, rotateRight</td>
    </tr>
    <tr>
      <td>loading</td>
      <td>-</td>
      <td>-</td>
      <td>Ícone de carregamento</td>
    </tr>
    <tr>
      <td>onerror</td>
      <td>-</td>
      <td>-</td>
      <td>Error Placeholder</td>
    </tr>
  </tbody>
</table>
