<template>
    <div class="header">
        <slot name="logo"></slot>
        <slot name="userInfo"></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.header{
    height: 64px;
    box-shadow:  0px -2px 5px -4px rgb(163, 162, 162) inset;
    background: #fff;
    display: flex;
    padding:0 50px ;
    line-height: 64px;
    justify-content: space-between;
}
</style>