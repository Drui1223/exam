<template>
  <div class="examList"> 
    <div class="header">
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
            <p>课程: </p>
            <el-select v-model="parameter.subject_id" placeholder="请选择">
                <el-option
                v-for="item in subjectList"
                :key="item.subject_id"
                :label="item.subject_text"
                :value="item.subject_id">
                </el-option>
            </el-select>
        </div>
        <el-Button shape="light" text="查询" size="small"/>
    </div>
    <div class="m-list-exam">
      <div class="tltle">
        <div>试题列表</div>
        <div><span @click="current=index" :class="{active:current===index}" :key="index" v-for="(item,index) in statusList">{{item}}</span></div>
      </div>
      <!-- table - 试题列表 -->
      <table>
        <thead>
            <tr>
              <td :key="item.id" v-for="item in chiefData">{{item}}</td>
            </tr>
        </thead>
        <tbody>
            <tr  :key="item.id" v-for="item in examAllList">
              <td>
                <div class="box">
                  <p>{{item.title}}</p>
                  <p><span>考试时间:1:30</span><span>{{item.number}}道题作弊0分</span></p>
                </div>
              </td>
              <td>
                <div class="box">
                    <p>考试班级</p>
                    <p><span :key="key" v-for="key in item.grade_name">{{key}}</span></p>
                </div>
              </td>
              <td>{{item.user_name}}</td>
              <td>{{item.start_time}}</td>
              <td>{{item.end_time}}</td>
              <td @click="$router.push('/main/questionsDetail');">详情</td>
              <!-- set_key_questions(item); 需要存储 -->
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      examTypeList:[],//所有的考试类型
      subjectList:[],//所有的课程
      examList:[],//试卷列表
      current:0,
      statusList:['全部','进行中','已结束'],
      parameter:{
        subject_id:'',//课程id
        exam_id:'',//考试类型id
      },
      chiefData:['试卷信息','班级','创建人','开始时间','结束时间','操作'], 
      minuteData:[],
    };
  },
  computed:{
     examAllList(){
       this.examList.forEach(item=>{
         item.start_time=formatDate(item.start_time);
         item.end_time=formatDate(item.end_time);
       });
       function formatDate(Timestamp){ 
          Timestamp=new Date(Number(Timestamp)) ;                     
          let year=Timestamp.getFullYear()  //取得4位数的年份
          let month=Timestamp.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
          let date=Timestamp.getDate();      //返回日期月份中的天数（1到31）
          let hour=Timestamp.getHours();     //返回日期中的小时数（0到23）
          let minute=Timestamp.getMinutes(); //返回日期中的分钟数（0到59）
          let second=Timestamp.getSeconds(); //返回日期中的秒数（0到59）
          return `${year}-${month<10 ?'0'+month:month}-${date<10 ?'0'+date:date} ${hour<10 ?'0'+hour:hour}:${minute<10 ?'0'+minute:minute}:${second<10 ?'0'+second:second}`;
       }
       return this.examList;
    }
  },
  mounted() {
    this.$api.examType().then(res=>{//所有的考试类型
        if(res.code===1)this.examTypeList=res.data;
    });
    this.$api.subject().then(res=>{//所有的课程
        if(res.code===1)this.subjectList=res.data;
    });
    this.$api.examExam().then(res=>{//获取试卷列表
        console.log(res.exam);
        if(res.code===1)this.examList=res.exam;
    });
    // this.$api.examExam().then(res=>{//ddd
    //       console.log(res,'##################333')
    //       if(res.code===1){
    //         this.examList=res.exam;
    //       }
          
    // });
  },
  methods: {
      set_key_questions(item){//去仓库存储当前试题
        this.$store.commit('questions/SET_ITEM_QUESTIONS',item);
      },
  }
};
</script>

<style lang="scss" scoped>
.examList{
  width: 100%;
  .header{
    width: 100%;
    padding: 24px;
    background: #fff;
    border-radius: 12px;
    display: flex;
    .sele{
        display: flex;
        margin-right: 40px;
        vertical-align: middle;
        p{
          line-height: 40px;
          margin-right: 5px;
        }
    }
  }
  .m-list-exam{
    width: 100%;
    padding: 24px;
    background: #fff;
    border-radius: 12px;
    margin-top: 20px;
    .tltle{
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      span{
        border: 1px solid #ccc;
        font-size: 14px;
        padding: 5px 10px;
        cursor: pointer;
        color: rgb(54, 99, 248);
        &.active{
          border:1px solid rgb(54, 99, 248);
           box-shadow:  0px 0px 5px 0px rgb(54, 99, 248);
        }
      }
    }
  }
}
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
            background: #eee;
        }
    }
    tbody{
      font-size: 12px;
        tr{
            border-bottom: 1px solid #ccc;
            cursor: pointer;
        }
        tr:hover{
          background: rgb(230,239,255);
        }
        td{
            // background: #fff;
            padding: 10px 0;
        }
    }
    .box{
        display: flex;
        flex-direction: column;
        p{
          line-height: 26px;
          span{
            margin-right: 5px;
          }
        }
    }
    button{
        border: none;
        outline: none;
        background: #fff;
        padding: 3px;
    }
}
</style>