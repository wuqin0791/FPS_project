define("src/api/order",function(e,r){function t(e){return e&&e.__esModule?e:{"default":e}}function d(e){return f.default({url:"/orders",method:"get",params:e})}function u(e){return f.default({url:"/orders",method:"POST",data:e})}function o(e){return f.default({url:"/orders/"+e.id,method:"POST",data:e})}function n(e){return f.default({url:"/tools/export",method:"POST",data:e})}Object.defineProperty(r,"__esModule",{value:!0}),r.getOrder=d,r.postOrder=u,r.updateRemark=o,r.exportOrder=n;var a=e("src/utils/fetch"),f=t(a)});