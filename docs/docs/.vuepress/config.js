module.exports = {
  base: '/vue-easy-lightbox/',
  title: 'vue-easy-lightbox',
  description: '',
  port: 8089,
  theme: '@vuepress/theme-default',
  themeConfig: {
    repo: 'XiongAmao/vue-easy-lightbox',
    search: false,
    sidebarDepth: 2,
    sidebar: 'auto',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'v0.x',
            link: 'https://github.com/XiongAmao/vue-easy-lightbox/tree/vue2.x'
          }
        ]
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        nav: [
          {
            text: '指南',
            link: '/zh/guide/'
          },
          {
            text: 'v0.x',
            link: 'https://github.com/XiongAmao/vue-easy-lightbox/tree/vue2.x'
          }
        ]
      },
      '/pt-BR/': {
        label: 'Português',
        selectText: 'Idiomas',
        ariaLabel: 'Selecione o idioma',
        nav: [
          {
            text: 'Guia',
            link: '/pt-BR/guide/'
          },
          {
            text: 'v0.x',
            link: 'https://github.com/XiongAmao/vue-easy-lightbox/tree/vue2.x'
          }
        ]
      }
    }
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'vue-easy-lightbox',
      description:
        'A Vue.js 3.0 image lightbox component with Zoom / Drag / Rotate / Switch .'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'vue-easy-lightbox',
      description:
        '基于Vue.js 3.0 与 TypeScript 构建的图片阅览插件。 支持旋转、放大、拖拽图片等功能。'
    },
    '/pt-BR/': {
      lang: 'pt-BR',
      title: 'vue-easy-lightbox',
      description:
        'Um componente lightbox de visualização de imagens escrito com Vue.js 3 e Typescript, fornecendo funções de rotação, slide de imagens, zoom e redução.'
    }
  }
}
