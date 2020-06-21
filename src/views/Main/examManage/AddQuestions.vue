<template>
    <div class="add-questions">
        <div class="m-public">
            <p>题目信息</p>
            <p>题干</p>
            <p><el-input v-model="parameter.title" placeholder="请输入题目标题,不超过20个字"></el-input></p>
        </div>
        <div class="m-public">
            <p>题目主题</p>
            <ng-el-Editor :content="parameter.questions_stem" @editorContent="getQuestions_stem"></ng-el-Editor>
            <!-- <el-MarkDown @blur='getQuestions_stem'></el-MarkDown> -->
        </div>
        <div class="m-public">
            <p>请选择考试类型</p>
            <el-select v-model="parameter.exam_id" placeholder="请选择">
                    <el-option
                    v-for="item in examTypeList"
                    :key="item.exam_id"
                    :label="item.exam_name"
                    :value="item.exam_id">
                    </el-option>
            </el-select>
        </div>
        <div class="m-public">
            <p>请选择课程类型</p>
            <el-select v-model="parameter.subject_id" placeholder="请选择">
                    <el-option
                    v-for="item in subjectList"
                    :key="item.subject_id"
                    :label="item.subject_text"
                    :value="item.subject_id">
                    </el-option>
            </el-select>
        </div>
        <div class="m-public">
            <p>请选择题目类型</p>
            <el-select v-model="parameter.questions_type_id" placeholder="请选择">
                    <el-option
                    v-for="item in QuestionsTypeList"
                    :key="item.questions_type_id"
                    :label="item.questions_type_text"
                    :value="item.questions_type_id">
                    </el-option>
            </el-select>
        </div>
        <div class="m-public">
            <p>答案信息</p>
            <ng-el-Editor :content="parameter.questions_answer" @editorContent="getQuestions_answer"></ng-el-Editor>
            <!-- <el-MarkDown @blur='getQuestions_answer'></el-MarkDown> -->
        </div>
        <el-Button @callback="open" shape="light" text="提交" size="mini"/>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
    export default {
          data() {
            return {
                subjectList:[],//所有的课程
                examTypeList:[],//所有的考试类型
                QuestionsTypeList:[],//所有的题目类型
                parameter:{
                    questions_type_id:'',//试题类型id
                    questions_stem:'',//题干
                    subject_id:'',//课程id
                    exam_id:'',//考试类型id
                    user_id:'',//用户id
                    questions_answer:'',//题目答案
                    title:'',//试题的标题
                }
            }
        },
        mounted() {
            this.$api.userInfo().then(res=>{//获取当前用户信息
                if(res.code===1)this.parameter.user_id=res.data.user_id;
            });
            this.$api.subject().then(res=>{//所有的课程
                if(res.code===1)this.subjectList=res.data;
            });
            this.$api.examType().then(res=>{//所有的考试类型
                if(res.code===1)this.examTypeList=res.data;
            });
            this.$api.getQuestionsType().then(res=>{//所有的题目类型
                if(res.code===1) this.QuestionsTypeList=res.data;
            });
        },
        methods: {
            getQuestions_stem(data){//获取题干
                this.parameter.questions_stem=data;
            },
            getQuestions_answer(data){//获取题目答案
                this.parameter.questions_answer=data;
            },
            addQuestions(){//添加试题
                this.$api.addQuestions(this.parameter).then(res=>{
                    this.success();
                })
            },
            open() {//是否提交
                MessageBox.confirm('你确定要添加这道试题吗?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.addQuestions();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            success(){//提交成功
                MessageBox.alert('试题添加成功', '', {
                    confirmButtonText: '知道了',
                    type: 'success',
                    center: true
                }).then(() => {
                   
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
.add-questions{
    width: 100%;
    // height: 100%;
    margin-bottom: 20px;
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    .el-input{
        width: 50%;
    }
    p{
        line-height: 30px;
    }
}
.m-public{
    margin-bottom: 20px;
}
</style>