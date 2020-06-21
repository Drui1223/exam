import {homeChild} from '@/router/children';
const filterRouter=function(params){//非管理员 筛选路由
  let res=[];
  homeChild.forEach(item=>{
      let rolesFlag=true;
      if(item.meta && item.meta.roles){        
        rolesFlag=params.some(role=>item.meta.roles.includes(role));//角色存在
        if(rolesFlag) res.push(item); 
      }
  });
  return res;
}


const state={
  routes:[],
}

const mutations={
  'SET_ROUTER'(state,params){
    state.routes=params;
  },
}

const actions={
  handleRouter({commit},params){
      return new Promise((resolve,reject)=>{    
            let routerMove;
            if(params.includes('管理员')){//管理员
              routerMove = homeChild
            }else{
              routerMove=filterRouter(params);
            } 
            commit('SET_ROUTER',routerMove);
            resolve(routerMove);
      })
    },
}


export default {
  namespaced:true,
  state,
  mutations,
  actions,
}