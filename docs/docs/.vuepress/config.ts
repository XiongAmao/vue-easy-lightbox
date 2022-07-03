const {
  registerComponentsPlugin
} = require('@vuepress/plugin-register-components')
const { defaultTheme } = require('@vuepress/theme-default')
const { path } = require('@vuepress/utils')

module.exports = {
  base: '/vue-easy-lightbox/',
  title: 'vue-easy-lightbox',
  description: '',
  port: 8089,
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ],
  theme: defaultTheme({
    repo: 'https://github.com/XiongAmao/vue-easy-lightbox',
    locales: {
      '/': {
        selectLanguageText: 'Language',
        selectLanguageAriaLabel: 'Select language',
        selectLanguageName: 'English',
        navbar: [
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
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        selectLanguageName: '简体中文',
        navbar: [
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
        selectLanguageText: 'Idiomas',
        selectLanguageAriaLabel: 'Selecione o idioma',
        selectLanguageName: 'Português',
        label: 'Português',
        selectText: 'Idiomas',
        ariaLabel: 'Selecione o idioma',
        navbar: [
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
    },
    themePlugins: {
      mediumZoom: false
    }
  }),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'vue-easy-lightbox',
      description:
        'A Vue.js 3.0 image lightbox component with Zoom / Drag / Rotate / Switch .'
    },
    '/zh/': {
      lang: '中文',
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
