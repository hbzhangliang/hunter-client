<template>
  <div class="my-slider">
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :router="true"
              background-color="#f7f7fb" text-color="#545b63" active-text-color="#3399ff">
        <el-menu-item data="firstPage" index="firstPage"><i class="iconfont icon-shouye"></i>首页</el-menu-item>

      <el-menu-item data="appManageList" index="appManageList"><i class="el-icon-mobile-phone"></i>App管理</el-menu-item>


      <el-menu-item data="companyList" index="companyList"><i class="el-icon-menu"></i>企业管理</el-menu-item>

      <el-menu-item data="taskManage" index="taskManage"><i class="el-icon-date"></i>任务管理</el-menu-item>

      <el-submenu index="6"  data="statistics">
        <template slot="title"><i class="el-icon-view"></i>数据统计</template>

        <el-submenu index="6-1" data="termsts">
          <template  slot="title"><div class="sub-menu-item">终端数据统计</div></template>
          <el-menu-item data="data_terminal" index="data_terminal">移动设备终端</el-menu-item>
        </el-submenu>
        <el-submenu index="6-2" data="userDatasts">
          <template slot="title"><div class="sub-menu-item">用户数据统计</div></template>
          <el-menu-item data="user_compose" index="user_compose">用户构成数据</el-menu-item>
          <el-menu-item data="event_data" index="event_data">用户行为数据</el-menu-item>
          <el-menu-item data="event_info" index="event_info">用户行为详情</el-menu-item>
          <el-menu-item data="event_sts" index="event_sts">用户行为统计</el-menu-item>
        </el-submenu>

        <el-submenu index="6-3" data="bizDatasts">
          <template slot="title"><div class="sub-menu-item">业务应用数据统计</div></template>
          <el-menu-item data="biz_data" index="biz_data">业务访问统计</el-menu-item>
          <el-menu-item data="biz_info" index="biz_info">业务访问详情</el-menu-item>
          <el-menu-item data="sdk_data" index="sdk_data">JsSDK调用统计</el-menu-item>
          <el-menu-item data="sdk_info" index="sdk_info">JsSDK调用详情</el-menu-item>
        </el-submenu>
        <el-submenu index="6-4">
          <template slot="title"><div class="sub-menu-item">消息推送数据</div></template>
          <el-menu-item data="1" index="1">基础消息统计</el-menu-item>
          <el-menu-item data="2" index="2">业务消息统计</el-menu-item>
        </el-submenu>
        <el-submenu index="6-5">
          <template slot="title"><div class="sub-menu-item">错误分析</div></template>
          <el-menu-item data="1" index="1">错误统计</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-menu-item data="monite" index="monite"><i class="iconfont icon-diannao"></i>监控提醒</el-menu-item>


      <el-submenu index="1" data="terminal">
        <template slot="title"><i class="el-icon-menu"></i>终端基础能力</template>
        <el-menu-item data="openContent" index="openContent" style="padding-left: 50px">开放服务内容管理</el-menu-item>
        <el-menu-item data="redisServer" index="redisServer" style="padding-left: 50px">Redis缓存</el-menu-item>
      </el-submenu>

      <el-submenu index="2" data="auth">
        <template slot="title"><i class="el-icon-setting"></i>用户权限</template>
        <el-menu-item data="auth_1" index="auth_1" style="padding-left: 50px">服务权限项管理</el-menu-item>
        <el-menu-item data="auth_2" index="auth_2" style="padding-left: 50px">企业账号管理</el-menu-item>
        <el-menu-item data="auth_3" index="auth_3" style="padding-left: 50px">账号权限项关联管理</el-menu-item>
        <el-menu-item data="auth_4" index="auth_4" style="padding-left: 50px">账号赋予批量成员</el-menu-item>
        <el-menu-item data="auth_5" index="auth_5" style="padding-left: 50px">成员赋予批量账号</el-menu-item>
        <el-menu-item data="auth_6" index="auth_6" style="padding-left: 50px">成员权限查询</el-menu-item>
      </el-submenu>


      <el-submenu index="3-1">
        <template slot="title"><i class="el-icon-more"></i>通用资源管理</template>

        <el-menu-item data="corp_template" index="corp_template" style="padding-left: 50px">自定义模板配置</el-menu-item>
        <!--<el-menu-item data="templateLibrary" index="templateLibrary" style="padding-left: 50px">工作台模版库</el-menu-item>-->
        <el-menu-item data="industryList" index="industryList" style="padding-left: 50px">行业通用App资源</el-menu-item>
        <el-menu-item data="themeTemplateLibrary" index="themeTemplateLibrary" style="padding-left: 50px">主题模版库</el-menu-item>
        <el-menu-item data="workbenchConfig" index="workbenchConfig" style="padding-left: 50px">工作台配置</el-menu-item>
        <el-menu-item data="packagePage" index="packagePage" style="padding-left: 50px">有界面自动打包</el-menu-item>
        <el-menu-item data="corp_fileupload" index="corp_fileupload" style="padding-left: 50px">附件上传</el-menu-item>
        <el-menu-item data="device_mng" index="device_mng" style="padding-left: 50px">机型归类</el-menu-item>
        <!--<el-menu-item data="newTheme" index="newTheme" style="padding-left: 50px">新建主题模版</el-menu-item>-->
        <el-menu-item  index="columnList" style="padding-left: 50px">栏目管理</el-menu-item>
        <el-menu-item  index="createColumn" style="padding-left: 50px">新建栏目</el-menu-item>
      </el-submenu>

      <!-- s -->
       <el-submenu index="4">
        <template slot="title"><i class="el-icon-more"></i>栏目内容管理</template>
          <!-- <el-menu-item  index="columnList" style="padding-left: 50px">栏目列表</el-menu-item> -->
          <el-menu-item  index="columnListApp" style="padding-left: 50px">栏目列表企业</el-menu-item>
          <el-menu-item  index="contentList" style="padding-left: 50px">栏目详情</el-menu-item>
          <el-menu-item  index="createContent" style="padding-left: 50px">内容新建</el-menu-item>
        <!--<el-menu-item  index="mobilePreview" style="padding-left: 50px">移动详情页</el-menu-item>-->
      </el-submenu>
      <!-- e -->

    </el-menu>
  </div>
