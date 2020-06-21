<template>
    <div class="questions-type">
        <!-- 模态框 -->
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <el-input v-model="parameter.text" placeholder="请输入类型名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false;parameter.text=''">取 消</el-button>
                <el-button type="primary" @click="addQuestionsType">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- button -->
        <el-Button @callback="centerDialogVisible=!centerDialogVisible" shape="light" text="添加类型" size="small"/>
        <!-- table -->
        <table>
            <thead>
                <tr>
                    <td>类型ID</td>
                    <td>类型名称</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr :key="item.questions_type_id" v-for="item in QuestionsTypeList">
                    <td>{{item.questions_type_id}}</td>
                    <td>{{item.questions_type_text}}</td>
                    <td><button @click="delQuestionsType(item.questions_type_id)">删除</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                QuestionsTypeList:[],//所有的题目类型
                centerDialogVisible:false,//模态框显隐
                parameter:{
                    text:'',//类型名称
                    sort:'',//试题序号
                }
            }
        },
        mounted() {
            this.getQuestionsType();
        },
        methods: {
            getQuestionsType(){
                this.$api.getQuestionsType().then(res=>{//所有的题目类型            
                    if(res.code===1) this.QuestionsTypeList=res.data;
                });
            },
            delQuestionsType(id){//删除指定的试题类型
                 this.$api.delQuestionsType({id}).then(res=>{
                    if(res.code===1){
                        this.getQuestionsType();
                        this.$message({
                            message: `${res.msg}成功`,
                            type: 'success'
                        });
                    }
                });
            },
            addQuestionsType(){//添加试题类型
                let len=this.QuestionsTypeList.length-1;
                this.parameter.sort=this.QuestionsTypeList[len].questions_type_sort+1;                
                this.$api.insertQuestionsType(this.parameter).then(res=>{//添加试题类型
                if(res.code===1){
                    this.getQuestionsType();
                    this.$message({
                        message: `${res.msg}成功`,
                        type: 'success'
                    });
                }
                    this.parameter.text='';
                });
               this.centerDialogVisible = false;
            }
        },
    }
</script>

<style lang="scss" scoped>
.questions-type{
    width: 100%;
    // height: 100%;
    margin-bottom: 20px;
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    table{
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        button{
            border: none;
            outline: none;
            background: none;
            padding: 5px;
            cursor: pointer;
        }
        tr{
            line-height: 50px;
        }
        td{
            padding: 0 10px;
        }
        thead{
            tr{
                background: #eee;
                font-size: 14px;
            }
        }
        tbody{
            tr{
                border-bottom: 1px solid #ccc;
                font-size: 12px;
            }
        }
    }
}
</style>