<template>
    <transition name="model">
        <div class="m-model-mask" v-if="ShowModel">
            <div class="m-model-wrapper">
                <div class="m-model-container">
                    <div class="m-model-header">
                        <slot name="header"></slot>
                        <div class="m-model-close" @click="$emit('close')">&times;</div>
                    </div>
                    <div class="m-model-body">
                        <slot name="body"></slot>
                    </div>
                    <div class="m-model-footer">
                        <!-- <slot name="footer"></slot> -->
                        <el-Button @callback="$emit('close')" text="确定"/>
                        <!-- <button @click="$emit('close')">Ok</button> -->
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name:"model",
        props:{
            ShowModel:Boolean,
        }
    }
</script>

<style lang="scss" scoped>
.m-model-mask{
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    display: flex;
    justify-content: center;
    align-items: center;
    // display: table;
    .m-model-wrapper{
        // display: table-cell;
        // vertical-align: middle;    
        margin: auto;
        .m-model-container{
            min-width: 300px;
            // padding: 10px 30px 20px;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
            background: #fff;
            margin: 0 auto;
            transition: all .3s ease;
            .m-model-header{
                padding: 10px;
                position: relative;
                text-align: center;
                &.active{
                    border-bottom: 1px solid #ccc;
                    text-align: left;
                }
                .m-model-close{
                    position: absolute;
                    right: 10px;
                    top: 8px;
                    font-size: 20px;
                }
            }
            .m-model-body{
                margin: 20px 0;
                padding: 10px;
            }
            .m-model-footer{
                display: flex;
                justify-content: flex-end;
                padding: 10px;
                button{
                    padding:3px 10px;
                }   
            }
        }
    }
}
.model-enter,.model-leave-to{
    opacity: 0;
}
.model-enter-active,.model-leave-active{
   transition: all .3s ease;
}
.model-leave-active .m-model-container{
    transform: scale(1.3);
}
</style>