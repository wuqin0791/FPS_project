/**
 * @file fis配置文件
 * @author zhouqing02
 */

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

function buildTest(context) {
    return context.match('/config/test.js', {
            id: 'config'
        })
        .match('**.png', {
            optimizer: fis.plugin('png-compressor')
        })
        .match('*.{js,vue}', {
            optimizer: fis.plugin('uglify-js', {
                compress: {
                    drop_console: true
                }
            })
        })
        .match('**.min.{js,css}', {
            optimizer: null
        })
        .match('*.css', {
            optimizer: fis.plugin('clean-css')
        })
        .match('::image', {
            useHash: true
        })
        .match('**.{vue,js,css}', {
            useHash: true
        });
}

function buildProd(context) {

    var prePath = '/wechat/7din';

    return context.match('/config/production.js', {
            id: 'config'
        })
        .match('*', {
            domain: prePath
        })
        .match('**.png', {
            optimizer: fis.plugin('png-compressor')
        })
        .match('*.{js,vue}', {
            optimizer: fis.plugin('uglify-js', {
                compress: {
                    drop_console: true
                }
            })
        })
        .match('**.min.{js,css}', {
            optimizer: null
        })
        .match('*.css', {
            optimizer: fis.plugin('clean-css')
        })
        .match('::image', {
            useHash: true
        })
        .match('/src/**.{vue,js,css}', {
            useHash: true
        })
        .match('{sw-register.js, sw-fallback.js, *.ico, /static/img/icons/**}', {
            useHash: false
        })
        .match('::packager', {
            packager: fis.plugin('deps-pack', getDepsPackOptions()),
            postpackager: [
                fis.plugin('sw-register', {
                    entry: '/src/page/home/index.html',
                    publicPath: prePath + '/static', // fis3 项目的配置可能将 /src 目录的 js 文件部署到特定路径，可通过此选项进行配置
                    swPrefix: prePath,
                    fallbackFilePath: prePath + '/static/sw-fallback.js'
                }),
                fis.plugin('loader-pwa', {
                    resourceType: 'mod',
                    useInlineMap: true,
                    resourcemapWhitespace: 4,
                    // preload: true,
                    allInOne: {
                        js: function (file) {
                            return "/build/pkg/" + file.subpathNoExt.match(/\/src\/page(\/.*)?/)[1] + ".aio.js";
                        },
                        css: function (file) {
                            return "/build/pkg/" + file.subpathNoExt.match(/\/src\/page(\/.*)?/)[1] + ".aio.css";
                        }
                    }
                })
            ]
        });
}

function getDepsPackOptions() {
    var opts = {
        '/build/pkg/common.css': [
            '/src/base/**.{css,less,scss}',
            '/src/common/**.{css,less,scss}'
        ],
        '/build/pkg/runtime.js': [
            '/dep/mod.js',
            '/node_modules/process/**.js',
            '/node_modules/babel-runtime/**.js',
            '/node_modules/core-js/**.js',
            '/node_modules/axios/**.js',
            '/node_modules/axios/**.js:deps',
            '/node_modules/vue-easytable/**.js',
            '/node_modules/vue-easytable/**.js:deps',
            '/src/page/home/boot.js:deps'
        ]
    };

    var root = path.join(__dirname, '/src/page');

    // function walk(path) {
    //   var paths = fs.readdirSync(path);
    //
    //   paths.forEach(function(item, index) {
    //     var n = path + '/' + item;
    //     var info = fs.statSync(n);
    //     var rPath = path.match(/\/src\/page(\/.*)?/)[1];
    //
    //     if (info.isDirectory()) {
    //       walk(n);
    //     } else {
    //       if (/index\.html/.test(item)) {
    //         console.log(chalk.cyan('待打包资源目录: /src/page' + rPath));
    //         opts['/build/pkg' + rPath + '.bundle.js'] = [
    //           '/src/page' + rPath + '/**.js'
    //         ];
    //         opts['/build/pkg' + rPath + '.bundle.css'] = [
    //           '/src/page' + rPath + '/**.css'
    //         ];
    //       }
    //     }
    //   });
    // }
    //
    // walk(root);

    return opts;
}

