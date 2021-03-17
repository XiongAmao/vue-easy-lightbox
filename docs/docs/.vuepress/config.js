module.exports = {
  base: '/vue-easy-lightbox/',
  title: 'vue-easy-lightbox',
  description: '',
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
          }
        ]
      }
    }
    // '/': {
    //   sidebar: 'auto',
    // },
    // '/zh/': {
    //   sidebar: 'auto'
    // }
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
    }
  }
}
