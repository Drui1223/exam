<template>
    <div class="slideBar">
        <div class="m-menu-box" :key="index" v-for="(item,index) in aslide">
            <!-- 菜单组件 -->
            <el-Menu :icon="IconList[index]" :title='item.title'>
                <el-nav-item :path="key.toPath"  :key="key.id" :to="key.toPath" v-for="key in item.path">{{key.title}}</el-nav-item>
            </el-Menu>
        </div>
    </div>
</template>

<script>
import {getHomeChild} from '../router/index';
    export default {
        data() {
            return {
                IconList:['iconzu','iconyonghu','iconrili','iconshuju','icondigital']
            }
        },
        computed:{
            aslide(){
                // console.log(getHomeChild());
                return getHomeChild();
            }
        },
    }
</script>

<style lang="scss" scoped>
.slideBar{
    width: 200px;
    background: rgb(35, 42, 65);
    overflow-x:hidden ;
    overflow-y: auto;
}
</style>