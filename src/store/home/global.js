/**
 * @file store.home
 * @author zhouqing02
 */

import cookie from '@/utils/cookie';
import store from '@/store/home';
import api from '@/api';
import fetch from "@/utils/fetch.js";

export const state = {
    isLoading: false,
    docTitle: '',
    upToken: '',
    userinfo: {},
    storeList: [],
    productList: [],
    curStoreId: '',
    curProduct: '',
    userList: ''
};

export const getters = {
    uid: state => state.userinfo.userId,
    userinfo: state => state.userinfo,
    upToken: state => state.upToken,
    storeList: state => state.storeList,
    productList: state => state.productList,
    curStoreId: state => state.curStoreId,
    curProduct: state => state.curProduct,
    userList: state => state.userList
};

export const actions = {
    LOGIN({ commit }, data) {
         return fetch({
            url: "http://127.0.0.1:3000/user/login",
            method: "post",
            data
          }).then(res => {
            console.log(res);
            commit("SET_UPTOKEN", res.token);
            return res;
          });
    },
    LOGOUT({ commit }) {
        return api.account.doLogout().then(() => {
            //  store.replaceState({});
            commit('SET_USER_INFO', {});
            //  cookie.remove('SESS');
            // window.location.reload(true);
        })
    },
    FETCH_USER_INFO({commit} , data){
        console.log(data.token, "global upTaken");
        return fetch({
            url: "http://127.0.0.1:3000/user/info",
            headers: {
                token:data.token
            }
          }).then(res => {
            console.log(res);
            commit("SET_USER_INFO", res);
            return res;
          });
    },
    FETCH_ALL_USER_INFO({commit}, data){
        console.log(data);
        return fetch({
            url: "http://127.0.0.1:3000/user/all",
            method: "get",
            headers: {
                token:data
            }
          }).then(res => {
            console.log(res);
            commit("SET_USER_LIST", res);
            return res;
          });
    },
    FETCH_UPLOAD_TOKEN({ commit, data }) {
        // fetch({
        //     url: "http://127.0.0.1:3000/user/login",
        //     method: "post",
        //     data
        //   }).then(res => {
        //         return commit('SET_UPTOKEN', res.token); ;
        //   });
    },
    FETCH_STORE_LIST({ commit }) {
        return api.store.getStores().then(res => {
            commit('SET_STORE_LIST', res.data.data);
        });
    },
    FETCH_PRODUCT_LIST({ commit, state }, id) {
        return api.product.getProduct({ store_id: id }).then(res => {
            commit('SET_PRODUCT_LIST', res.data.data);
            commit('SET_CURRENT_STORE_ID', id);
        });
    },
    async FETCH_PRODUCT_ITEM({ commit, state }, id) {
        let product = state.productList.find(item => item._id === id)
            || (await api.product.getProduct({ id })).data.data[0];

        commit('SET_CUR_PRODUCT', product);
        commit('SET_CURRENT_STORE_ID', product.store_id);
        return product;
    },
    ADD_STORE({ commit }) {
        return api.store.postStores().then(res => {
            commit('ADD_STORE', res.data);
        });
    },
    DE_STORE({ commit }, storeId) {
        return api.store.deleteStore(storeId).then(() => {
            commit('DE_STORE', storeId);
        });
    },
    ADD_PRODUCT({ commit }) {
        return api.product.postProduct().then(res => {
            commit('ADD_PRODUCT', res.data);
        });
    },
    DE_PRODUCT({ commit }, productId) {
        return api.product.deleteProduct(productId).then(() => {
            commit('DE_PRODUCT', productId);
        });
    }
};

export const mutations = {
    UPDATE_LOADING_STATUS: (state, payload) => {
        state.isLoading = payload.isLoading;
    },
    SET_TITLE: (state, title) => {
        state.docTitle = title;
    },
    SET_USER_INFO: (state, payload) => {
        state.userinfo = payload;
    },
    SET_UPTOKEN: (state, payload) => {
        console.log(payload,'upToken == ');
        state.upToken = payload;
    },
    SET_STORE_LIST: (state, payload) => {
        state.storeList = payload;
    },
    SET_USER_LIST: (state, payload) => {
        state.userList = payload;
    },
    SET_PRODUCT_LIST: (state, payload) => {
        state.productList = payload;
    },
    SET_CURRENT_STORE_ID: (state, payload) => {
        state.curStoreId = payload;
    },
    SET_CUR_PRODUCT: (state, payload) => {
        state.curProduct = payload;
    },
    ADD_STORE: (state, payload) => {
        state.storeList.push(payload);
    },
    DE_STORE(state, storeId) {
        state.storeList.splice(state.storeList.findIndex(item => item._id === storeId), 1);
    },
    ADD_PRODUCT: (state, payload) => {
        state.productList.push(payload);
    },
    DE_PRODUCT(state, storeId) {
        state.productList.splice(state.productList.findIndex(item => item._id === storeId), 1);
    }
};
