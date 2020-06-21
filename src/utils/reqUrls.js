// user
const login='/user/login'; //登录
const userInfo='/user/userInfo';//获取当前用户信息
const userView_auth='/user/view_authority';//获取视图权限数据
const userIdentity='/user/identity';//展示身份数据
const userApi_auth='/user/api_authority';//展示api接口权限数据
const userApi_auth_ident='/user/identity_api_authority_relation';//展示身份和api权限关系
const userIdent_view__auth='/user/identity_view_authority_relation';//展示身份和视图权限关系
const userUsers='/user/user';//展示用户数据

const userInsert='/user';//添加用户
const userUpdate='/user/user';//更新用户信息(用户名，用户密码，用户身份)
const userInsert_ident='/user/identity/edit';//添加身份
const userInsert_api='/user/authorityApi/edit ';//添加api接口权限
const userInsert_view='/user/authorityView/edit';//添加视图权限
const userSite_api='/user/setIdentityApi';//给身份设定api接口权限  
const userSite_view='/user/setIdentityView';//给身份设定视图权限  


//exam
const addQuestions='/exam/questions';//添加试题
const getQuestionsType='/exam/getQuestionsType';//获取所有的试题类型 
const insertQuestionsType='/exam/insertQuestionsType';//添加试题类型
const delQuestionsType='/exam/delQuestionsType';//删除指定的试题类型
const subject='/exam/subject';//获取所有的课程  
const questionsNew='/exam/questions/new';//获取所有的试题
const questionsCond='/exam/questions/condition';//按条件获取试题
const examType='/exam/examType';//获取所有的考试类型 
const examExam='/exam/exam';//获取试卷列表
const questionsUpdate='/exam/questions/update';//更新试题
const createExam='/exam/exam';//创建试卷
const examWg='/exam/exam';//获取试卷详情

//manger
const room='/manger/room';//获取所有教室 
const assignedClass='/manger/grade';//获取已经分配教室的班级
const gradeNewClass='/manger/grade/new';//获取没有分配教室的班级
const assignedStudent='/manger/student';//所有 已经分班 的学生
const newStudent='/manger/student/new';//所有 没有分班 的学生
const roomDelete='/manger/room/delete';//删除教室
const roomInsert='/manger/room';//添加教室接口 
const studentsDel='/manger/student';//删除学生接口 
const gradeDel='/manger/grade/delete';//删除班级接口 
const gradeInsert='/manger/grade';//添加班级接口 
const gradeUpdate='/manger/grade/update';//更新班级信息接口 





// 未使用
// 根据用户id，返回该用户的视图权限  

export default {
  login,
  userInfo,
  addQuestions,
  getQuestionsType,
  insertQuestionsType,
  delQuestionsType,
  gradeUpdate,
  subject,
  gradeDel,
  questionsNew,
  gradeInsert,
  examType,
  room,
  roomInsert,
  studentsDel,
  examExam,
  assignedClass,
  gradeNewClass,
  assignedStudent,
  newStudent,
  questionsCond,
  questionsUpdate,
  createExam,
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