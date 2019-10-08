/**
 * @file api.order
 * @author JeanneWu
 * @desc 该文件是所有商家方面的接口信息
 */

import fetch from '@/utils/fetch.js';

/**
 * @desc 查询订单接口
 * @param  {Object} data 订单信息
 * @param  {String} data.name  用户名称
 * @param  {String} data.create_time  订单创建时间
 * @return {Promise}
 */

export function getOrder(data) {
    return fetch({
        url:"/orders",
        method: 'get',
        params: data
    })
}

/**
 * @desc 新增订单接口
 * @param  {Object} data 订单信息
 * @param  {String} data.order_no  订单号
 * @param  {String} data.order_price  订单价格
 * @param  {String} data.order_name  菜名
 * @return {Promise}
 */

export function postOrder(data) {
    return fetch({
        url:"/orders",
        method: 'POST',
        data
    })
}

/**
 * @desc 获取订单支付二维码
 * @param  {Object} data            订单信息
 * @param  {String} data.order_id   订单id
 * @param  {String} data.name       商品名
 * @param  {String} data.price      价格(分)
 * @return {Promise}
 */

// export function getQrcode(data) {
//     return fetch({
//         url: '/orders/qrcode',
//         method: 'POST',
//         data
//     });
// }

/**
 * @desc 更新订单备注
 * @param  {Object} data 订单信息
 * @param  {String} data.id  订单号
 * @param  {String} data.remark  订单备注
 * @return {Promise}
 */

export function updateRemark(data) {
    return fetch({
        url: `/orders/${data.id}/remark`,
        method: 'POST',
        data
    })
}

export function exportOrder(data) {
    return fetch({
        url:"/tools/export",
        method: 'POST',
        data
    })
}
