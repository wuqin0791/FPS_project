
/**
 * @file api.account
 * @author JeanneWu
 * @desc 该文件是所有登录注册方面的接口信息
 */

import fetch from '@/utils/fetch.js';

/**
 * 获取用户信息
 * @return {Promise}
 */

export function getUserInfo() {
    return fetch.get({
        url: 'http://127.0.0.1:3000/user/info'
    });
}

/**
 * @deac 登录信息接口
 * @param  {Object} data 登录信息
 * @param  {String} data.name  姓名
 * @param  {String} data.nick_name  昵称
 * @return {Promise}
 */

export function doLogin(data) {
    return fetch({
        url: '/login',
        method: 'POST',
        data
    });
}

export function doLogout() {
    return fetch({
        url: '/logout',
        method: 'POST'
    });
}

/**
 * @deac 注册信息接口
 * @param  {Object} data 登录信息
 * @param  {String} data.name  姓名
 * @param  {String} data.nick_name  昵称
 * @return {Promise}
 */

export function doRegister(data) {
    return fetch({
        url: '/register',
        method: 'POST',
        data
    })
}

/**
 * @desc 新增菜品接口
 * @param  {Object} data 菜品添加信息
 * @param  {String} data.name  菜品名称
 * @param  {String} data.description  菜品描述
 * @param  {String} data.image  菜品图片
 * @param  {String} data.price  菜品价格
 * @return {Promise}
 */

export function addProduct(data) {
    return fetch({
        url: '/product',
        method: 'POST',
        data
    })
}
