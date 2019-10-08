const Service = require('../service');
const utils = require('../utils');

const Login  = {
    async checkAuth (ctx, next) {
        ctx.body = utils.handleResult(2000, {
            userinfo: Object.assign(ctx.session.user_info || {}, {
                token: ctx.session.token
            })
        });
    },
    async login (ctx, next) {
        try {
            const data = ctx.request.body;
            const result = await Service.LoginService.checkLogin(data);
            if (result.code === 2000) {
                ctx.session.token = result.data.token;
                ctx.session.u_id = result.data.id;
                ctx.session.user_info = {name: result.data.name, nick_name: result.data.nick_name, type: result.data.type};
            }
            ctx.body = result;
        } catch (err){
            ctx.body = err
        }

    },
    async logout (ctx, next) {
        ctx.session = null;
        ctx.body = utils.handleResult(2000);
    },
    async register (ctx, next) {
        try {
            const data = ctx.request.body;
            const result = await Service.LoginService.register(data);
            ctx.body = result;
        } catch (err){
            ctx.body = err
        }

    }
}

module.exports = Login;
