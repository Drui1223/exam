<template>
   <button @click="$emit('callback')" :class="[size,shape]" >{{text}}</button>
</template>

<script>
    export default {
        props:{
            text:{
                type:String,
                default:'OK'
            },
            size:{
                type:String,
                default:'mini'
            },
            shape:{
                type:String,
                default:'dark'
            }
        }
    }
</script>

<style lang="scss" scoped>
button{
    outline: none;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    line-height: 30px;
}
.dark{
    background: #ccc;
    color: #fff;
}
.light{
    background: dodgerblue;
    color: #fff;
}
.mini{
    width: 100px;
    padding: 4px 8px;
}
.small{
    width: 160px;
}
.middle{
    width: 50%;
    padding: 4px 5px;
}
.large{
    width: 100%;
    padding: 4px 5px;
}
</style>