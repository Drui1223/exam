<template>
  <div class="m-user-box">
    <div class="m-addUser-header">
        <span @click="currentChange=index;$emit('rank',currentChange)" :key="index" v-for="(item,index) in selectTitle" :class="{active:currentChange===index}">{{item}}</span>
    </div>
    <div class="m-addUser-content">
        <slot></slot>
    </div>
    <div class="m-addUser-footer">
        <el-Button  shape="light" @callback="$emit('acknow')" text="确定" size="mini"/>
        <el-Button  shape="dark" @callback="$emit('reset')" text="重置" size="mini"/>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      selectTitle:Array,
    },
    data() {
      return {
        currentChange:0,
      }
    },
  }
</script>

<style lang="scss" scoped>
.m-user-box{
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  width: 33%;
  .el-input{
    margin-bottom: 10px;
  }
  .el-select{
    width: 50%;
    margin-bottom: 10px;
  }
  .m-addUser-header{
    margin-bottom: 20px;
    display: flex;
    span{
      background: #fff;
      border: 1px solid #ccc;
      padding: 3px 10px;
      display: inline-block;
      font-size: 14px;
      font-family: '楷体';
      cursor: pointer;
      &.active{
        color: rgb(1, 57, 235);
        border: 1px solid rgb(1, 57, 235);
      }
    }
  }
  .m-addUser-content{
    display: flex;
    flex-direction: column;
    input{
      line-height: 30px;
      margin-bottom: 20px;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      text-indent: 2ex;
    }
  }
}
</style>