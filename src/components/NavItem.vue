<template>
    <div class="m-nav-item">
        <router-link :to="path"><slot></slot></router-link>
    </div>
</template>

<script>
    export default {
        props:{
            path:{
                type:String,
                default:'/login',
            },
        },
    }
</script>

<style lang="scss" scoped>
.m-nav-item{
    width: 100%;
    height: 46px;
    a{
        display: inline-block;
        width: 100%;
        line-height: 46px;
        font-size: 14px;
        color:rgb(178,181,189);
        user-select: none;
        padding: 0 28%;
        &:hover{
            color: #fff;
        }
        &.router-link-active{
            color: #fff;
            background: #000;
        }
    }
}
</style>