// 禁用fis3默认的fis-hook-src
fis.unhook('components');
fis.hook('node_modules');

// FIS全局设定
fis.set('project.md5Connector ', '.');
fis.set('project.ignore', [
    '.git/**',
    '*.bak',
    'node_modules/**',
    'fis-dist/**',
    'fis-conf.js',
    '/*.js',
    '/server/**',
    '/yzpp/**'
]);

// 添加commonjs支持 (需要先安装fis3-hook-commonjs)
fis.hook('commonjs', {
    baseUrl: './',
    paths: {
        '@': '/src',
        component: '/src/components',
        echarts: '/src/lib/echarts.min.js' // 定制版echarts
    },
    extList: ['.js', '.jsx', '.es']
});

fis.match('/node_modules/**.js', {
    useSameNameRequire: true,
    isMod: true
});

fis.match('/node_modules/(**.{eot, woff, ttf, svg})', {
    release: '/static/$1',
});


// release目录指定
fis.match('/src/page/(**)', {
    isMod: true,
    useSameNameRequire: true,
    release: '/$1'
}).match('{/src/(**.js), /api/(**.js), (/config/**.js)}', {
    isMod: true,
    release: '/static/$1'
});

fis.match('/dep/**', {
    isMod: false,
    useMap: true,
    release: '/static/$0'
});

fis.match('/config/development.js', {
    id: 'config',
});

fis.match('/dep/mod.js', {
    isMod: false
});

fis.match(/^\/src\/component\/(.*)$/i, {
    id: '$1'
});

fis.match('src/page/(**.html)', {
    useCache: false
});

fis.match('src/page/home/(**.html)', {
    release: '/$1'
});

fis.match('*.vue', {
    isMod: true,
    rExt: '.js',
    useSameNameRequire: true,
    parser: fis.plugin('vue-component', {
        // vue@2.x runtimeOnly
        runtimeOnly: true, // vue@2.x 有runtimeOnly模式，为ture时，template会在构建时转为render方法， 这里开启后paths中无需指定

        // styleNameJoin
        styleNameJoin: '', // 样式文件命名连接符 `component-xx-a.css`

        extractCSS: false, // 是否将css生成新的文件, 如果为false, 则会内联到js中

        // css scoped
        cssScopedIdPrefix: '_v-', // hash前缀：_v-23j232jj
        cssScopedHashType: 'sum', // hash生成模式，num：使用`hash-sum`, md5: 使用`fis.util.md5`
        cssScopedHashLength: 8, // hash 长度，cssScopedHashType为md5时有效

        // cssScopedFlag: '__vuec__' // 兼容旧的ccs scoped模式而存在，此例子会将组件中所有的`__vuec__`替换为 `scoped id`，不需要设为空
    })
}).match('{*.less, *.vue:less}', {
    parser: fis.plugin('less'),
    postprocessor: fis.plugin('autoprefixer'),
    rExt: '.css'
}).match('{/api/**.js, /src/**.js, /config/**.js, /src/**.vue:js}', {
    parser: fis.plugin('babel-6.x', {
        presets: ['env', 'stage-3'],
        plugins: [
            'transform-runtime',
            'transform-remove-strict-mode',
            'add-module-exports',
            ['component', [{
                'libraryName': 'mint-ui',        // mint-ui 配置同样
                'style': true
            }]]
        ]
    }),
    rExt: '.js'
});

// 添加css和image加载支持
fis.match('*.{js,vue,jsx,ts,tsx,es}', {
    preprocessor: [
        fis.plugin('js-require-css'),
        fis.plugin('js-require-file', {
            useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
        })
    ]
});

fis.match('::packager', {
    // packager: fis.plugin('deps-pack', getDepsPackOptions()),
    postpackager: fis.plugin('loader-pwa', {
        resourceType: 'mod',
        useInlineMap: true,
        resourcemapWhitespace: 4
    }),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
});

// 生产环境下CSS、JS压缩合并
// 使用方法 fis3 release prod
/* eslint-disable fecs-camelcase */

buildProd(fis.media('local'))
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: 'fis-dist'
        })
    })

/* eslint-enable fecs-camelcase */