</template>

<script>
  import end from '@/common/js/utils.js'
  import {authAclListByToken} from '@/api/api'
  import $ from 'jquery'
  export default {
    data () {
      return {
          aclIds:[]
      }
    },
    methods: {
        initMenu(){
            var _this=this;
            var aclIds=[];
            authAclListByToken().then(res=>{
                $.each(res, function (index, item) {
                    aclIds.push(item.englishName);
                });
                _this.aclIds=aclIds;

                //叶子节点
                $("li.el-menu-item").each(function (index,item) {
                    var data=$(item).attr("data");
                    var isShow=_this.isInArray(_this.aclIds,data);
                    if(!isShow){
                        $(item).hide();
                    }
                });

                //一级 二级菜单   不是叶子节点
                 $("li.el-submenu").each(function (index,item) {
                     var data=$(item).attr("data");
                     var isShow=_this.isArrayPart(_this.aclIds,data);
                     if(!isShow){
                         $(item).hide();
                     }
                 });
            });
        },
        isInArray(arr,value){
            if(value==null||value==""||value==undefined){
                return false;
            }
            for(var i = 0; i < arr.length; i++){
                if(arr[i].endsWith(value)){
                    return true;
                }
            }
            return false;
        },
        isArrayPart(arr,value){
            if(value==null||value==""||value==undefined){
                return false;
            }
            for(var i = 0; i < arr.length; i++){
                if(arr[i].indexOf(value)>-1){
                    return true;
                }
            }
            return false;
        }
    },
    components: {},
    computed: {
      activeIndex: function () {
        let activeIndex = this.$route.name
//        console.log(activeIndex)
        return activeIndex
      }
    },
    watch: {
    },
    created () {
//        this.initMenu();
    }
  }
</script>
<!--<style lang="scss" scoped>-->
  <!--.optSpan{-->
    <!--font-size: 13px;-->
    <!--color: #fff-->
  <!--}-->

  <!--.iconfont{-->
    <!--margin-right: 10px;-->
    <!--font-size: 20px;-->
    <!--color: #ababab;-->
  <!--}-->
  <!--.sidebg{-->
    <!--position: absolute;-->
    <!--background-color: #646d78;-->
    <!--height: 100%;-->
    <!--width: 209px;-->
    <!--top:0;-->
    <!--padding-bottom: 9999px;-->
    <!--margin-bottom: -9999px;-->
    <!--overflow: hidden;-->
    <!--z-index:0;-->
  <!--}-->
  <!--.el-menu&#45;&#45;dev{-->
    <!--background-color: #646d78;-->
    <!--/*margin-top: 10px;*/-->
    <!--.el-menu-item.is-active{-->
      <!--color: #ffffff;-->
      <!--background-color: #108EE9;-->
      <!--.iconfont{-->
        <!--color: #ffffff;-->
      <!--}-->
    <!--}-->
    <!--.el-menu-item, .el-submenu__title{-->
      <!--color: #bebebe;-->
      <!--background-color: #646d78;-->
    <!--}-->
    <!--.el-menu li{-->
      <!--background-color: #d3d9e2;-->
      <!--color: #898997;-->
    <!--}-->
    <!--.el-submenu  .el-submenu  .el-submenu__title{-->
      <!--background-color: #a4adb8;-->
      <!--color: #dbdbdb;-->
      <!--border-bottom: 1px solid lightslategrey;-->
    <!--}-->
    <!--.el-submenu .el-menu-item:hover,.el-submenu .el-submenu-title:hover,.el-menu-item:hover-->
    <!--{-->
      <!--background-color: #108EE9;-->
      <!--color: #fefefe;-->
    <!--}-->
  <!--}-->
  <!--a{-->
    <!--color: #bebebe;-->
  <!--}-->
  <!--li.el-menu-item{-->
    <!--font-size: 12px;-->
  <!--}-->
  <!--/*.el-icon-arrow-down:before {*/-->
  <!--/*content: "\E602";*/-->
  <!--/*}*/-->
  <!--/*.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {*/-->
  <!--/*-ms-transform: rotate(90deg);*/-->
  <!--/*transform: rotateZ(90deg);}*/-->
  <!--.el-menu{-->
    <!--width: 209px;-->
    <!--border-right: none;-->
  <!--}-->
<!--</style>-->
<style lang="scss">
  .my-slider{
      font-size: 14px;
      border-right: 1px solid #eaeaea;
      .el-menu-item{
      min-width: 179px;
      i{
        margin-bottom: 3px;
        font-size: 16px;
      }
    }
    .el-submenu{
      width: 179px;
      .el-menu-item{
        font-size: 12px;
      }
    }
    .sub-menu-item {
      font-size: 12px;
      padding-left: 10px;
    }
  }
</style>
