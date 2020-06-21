<template>
    <div class="add-exam">
      <div class="m-add-box">
        <p><span class="m-required-field">*</span>试卷名称:</p>
        <el-input v-model="parameter.title" placeholder="请输入内容"></el-input>
      </div>
      <div class="m-add-box">
        <p><span class="m-required-field">*</span>选择考试类型:</p>
       <el-select v-model="parameter.exam_id" placeholder="请选择">
            <el-option
            v-for="item in examTypeList"
            :key="item.exam_id"
            :label="item.exam_name"
            :value="item.exam_id">
            </el-option>
        </el-select>
      </div>
      <div class="m-add-box">
        <p><span class="m-required-field">*</span>选择课程:</p>
        <el-select v-model="parameter.subject_id" placeholder="请选择">
            <el-option
            v-for="item in subjectList"
            :key="item.subject_id"
            :label="item.subject_text"
            :value="item.subject_id">
            </el-option>
        </el-select>
      </div>
       <div class="m-add-box">
        <p><span class="m-required-field">*</span>设置题量:</p>
        <input type="number" v-model="parameter.number" min="4" max="10">
      </div>
       <div class="m-add-box">
        <p><span class="m-required-field">*</span>考试时间:</p>
        <div class="calls">
          <el-date-picker
            v-model="parameter.start_time"
            type="datetime"
            placeholder="开始时间"
            default-time="12:00:00">
          </el-date-picker>
          <!-- <el-date-picker type="date" placeholder="开始时间" v-model="parameter.date1" style="width: 100%;"></el-date-picker> -->
          <span class="spans">-</span>
          <!-- <el-time-picker placeholder="结束时间" v-model="parameter.date2" style="width: 100%;"></el-time-picker> -->
          <el-date-picker
            v-model="parameter.end_time"
            type="datetime"
            placeholder="结束时间"
            default-time="12:00:00">
          </el-date-picker>
        </div>
          
      </div>

       <div class="m-add-box">
        <el-Button shape="light" @callback="createExam" text="创建" size="mini"/>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        examTypeList:[],//所有的考试类型
        subjectList:[],//所有的课程
        parameter:{
          title:'',//试卷标题
          subject_id:'',//课程id
          exam_id:'',//考试类型id
          number:4,//题量
          start_time: '',//开始时间
          end_time: '',//结束时间
        },
      };
    },
    mounted() {
      this.$api.examType().then(res=>{//所有的考试类型
          if(res.code===1)this.examTypeList=res.data;
      });
      this.$api.subject().then(res=>{//所有的课程
          if(res.code===1)this.subjectList=res.data,this.subjectList.forEach(item=>item.flag=false);
      });
  
    },
    methods: {
      createExam(){//创建试卷
        let {title,subject_id,exam_id,number,start_time,end_time} =this.parameter      
        if(title && subject_id && exam_id && number && start_time && end_time){
            this.parameter.start_time=this.parameter.start_time.getTime(this.parameter.start_time);
            this.parameter.end_time=this.parameter.end_time.getTime(this.parameter.end_time);
            this.$api.createExam(this.parameter).then(res=>{//创建试卷
              if(res.code===1)this.$router.push('/main/examEdit');
            });
        }else{
          
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
.add-exam{
    width: 100%;
    margin-bottom: 20px;
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    input[type="number"]{
      width: 100px;
      line-height: 30px;
      text-indent: 2ex;
    }
    .m-add-box{
      width: 50%;
      margin-bottom: 20px;
      .spans{
        margin:0 20px;
        vertical-align: middle;
        line-height: 30px;
      }
      .calls{
        display: flex;
      }
      p{
        line-height: 40px;
      }
      .m-required-field{
        color: red;
        margin-right: 5px;
        vertical-align:middle;
      }
    }
}
    .el-input{
        display: block
    }
</style>