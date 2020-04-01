<!--
 * @Description: This is a markdown file
 * @Author: JeanneWu
 * @Date: 2018-03-29 15:59:10
 -->
# fis3-vue2-pwa-starter

> fis3+vue2+pwa starter template

## 目录结构

``` bash
project
├── README.md
├── config                      不同环境下的全局配置
│   ├── base.js
│   ├── development.js
│   ├── production.js
│   └── test.js
├── data_analysis               数据分析模块
│   ├── Dist_edge100.png
│   ├── Dist_edge50.png
│   ├── analyze_transac.py
│   └── raw_view.png
├── dep                         三方依赖资源（非NPM安装）
│   └── mod.js
├── deploy.js
├── favicon.ico
├── fis-conf.js
├── fis-dist                    编译后的文件
├── mock                        mock配置
│   ├── login.json
│   └── server.conf
├── package-lock.json
├── package.json
├── server                      nodejs-express服务
│   ├── README.md
│   ├── node
│   ├── package.json
│   └── web
├── src                         
│   ├── api
│   ├── common
│   ├── components              基础公用组件
│   ├── lib
│   ├── page                    页面vue组件
│   ├── store                   vuex状态管理
│   └── utils
├── static                      静态资源
│   ├── img
│   ├── manifest.json
│   ├── sw-fallback.js
│   └── sw.js
├── workbox-cli-config.js       workbox-build配置
├── yarn.lock
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
