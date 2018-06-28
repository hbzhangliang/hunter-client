<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<!DOCTYPE>
<html>
<head>
  <title>完整demo</title>
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
  <script type="text/javascript" charset="utf-8" src="${base}/ueditor1.4.3/ueditor.config.js"></script>
  <script type="text/javascript" charset="utf-8" src="${base}/ueditor1.4.3/ueditor.all.min.js"></script>
  <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
  <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
  <script type="text/javascript" charset="utf-8" src="${base}/ueditor1.4.3/lang/zh-cn/zh-cn.js"></script>
</head>
<body>
<div>
  <script id="editor" type="text/plain" style="width:690px;height:300px;"></script>
</div>
<script type="text/javascript">

  //实例化编辑器
  //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
  var ue = UE.getEditor('editor',{
    toolbars: [
      ['fullscreen','insertimage','source', 'undo', 'redo', 'bold', 'italic', 'underline',  'backcolor', 'fontsize', 'fontfamily', 'justifyleft', 'justifyright', 'justifyjustify', 'removeformat', 'formatmatch', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', 'emotion', 'help']
    ]
  });

  //将mainText的值置给编辑器
  ue.addListener("ready", function () {
    // editor准备好之后才可以使用
    ue.setContent($('#content').val());
  });

  ue.addListener('selectionchange', function (editor) {
    $('#content').val(ue.getContent());
  });
</script>
</body>
</html>