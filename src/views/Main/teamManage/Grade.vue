<template>
    <div class="grade">
        <!-- 模态框 -->
        <el-dialog
            title="添加班级"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <!-- 班级名 -->
                <p class="m-required-cose"><span class="m-required-field">*</span>班级名:</p>
                <el-input v-model="parameter.grade_name" placeholder="班级名"></el-input>
                <!-- 教室号 -->
                <p class="m-required-cose"><span class="m-required-field">*</span>教室号:</p>
                <el-select v-model="parameter.room_id" placeholder="请输入教室号">
                    <el-option
                    v-for="item in roomList"
                    :key="item.room_id"
                    :label="item.room_text"
                    :value="item.room_id">
                    </el-option>
                </el-select>
                <!-- 课程名 -->
                <p class="m-required-cose"><span class="m-required-field">*</span>课程名:</p>
                <el-select v-model="parameter.subject_id" placeholder="课程名">
                    <el-option
                    v-for="item in subjectList"
                    :key="item.subject_id"
                    :label="item.subject_text"
                    :value="item.subject_id">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handelSubmit">提 交</el-button>
            </span>
        </el-dialog>
        <!-- 添加班级 button -->
         <el-Button shape="light" @callback="fillInfo" text="+ 添加班级" size="mini"/>
         <!-- table 所有班级信息 -->
         <el-table :chief='chiefData' :minute='minuteData'>
             <td slot="title">操作</td>
             <td slot="oper"  slot-scope="item"><button @click="modify(item.item)">修改</button>|<button @click="gradeDel(item.item)">删除</button></td>
         </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                increase:false,//是否是添加  新增/修改
                roomList:[],//所有教室
                subjectList:[],//所有的课程
                chiefData:['班级','课程','教室'],//table ==> title
                dialogVisible: false,//模态框的显隐
                minuteData:[],//所有班级信息
                grade_id:'',//班级id
                parameter:{
                    grade_name:'',//班级名
                    room_id:'',//教室id
                    subject_id:'',//课程id
                }
            }
        },
        mounted(){
            this.getAssignedClass();
            this.getRoom();
            this.$api.subject().then(res=>{//所有的课程
                if(res.code===1) this.subjectList=res.data;
            });
        },
        methods: {
            handelSubmit(){//提交数据
                if(this.parameter.grade_name && this.parameter.room_id && this.parameter.subject_id){
                    if(this.increase){//新增接口
                        this.gradeInsert();
                    }else{//修改接口
                        this.gradeUpdate();
                    }
                    this.dialogVisible=false;
                }else{
                    this.$message({
                        message: '不能为空',
                        type: 'error'
                    });
                }
            },
            gradeInsert(){//修改更新班级信息
                this.$api.gradeInsert(this.parameter).then(res=>{
                    if(res.code===1) this.minuteData=[],this.getAssignedClass();
                })
            },
            gradeUpdate(){//修改更新班级信息            
                this.$api.gradeUpdate({...this.parameter,grade_id:this.grade_id}).then(res=>{
                    if(res.code===1) this.minuteData=[],this.getAssignedClass();
                })
            },
            getRoom(){//获取所有教室
                this.$api.room().then(res=>{//获取所有教室  
                    if(res.code===1)this.roomList=res.data;
                });
            },
            getAssignedClass(){//获取所有班级  
                this.$api.assignedClass().then(res=>{//获取已经分配教室的班级                
                    if(res.code===1) res.data.forEach(el => {
                        let obj= {'班级':el.grade_name,'课程':el.subject_text,'教室':el.room_text}
                        el={...el,...obj};
                        this.minuteData.push(el);
                    });;
                });
                this.$api.gradeNewClass().then(res=>{//获取没有分配教室的班级
                    if(res.code===1) res.data.forEach(el => {
                        let obj= {'班级':el.grade_name,'课程':el.subject_text,'教室':el.room_text}
                        el={...el,...obj};
                        this.minuteData.push(el);
                    });;
                });
            },
            modify(item){//修改
                this.increase=false,
                this.dialogVisible=true;
                this.grade_id=item.grade_id;
                this.parameter={grade_name:item.grade_name,room_id:item.room_id,subject_id:item.subject_id};
            },
            gradeDel(item){//删除班级                                
                this.$api.gradeDel({grade_id:item.grade_id}).then(res=>{//删除班级 
                    if(res.code===1){
                        this.minuteData=[];
                        this.getAssignedClass();
                    }
                });
            },
            fillInfo(){//添加班级 填写信息
                this.increase=true,
                this.dialogVisible=true;
                this.parameter={grade_name:'',room_id:'',subject_id:''};
            }
        },
    }
</script>

<style lang="scss" scoped>
.grade{
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
            color: rgb(9, 86, 252);
            background: none;
            cursor: pointer;
        }
    }
}
</style>