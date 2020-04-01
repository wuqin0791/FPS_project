
# bootstrap + jquery + web3 + express 

一定要提前生成一个rpc接口，否则服务不起作用


## 目录结构

``` bash
demo
├── common/                 发送请求的success和fail的封装
├── index.html              主入口
├── package.json            npm包管理，脚本运行
├── node_modules/           包依赖安装的地方
└── test.js/                node开启服务

├── README.md               readme文件
├── node                    后端服务
│   ├── app.js              入口文件
│   ├── common              
│   │   └── tool.js         公共组件，ajax封装
│   └── sendData.js         接口信息
├── package.json            package install 信息
└── web                     前端模块
    ├── index.html          主页
    ├── js
    │   ├── data.js
    │   ├── init.js         首页的动画效果
    │   └── result.js
    ├── result.html
    └── submit.html
```

## 环境
``` bash
node -v

node v7.10.1 (npm v4.2.0)

```

## npm 相关命令 

``` bash
# 安装工程依赖
npm install

# node开启服务
npm run start

```



## 相关资料

* https://web3.tryblockchain.org/Web3.js-api-refrence.html
* http://expressjs.jser.us/4x_zh-cn/api.html
