<template>
    <div class="show-user">
        <!-- 头部选择切换 -->
        <div class="user-chief">
            <span @click="opt(index)" :class="{active:currentChief===index}" :key="item.id" v-for="(item,index) in userDataDisplay">{{item.chief}}</span>
            <p>{{contentChiefs}}</p>
        </div>
        <!-- 数据展示 -->
        <el-table :chief='userDataDisplay[currentChief].chiefData' :minute='getShowList'></el-table>
        <!-- 分页器 -->
        <div class="footer">
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="tatal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage:1,//当前页数
                pageSize:10,//每页条目
                tatal:0,//数据总数
                contentChief:'',//当前选择项html
                currentChief:0,//当前选择index
                showList:[],//展示数据
                //数据
                userDataDisplay:[
                    {id:0,chief:'用户数据',chiefData:['用户名','密码','身份'],minuteData:[]},
                    {id:1,chief:'身份数据',chiefData:['身份名称'],minuteData:[]},
                    {id:2,chief:'api接口权限',chiefData:['api权限名称','api权限url','api权限方法'],minuteData:[]},
                    {id:3,chief:'身份和api接口关系',chiefData:['身份名称','api权限名称','api权限url','api权限方法'],minuteData:[]},
                    {id:4,chief:'视图接口权限',chiefData:['视图权限名称','视图id'],minuteData:[]},
                    {id:5,chief:'身份和视图权限关系',chiefData:['身份','视图名称','视图id'],minuteData:[]}
                ]
            }
        },
        computed:{
            contentChiefs(){
                this.contentChief=this.userDataDisplay[this.currentChief].chief;
                return this.contentChief;
            },
            getShowList(){//获取showList
                this.getPageList();
                return this.showList;
            }
        },
        mounted() {
            this.contentChief=this.userDataDisplay[this.currentChief].chief;  
            this.getUserUsers(this.currentChief);
            this.getPageList();
        },
        methods:{
            getPageList(){//分页列表
                this.showList=this.userDataDisplay[this.currentChief].minuteData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
            },
            handleCurrentChange(val) {//改变页数
                this.currentPage=val;
                this.getPageList();
            },
            opt(index){//选择
                this.currentChief=index;
                this.currentPage=1;
                if(index===0){
                    this.getUserUsers(this.currentChief);
                }else if(index===1){
                    this.getUserIdentity(this.currentChief);
                }else if(index===2){
                    this.getUserApi_auth(this.currentChief);
                }else if(index===3){
                    this.getUserApi_auth_ident(this.currentChief);
                }else if(index===4){
                    this.getUserView_auth(this.currentChief);
                }else if(index===5){
                    this.getUserIdent_view__auth(this.currentChief);
                }  
            },
            getUserIdent_view__auth(index){//展示身份和视图权限关系
                 this.$api.userIdent_view__auth().then(res=>{//展示身份和视图权限关系
                // console.log(res);
                    if(res.code===1){
                        this.userDataDisplay[index].minuteData=[];
                        res.data.forEach(el => { 
                            this.userDataDisplay[index].minuteData.push({'身份':el.identity_text,'视图名称':el.view_authority_text,'视图id':el.view_id});
                        });
                        this.tatal=this.userDataDisplay[index].minuteData.length;
                    }
                });
                
            },
            getUserView_auth(index){//获取视图权限数据
                this.$api.userView_auth().then(res=>{//获取视图权限数据
                // console.log(res);
                    if(res.code===1){
                        this.userDataDisplay[index].minuteData=[];
                        res.data.forEach(el => {
                            this.userDataDisplay[index].minuteData.push({'视图权限名称':el.view_authority_text,'视图id':el.view_id});
                        });
                        this.tatal=this.userDataDisplay[index].minuteData.length;
                    }
                });
            },
            getUserApi_auth(index){//展示api接口权限数据
                this.$api.userApi_auth().then(res=>{//展示api接口权限数据
                // console.log(res);
                    if(res.code===1){
                        this.userDataDisplay[index].minuteData=[];
                        res.data.forEach(el => {
                            this.userDataDisplay[index].minuteData.push({'api权限名称':el.api_authority_text,'api权限url':el.api_authority_url,'api权限方法':el.api_authority_method})
                        });
                        this.tatal=this.userDataDisplay[index].minuteData.length;
                    }
                });
            },
            getUserApi_auth_ident(index){//展示身份和api权限关系
                this.$api.userApi_auth_ident().then(res=>{//展示身份和api权限关系
                    // console.log(res);
                   if(res.code===1){
                        this.userDataDisplay[index].minuteData=[];
                        res.data.forEach(el => {
                            this.userDataDisplay[index].minuteData.push({'身份名称':el.identity_text,'api权限名称':el.api_authority_text,'api权限url':el.api_authority_url,'api权限方法':el.api_authority_method})
                        });
                        this.tatal=this.userDataDisplay[index].minuteData.length;
                    }
                });
            },
            getUserIdentity(index){
                this.$api.userIdentity().then(res=>{//展示身份数据
                    // console.log(res);
                    if(res.code===1){
                        this.userDataDisplay[index].minuteData=[];
                        res.data.forEach(el => {
                           this.userDataDisplay[index].minuteData.push({'身份名称':el.identity_text})
                        });
                        this.tatal=this.userDataDisplay[index].minuteData.length;
                    }
                });
            },
            getUserUsers(index){//展示用户数据
                this.$api.userUsers().then(res=>{//展示用户数据 
                    // console.log(res);
                    if(res.code===1){
                        this.userDataDisplay[index].minuteData=[];
                        res.data.forEach(el => {
                            this.userDataDisplay[index].minuteData.push({'用户名':el.user_name,'密码':el.user_pwd,'身份':el.identity_text})
                        });
                        this.tatal=this.userDataDisplay[index].minuteData.length;
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
.show-user{
    width: 100%;
    margin-bottom: 20px;
    border-radius: 12px;
    .user-chief{
        p{
            font-size: 24px;
            margin: 5px 0 15px 0;
        }
        span{
        border: 1px solid #ccc;
        font-size: 14px;
        padding: 5px 10px;
        cursor: pointer;
        background: #fff;
        display: inline-block;
        &.active{
            border:1px solid rgb(54, 99, 248);
            box-shadow:0px 1px 2px -1px rgb(54, 99, 248);
            color: rgb(54, 99, 248);
        }
      }
    }
    .footer{
        padding: 10px 0;
        display: flex;
        justify-content: flex-end;
        .el-pagination{
            height: 50px;
        }
    }
    // table{
    //     thead{
    //         td{
    //             background: darkblue !important;
    //         }
    //     }
    // }
}
</style>