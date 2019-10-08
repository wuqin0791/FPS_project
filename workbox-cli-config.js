/**
 * @file workbox-build配置文件 https://developers.google.com/web/tools/workbox/modules/workbox-build
 * @author zhouqing02
 */

var path = require('path');

module.exports = {
    // swSrc: path.join(__dirname, 'static/sw.js'),
    swDest: "fis-dist/service-worker.js",
    globDirectory: "./fis-dist",
    globPatterns: ['**/*.{html,js,css,eot,svg,ttf,woff}'],
    globIgnores: [
        'node_modules/**', 'sw-register.js', '**/*.map'
    ],
    cacheId: '7din-cache',
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    ignoreUrlParametersMatching: [/^utm_/],
    skipWaiting: true,
    clientsClaim: true
};
