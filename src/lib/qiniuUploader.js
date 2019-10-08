/**
 * Created by chenbo on 2017/9/18.
 *
 * 1.引入： import Uploader from '@/qiniuUploader';
 * 2.实例化 let uploader = new Uploader(token、tokenPort必须传一个);
 * 3.上传：uploader.upload().then((key)=>{上传成功返回七牛文件key});
 *
 * 由于每个项目需求和UI不同，所以尽量解耦，去掉了加载和上传的动画，需要的同学可以在回调中加入，或者修改源码统一实现
 * 最新修改2018-3-28--兼容私有空间
 */
import axios from 'axios';
function Uploader (options) {
    this.el = '';
    this.config = Object.assign({
        token: '', //七牛token
        tokenPort: '', //获取七牛token的接口，和token二选一
        accept: 'image/png,image/gif,image/jpg,image/jpeg', //可上传文件的类型,
        isPrivate: false,//是否是私有空间
        begin: '', //开始上传回调
        succeed: '', //上传成功回调，等同于then
        fail: '' //上传失败回调，等同于catch
    }, options);
    this.init();
}

Uploader.prototype.qiniuUploadUrl = '';

Uploader.prototype.init = function () {
    if (window.location.protocol === 'https:') {
        this.qiniuUploadUrl = this.config.isPrivate ? 'https://up-z2.qbox.me' : 'https://up.qbox.me';
    } else {
        this.qiniuUploadUrl = this.config.isPrivate ? 'http://up-z2.qiniu.com' : 'http://up.qiniu.com';
    }
    if (!this.config.token) {
        this.getToken();
    }
};

Uploader.prototype.getToken = function () {
    let url = this.config.tokenPort;
    axios.post(url)
        .then(function (res) {
            let ret = res.data;
            if (ret && ret.uptoken) {
                this.config.token = ret.uptoken;
            } else {
                console.log('缺少token');
            }
        }.bind(this))
        .catch(function (error) {
            console.log('获取token失败');
        });
};

Uploader.prototype.selectFile = function () {
    return new Promise ((resolve, reject) => {
        this.el = this.el || document.createElement('input');
        this.el.type = 'file';
        this.el.accept = this.config.accept;
        this.el.click();
        this.el.onchange = () => {
            let file = this.el.files[0];
            if (this.el.files.length <= 0) {
                reject();
                return false;
            }
            this.el.value = '';
            resolve(file);
        };
    });
};

Uploader.prototype.uplodaFile = function (file) {
    return new Promise((resolve, reject) => {
        let data = new FormData();

        data.append('token', this.config.token);
        data.append('file', file);

        axios.post(this.qiniuUploadUrl, data)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.getToken();
                }
                reject(error.response.data.error);
            });
    });
};

Uploader.prototype.upload = function (options) {
    return new Promise ((resolve, reject) => {
        if (!this.config.token) {
            reject('缺少token');
            this.getToken();
            return false;
        }
        this.config = Object.assign(this.config, options);
        this.config.begin && typeof this.config.begin === 'function' && this.config.begin();
        this.selectFile()
            .then((file) => {
                return this.uplodaFile(file);
            })
            .then ((res) => {
                let key = res.data.key;
                console.log('上传成功');
                this.config.succeed && typeof this.config.succeed === 'function' && this.config.succeed(key);
                resolve(key);
            })
            .catch((err) => {
                console.log('上传失败');
                this.config.fail && typeof this.config.fail === 'function' && this.config.fail(err);
                reject(err);
            })
    });
};

export default Uploader;
