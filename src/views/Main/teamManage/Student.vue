<template>
    <div class="students">
        <!-- 条件查询 -->
        <div class="m-students-search">
            <!-- 学生姓名 -->
            <el-input v-model="parameter.title" placeholder="输入学生姓名"></el-input>
            <!-- 请选择教室号 -->
             <el-select v-model="parameter.room_id" placeholder="请选择教室号">
                    <el-option
                    v-for="item in roomList"
                    :key="item.room_id"
                    :label="item.room_text"
                    :value="item.room_id">
                    </el-option>
            </el-select>
            <!-- 班级名 -->
            <el-select v-model="parameter.grade_id" placeholder="班级名">
                    <el-option
                    v-for="item in assignedClassList"
                    :key="item.grade_id"
                    :label="item.grade_name"
                    :value="item.grade_id">
                    </el-option>
            </el-select>
            <el-Button shape="light" text="搜索" size="mini"/>
            <el-Button shape="light" @callback='reset' text="重置" size="mini"/>
        </div>
        <!-- table 学生信息 -->
        <el-table :chief='chiefData' :minute='tablePageList'>
             <td slot="title">操作</td>
             <td slot="oper" slot-scope="item"><button  @click="studentsDel(item.item)">删除</button></td>
        </el-table>
        <!-- 分页器 -->
         <div class="m-pager">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="minuteData.length">
                </el-pagination>
         </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageSizes:[5, 10, 20, 50,100],//每页条目
                roomList:[],//所有教室
                assignedClassList:[],//已经分配教室的班级
                tablePageList:[],//表格分页列表
                parameter:{
                    title:'',//学生姓名
                    room_id:'',//教室id
                    grade_id:'',//班级id
                },
                currentPage: 1,//当前页
                currentSize:0,//每页条数
                chiefData:['姓名','学号','班级','教室','密码'], //table ==> title
                minuteData:[],//所有学生数据
            }
        },
        mounted() {
            this.currentSize=this.pageSizes[0];// 默认每页条数
            this.getAllStudent();
            this.$api.room().then(res=>{//获取所有教室
                if(res.code===1) this.roomList=res.data;
            });
            this.$api.assignedClass().then(res=>{//获取已经分配教室的班级
                if(res.code===1) this.assignedClassList=res.data;
            }); 
        },
        methods: {
            getAllStudent(){//获取所有学生列表
                this.$api.assignedStudent().then(res=>{//获取所有已经分班的学生
                    if(res.code===1) res.data.forEach(el => {this.minuteData.push({'姓名':el.student_name,'学号':el.student_id,'班级':el.grade_name,'教室':el.room_text,'密码':el.student_pwd,id:el.student_id})});
                });
                this.$api.newStudent().then(res=>{//获取所有已经分班的学生
                    if(res.code===1) res.data.forEach(el => {this.minuteData.push({'姓名':el.student_name,'学号':el.student_id,'班级':el.grade_name,'教室':el.room_text,'密码':el.student_pwd,id:el.student_id})}),this.getTatleList();
                });
            },
            studentsDel(item){//删除学生                            
                this.$api.studentsDel({id:item.id}).then(res=>{
                    if(res.code===1){
                        this.minuteData=[];
                        this.getAllStudent();
                    }
                })
            },
            handleSizeChange(val) {//改变每页条数
                this.currentSize=val;
                this.getTatleList();
            },
            handleCurrentChange(val) {//改变页数
                this.currentPage=val;
                this.getTatleList();
            },
            getTatleList(){//分页列表
                this.tablePageList=this.minuteData.slice((this.currentPage-1)*this.currentSize,this.currentPage*this.currentSize);
            },
            reset(){//重置
                this.parameter={title:'',room_id:'',grade_id:''};
            },
         },
    }
</script>

<style lang="scss" scoped>
.students{
    width: 100%;
    margin-bottom: 20px;
    border-radius: 12px;
    .el-input{
        width: 16%;
    }
    .m-students-search{
        input{
            line-height: 30px;
            text-indent: 2ex;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
    }
    .m-pager{
        background: #fff;
        padding: 10px;
        border-radius: 0px 0 8px 8px ;
        display: flex;
        justify-content: flex-end;
    }
    table{
        button{
            background: none;
            cursor: pointer;
        }
    }
}
</style>