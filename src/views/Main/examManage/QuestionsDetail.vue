<template>
    <div class="questions-detail">
        <div class="title-info">
            <p> 出题人：{{key_questions.user_name}}</p>
            <p>题目信息</p>
            <div class="item-label">
                <span>{{key_questions.questions_type_text}}</span>
                <span>{{key_questions.subject_text}}</span>
                <span>{{key_questions.exam_name}}</span>
            </div>
            <div class="title-aspect">
                <p>{{key_questions.title}}</p>
                <div>
                    {{key_questions.questions_stem}}
                </div>
            </div>
        </div>
        <div class="answer-info">
            <p> 答案信息</p>
            <div class="answer-aspect">
                {{key_questions.questions_answer}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                key_questions:{},
            }
        },
        mounted() {
            this.key_questions=this.$store.getters.key_questions;
        },
    }
</script>

<style lang="scss" scoped>
.questions-detail{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title-info{
        width: 58%;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 12px;
        padding: 24px;
        p{
            line-height: 38px;
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
    }
    .answer-info{
        width: 40%;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 12px;
        padding: 24px;
        p{
            line-height: 38px;
        }
    }
}
</style>