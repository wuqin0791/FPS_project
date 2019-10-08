/**
 * @file custom build store
 * @author zhouqing@dafy.com
 */

let engine = require('store/src/store-engine');
let storages = [
    require('store/storages/localStorage')
];
let plugins = [
    require('store/plugins/expire')
];

module.exports = engine.createStore(storages, plugins);
