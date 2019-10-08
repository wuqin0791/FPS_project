/**
 * @file 统计上报指令
 * @author zhouqing@dafy.com
 */

import loadJS from 'loadjs';

const id = '1260264378';
const web_id = '1260264378';
const act = '7din';

loadJS('//s4.cnzz.com/z_stat.php?id=' + id + '&web_id=' + web_id);
window._czc = window._czc || [];
_czc.push(['_setAccount', web_id]);

export function hot(str) {
    _czc.push(['_trackEvent', 'hot', act, str]);
}

export function pv(page) {
    _czc.push(['_trackEvent', 'pv', act, page]);
}
