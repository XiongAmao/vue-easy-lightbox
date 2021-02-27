module.exports = {
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
        ariaLabel: 'Select language'
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言'
      }
    },
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
        '基于Vue.js 3.0 与 TypeScript 构建的图片阅览插件， 提供了旋转、放大、拖拽功能。可自定义各种功能。'
    }
  }
}
