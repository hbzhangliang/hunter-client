<template>
  <div>
    <script id="editor" type="text/plain" style="width:100%;"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        toolbars: [
          ['fullscreen','insertimage','source', 'undo', 'redo', 'bold', 'italic', 'underline',  'backcolor', 'fontsize', 'fontfamily', 'justifyleft', 'justifyright', 'justifyjustify', 'removeformat', 'formatmatch', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', 'emotion', 'help']
        ]
      }
    },
    mounted() {
      const _this = this;
      _this.editor = UE.getEditor('editor',this.config); // 初始化UE
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      setUEContent(strHtml){
        var _this = this;
//        this.editor = UE.getEditor('editor',this.config); // 初始化UE
        if(this.editor.isReady){
          _this.editor.setContent(strHtml); // 确保UE加载完成后，放入内容。
        }else{
          this.editor.addListener("ready", function () {
            _this.editor.setContent(strHtml); // 确保UE加载完成后，放入内容。
          });
        }
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
<style>

  /*#edui_fixedlayer{*/
    /*z-index: 9999!important;*/
  /*}*/
  /*.edui-editor.edui-default{*/
    /*width: 100%!important;*/
  /*}*/
  /*.edui-default .edui-editor-toolbarbox {*/
    /*position: relative !important;*/
    /*zoom: 1;*/
  /*}*/
</style>
