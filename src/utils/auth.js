import Cookie from 'js-cookie';
const tokenKey='exam_system_token';

export const setToken=(token)=>Cookie.set(tokenKey,token);
export const getToken=()=>Cookie.get(tokenKey);
export const removeToken=()=>Cookie.remove(tokenKey);