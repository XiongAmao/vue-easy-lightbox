
# 需求
开发一个lightbox库
1. 提供按需引入，全局引入
2. 可以使用webpack-dev-server进行开发

webpack 打包配置中，入口文件会直接调用，同时将入口文件也做一个`export` 导出，那么就可以做插件的引入了

栗子：
```
import Icon from './IconFont.vue'
//  引入单文件
let installed = false

const install = {
    installed: false,
    install(Vue, options = {}) {
        if (this.installed) return
        this.installed = true
        Vue.component('icon', Icon)
    }
}

Icon.install = install.install
// 为单文件对象赋予一个属install属性，以便可以作为插件引入

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Icon)
}
// 调用

module.exports = module.exports.default = Icon
export default Icon

```

TODO：
- [ ] ~~import from 到底from了什么~~ 对于vue而言，使用import/export 仍需要babel转成require形式 
- [x] webpack如何配置入口文件实现按需引入和全局引入
- [ ] css和其他资源的输出
- [ ] 开发环境 