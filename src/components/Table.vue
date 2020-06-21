<template>
    <div class="grid-view">
        <table>
            <thead>
                <tr>
                    <td :key="index" v-for="(item,index) in chief">{{item}}</td>
                    <slot name="title"></slot>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(item,index) in minute">
                    <td :key="i" v-for="(key,i) in chief">{{item[key]}}</td>
                    <slot name="oper" :item="item"></slot>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props:{
            chief:Array,
            minute:Array,
        }
    }
</script>

<style lang="scss" scoped>
table{
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    tr{
        line-height: 50px;
    }
    td{
        padding: 0 10px;
    }
    thead{
        tr{
            background: rgb(244,247,249);
        }
    }
    tbody{
        tr{
            border-bottom: 1px solid #ccc;
             background: #fff;
             font-size: 12px;
        }
        tr:hover{
          background: rgb(230,239,255);
        }
        // td{
        //     background: #fff;
        // }
    }
    button{
        border: none;
        outline: none;
        background: #fff;
        padding: 3px;
    }
}
</style>