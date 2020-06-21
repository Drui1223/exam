<template>
    <div>
        <input :class="{active:isAv}" @focus="isAv=false"  :type="type" :placeholder="placeholder">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isAv:true,
            }
        },
        props:{
            type:{
                type:String,
                default:'text'
            },
            placeholder:{
                type:String,
                default: () => {
                    return '请您输入'
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
input{
    border: 1px solid #eee;
    outline: none;
    height: 35px;
    border-radius: 4px;
    padding: 6px 11px;
    &:hover{
        border: 1px solid deepskyblue;
        // transition-duration:.5s;
    }
    &:focus{
        box-shadow:0px 1px 5px rgba(105, 180, 250,.39);
        transition-duration:.5s;
    }
    &.active{
        border: 1px solid red;
        &:focus{
            box-shadow:0px 1px 5px rgba(247, 108, 73, 0.616);
            transition-duration:.5s;
        }
    }
}
</style>