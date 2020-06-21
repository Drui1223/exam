import Vue from 'vue'
import VueRouter from 'vue-router'
import {homeChild} from './children';
import House from '../views/House.vue';
import Login from '../views/Login.vue';
import store from '../store/index';

Vue.use(VueRouter);

export function getHomeChild(){
  let allList=store.getters.permitRouter.filter(item=>item.attrTitle).map(item=>{return {attrTitle:item.attrTitle,title:item.title,toPath:`${routes[1].path}/${item.path}`}});
  // let  allList= homeChild.filter(item=>item.title).map(item=>{return {attrTitle:item.attrTitle,title:item.title,toPath:`${routes[1].path}/${item.path}`}});
  let arr=[];
  allList.forEach(item=>{    
    if(arr.length){
      let ar=arr.filter(i=>i.title === item.attrTitle);
      if(ar.length){
        ar[0].path.push(item);
      }else{
        arr.push({title:item.attrTitle,path:[item]})
      }
    }else{
      arr.push({title:item.attrTitle,path:[item]})
    }
  })
  return arr;
}

export let titleList=homeChild.map(item=>{
  return {name:item.name,title:item.title}
})
// console.log(titleList,'ss');

const routes = [
  {
    path: '/',
    redirect: '/login',
  }, {
    path: '/main',
    name: 'main',
    component: House,
    children:homeChild,
  },{
    path: '/login',
    name: 'login',
    component: Login,
  }
  //   {
  //     path: '/annal',
  //     name: 'annal',
  //     component: () => import(/* webpackChunkName: "annal" */ '../views/Annal.vue')
  //   }
]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  routes
});


export default router
