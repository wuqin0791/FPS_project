define("src/components/ProgressBar.vue",function(n,t,e){Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{percent:0,show:!1,canSuccess:!0,duration:3e3,height:"2px",color:"#ffca2b",failedColor:"#ff0000"}},methods:{start:function(){var n=this;return this.show=!0,this.canSuccess=!0,this._timer&&(clearInterval(this._timer),this.percent=0),this._cut=1e4/Math.floor(this.duration),this._timer=setInterval(function(){n.increase(n._cut*Math.random()),n.percent>95&&n.finish()},100),this},set:function(n){return this.show=!0,this.canSuccess=!0,this.percent=Math.floor(n),this},get:function(){return Math.floor(this.percent)},increase:function(n){return this.percent=this.percent+Math.floor(n),this},decrease:function(n){return this.percent=this.percent-Math.floor(n),this},finish:function(){return this.percent=100,this.hide(),this},pause:function(){return clearInterval(this._timer),this},hide:function(){var n=this;return clearInterval(this._timer),this._timer=null,setTimeout(function(){n.show=!1,n.$nextTick(function(){setTimeout(function(){n.percent=0},200)})},500),this},fail:function(){return this.canSuccess=!1,this}}},e.exports=t["default"];var i;i=t&&t.__esModule&&t.default?t.default:e.exports,i.render=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"progress",style:{width:n.percent+"%",height:n.height,"background-color":n.canSuccess?n.color:n.failedColor,opacity:n.show?1:0}})},i.staticRenderFns=[],i._scopeId="_v-8fda0303",function(n){var t=document.createElement("style");t.setAttribute("type","text/css"),t.styleSheet?t.styleSheet.cssText=n:t.appendChild(document.createTextNode(n)),document.getElementsByTagName("head")[0].appendChild(t)}("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.progress[_v-8fda0303] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 2px;\n    width: 0;\n    transition: width .2s, opacity .4s;\n    opacity: 1;\n    background-color: #efc14e;\n    z-index: 999999;\n}\n")});