import router from './index';
import store from '../store/index';
import {getToken} from '@/utils/auth.js';
router.beforeEach(async (to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next('/main');
    } else {
      let roles=store.roles && store.roles.length;
      if(roles){
        // let {identity_text}=await store.dispatch('users/userInfo');
        // roles=[identity_text];
        next();
      }else{
        let {identity_text}=await store.dispatch('users/userInfo');
        roles=[identity_text];
        await store.dispatch('permit/handleRouter',roles);
        next();
      }
    }
  } else {
    next();
  }
})