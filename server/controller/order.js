/**
 * @file 商品控制
 * @author zhouqing02
 */

const service = require('../service');
const utils = require('../utils');
const db = require('../lib/db');
const crypto = require('crypto');

module.exports = {
    async show(ctx, next) {
        try {
            ctx.body = await service.OrderService.find(ctx.params.id);
        } catch (err) {
            ctx.body = err
        }
    },
    async list(ctx, next) {
        try {
            ctx.query.status = ctx.query.status || 1;
            let sql = 'SELECT * FROM d_order';

            let order_by = ctx.query.order_by || 'order_name';

            delete ctx.query.order_by;

            let filter = Object.keys(ctx.query).map(function(q) {
                if (q === 'order_by') {
                    return '';
                }
                if (q === 'order_time') {
                    return `${q} BETWEEN "${ctx.query[q]} 00:00:00" AND "${ctx.query[q]} 23:59:59"`;
                }
                if (q === 'order_remark') {
                    return `${q} = "${ctx.query[q]}\"`;
                }
                return `${q} = ${ctx.query[q]}`;
            }).join(' and ');

            sql += ' WHERE ' + filter;
            sql += ` ORDER BY ${order_by}`;

            console.log(sql,"sql === ");
            let conn = db.getConnection();
            let orders = await utils.query(conn, conn.query, sql);
            db.closeConnection(conn);

            if (!orders.length) {
                ctx.body = utils.handleError(204, '暂无数据');
                return;
            }

            // 重构数据
            let ret = orders.map(item => {
                return {
                    _id: item.id,
                    order_name: item.order_name,
                    order_price: item.order_price,
                    order_product: item.order_product,
                    order_remark: item.order_remark,
                    order_time:item.order_time.toString(),
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
        let data = ctx.request.body;
        let orderDate = new Date(data.order_time);
        let now = new Date();

        if (!data.order_store_id) {
            let productItem = await service.ProductService.find(data.product_id);
            data.order_store_id = productItem.store_id;
        }

        // 超过10点后不能订当日午餐
        if (orderDate.getDay() === now.getDay() && now.getHours() > 9) {
            ctx.body = utils.handleError(4005, '超过10点后不能订当日午餐');
            return;
        }

        try {
            ctx.body = await service.OrderService.insert(data);
        } catch (err) {
            ctx.body = err
        }
    },
    async updateRemark(ctx, next) {
        let orderId = ctx.params.id;
        let data = ctx.request.body;
        let username = ctx.session.user_info.name;

        try {
            let order = await service.OrderService.find(orderId);
            if (order && (order.order_name == username)) {
                let ret = await service.OrderService.update(orderId, {
                    order_remark: data.remark
                });
                ctx.body = utils.handleResult(2000, ret);
            } else {
                ctx.body = utils.handleError(4003, '非法操作');
            }
        } catch (err) {
            ctx.body = err
        }
    },
    /**
        {
            "tradeNo": "E20180201105656001353613-6377801",
            "orderId": "1515174485676262",
            "payment": 10,
            "status": "TRADE_SUCCESS",
            "sign": "c857c0f8d52ae9713a77b5c07dda93dc",
            "time": "1517457474"
        }
        sign 是time,tradeNo,orderId,payment,status,SELF_SECRET使用"|"拼接字符串的 MD5 特征值，请在状态接收端按此逻辑进行校验数据合法性
     */
    async updateStatus(ctx, next) {
        const data = ctx.request.body;
        const orderId = data.orderId;
        const signStr = [data.time, data.tradeNo, orderId, order.payment.toString(), order.status, '7dinner'].join('|');
        const md5 = crypto.createHash('md5');
        const sign = md5.update(signStr, 'utf8').digest('hex');

        if (sign !== data.sign) {
            ctx.body = utils.handleError(4003, '非法操作');
            return;
        }

        try {
            let order = await service.OrderService.find(orderId);
            let ret = await service.OrderService.update(orderId, {
                status: data.status === 'WAIT_SELLER_SEND_GOODS' ? 2 : 1
            });
            ctx.body = utils.handleResult(2000, ret);
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
            let ret = await service.OrderService.update(ctx.params.id, { status: 0 });
            ctx.body = utils.handleResult(2000, ret);
        } catch (err) {
            ctx.body = err
        }
    }
}
