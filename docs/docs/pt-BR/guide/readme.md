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

  var app = Vue.createApp({
    el: '#app'
    // ... mais opções
  })
  app.use(VueEasyLightbox) // variável global
</script>
```


### Diferentes compilações

A compilação `ES5` é convertida pelo o `Babel`. Se você não precisa oferecer suporte a um ambiente es5, pode escolher uma compilação diferente de `ES5` com um tamanho menor.

<table>
  <thead>
    <tr>
      <th></th>
      <th>ES5 (padrão no package.json)</th>
      <th>ES6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>UMD(para navegadores)</td>
      <td>vue-easy-lightbox.es5.umd.min.js</td>
      <td>vue-easy-lightbox.umd.min.js</td>
    </tr>
    <tr>
      <td>CommonJS</td>
      <td>vue-easy-lightbox.es5.common.min.js (pkg.main)</td>
      <td>vue-easy-lightbox.common.min.js</td>
    </tr>
    <tr>
      <td>ES Module(para empacotadores)</td>
      <td>vue-easy-lightbox.es5.esm.min.js (pkg.module)</td>
      <td>vue-easy-lightbox.esm.min.js</td>
    </tr>
  </tbody>
</table>

## Uso

### Incluindo direto com `<script/>`

```html
<div id="app">
  <div class="">
    <div
      v-for="(src, index) in imgs"
      :key="index"
      class="pic"
      @click="() => showImg(index)"
    >
      <img :src="src" />
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
<!-- umd bundle -->
<script>
  // Nota: O Vue.js 3 não fornece mais uma instância global do Vue, registre o componente a cada instância VueApp.
  // https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp
  var app = Vue.createApp({
    el: '#app',
    data: {
      visible: false,
      index: 0, // padrão: 0
      imgs: [
        'https://via.placeholder.com/450.png/',
        'https://via.placeholder.com/300.png/',
        'https://via.placeholder.com/150.png/',
        { src: 'https://via.placeholder.com/450.png/', title: 'este é o título' }
      ]
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
  // Registrando VueEasyLightbox para seu VueApp.
  app.use(VueEasyLightbox)
  // ou
  app.component(VueEasyLightbox.default.name, VueEasyLightbox.default)

  app.mount('#root')
</script>
```

### Componente de arquivo único `.vue`

#### 1. Registrando componente VueApp

O `Vue.js 3` não fornece mais uma instância compartilhada global do Vue, registre o componente `vue-easy-lightbox` para cada `VueApp` que você usar.
[Documentação sobre isso aqui](https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp)

```javascript
import Vue from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const app = Vue.createApp({
  ...
})
app.use(VueEasyLightbox)
app.mount('#root')
```

#### 2. Uso do componente

```html
<template>
  <div>
    <button @click="showSingle">Mostrar uma única imagem.</button>
    <button @click="showMultiple">Mostrar um grupo de imagens.</button>

    <!-- Todas as props & eventos -->
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
  // Se o VueApp já estiver registrado com VueEasyLightbox, não há necessidade de registrá-lo aqui.
  import VueEasyLightbox from 'vue-easy-lightbox'

  export default {
    components: {
      VueEasyLightbox
    },
    data() {
      return {
        imgs: '', // Url Img , string ou Array de strings
        visible: false,
        index: 0 // padrão: 0
      }
    },
    methods: {
      showSingle() {
        this.imgs = 'http://via.placeholder.com/350x150'
        // ou
        this.imgs = {
          title: 'este é um placeholder',
          src: 'http://via.placeholder.com/350x150'
        }
        this.show()
      },
      showMultiple() {
        this.imgs = [
          'http://via.placeholder.com/350x150',
          'http://via.placeholder.com/350x150'
        ]
        // ou
        this.imgs = [
          { title: 'título img', src: 'http://via.placeholder.com/350x150' },
          'http://via.placeholder.com/350x150'
        ]
        // permiti a mistura
        this.index = 1 // index da imgList
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

### Botões personalizados ou barra de ferramentas

```html
<vue-easy-lightbox ...>
  <template v-slot:prev-btn="{ prev }">
    <button @click="prev">Mostrar o anterior</button>
  </template>

  <template v-slot:next-btn="{ next }">
    <button @click="next">Mostrar o próximo</button>
  </template>

  <template v-slot:next-btn="{ close }">
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

Referência: [Slots-Vue.js](https://v3.vuejs.org/guide/component-slots.html)

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
      <td>String/String[]/ImgObject:{ src: string, title: string }/ImgObject[]</td>
      <td>requerido</td>
      <td>Src das imagens / array do src / ImgObject:{ src, title } / array do ImgObject / array do ImgObject.</td>
    </tr>
    <tr>
      <td>index</td>
      <td>Number</td>
      <td>0</td>
      <td>Index do imgList</td>
    </tr>
    <tr>
      <td>escDisabled (esc-disabled)</td>
      <td>Boolean</td>
      <td>falso</td>
      <td>Por padrão, pressione a tecla `esc` para fechar o Modal durante a apresentação.</td>
    </tr>
    <tr>
      <td>moveDisabled (move-disabled)</td>
      <td>Boolean</td>
      <td>falso</td>
      <td>Passe verdadeiro para desativar o movimento da imagem.</td>
    </tr>
    <tr>
      <td>teleport</td>
      <td>string | Element</td>
      <td>-</td>
      <td>Especificar o nó de montagem para `vue-easy-lightbox'.</td>
    </tr>
  </tbody>
</table>

Referência: [Teleport](https://v3.cn.vuejs.org/guide/teleport.html)

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
      <td>on-prev-click</td>
      <td>Emite quando o botão anterior for clicado</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-next-click</td>
      <td>Emite quando o próximo botão for clicado</td>
      <td>(oldIndex, newIndex)</td>
    </tr>
    <tr>
      <td>on-index-change</td>
      <td>Emite quando o index de imgs é alterado</td>
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
