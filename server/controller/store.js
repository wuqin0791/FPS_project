/**
 * @file 商品控制
 * @author zhouqing02
 */

const service = require('../service');
const utils = require('../utils');
const db = require('../lib/db');

module.exports = {
    async show(ctx, next) {
        try {
            ctx.body = await service.StoreService.find(ctx.params.id);
        } catch (err) {
            ctx.body = err
        }
    },
    async list(ctx, next) {
        try {

            ctx.query.status = ctx.query.status || 1;
            let sql = 'SELECT * FROM store_list';
            // query-string filters?
            // if (ctx.querystring) {
                let filter = Object.keys(ctx.query).map(function(q) {
                    return `${q} = ${ctx.query[q]}`;
                }).join(' and ');
                sql += ' WHERE ' + filter;
            // }
            sql += ' ORDER BY name';

            let conn = db.getConnection();
            let stores = await utils.query(conn, conn.query, sql);
            db.closeConnection(conn);

            if (!stores.length) {
                ctx.body = utils.handleError(204, '暂无数据');
                return;
            }

            // 重构数据
            let ret = stores.map(item => {
                return {
                    name: item.name,
                    phone: item.phone,
                    description: item.description,
                    status:item.status,
                    logo: item.logo,
                    _id: item.id,
                    _uri: '/stores/' + item.id
                }
            });

            ctx.body = utils.handleResult(2000, ret);

        } catch (e) {
            switch (e.code) {
                case 'ER_BAD_FIELD_ERROR':
                    ctx.throw(403, 'Unrecognised Store field');
                    break;
                default:
                    throw e;
            }
        }
    },
    async create(ctx, next) {
        // Forbidden
        console.log(ctx.header,'ctx.ip ===== ** ');
        console.log(ctx.session,'ctx.session.user_info.type');
        if (ctx.session.user_info.type !== 2) {
            ctx.throw(403, 'Admin auth required');
        }
        try {
            let data = ctx.request.body;
            let ret = await service.StoreService.insert(data);
            ctx.body = ret;
        } catch (err) {
            ctx.body = err
        }

    },
    async remove(ctx, next) {
        // Forbidden
        if (ctx.session.user_info.type !== 2) {
            ctx.throw(403, 'Admin auth required');
        }
        try {
            let ret = await service.StoreService.update(ctx.params.id, { status: 0 });
            ctx.body = utils.handleResult(2000, ret);
        } catch (err) {
            ctx.body = err
        }
    }
}
