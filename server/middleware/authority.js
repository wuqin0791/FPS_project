const db = require('../lib/db');
const utils = require('../utils');
const config = require('../config/config');

const Authority = {
    async checkAuth (ctx, next) {
        const sess = ctx.session,
              token = ctx.request.body.token || '';
        if (/login|register|auth/.test(ctx.originalUrl)) {
            await next()
        } else {
            if (sess.u_id && sess.user_info) {
                // const conn = db.getConnection();
                // const sql = `select name, token from order_user where id= ${sess.u_id}`;
                // const userInfo = await utils.query(conn, conn.query, sql);
                // if (token === userInfo[0].token && sess.user_info.name === userInfo[0].name) {
                //     await next();
                // } else {
                //     ctx.body = {
                //         code: 4003,
                //         msg: '无权限，请联系管理员'
                //     };
                //     return false;
                // }
                await next();
            } else {
                ctx.body = {
                    code: 401,
                    msg: '登录失效，请重新登录'
                };
                return false;
            }
        }

    },

    async checkIp (ctx, next) {
        let ip = ctx.header['x-real-ip'];
        // 只有指定IP才能进行操作
        if (config.adminIps.includes(ip)) {
            await next();
        } else {
            ctx.body = utils.handleError('4001', '请证明你是蓝妹妹！');
        }
    }
};
module.exports = Authority;
