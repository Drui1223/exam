<template>
    <div id="editor">
        <textarea @change="$emit('blur',input)" :value="input" @input="update" placeholder="请输入内容"></textarea>
        <div id="show" v-html="markDown" v-if="isView"></div>
        <span class="iconfont" @click="isView=!isView">{{isView ?'显':'隐'}}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                input:'',
                isView:false,
            }
        },
        computed:{
            markDown(){
                return marked(this.input,{});
            }
        },
        methods: {
            update:_.debounce(function(e){
                this.input=e.target.value;
            },300),
        },
    }
</script>

<style lang="scss" scoped>
#editor{
    width: 100%;
    min-height: 200px;
    // overflow: hidden;
    display: flex;
    position: relative;
    textarea{
        flex: 1;
        background: #eee;
        border: 1px solid #f6f6f6;
        outline: none;
        resize:none;
        // background-color: #eee;
        // display: inline-block;
        // resize: none;
        // vertical-align: top;
    }
    #show{
        flex: 1;
        background: rgba(15, 57, 175, 0.651);
    }
    .iconfont{
        position: absolute;
        right: 0;
        top: -20px;
    }
}
</style>