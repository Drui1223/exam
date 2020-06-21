<template>
    <div class="room">
        <!-- 模态框 -->
        <el-dialog
            title="添加班级"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <!-- 教室号 -->
                <p class="m-required-cose"><span class="m-required-field">*</span>教室号:</p>
                <el-input v-model="room_text" placeholder="教室名"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="roomInsert">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加教室 button -->
        <el-Button shape="light" @callback="dialogVisible=!dialogVisible" text="添加教室" size="mini"/>
        <!-- table 所有教室数据 -->
        <el-table :chief='chiefData' :minute='minuteData'>
            <td slot="title">操作</td>
            <td slot="oper" slot-scope="item"><button @click="open(item.item)">删除</button></td>
        </el-table>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
    export default {
        data() {
            return {
               chiefData:['教室号'], //table ==> title
               minuteData:[],//所有教室数据
               dialogVisible: false,//模态框的显隐
               room_text:"",//教室号
            }
        },
        mounted() {
            this.getRoom();
        },
        methods: {
            getRoom(){//获取所有教室
                 this.$api.room().then(res=>{//获取所有教室                    
                    if(res.code===1){
                        this.minuteData=[];
                        res.data.forEach(el =>{
                            el={...el,'教室号':el.room_text};
                            this.minuteData.push(el);
                        });
                    } 
                });
            },
            roomDelete(id){//删除教室
                this.$api.roomDelete({room_id:id}).then(res=>{//删除教室
                    if(res.code===1)this.getRoom();
                });
            },
            roomInsert(){//添加教室
                if(this.room_text){
                    this.dialogVisible =false;
                    this.$api.roomInsert({room_text:this.room_text}).then(res=>{//添加教室                
                        if(res.code===1)  this.getRoom(),this.room_text='';
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: '参数不可为空'
                    });
                }
                
            },
            open(item) {//是否提交                             
                MessageBox.confirm('确定要删除此教室吗？', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info',
                    center: true
                }).then(() => {              
                    this.roomDelete(item.room_id);
                }).catch(() => {
                    this.room_text='';
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
.room{
    width: 100%;
    margin-bottom: 20px;
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    .m-required-cose{
        line-height: 30px;
    }
    .m-required-field{
        color: red;
        margin-right: 5px;
        vertical-align:middle;
    }
    table{
        button{
            background: none;
            cursor: pointer;
        }
    }
}
</style>