import Vue from 'vue';
import router from './router';
import store from '@/store/home';
import App from './app.vue';
import api from "@/api";

import Vue2Filters from 'vue2-filters';
import VueMoment from 'vue-moment';
import * as filters from '@/utils/filters';
import ProgressBar from '@/components/ProgressBar.vue';

import uploader from 'vue-simple-uploader';

Vue.use(Vue2Filters);
Vue.use(VueMoment);
Vue.use(uploader);

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

let loading = Vue.prototype.$loading = new Vue(ProgressBar).$mount();
// Add loading component.
document.body.appendChild(loading.$el);

function handleAsyncData() {
    router.beforeResolve((to, from, next) => {
        let matched = router.getMatchedComponents(to);
        let prevMatched = router.getMatchedComponents(from);

        // [a, b]
        // [a, b, c, d]
        // => [c, d]
        let diffed = false;
        let activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)));

        if (!activated.length) {
            return next();
        }

        loading.start();

        Promise.all(
            activated
             /**
              * asyncData gets called in two conditions:
              * 1. non keep-alive component everytime
              * 2. keep-alive component only at first time(detected by asyncDataFetched flag)
              */
            .filter(c => c.asyncData && (!c.asyncDataFetched || !to.meta.keepAlive))
            .map(async c => {
                await c.asyncData({store, route: to});
                c.asyncDataFetched = true;
            })
        )
        .then(() => {
            loading.finish();
            next();
        })
        .catch(next);
    });
}

router.beforeEach(async (to, from, next) => {  //beforeEach在这里实现路由拦截
    console.log(to.name)
    next()
    // if (to.name === 'login') {
    //     console.log(to.name);
    //     next();
    //     return;
    // }else {
    //     next('/login')
    // }

    let userinfo = store.getters.userinfo;
    // if (!userinfo.name) {
    //     // 待完善先注销 J
    //     userinfo = (await api.account.getAuth()).data.data.userinfo;
    //     userinfo && userinfo.name ? (store.commit('SET_USER_INFO', userinfo), next()) : next('/login');
    // } else {
    //     next();
    // }
    
});

Vue.mixin({

    /**
     * Add an in-component guard which gets called
     * when component is reused in the new route.
     * eg. /detail/1 => /detail/2
     *
     * @param {Object} to to route
     * @param {Object} from from route
     * @param {Function} next next function
     */
    async beforeRouteUpdate(to, from, next) {
        let asyncData = this.$options.asyncData;
        if (asyncData) {
            loading.start();
            asyncData.call(this, {
                store: this.$store,
                route: to
            }).then(() => {
                loading.finish();
                next();
            }).catch(next);
        }
        else {
            next();
        }
    }
});

let app = new Vue({
    store,
    router,
    ...App
});

// https://huangxuan.me/2017/07/12/upgrading-eleme-to-pwa/#fast-skeleton-painting-with-settimeout-hack
setTimeout(() => app.$mount('#app'), 0);

handleAsyncData();
