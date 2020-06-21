<template>
    <div class="watch-questions">
        <div class="m-com-watch">
            <div class="m-com-box">
                <div class="course-type">课程类型</div>
                <div class="course-option">
                    <span @click="allActive" :class="{active:allFlag}">all</span>
                    <span :class="{active:key.flag}" @click="changActive(key.subject_id)" :key="key.subject_id" v-for="key in subjectList">{{key.subject_text}}</span>
                </div>
            </div>
            <div class="m-com-box">
                <div class="sele">
                    <p>考试类型: </p>
                    <el-select v-model="parameter.exam_id" placeholder="请选择">
                        <el-option
                        v-for="item in examTypeList"
                        :key="item.exam_id"
                        :label="item.exam_name"
                        :value="item.exam_id">
                        </el-option>
                    </el-select>
                </div>
                <div  class="sele">
                    <p>题目类型: </p>
                   <el-select v-model="parameter.questions_type_id" placeholder="请选择">
                        <el-option
                        v-for="item in QuestionsTypeList"
                        :key="item.questions_type_id"
                        :label="item.questions_type_text"
                        :value="item.questions_type_id">
                        </el-option>
                    </el-select>
                </div>
                <el-Button shape="light" @callback="questionsCond" text="查询" size="small"/>
            </div>
        </div>
        <div class="m-com-watch">
            <div class="changes">
               <div class="item" @click="$router.push('/main/questionsDetail');set_key_questions(item)" :key="item.questions_id" v-for="item in questionsNewList">
                    <div>
                        <p>{{item.title}}</p>
                        <div class="item-label">
                            <span>{{item.questions_type_text}}</span>
                            <span>{{item.subject_text}}</span>
                            <span>{{item.exam_name}}</span>
                        </div>
                        <p class="release">{{item.user_name}}谁发布</p>
                    </div>
                    <span class="item-edit" @click.stop="$router.push('/main/editQuestions');set_key_questions(item)">编辑</span>
               </div>
            </div>
            
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                allFlag:false,//所有课程-控制
                subjectList:[],//所有的课程
                questionsNewList:[],//所有试题
                examTypeList:[],//所有的考试类型
                QuestionsTypeList:[],//所有的题目类型
                parameter:{
                    questions_type_id:'',//题目类型id
                    exam_id:'',//考试类型id
                    questions_id:'',//试题id
                    subject_id:'',//课程id
                },
            }
        },
        computed:{
            subjectALL(){
                return this.subjectList;
            }
        },
        mounted() {
            this.$api.examType().then(res=>{//所有的考试类型
                if(res.code===1)this.examTypeList=res.data;
            });
            this.$api.getQuestionsType().then(res=>{//所有的题目类型
                if(res.code===1) this.QuestionsTypeList=res.data;
            });
            this.$api.subject().then(res=>{//所有的课程
                if(res.code===1)this.subjectList=res.data,this.subjectList.forEach(item=>item.flag=false);
            });
            this.$api.questionsNew().then(res=>{//所有试题列表
                 if(res.code===1) this.questionsNewList=res.data;
            })
        },
        methods: {
            set_key_questions(item){//去仓库存储当前试题
                this.$store.commit('questions/SET_ITEM_QUESTIONS',item);
            },
            questionsCond(){//条件筛选试题
                let obj={};
                for(let key in this.parameter){
                    if(this.parameter[key])obj[key]=this.parameter[key];
                }              
                this.$api.questionsCond(obj).then(res=>{//所有试题列表
                    if(res.code===1) this.questionsNewList=res.data;
                })
            },
            allActive(){//all ==> 课程类型
                let flag= this.subjectList.every(item=>item.flag);
                this.allFlag=!flag;
                this.subjectList.forEach(item=>{item.flag=!flag});
                this.subjectList=JSON.parse(JSON.stringify(this.subjectList));
            },
            changActive(id){//课程类型 选择
                let newItem= this.subjectList.filter(item=>item.subject_id===id);
                newItem[0].flag=!newItem[0].flag;           
                this.parameter.subject_id=newItem[0].subject_id;
                if(newItem[0].flag){
                    this.subjectList.forEach(item=>{
                        if(item.subject_id !==id){
                            item.flag=!newItem[0].flag;
                        }
                    })
                }
                this.subjectList=JSON.parse(JSON.stringify(this.subjectList));
            },
        },
       
    }
</script>

<style lang="scss" scoped>
.watch-questions{
    width: 100%;
    .m-com-watch{
        background: #fff;
        margin-bottom: 20px;
        border-radius: 12px;
        padding: 24px;
        .changes{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            .release{
                color: rgb(32, 72, 250);
            }
            .item{
                display: flex;
                align-items: center;
                padding: 10px 0;
                justify-content: space-between;
                border-bottom: 1px solid #ccc;
                cursor: pointer;
                &:hover{
                    background: rgb(247,248,255);
                }
               .item-label{
                   margin: 10px 0;
                   span{
                       padding: 3px 5px;
                       border: 1px solid #ccc;
                       border-radius: 4px;
                       font-size: 12px;
                   }
                   span:nth-child(1){
                       border: 1px solid rgb(24,144,255);
                       background: rgb(230,247,255);
                       color:rgb(24,144,255);
                   }
                    span:nth-child(2){
                       border: 1px solid rgb(140,162,244);
                       background: rgb(240,245,255);
                       color:rgb(133, 158, 247);
                   }
                   span:nth-child(3){
                       border: 1px solid rgb(252,190,119);
                       background: rgb(255,247,231);
                       color:rgb(248, 179, 100);
                   }
               }
               .item-edit{
                   color: rgb(32, 72, 250);
                   cursor: pointer;
                   margin-right: 10px;
               }
            }
        }
        .m-com-box{
            display: flex;
            margin-bottom: 20px;
            .sele{
                display: flex;
                margin-right: 40px;
            }
            p{
                line-height: 40px;
                margin-right: 5px;
            }
            .course-type{
                width: 10%;
            }
            .course-option{
                flex: 1;
                span{
                    margin:0 10px 10px 0;
                    cursor: pointer;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    display: inline-block;
                    &:hover{
                        color: rgb(5, 112, 253);
                    }
                    &.active{
                        color: #fff;
                        background: rgb(5, 112, 253);
                    }
                }
            }
        }
    }
    
}
</style>