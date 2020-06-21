<template>
    <div class="edit-questions">
        <div class="m-public">
            <p>题目信息</p>
            <p>题干</p>
            <p><el-input v-model="parameter.title" placeholder="请输入题目标题,不超过20个字"></el-input></p>
        </div>
        <div class="m-public">
            <p>题目主题</p>
            <ng-el-Editor :content="parameter.questions_stem" @editorContent="getQuestions_stem"></ng-el-Editor>
            <!-- <el-MarkDown></el-MarkDown> -->
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
            <!-- <el-MarkDown></el-MarkDown> -->
        </div>
        <el-Button shape="light" @callback="open" text="提交" size="mini"/>
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
                    questions_stem:'w244242',//题干
                    subject_id:'',//课程id
                    exam_id:'8sc5d7-7p5f9e-cb2zii-ahe5i',//考试类型id
                    questions_id:'',//试题id
                    questions_answer:'',//题目答案
                    title:'',//试题的标题
                }
            }
        },
        mounted() {  
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
        created() {
             let {questions_type_id,subject_id,questions_stem,exam_id,questions_id,questions_answer,title}=this.$store.getters.key_questions;
             this.parameter={questions_type_id,questions_stem,subject_id,exam_id,questions_id,questions_answer,title};
        },
        methods: {
            questionsUpdate(){//更新试题
                this.$api.questionsUpdate(this.parameter).then(res=>{//更新试题
                    // if(res.code===1) this.QuestionsTypeList=res.data;
                    if(res.code===0) this.errors();
                });
            },
            open() {//是否修改
               MessageBox.confirm('你确定要修改这道试题吗?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.questionsUpdate();                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });   
            },
            getQuestions_stem(data){//获取题干
                this.parameter.questions_stem=data;
            },
            getQuestions_answer(data){//获取题目答案
                this.parameter.questions_answer=data;
            },
            errors(){//提交失败
                MessageBox.alert('更新试题失败', '', {
                    confirmButtonText: '知道了',
                    type: 'error',
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
.edit-questions{
    width: 100%;
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