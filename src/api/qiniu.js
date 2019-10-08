/**
 * @file api.account
 * @author zhouqing02
 */

import fetch from '@/utils/fetch.js';

/**
 * 获取七牛上传token
 * @return {Promise}
 */

export function getUploadToken() {
    return fetch.get('/qiniu-token');
}
