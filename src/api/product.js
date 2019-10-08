/**
 * @file api.product
 * @author JeanneWu
 * @desc 该文件是商家下的菜品相关接口
 */

import fetch from '@/utils/fetch.js';

/**
 * @desc 拉取菜品信息接口
 * @param  {Object} data 菜品信息
 * @param  {String} data.id  商家id
 * @return {Promise}
 */

export function getProduct(data) {
    return fetch({
        url: '/products',
        method: 'get',
        params: data
    })
}

/**
 * @desc 新增商品接口
 * @param  {Object} data 商品信息
 * @param  {String} data.name  商品名字
 * @param  {String} data.description  商品描述
 * @param  {String} data.image  商品头图
 * @param  {String} data.price  商品价格
 * @return {Promise}
 * 返回信息
 */

export function postProduct(data) {
    return fetch({
        url: '/products',
        method: 'post',
        data
    })
}

/**
 * @desc 删除菜品接口
 * @param  {String} data.id  菜品id
 * @return {Promise}
 */
export function deleteProduct(id) {
    return fetch({
        url: `/products/${id}`,
        method: 'delete',
    })
}
