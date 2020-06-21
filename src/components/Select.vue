<template>
    <div class="select">
        <select name="" id="">
            <option value=''  class="optionPl" disabled selected style='display:none;'>请选择</option>  
            <slot></slot>
            </select>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
select {
    border: solid 1px rgb(214, 214, 214);
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    //   background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
    width: 220px;
    line-height: 20px;
    padding: 10px 14px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    color: rgb(179, 177, 177);
    &:hover{
        border: 1px solid #ccc;
    }
    &:focus{
        border: 1px solid rgb(91, 173, 255);
    }
   
}


// select::-ms-expand { display: none; }
</style>