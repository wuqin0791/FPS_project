<!--
 * @Description: 基于区块链的转账
 * @Author: JeanneWu
 * @Date: 2018-03-29 15:59:10
 -->
 
# 项目介绍
基于区块链转账的应用

# 项目特点
* 提升 Web App 的体验，能给用户原生应用的体验
* 支持离线加载,即使在不稳定的网络环境下，也能瞬间加载并展现。
* 类似设备上的原生应用，具有沉浸式的用户体验，用户可以添加到桌面
* 有过度动画，缓解首屏加载过慢带来的不好体验。
* 自定义启动画面，可以设置桌面的图标和URL
* 引入mint-ui给移动端开发带来便捷快速
* fis3 后台启动服务器，热更新，减少刷新的时间成本。

# fis3-vue2-pwa-starter

> fis3+vue2+pwa starter template

## 目录结构

``` bash
demo
├── config/                 不同环境下的全局配置
├── dep/                    三方依赖资源（非NPM安装）
├── mock/                   mock配置
├── node_modules/
└── src/
    ├── components/         基础公用组件
    ├── common/             其他通用资源（样式变量/模板）
    ├── lib/                零散的业务使用三方库（非模块化）
    ├── page/               页面vue组件
    └── store/              vuex
├── static/                 静态资源
├── utils/                  辅助工具
├── deploy.js               远程部署配置
├── workbox-cli-config.js   workbox-build配置
├── .editorconfig, .gitignore
└── LINCENSE, package.json, README.md
```

* /static/sw-fallback.js 降级标志文件路径，插件将在入口文件以 &lt;script&gt; 形式插入，默认标志名为window.SW_FALLBACK，若该值为 true，则 sw-register.js 不会引入执行，注册的 service worker 会被unregister
* workbox-cli-config.js 用来主动分析需缓存资源并生成service-worker.js。
* /static/manifest.json 里面引用的图片不应添加hash。


## npm 相关命令

``` bash
# 安装工程依赖
npm install

# 在本地启动调试 server
fis3 server start
npm run dev

# 构建测试环境产物并推送到测试服务器
npm run test

# 构建线上生产环境产物并推送到生产服务器
npm run build

```

## 相关资料

* https://lavas.baidu.com
* https://developers.google.com/web/tools/workbox/modules/workbox-build
* https://github.com/chou0212/fis3-vue2-bootstrap
