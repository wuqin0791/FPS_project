importScripts('workbox-sw.prod.v2.1.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "404.html",
    "revision": "aa57a75020aaec1a2ac760460ec46108"
  },
  {
    "url": "build/pkg/common.css",
    "revision": "f8a4a2dc291949af847dd9f768816687"
  },
  {
    "url": "build/pkg/home/index.aio.css",
    "revision": "802f8bcf698b50bb53cdcee1affdc356"
  },
  {
    "url": "build/pkg/runtime.js",
    "revision": "a301951174abdcff08b8743b53b11d7e"
  },
  {
    "url": "home/app.c69b1a2.js",
    "revision": "c69b1a239f0059a4b57415da95c12059"
  },
  {
    "url": "home/components/checkList.0a36c6a.js",
    "revision": "0a36c6a5d087de31a894c61a1487f594"
  },
  {
    "url": "home/components/course.43a53ff.js",
    "revision": "43a53ff0d8d5d9a74a3719e2ff893bc9"
  },
  {
    "url": "home/components/courseAdd.04cfbbe.js",
    "revision": "04cfbbe012fcc5df91bb0d546c8583c8"
  },
  {
    "url": "home/components/detail.7434af9.js",
    "revision": "7434af983625877c3b727cc2b34c476a"
  },
  {
    "url": "home/components/index.afa52fa.js",
    "revision": "afa52fa50a9fcf2021ca14e8197c48b7"
  },
  {
    "url": "home/components/login.890de49.js",
    "revision": "890de49ce56d22b97bbd5f7ef078703a"
  },
  {
    "url": "home/components/register.31ff799.js",
    "revision": "31ff79975e8d6d11ff78e21f06dba62d"
  },
  {
    "url": "home/components/sellerAdd.a4d025c.js",
    "revision": "a4d025c1649e631684084b3a31d23c56"
  },
  {
    "url": "home/components/user.5a15153.js",
    "revision": "5a151535a04651c7c9c64227e7d8a06e"
  },
  {
    "url": "index.html",
    "revision": "86be2e4e704b1abb1ae80eb666c13219"
  },
  {
    "url": "src/common/css/reset.css",
    "revision": "0970fa0b5df80ba152a7d4b481c62e5e"
  },
  {
    "url": "src/common/css/var.css",
    "revision": "90eb760c5696ce3c27031f4b56b4d46e"
  },
  {
    "url": "src/components/footer.cd30cff.js",
    "revision": "cd30cffc3909bc18756effb36fcf4b11"
  },
  {
    "url": "src/components/ProgressBar.289f59b.js",
    "revision": "289f59b529b8d27b7b0881cb2e596848"
  },
  {
    "url": "static/api/account.25a9e4e.js",
    "revision": "25a9e4e808527cedb660ef000898961e"
  },
  {
    "url": "static/api/index.0b20079.js",
    "revision": "0b20079950a95d83e213abc32d1cf2ad"
  },
  {
    "url": "static/api/order.d81f46c.js",
    "revision": "d81f46c8423d07586c4bc08a16416814"
  },
  {
    "url": "static/api/product.8868029.js",
    "revision": "886802975c3566dafb033431d28f86a7"
  },
  {
    "url": "static/api/qiniu.a4ea67d.js",
    "revision": "a4ea67d6e1c8f613938cb879adde7812"
  },
  {
    "url": "static/api/store.3dff43e.js",
    "revision": "3dff43e77077de8e27a455b5d864450d"
  },
  {
    "url": "static/config/base.js",
    "revision": "c62954f068ee96d51aa4e7d8a18f92c8"
  },
  {
    "url": "static/config/development.js",
    "revision": "a737e28e5fed6347d5456f9849d1284d"
  },
  {
    "url": "static/config/production.js",
    "revision": "a737e28e5fed6347d5456f9849d1284d"
  },
  {
    "url": "static/config/test.js",
    "revision": "cc0b1c45c2980fdd954ada8fb51724db"
  },
  {
    "url": "static/dep/mod.js",
    "revision": "75d1f986522da097498717ef6dfc0012"
  },
  {
    "url": "static/lib/china-map.5c7064b.js",
    "revision": "5c7064bcf657c5acb205e773b8fdc28a"
  },
  {
    "url": "static/lib/echarts.min.6dfe02a.js",
    "revision": "6dfe02a98d294c577938ad51416ca8db"
  },
  {
    "url": "static/lib/qiniuUploader.73924c4.js",
    "revision": "73924c404a3fb193e910cbb24fc7b2d6"
  },
  {
    "url": "static/lib/vue-editable.4807c0e.js",
    "revision": "4807c0ebb2e8af08fc64e280f1bf3b43"
  },
  {
    "url": "static/page/home/boot.3f33dd0.js",
    "revision": "3f33dd0585821b145d118ed283f9e276"
  },
  {
    "url": "static/page/home/router.92824c2.js",
    "revision": "92824c252d6e150ecbf0d8caa57b23a7"
  },
  {
    "url": "static/store/home/global.df2bff8.js",
    "revision": "df2bff86ed00ada87eaa9ae94d45c086"
  },
  {
    "url": "static/store/home/index.ab9435b.js",
    "revision": "ab9435b7c66ff679abbe2697384e0412"
  },
  {
    "url": "static/store/home/order.0cb5a53.js",
    "revision": "0cb5a5375b4fb1866e971db1c05461ad"
  },
  {
    "url": "static/sw-fallback.js",
    "revision": "c6775a3c5e8ca5b5d8df4dc915d0cda5"
  },
  {
    "url": "static/sw-register.js",
    "revision": "fe0b11a60d53320c5b15c97840f0d0cb"
  },
  {
    "url": "static/sw.js",
    "revision": "e6d184502348a1bbca143044e0d0392a"
  },
  {
    "url": "static/utils/cookie.53d265e.js",
    "revision": "53d265e6aab1ffc4a214dbeaae55462e"
  },
  {
    "url": "static/utils/fetch.f4ebec5.js",
    "revision": "f4ebec5ac70f943c44f5f6ee94f8f778"
  },
  {
    "url": "static/utils/filters.a0ad045.js",
    "revision": "a0ad0456d4eaac1fac653bf26343eddc"
  },
  {
    "url": "static/utils/index.b1026ed.js",
    "revision": "b1026ed4d95fcc5f0a778c6298bc7632"
  },
  {
    "url": "static/utils/localStorage.0b9cd03.js",
    "revision": "0b9cd036635ded485b1a25cad1eab816"
  },
  {
    "url": "static/utils/report.d74a875.js",
    "revision": "d74a875cc0319afab88f310c32f1632c"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "7din-cache",
  "skipWaiting": true,
  "clientsClaim": true,
  "ignoreUrlParametersMatching": [/^utm_/]
});
workboxSW.precache(fileManifest);
