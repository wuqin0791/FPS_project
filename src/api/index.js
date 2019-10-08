/**
 * @file api.account
 * @author zhouqing02
 */

import * as account from './account';//登录相关接口
import * as qiniu from './qiniu';
import * as store from './store';//商家相关接口
import * as product from './product'; //菜品相关接口
import * as order from './order'; //获取下单情况的接口
export default {
    account,
    qiniu,
    store,
    product,
    order
}
