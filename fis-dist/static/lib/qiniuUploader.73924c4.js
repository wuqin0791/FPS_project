define("src/lib/qiniuUploader",function(e,t,n){function o(e){return e&&e.__esModule?e:{"default":e}}function i(e){this.el="",this.config=a.default({token:"",tokenPort:"",accept:"image/png,image/gif,image/jpg,image/jpeg",isPrivate:!1,begin:"",succeed:"",fail:""},e),this.init()}Object.defineProperty(t,"__esModule",{value:!0});var c=e("node_modules/babel-runtime/core-js/promise"),u=o(c),f=e("node_modules/babel-runtime/core-js/object/assign"),a=o(f),l=e("node_modules/axios/index"),r=o(l);i.prototype.qiniuUploadUrl="",i.prototype.init=function(){this.qiniuUploadUrl="https:"===window.location.protocol?this.config.isPrivate?"https://up-z2.qbox.me":"https://up.qbox.me":this.config.isPrivate?"http://up-z2.qiniu.com":"http://up.qiniu.com",this.config.token||this.getToken()},i.prototype.getToken=function(){var e=this.config.tokenPort;r.default.post(e).then(function(e){var t=e.data;t&&t.uptoken&&(this.config.token=t.uptoken)}.bind(this)).catch(function(){})},i.prototype.selectFile=function(){var e=this;return new u.default(function(t,n){e.el=e.el||document.createElement("input"),e.el.type="file",e.el.accept=e.config.accept,e.el.click(),e.el.onchange=function(){var o=e.el.files[0];return e.el.files.length<=0?(n(),!1):(e.el.value="",void t(o))}})},i.prototype.uplodaFile=function(e){var t=this;return new u.default(function(n,o){var i=new FormData;i.append("token",t.config.token),i.append("file",e),r.default.post(t.qiniuUploadUrl,i).then(function(e){n(e)}).catch(function(e){401===e.response.status&&t.getToken(),o(e.response.data.error)})})},i.prototype.upload=function(e){var t=this;return new u.default(function(n,o){return t.config.token?(t.config=a.default(t.config,e),t.config.begin&&"function"==typeof t.config.begin&&t.config.begin(),void t.selectFile().then(function(e){return t.uplodaFile(e)}).then(function(e){var o=e.data.key;t.config.succeed&&"function"==typeof t.config.succeed&&t.config.succeed(o),n(o)}).catch(function(e){t.config.fail&&"function"==typeof t.config.fail&&t.config.fail(e),o(e)})):(o("缺少token"),t.getToken(),!1)})},t.default=i,n.exports=t["default"]});