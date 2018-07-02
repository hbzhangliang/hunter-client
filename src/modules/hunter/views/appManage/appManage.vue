<!-- Created by chunmingdeng on 2018/4/2 -->
<template>
  <div id="main-container" class="clearfix app-manage">
    <!--<div style="position: relative" class="slider">-->
      <!--<div class="sidebg"></div>-->
      <!--<div class="app-info">-->
        <!--<img :src="appSummaryInfo.icon" alt="">-->
        <!--<div>-->
          <!--<p>{{appSummaryInfo.appName}}</p>-->
          <!--<p>{{companyInfo?companyInfo.spName:''}}</p>-->
        <!--</div>-->
      <!--</div>-->
      <div class="sub-header bgc-fff clearfix">
        <menu-header :isShow=true></menu-header><crumbs></crumbs>
        <div class="h-10 bgc-f7f7fb"></div>
      </div>
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo el-menu--dev my-slider pull-left"  background-color="#f7f7fb" text-color="#545b63" active-text-color="#3399ff">
        <el-menu-item index="/appManage/appManageSummary"
                      @click="routerReplace('/appManage/appManageSummary')"><i class="iconfont icon-shouye"></i>概览
        </el-menu-item>
        <el-menu-item index="/appManage/versionManage" v-if="!(!!spId&&!!commonApp)"
                      @click="routerReplace('/appManage/versionManage')"><i class="el-icon-menu"></i>版本管理
        </el-menu-item>
        <el-menu-item index="/appManage/appVersionPublish" v-if="!(!!spId&&!!commonApp)"
                      @click="routerReplace('/appManage/appVersionPublish')"><i class="el-icon-tickets"></i>发布版本
        </el-menu-item>
        <el-menu-item index="/appManage/grayLevelPublic" v-if="!(!!spId&&!!commonApp)"
                      @click="routerReplace('/appManage/grayLevelPublic')"><i class="el-icon-edit"></i>灰度设置
        </el-menu-item>
        <el-menu-item index="/appManage/appConfig/modifyConfiguration"
                      @click="routerReplace('/appManage/appConfig/modifyConfiguration')"><i class="el-icon-setting"></i>配置管理
        </el-menu-item>
        <el-menu-item index="/appManage/reStructureApp" v-if="!(!!spId&&!!commonApp)"
                      @click="routerReplace('/appManage/reStructureApp')"><i class="el-icon-back"></i>重新打包
        </el-menu-item>
        <el-menu-item index="/appManage/appDataStatics"
                      @click="routerReplace('/appManage/appDataStatics')"><i class="el-icon-document"></i>数据统计
        </el-menu-item>

      </el-menu>
    <!--</div>-->
    <router-view class="right clearfix"></router-view>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import menuHeader from '@/components/menu-header'
  import crumbs from '@/components/crumbs'
  export default {
    data: function () {
      return {
      }
    },
    components:{
        crumbs,
        menuHeader},
    mounted:function () {
    },
    methods:{
      routerReplace:function (e) {
        this.$router.replace(e)
      }
    },
    computed: {
      ...mapState(['appSummaryInfo', 'commonApp', 'spId', 'companyInfo', 'upHistoryIndex']),
      activeIndex: function () {
        let activeIndex = this.$route.fullPath
        return activeIndex
      }
    }
  }
</script>


<style lang="scss">
  .app-manage {
    .sub-header{
      width: 100%;
      /*height: 86px;*/
      border-bottom: 1px solid #eaeaea;
      position: relative;
      z-index: 2;
    }
    .my-slider{
      font-size: 14px;
      border-right: 1px solid #eaeaea;
      position: relative;
      top:-10px;
      z-index: 3;
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
    .app-info {
      padding: 10px;
      background: #fff;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      img {
        width: 60px;
        margin-right: 15px;
      }

    }
    .optSpan {
      font-size: 13px;
      color: #fff
    }

    .iconfont {
      margin-right: 10px;
      font-size: 20px;
      color: #ababab;
    }
  }

</style>
