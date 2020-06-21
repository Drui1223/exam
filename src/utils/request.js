import {getToken} from './auth';
const Axios=require('axios');
const instance=Axios.create({
    baseURL:process.env.NODE_ENV==='production' ? '' :'/api'
});

instance.interceptors.request.use((config)=> {            
    return {
        ...config,
        headers:{
            ...config.headers,
            token:getToken(),
            authorization:getToken(),
        } 
    };
  },  (error)=> {
    return Promise.reject(error);
});

instance.interceptors.response.use((response)=> {
    return response.data;
  },  (error)=> {
    // switch (error.response.status) {
    //     case 401:
    //         console.error("token有误");
    //         window.location.href="/login";
    //         break;
    //     case 404:
    //         console.error("没有此资源");
    //         break;
    //     case 500:
    //         console.error("服务器有误");
    //         break;
    //     default:
    //         break;
    // }
    return Promise.reject(error);
});

export default {
    get(url,params){
        return instance.get(url,{params});
    },
    post(url,params){
        return instance.post(url,params);
    },
    put(url,params){
        return instance.put(url,params)
    },
    delete(url,params){        
        return instance.delete(url,{params})
    }
}