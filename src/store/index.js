import Vuex,{Store} from 'vuex';
import Vue from 'vue';
import rootModule from './rootModule';
import modules from './modules/index';
Vue.use(Vuex);
const store=new Store({
  ...rootModule,
  modules,
})

export default store;