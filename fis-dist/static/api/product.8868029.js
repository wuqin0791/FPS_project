define("src/api/product",function(t,e){function u(t){return t&&t.__esModule?t:{"default":t}}function r(t){return n.default({url:"/products",method:"get",params:t})}function d(t){return n.default({url:"/products",method:"post",data:t})}function o(t){return n.default({url:"/products/"+t,method:"delete"})}Object.defineProperty(e,"__esModule",{value:!0}),e.getProduct=r,e.postProduct=d,e.deleteProduct=o;var c=t("src/utils/fetch"),n=u(c)});