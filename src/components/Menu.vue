<template>
    <div class="m-menu-submenu">
        <!-- 菜单标题 -->
        <p class="m-menu-title" @click="showNav=!showNav;" :class="{active:showNav}">
            <span :class="`m-icon iconfont ${icon}`"></span>
            {{title}}
            <!-- <span class="m-menu-sub-arrow">v</span> -->
            <span :class="`iconfont iconxiang${!showNav?'xia' :'shang'}jiantou  m-menu-sub-arrow`"></span>
        </p>
        <!-- 菜单导航 -->
        <div class="m-menu-navList" v-if="showNav" :class="{active:showNav}">
            <slot></slot>            
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showNav:false,
            }
        },
        methods: {
            ch(){
                this.showNav=!this.showNav;
            }
        },
        props:{
            title:{
                type:String,
                default:'导航一'
            },
            icon:{
                type:String,
                default:'iconyonghu',
            }
        }
    }
</script>

<style lang="scss" scoped>
.m-menu-submenu{
    // padding: 0 34px 0 24px;
    margin: 4px 0;
    // text-align: center;
    min-width: 200px;
    color: #fff;
    .m-menu-title{
        // padding: 10px;
        color:rgb(178,181,189);
        font-size: 14px;
        user-select: none;
        padding: 10px 34px 10px 24px;
        position: relative;
        &.active{
            color: #fff;
        }
        &:hover{
            color: #fff;
        }
        .m-icon{
            margin-right: 10px;
        }
        .m-menu-sub-arrow{
            position: absolute;
            right: 10%;
        }
    }
    .m-menu-navList{
        &.active{
            box-shadow:  0px 2px 10px rgb(20, 20, 20) inset;
        }
    }
}
</style>