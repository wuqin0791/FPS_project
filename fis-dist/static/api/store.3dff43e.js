define("src/api/store",function(e,t){function r(e){return e&&e.__esModule?e:{"default":e}}function u(e){return d.default({url:"/stores",method:"POST",data:e})}function o(e){return d.default({url:"/stores",method:"get",params:e})}function n(e){return d.default({url:"/stores/"+e,method:"delete"})}Object.defineProperty(t,"__esModule",{value:!0}),t.postStores=u,t.getStores=o,t.deleteStore=n;var s=e("src/utils/fetch"),d=r(s)});