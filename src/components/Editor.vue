<template>
 <div class="toolbar">
   <div ref="editor" class="editor"></div>
 </div>
</template>

<script>
import Editor from 'wangeditor'
  export default {
    props:{
      content:{
        type:String,
        default:'',
      }
    },
    data() {
      return {
        article:'',
        editor:null,
      }
    },
    mounted() {
      //初始化
      this.editor=new Editor(this.$refs.editor);
      //编辑器内容变化通知父组件
      // this.editor.config.zIndex =1;
      this.editor.customConfig.onchange = (html) => {
        this.article = html;
        //通知父组件
        this.$emit('editorContent',html);
      }
      this.editor.create();      
      this.editor.txt.html(this.content);//接收父组件内容
      this.editor.$toolbarElem.css('z-index', '2 !important'); 
      this.editor.$textContainerElem.css('z-index', '1 !important'); 
    },
  }
</script>

<style lang="scss" scoped>
.editor{
  margin-top: 10px;
}
// .w-e-toolbar{
//   z-index: 2 !important;
// }
// .w-e-menu{
//   z-index: 2 !important;
// }
// .w-e-text-container{
//   z-index: 1 !important;
// }
// .toolbar{
//   z-index: 1 !important;
// }
</style>