<template>
    <div class="house">
        <!-- 头部 -->
        <Header>
            <!-- logo -->
            <div slot="logo" class="logo"><img src="../assets/img/time.png" alt=""></div>
            <!-- userInfo -->
            <div slot="userInfo" class="userInfo" @mouseover="ShowuserOptions=true" @mouseleave="ShowuserOptions=false">
                <img src="../assets/img/1.png" alt="">
                <span class="user_name">{{user_name}}</span>
                <transition name="userOptions">
                        <div class="userOptions" v-if="ShowuserOptions">
                        <ul :key="item.id" v-for=" item in urlList">
                            <li @click="openS(val)" :key="val.id" v-for="val in item">{{val.title}}</li>
                        </ul>
                    </div>
                </transition>
            </div>
        </Header>
        <div class="main">
            <!-- 导航 -->
            <SlideBar/>
            <!-- 展示区 -->
            <div class="content" :class="{active:caption}">
                <h3 class="caption" :class="{active:caption}">{{getMtitle}}</h3>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import {removeToken} from '../utils/auth';
import {titleList,getHomeChild} from '../router/index';
    export default {
        data() {
            return {
                caption:"",
                user_name:'',//当前用户
                ShowuserOptions:false,
                titleList,
                urlList:[
                    [
                        {title:'个人中心',path:'https://www.alipay.com/'},
                        {title:'我的班级',path:'https://www.taobao.com/'}
                    ], [
                        {title:'设置',path:'https://www.baidu.com/'},
                        {title:'退出登录',path:'/login'}
                    ]
                ]
            }
        },
        mounted() {           
            this.$api.userInfo().then(res=>{//获取当前用户信息
                if(res.code===1)this.user_name=res.data.user_name;
            });
        },
        computed: {
            getMtitle(){
                let arr=titleList.filter(item=>item.name==this.$route.name);
                this.caption = arr.length ? arr[0].title :'';                
                return this.caption;
            }
        },
        methods: {
            openS(item){
                if(item.title==='退出登录'){
                    removeToken();
                    this.$router.push(item.path)
                }else{
                    window.open(item.path);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.house{
    .logo{
        img{
            height: 76%;
            vertical-align: middle;
        }
    }
    .userInfo{
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .user_name{
            font-size: 12px;
        }
        &:hover{
            background: rgb(238,238,238);
        }
        img{
            width: 28px;
            height: 28px;
            background: #ccc;
            border-radius: 50%;
            margin-right: 14px;
            border:1px solid #eee;
        }
        .userOptions{
            position: absolute;
            border-radius: 3px;
            top: 103%;
            left: 0;
            background: #fff;
            width: 110px;
            border: 1px solid #ccc;
            li{
                line-height: 30px;
                font-size: 14px;
                padding:0 10px;
                cursor: pointer;
                &:hover{
                    background: rgb(230,239,255);
                }
            }
            ul:nth-child(1){
                border-bottom: 1px solid #ccc;
            }
        }
    }
}
.userOptions-enter,.userOptions-leave-to{
    opacity: 0;
    transform:translateY(-5px)
}
.userOptions-enter-active,.userOptions-leave-active{
    transition: all .2s linear;
}
</style>