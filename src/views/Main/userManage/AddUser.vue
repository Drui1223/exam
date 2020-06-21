<template>
    <div class="adduser">
        <!-- 1 用户 -->
        <ng-el-UserBox :selectTitle="choiceTitle[0].title" @acknow="userInsert" @reset="userClient" @rank="selectRank">
            <el-select v-model="user_id" placeholder="请选择身份id" v-if="rankCurr===1">
                <el-option
                v-for="item in userUsersList"
                :key="item.user_id"
                :label="item.user_name"
                :value="item.user_id">
                </el-option>
            </el-select>
            <el-input v-model="userFigure.user_name" placeholder="请输入用户名"></el-input>
            <el-input v-model="userFigure.user_pwd" placeholder="请输入密码"></el-input>
            <el-select v-model="userFigure.identity_id" placeholder="请选择身份id">
                <el-option
                v-for="item in dentityList"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_id">
                </el-option>
            </el-select>
        </ng-el-UserBox>
        <!-- 2 身份 -->
        <ng-el-UserBox :selectTitle="choiceTitle[1].title" @acknow="userInsert_ident" @reset="identity_text=''">
             <el-input v-model="identity_text" placeholder="请输入身份名称"></el-input>
        </ng-el-UserBox>
        <!-- 3 api接口 -->
        <ng-el-UserBox :selectTitle="choiceTitle[2].title" @acknow="userInsert_api" @reset="userInterper">
            <el-input v-model="apiFigure.api_authority_text" placeholder="请输入api接口权限名称"></el-input>
            <el-input v-model="apiFigure.api_authority_url" placeholder="请输入api接口权限url"></el-input>
            <el-input v-model="apiFigure.api_authority_method" placeholder="请输入api接口权限方法"></el-input>
        </ng-el-UserBox>
        <!-- 4 视图接口 -->
        <ng-el-UserBox :selectTitle="choiceTitle[3].title" @acknow="userInsert_view" @reset="userViewper">
            <el-select @change="getView_name" v-model="viewFigure.view_id" placeholder="请选择已有视图">
                <el-option
                v-for="item in view_authList"
                :key="item.view_authority_id"
                :label="item.view_authority_text"
                :value="item.view_authority_id">
                </el-option>
            </el-select>
        </ng-el-UserBox>
        <!-- 5 身份设置api接口权限 -->
        <ng-el-UserBox :selectTitle="choiceTitle[4].title" @acknow="userSite_api" @reset="userIdentApiper">
            <el-select v-model="ident_apiFigure.identity_id" placeholder="请选择身份id">
                <el-option
                v-for="item in dentityList"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_id">
                </el-option>
            </el-select>
             <el-select v-model="ident_apiFigure.api_authority_id" placeholder="请选择api接口权限">
                <el-option
                v-for="item in api_authList"
                :key="item.api_authority_id"
                :label="item.api_authority_text"
                :value="item.api_authority_id">
                </el-option>
            </el-select>
        </ng-el-UserBox>
        <!-- 6 给身份设置视图权限 -->
        <ng-el-UserBox :selectTitle="choiceTitle[5].title" @acknow="userSite_view" @reset="userIdentViewper">
            <el-select v-model="ident_viewFigure.identity_id" placeholder="请选择身份id">
                <el-option
                v-for="item in dentityList"
                :key="item.identity_id"
                :label="item.identity_text"
                :value="item.identity_id">
                </el-option>
            </el-select>
             <el-select v-model="ident_viewFigure.view_authority_id" placeholder="请选择视图权限id">
                <el-option
                v-for="item in view_authList"
                :key="item.view_authority_id"
                :label="item.view_authority_text"
                :value="item.view_authority_id">
                </el-option>
            </el-select>
        </ng-el-UserBox>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rankCurr:0,//头部选择当前项
                //头部选择数据
                choiceTitle:[
                    {id:0,title:['添加用户','更新用户']},
                    {id:1,title:['添加身份']},
                    {id:2,title:['添加api接口权限']},
                    {id:3,title:['添加视图接口权限']},
                    {id:4,title:['身份设置api接口权限']},
                    {id:5,title:['给身份设置视图权限']}
                ],
                view_authList:[],//视图权限数据
                dentityList:[],//展示身份数据
                api_authList:[],//展示api接口权限数据
                userUsersList:[],//展示用户数据
                //1 用户
                user_id:'',//用户数据id
                userFigure:{
                    user_name:'',//用户名
                    user_pwd:'',//密码
                    identity_id:'',//身份id
                },
                //2 身份
                identity_text:'',//身份名称
                //3 api接口
                apiFigure:{
                    api_authority_text:'',//权限名称
                    api_authority_url:'',//权限路径
                    api_authority_method:'',//该权限路径的方法
                },
                //4 视图接口
                viewFigure:{
                    view_authority_text:'',//视图权限名称
                    view_id:'',//视图id
                },
                //5 身份设置api接口权限
                ident_apiFigure:{
                    identity_id:'',//身份数据id
                    api_authority_id:'',//api接口权限id
                },
                //6 给身份设置视图权限
                ident_viewFigure:{
                    identity_id:'',//身份id
                    view_authority_id:'',//视图权限id
                },
            }
        },
        mounted() {
            this.$api.userView_auth().then(res=>{//获取视图权限数据
                if(res.code===1) this.view_authList=res.data;
                console.log(res,'res..................')
            });
            this.$api.userIdentity().then(res=>{//展示身份数据
                if(res.code===1) this.dentityList=res.data;
                console.log(res,'res....身份..............')
            });
            this.$api.userApi_auth().then(res=>{//展示api接口权限数据
                if(res.code===1) this.api_authList=res.data;
                console.log(res,'res....权限..............')
            });
             this.$api.userUsers().then(res=>{//展示用户数据 
                if(res.code===1)this.userUsersList=res.data;
                console.log(res,'res....用户数据..............')
            });
        },
        methods: {
            //设置
            userInsert(){//1-添加/更新用户
                if(this.rankCurr===0){
                    this.$api.userInsert(this.userFigure).then(res=>{//添加用户
                        if(res.code===1){

                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        console.log(this,'@@@@')
                    })
                }else{
                    this.$api.userUpdate({...this.userFigure,user_id:this.user_id}).then(res=>{//添加用户                    
                        if(res.code===1){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }
                
            },
            userInsert_ident(){//2-添加身份
                if(this.identity_text){
                    this.$api.userInsert_ident({identity_text:this.identity_text}).then(res=>{//添加身份                    
                        if(res.code===1){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }
                    })
                }else{
                    this.$message({
                        message: '名称不能为空',
                        type: 'error'
                    });
                }
            },
            userInsert_api(){//3-添加api接口权限
                if(this.apiFigure.api_authority_text && this.apiFigure.api_authority_url && this.apiFigure.api_authority_method){
                    this.$api.userInsert_api(this.apiFigure).then(res=>{//添加api接口权限                                        
                        if(res.code===1){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }else{
                    this.$message({
                        message: '不能为空',
                        type: 'error'
                    });
                }
            },
            userInsert_view(){//4-添加视图权限
                if(this.viewFigure.view_authority_text && this.viewFigure.view_id){
                    this.$api.userInsert_view(this.viewFigure).then(res=>{//添加视图权限                                        
                        if(res.code===1){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }else{
                    this.$message({
                        message: '不能为空',
                        type: 'error'
                    });
                }
            },
            userSite_api(){//5-给身份设定api接口权限
                if(this.ident_apiFigure.identity_id && this.ident_apiFigure.api_authority_id){
                    this.$api.userSite_api(this.ident_apiFigure).then(res=>{//给身份设定api接口权限                                        
                        if(res.code===1){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }else{
                    this.$message({
                        message: '不能为空',
                        type: 'error'
                    });
                }
            },
            userSite_view(){//6-给身份设定视图权限
                if(this.ident_viewFigure.identity_id && this.ident_viewFigure.view_authority_id){
                    this.$api.userSite_view(this.ident_viewFigure).then(res=>{//给身份设定视图权限                                        
                        if(res.code===1){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }else{
                    this.$message({
                        message: '不能为空',
                        type: 'error'
                    });
                }
            },
            //重置
            userClient(){//1-添加/更新用户 重置           
                this. userFigure={user_name:'',user_pwd:'',identity_id:''};
                this.user_id='';
            },
            userInterper(){//3-添加api接口权限 重置  
                this.apiFigure={api_authority_text:'',api_authority_url:'',api_authority_method:''};
            },
            userViewper(){//4-添加视图接口权限 重置            
                 this.viewFigure={view_authority_text:'',view_id:''};
            },
            userIdentApiper(){//5-身份设置api接口权限 重置            
                this.ident_apiFigure={identity_id:'',api_authority_id:''};
            },
            userIdentViewper(){//6-给身份设置视图权限 重置            
                this.ident_viewFigure={identity_id:'',view_authority_id:''};
            },
            selectRank(val){//头部选择
                this.rankCurr=val;
                this.userClient();
            },
            getView_name(val){//4 获取 视图权限名称
               let result=this.view_authList.filter(item=>item.view_authority_id===val);
               this.viewFigure.view_authority_text=result[0].view_authority_text;       
            },
        },
    }
</script>

<style lang="scss" scoped>
.adduser{
    width: 100%;
    margin-bottom: 20px;
    border-radius: 12px;
    display: flex;
    flex-wrap: wrap;
}
</style>