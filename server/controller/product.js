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
            ctx.body = await service.ProductService.find(ctx.params.id);
        } catch (err) {
            ctx.body = err
        }
    },
    async list(ctx, next) {
        try {

            // 有store_id 参数
            if (ctx.params.store_id) {
                ctx.query.store_id = ctx.params.store_id;
            }

            ctx.query.status = ctx.query.status || 1;

            let sql = 'SELECT * FROM product';
            // query-string filters?
            // if (ctx.querystring || ctx.params.store_id) {
                let filter = Object.keys(ctx.query).map(function(q) {
                    return `${q} = ${ctx.query[q]}`;
                }).join(' AND ');
                sql += ' WHERE ' + filter;
            // }
            sql += ' ORDER BY name';

            let conn = db.getConnection();
            let products = await utils.query(conn, conn.query, sql);
            db.closeConnection(conn);

            if (!products.length) {
                ctx.body = utils.handleError(204, '暂无数据');
                return;
            }

            // just id & uri & name attributes in list
            let ret = products.map(item => {
                return {
                    name: item.name,
                    image: item.image,
                    description: item.description,
                    price: item.price,
                    stock: item.stock,
                    status: item.status,
                    store_id: item.store_id,
                    _id: item.id,
                    _uri: '/products/' + item.id
                }
            });

            ctx.body = utils.handleResult(2000, ret);

        } catch (e) {
            switch (e.code) {
                case 'ER_BAD_FIELD_ERROR':
                    ctx.throw(403, 'Unrecognised Product field');
                    break;
                default:
                    throw e;
            }
        }
    },
    async create(ctx, next) {
        // Forbidden
        // if (ctx.session.user_info.type !== 2) {
        //     ctx.throw(403, 'Admin auth required');
        // }
        try {
            let data = ctx.request.body;
            let ret = await service.ProductService.insert(data);
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
            let ret = await service.ProductService.update(ctx.params.id, { status: 0 });
            ctx.body = utils.handleResult(2000, ret);
        } catch (err) {
            ctx.body = err
        }

    }
}
