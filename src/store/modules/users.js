import api from '@/api/api.js';
import {setToken,getToken} from '@/utils/auth.js';
const state={
  roles:[],
  token:'',
  username:'',
}

const mutations={
  'SET_TOKEN'(state,params){
    state.token=params;
  },
  'SET_USERNAME'(state,params){
    state.username=params;
  },
  'SET_IDENTITY'(state,params){
    state.roles=[params];
  },
  'SET_ITEM'(state,params){
    console.log('par',params);
    
  }
}

const actions={
    userInfo({commit}){
      return new Promise((resolve,reject)=>{        
        api.userInfo().then(res=>{

          let {user_name,identity_text}=res.data;
          commit('SET_USERNAME',user_name);
          commit('SET_IDENTITY',identity_text);            
            // signTime: 1586266676278
            // user_id: "axg8t2-oroeja"
            // user_name: "wBingYu1707b"
            // identity_id: "63no9p-8y0k4"
            // identity_text: "管理员"
            // iat: 1586266676
          resolve(res.data);
        })
      })
    },
    login({commit},params){
      return new Promise((resolve,reject)=>{
        api.login(params).then(res=>{
          commit('SET_TOKEN',res.token);
          setToken(res.token);
          resolve(res);
        })
      })
    },
}


export default {
  namespaced:true,
  state,
  mutations,
  actions,
}