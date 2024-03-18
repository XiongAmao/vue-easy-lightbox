import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue-easy-lightbox',
  description: 'TODO',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Guide', link: '/guide/' }],

    // sidebar: [
    //   {
    //     text: 'Guide',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-e' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        footer: {
          message: 'Released under the MIT License.',
          copyright: `Copyright © 2018-${new Date().getFullYear()} XiongAmao`
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        footer: {
          message: '基于 MIT 许可发布',
          copyright: `版权所有 © 2018-${new Date().getFullYear()} XiongAmao`
        }
      }
    },
    pt: {
      label: 'Português',
      lang: 'pt-BR',
      themeConfig: {
        footer: {
          message: 'Lançado sob licença MIT',
          copyright: `Direitos reservados © 2018-${new Date().getFullYear()} XiongAmao`
        }
      }
    }
  }
})
