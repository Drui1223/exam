<template>
    <div class="exam-edit">
        <!-- 新题遮罩 -->
        <transition name="markDo">
             <div class="mark-cm" v-if="isShowMark" @click="isShowMark=!isShowMark">
                <div class="wrapper"  @click.stop=''>
                    <div class="mark-header">所有题目</div>
                    <div class="mark-main">
                        <ul>
                            <li :class="isShowLi == true ? 'liName' : ''" v-for="(item,index) in questionsNewList" @click="hendleLi(index)" :key="index">
                                {{item.title}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
        <div class="header">
            <el-Button shape="light" @callback="isShowMark=!isShowMark"  text="添加新题" size="mini"/>
        </div>
        <div class="main">
            <div class="title">
                <h3>{{examWgList.title}}</h3>
                <p>考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
            </div>
            <div class="content">
                <!-- <div class="exam-edit-item" :key="index" v-for="(key,index) in examWgList.questions">
                    <div class="exam-title">{{index+1}}.{{key.title}}<span @click="deleteExam">删除</span></div>
                    <div class="exam-content">
                        {{key.questions_stem}}
                    </div>
                </div> -->
                <div class="exam-edit-item" :key="index" v-for="(key,index) in allList">
                    <div class="exam-title">{{index+1}}.{{key.title}}<span @click="deleteExam(index)">删除</span></div>
                    <div class="exam-content">
                        {{key.questions_stem}}
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <el-Button shape="light" @callback="addExam" text="创建试卷" size="mini"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                examWgList:{},//试卷列表
                isShowMark:false,
                questionsNewList:[],
                isShowLi:false,
                ind:0,
                allList:[]
            }
        },
        mounted() {
            this.$api.examWg().then(res=>{//获取试卷列表
                console.log(res,'%%%%%%%%%%%%%');
                if(res.code===1)this.examWgList=res.data;
            });
            this.$api.questionsNew().then(res=>{//所有试题列表
                 if(res.code===1) this.questionsNewList=res.data;
                
            });
        },
        methods: {
            deleteExam(index){
                this.$api.examWg().then(res=>{//删除
                    console.log(res);
                    // if(res.code===1);
                });
                this.ind = index
                this.allList.splice(this.ind,1)
            },
            addExam(){
 
                this.$router.push('/main/examList')
                    this.$api.examExam().then(res=>{//ddd
                    console.log(res,'##################333')
                    // if(res.code===1){
                        // this.examList.push[res.exam]
                    // }
                    
                });
            },
            hendleLi(index){
                this.ind = index
                this.questionsNewList[index].isShowLi = !this.questionsNewList[index].isShowLi
                this.questionsNewList[index].ind = index
                console.log(this.questionsNewList[this.ind],'$$')
                if(this.questionsNewList[index].isShowLi == true){
                    this.allList.push(this.questionsNewList[this.ind])
                }
                console.log(this,'this..........')
                console.log(this.allList,'this.allList......................')
                // this.questionsNewList[index].title
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.exam-edit{
    width: 100%;
    margin-bottom: 20px;
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    .mark-cm{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.2);
        display: flex;
        justify-content: flex-end;
        .wrapper{
            width: 40%;
            height: 100%;
            background: #fff;
            box-shadow:0px 1px 10px 2px rgba(0,0,0,.2);
            display: flex;
            flex-direction: column;
            transition: all .3s ease;
            .mark-header{
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid rgb(219, 218, 218);
                padding: 0 18px;
                font-size: 14px;
            }
            .mark-main{
                flex: 1;
                padding: 24px;
                ul{
                    li{
                    line-height: 30px;
                    font-size: 12px;
                    margin-left: 10px;
                    cursor: pointer;
                }
                }
          
            }
        }
    }
    .main{
        margin: 20px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        .title{
            width: 100%;
            text-align: center;
            h3{
                font-weight: normal;
            }
            p{
                margin: 15px 0;
                font-size: 14px;
            }
        }
        .content{
            .exam-edit-item{
                border: 1px solid #000;
                padding: 20px; 
                margin-bottom: 20px;
                .exam-title{
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    line-height: 36px;
                    span{
                        color: rgb(30, 64, 255);
                        cursor: pointer;
                    }
                }
                .exam-content{
                    background: rgb(243, 243, 243);
                    padding: 14px;
                    overflow: hidden;
                }
            }
        }
    }
    .footer{
        display: flex;
        justify-content: space-around;
    }
}

.markDo-enter,.markDo-leave-to{
    opacity: 0;
}
.markDo-enter .wrapper{
    transform: translateX(100%);
}

.markDo-enter-active,.markDo-leave-active{
   transition: all .3s ease;
}

.markDo-leave-active .wrapper{
    transform:translateX(100%);
}
.liName{
    color: #cccccc;
    background: teal;
    z-index: 99;
}
</style>