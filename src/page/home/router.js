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
        name: 'seller',
        path: '/',
        component: resolve => require.async('components/index.vue', resolve)
    }, {
        name: 'register',
        path: '/register',
        component: resolve => require.async('components/register.vue', resolve)
    }, {
        path: '*',
        redirect: '/'
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
