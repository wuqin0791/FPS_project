/**
 * @file 七牛相关接口
 * @author zhouqing02
 */

const qiniu = require('qiniu');
const uuidv4  = require('uuid/v4');
const utils = require('../utils');
const AK = 'pkhqEa4577QheNN7louy_ZZDYaH9sQx0XVEIsn1Y';
const SK = 'djx9xZilTxnmrbKEJCg35Hmi1s2UYwjyUTDLAvop';

let mac = new qiniu.auth.digest.Mac(AK, SK);
let tokenKey = '';
let options = {
    scope: '7din-img'
};

module.exports = {
    async getToken(ctx, next) {
        let upToken = ctx.cookies.get(tokenKey);
        try {
            if (!upToken) {
                let putPolicy = new qiniu.rs.PutPolicy(options);
                upToken = putPolicy.uploadToken(mac);
                tokenKey = uuidv4();
                // 七牛获取一次token有效时间默认为1小时，这里重叠1分钟避免存在失效的可能。
                ctx.cookies.set(tokenKey, upToken, {
                    maxAge: 1000 * 60 * 59
                });
            }
            ctx.body = {
                code: 2000,
                token: upToken
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}
