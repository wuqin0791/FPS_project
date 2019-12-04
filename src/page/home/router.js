/*
 * @Description: This is a js file
 * @Author: JeanneWu
 * @Date: 2019-12-02 22:07:52
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//这里是路由，生成url会读取这里的数据
const routes = [
    {
        name: 'login',
        path: '/login',
        component: resolve => require.async('components/login.vue', resolve)
    }, {
        name: 'transfer',
        path: '/transfer',
        component: resolve => require.async('components/transfer.vue', resolve)
    }, {
        name: 'register',
        path: '/register',
        component: resolve => require.async('components/register.vue', resolve)
    },{
        name: 'account',
        path: '/',
        component: resolve => require.async('components/account.vue', resolve)
    },{
        name: 'test',
        path: '/test',
        component: resolve => require.async('components/test.vue', resolve)
    },{
        name: 'mainpage',
        path: '/mainpage',
        component: resolve => require.async('components/mainpage.vue', resolve)
    },{
        name: 'amount',
        path: '/amount',
        component: resolve => require.async('components/amount.vue', resolve)
    },{
        name: 'notice1',
        path: '/notice1',
        component: resolve => require.async('components/notice1.vue', resolve)
    },{
        name: 'notice2',
        path: '/notice2',
        component: resolve => require.async('components/notice2.vue', resolve)
    }
];

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        const position = {};
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position;
    }
};

export default new Router({
    scrollBehavior,
    routes
});
