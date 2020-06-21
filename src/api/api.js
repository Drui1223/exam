import request from '../utils/request';//axios二次封装
import reqUrls from '@/utils/reqUrls';//请求接口

const login=(params)=>request.post(reqUrls.login,params);//登录
const userInfo=()=>request.get(reqUrls.userInfo);//获取当前用户信息
const addQuestions=(params)=>request.post(reqUrls.addQuestions,params);//添加试题
const getQuestionsType=()=>request.get(reqUrls.getQuestionsType);//获取所有的试题类型
const insertQuestionsType=(params)=>request.get(reqUrls.insertQuestionsType,params);//添加试题类型
const delQuestionsType=(params)=>request.post(reqUrls.delQuestionsType,params);//删除指定的试题类型
const subject=()=>request.get(reqUrls.subject);//获取所有的课程
const questionsNew=()=>request.get(reqUrls.questionsNew);//获取所有的试题
const questionsCond=(params)=>request.get(reqUrls.questionsCond,params);//按条件获取试题
const questionsUpdate=(params)=>request.put(reqUrls.questionsUpdate,params);//按条件获取试题


const examType=()=>request.get(reqUrls.examType);//获取所有的考试类型
const room=()=>request.get(reqUrls.room);//获取所有教室
const roomInsert=(params)=>request.post(reqUrls.roomInsert,params);//添加教室接口
const examExam=(params)=>request.get(reqUrls.examExam,params);//获取试卷列表
const createExam=(params)=>request.post(reqUrls.createExam,params);//创建试卷
const examWg=(params)=>request.get(`${reqUrls.examWg}/${params}`);//获取试卷详情

const assignedClass=()=>request.get(reqUrls.assignedClass);//获取已经分配教室的班级
const gradeNewClass=()=>request.get(reqUrls.gradeNewClass);//获取没有分配教室的班级
const assignedStudent=()=>request.get(reqUrls.assignedStudent);//获取所有已经分班的学生
const newStudent=()=>request.get(reqUrls.newStudent);//所有 没有分班 的学生
const roomDelete=(params)=>request.delete(reqUrls.roomDelete,params);//删除教室
const studentsDel=(params)=>request.delete(`${reqUrls.studentsDel}/${params.id}`);//删除学生
const gradeDel=(params)=>request.delete(reqUrls.gradeDel,params);//删除班级
const gradeUpdate=(params)=>request.put(reqUrls.gradeUpdate,params);//更新班级信息接口
const gradeInsert=(params)=>request.post(reqUrls.gradeInsert,params);//添加班级接口


const userView_auth=()=>request.get(reqUrls.userView_auth);//获取视图权限数据
const userIdentity=()=>request.get(reqUrls.userIdentity);//展示身份数据
const userApi_auth=()=>request.get(reqUrls.userApi_auth);//展示api接口权限数据
const userApi_auth_ident=()=>request.get(reqUrls.userApi_auth_ident);//展示身份和api权限关系
const userIdent_view__auth=()=>request.get(reqUrls.userIdent_view__auth);//展示身份和视图权限关系
const userUsers=()=>request.get(reqUrls.userUsers);//展示用户数据




const userInsert=(params)=>request.post(reqUrls.userInsert,params);//添加用户
const userUpdate=(params)=>request.put(reqUrls.userUpdate,params);//更新用户信息(用户名，用户密码，用户身份)
const userInsert_ident=(params)=>request.get(reqUrls.userInsert_ident,params);//添加身份
const userInsert_api=(params)=>request.get(reqUrls.userInsert_api,params);//添加api接口权限
const userInsert_view=(params)=>request.get(reqUrls.userInsert_view,params);//添加视图权限
const userSite_api=(params)=>request.post(reqUrls.userSite_api,params);//给身份设定api接口权限
const userSite_view=(params)=>request.post(reqUrls.userSite_view,params);//给身份设定视图权限




export default {
    login,
    userInfo,
    addQuestions,
    getQuestionsType,
    insertQuestionsType,
    subject,
    questionsNew,
    gradeInsert,
    gradeUpdate,
    examType,
    room,
    gradeDel,
    roomInsert,
    studentsDel,
    examExam,
    createExam,
    assignedClass,
    gradeNewClass,
    assignedStudent,
    newStudent,
    delQuestionsType,
    questionsCond,
    questionsUpdate,
    examWg,
    roomDelete,
    userView_auth,
    userIdentity,
    userApi_auth,
    userApi_auth_ident,
    userUsers,
    userIdent_view__auth,
    userInsert,
    userUpdate,
    userInsert_ident,
    userInsert_api,
    userInsert_view,
    userSite_api,
    userSite_view,
}