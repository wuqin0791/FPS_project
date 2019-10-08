/**
 * @file api.store
 * @author JeanneWu
 * @desc 该文件是所有商家方面的接口信息
 */

import fetch from '@/utils/fetch.js';

/**
 * @desc 新增商家接口
 * @param  {Object} data 商家信息
 * @param  {String} data.name  商铺名称
 * @param  {String} data.description  商家描述
 * @param  {String} data.image  商家头图
 * @param  {String} data.phone  商家电话
 * @return {Promise}
 */

export function postStores(data) {
    return fetch({
        url: '/stores',
        method: 'POST',
        data
    })
}

/**
 * @desc 拉取商家列表接口
 * @return {Promise}
 * 返回信息
 * @param  {Object} data 商家信息
 * @param  {String} data.name  商铺名字
 * @param  {String} data.description  商家描述
 * @param  {String} data.image  商家头图
 * @param  {String} data.phone  商家电话
 */

export function getStores(data) {
    return fetch({
        url: '/stores',
        method: 'get',
        params: data
    })
}

/**
 * @desc 删除商家列表接口
 * @param  {String} data.id  商铺id
 * @return {Promise}
 */
export function deleteStore(id) {
    return fetch({
        url: `/stores/${id}`,
        method: 'delete',
    })
}
