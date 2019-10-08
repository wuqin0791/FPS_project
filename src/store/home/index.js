/**
 * @file store
 * @author zhouqing02
 */

import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
// import store from '@/utils/localStorage';
// import {STORE_EXPIRES} from 'config';
import * as global from './global';
import * as order from './order';

Vue.use(Vuex);

// let expiration = new Date().getTime() + STORE_EXPIRES;

export default new Vuex.Store({
    modules: {
        global,
        order
    },
    // plugins: [createPersistedState({
    //     key: 'DAFY_SEVEND_CARINSURANCE',
    //     paths: ['order', 'medical.cache', 'medical.msg', 'medical.orderDetail'],
    //     getState: key => store.get(key),
    //     setState: (key, state) => store.set(key, state, expiration)
    //     // filter: key => key.type === 'UPDATE_ORDER'
    // })]
});
