
import Vue from 'vue';
import router from './router'
import App from './App.vue';
import './whole';
import requisition from './api/api';
import './assets/css/app.scss';
import './assets/font/iconfont.css';
import './assets/font/iconfont';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './router/routerIntercept';
import store from './store/index';



Vue.use(ElementUI);
Vue.prototype.$api=requisition;
Vue.prototype.$store=store;

Vue.config.productionTip = false;

new Vue({
    router,
    el: "#app",
    template: "<App></App>",
    components: { App },
});