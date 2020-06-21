<template>
    <div class="login">
        <div class="login-form">
            <input class="m-form-input" v-model="user_name" type="text" placeholder="请入用户名">
            <input class="m-form-input" v-model="user_pwd" type="password" placeholder="请入用户密码">
            <div class="m-form-pwd">
                <label for="checks">
                    <input v-if="!ckeckVal" @click="ckeckVal=!ckeckVal" type="checkbox" v-model="ckeckVal" id="checks" style="vertical-align:middle;" value="">
                    <a href='javascript:;' @click="ckeckVal=!ckeckVal" v-else>
                        <svg class="icon" aria-hidden="true" >
                            <use xlink:href="#iconduoxuanxuanzhong"></use>
                        </svg>
                    </a>
                    <span style="vertical-align:middle;">记住密码</span></label>
                <span class="m-span" >忘记密码</span>
            </div>
            <button @click="login">登 录</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ckeckVal:false,
                user_name:'wBingYu1707b',
                user_pwd:'My1707b11!',
            }
        },
        methods: {
            login(){    
                this.$store.dispatch('users/login',{user_name:this.user_name,user_pwd:this.user_pwd}).then(res=>{
                    if(res.code===1)this.$router.push('/main');
                    else alert(res.msg);                    
                })          
            }
        },
    }
</script>

<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 128);
    .login-form{
        background: #fff;
        padding: 35px 20px;
        width: 364px;
        border: 1px solid #ccc;
        border-radius: 3px;
        position: absolute;
        right: 15%;
        top: 25%;
        display: flex;
        flex-direction: column;
        .m-form-input,button{
            border: 1px solid #eee;
            border-radius: 6px;
            outline: none;
        }
        .m-form-input{
            padding: 6px 11px;
            height: 35px;
            font-size: 16px;
            width: 100%;
            margin-bottom: 24px;
            &::-webkit-input-placeholder {
                color: #aab2bd;
                font-size: 14px;
                // text-align: right;
            }
        }
        label{
            cursor: pointer;
        }
        input[type="checkbox"]{
            margin-right: 3px;
            width: 16px;
            height: 16px;
            line-height: normal;
            font-family: inherit;
            color: #fff;
            display: inline-block;
            border: 1px solid #ccc;
            cursor: pointer;
        }
        button{
            background: #295eff;
            line-height: 35px;
            color: #fff;
            cursor: pointer;
        }
        .m-form-pwd{
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            .icon {
                width: 1.4em;
                height: 1.4em;
                vertical-align:middle;
                fill: currentColor;
                overflow: hidden;
            }
            label{
                vertical-align: middle;
            }
            .m-span{
                color: #0139FD;
                cursor: pointer;
            }
        }
    }
}
</style>