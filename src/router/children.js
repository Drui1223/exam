export const homeChild=[
    {
        path: 'addQuestions',
        name: 'addQuestions',
        attrTitle:"试题管理",
        title:'添加试题',
        component: () => import(/* webpackChunkName: "addQuestions" */ '../views/Main/examManage/AddQuestions.vue'),
        meta:{
            roles:['出题者','浏览者']
        }
    },{
        path: 'questionsType',
        name: 'questionsType',
        attrTitle:"试题管理",
        title:'试题分类',
        component: () => import(/* webpackChunkName: "questionsType" */ '../views/Main/examManage/QuestionsType.vue')
    },{
        path: 'watchQuestions',
        name: 'watchQuestions',
        attrTitle:"试题管理",
        title:'查看试题',
        component: () => import(/* webpackChunkName: "watchQuestions" */ '../views/Main/examManage/WatchQuestions.vue'),
        meta:{
            roles:['出题者']
        }
    },{
        path: 'editQuestions',
        name: 'editQuestions',
        // attrTitle:"试题管理",
        title:'编辑试题',
        component: () => import(/* webpackChunkName: "editQuestions" */ '../views/Main/examManage/EditQuestions.vue')
    },{
        path: 'questionsDetail',
        name: 'questionsDetail',
        // attrTitle:"试题管理",
        title:'试题详情',
        component: () => import(/* webpackChunkName: "questionsDetail" */ '../views/Main/examManage/QuestionsDetail.vue')
    },{
        path: 'addUser',
        name: 'addUser',
        attrTitle:"用户管理",
        title:'添加用户',
        component: () => import(/* webpackChunkName: "addUser" */ '../views/Main/userManage/AddUser.vue')
    },{
        path: 'showUser',
        name: 'showUser',
        attrTitle:"用户管理",
        title:'用户展示',
        component: () => import(/* webpackChunkName: "showUser" */ '../views/Main/userManage/ShowUser.vue')
    },{
        path: 'addExam',
        name: 'addExam',
        attrTitle:"考试管理",
        title:'添加考试',
        component: () => import(/* webpackChunkName: "addExam" */ '../views/Main/testManage/AddExam.vue')
    },{
        path: 'examList',
        name: 'examList',
        attrTitle:"考试管理",
        title:'试卷列表',
        component: () => import(/* webpackChunkName: "examList" */ '../views/Main/testManage/ExamList.vue')
    },{
        path: 'examEdit',
        name: 'examEdit',
        // attrTitle:"考试管理",
        title:'创建试卷',
        component: () => import(/* webpackChunkName: "examEdit" */ '../views/Main/testManage/ExamEdit.vue')
    },{
        path: 'grade',
        name: 'grade',
        attrTitle:"班级管理",
        title:'班级管理',
        component: () => import(/* webpackChunkName: "grade" */ '../views/Main/teamManage/Grade.vue'),
        meta:{
            roles:['出题者']
        }
    },{
        path: 'room',
        name: 'room',
        attrTitle:"班级管理",
        title:'教室管理',
        component: () => import(/* webpackChunkName: "room" */ '../views/Main/teamManage/Room.vue'),
        meta:{
            roles:['出题者']
        }
    },{
        path: 'student',
        name: 'student',
        attrTitle:"班级管理",
        title:'学生管理',
        component: () => import(/* webpackChunkName: "student" */ '../views/Main/teamManage/Student.vue'),
        meta:{
            roles:['出题者']
        }
    },
    // {
    //     path: 'examPaperClassList',
    //     name: 'examPaperClassList',
    //     attrTitle:"阅卷管理",
    //     title:'批卷班级',
    //     component: () => import(/* webpackChunkName: "examPaperClassList" */ '../views/Main/sealManage/ExamPaperClassList.vue')
    // },{
    //     path: 'examPaperClassmate',
    //     name: 'examPaperClassmate',
    //     attrTitle:"阅卷管理",
    //     title:'待批试卷',
    //     component: () => import(/* webpackChunkName: "examPaperClassmate" */ '../views/Main/sealManage/ExamPaperClassmate.vue')
    // },{
    //     path: 'menu',
    //     name: 'menu',
    //     attrTitle:"阅卷管理",
    //     title:'添加菜单',
    //     component: () => import(/* webpackChunkName: "menu" */ '../views/Main/sealManage/Menu.vue')
    // }
]