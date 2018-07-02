<!-- Created by chunmingdeng on 2018/3/19 -->
<template>
    <div class="end-container" v-loading.fullscreen="loading">
        <div style="padding: 10px 0;">
            <!--<NavBar></NavBar>-->
            <div>
                <div class="fs-14"><a href="/">首页</a> &nbsp>&nbsp <a href="#"
                                                                     @click="routerReplace('/base/appManageList')">App管理列表</a>
                    &nbsp>&nbsp 配置管理
                </div>
            </div>
        </div>

        <el-alert v-show="publishBtn" center title="当前配置有新改动，请重新发布" type="warning"  show-icon></el-alert>

        <div v-show="publishBtn || restoreBtn || customBtn" style="margin: 8px;">
            <el-button type="primary" v-show="publishBtn" @click="publishConfClick">发布配置</el-button>
            <el-button type="primary" v-show="restoreBtn" @click="resetConfig">恢复通用配置</el-button>
            <el-button type="primary" v-show="customBtn" @click="modifyConfig" class="btnModify">自定义配置</el-button>
        </div>
        <!--路由方式实现，按需加载-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="/appManage/appConfig/modifyConfiguration">基础配置</el-menu-item>
            <el-menu-item index="/appManage/appConfig/footerMenu">底部菜单</el-menu-item>
            <el-menu-item index="/appManage/appConfig/themeStyle">主题样式</el-menu-item>
            <el-menu-item index="/appManage/appConfig/mySetting">我的设置</el-menu-item>
            <el-menu-item index="/appManage/appConfig/workbenchConfig">工作台配置</el-menu-item>
        </el-menu>
        <!--tab实现，一次性加载-->
        <!--<el-tabs v-model="activeName">-->
        <!--<el-tab-pane label="基础配置" name="01"><ModifyConfiguration></ModifyConfiguration></el-tab-pane>-->
        <!--<el-tab-pane label="底部菜单" name="02"><FooterMenu></FooterMenu></el-tab-pane>-->
        <!--<el-tab-pane label="工作台配置" name="03"><WorkbenchConfig></WorkbenchConfig></el-tab-pane>-->
        <!--</el-tabs>-->
        <router-view style="padding: 20px 15px;"></router-view>
    </div>
</template>

<script>

    import {checkConfigInitStatus, getAppSummaryInfo, copyCommonToOpt, backCommon, publishConf} from '@/api/api'
    import {mapState,mapMutations} from 'vuex'
    import $ from 'jquery'

    export default {
        data: function () {
            return {
                loading: false,
                activeName: '01',
                initConf: {
                    spId: "",
                    appId: ""
                },
                publishBtn : false,
                restoreBtn: false,
                customBtn: false
            }
        },
        mounted: function () {
            this.init_config()
        },
        inject: ['reload'],
        methods: {
            ...mapMutations(['SET_CONFIGEDITSTATUS']),
            publishConfClick() {
                let _this = this;
                publishConf(_this.initConf).then(res => {
                    _this.$alert('发布成功', '提示', {
                        confirmButtonText: '确定',
                        type : "success",
                        callback: action => {
                            _this.reload();
                        }
                    });
                }).catch(err =>{
                    _this.$alert('操作失败', '提示', {
                        confirmButtonText: '确定',
                        type : "error"
                    });
                });

            },
            resetConfig() {
                let _this = this;
                _this.$confirm('此操作将永久删除现有配置, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    backCommon(_this.initConf).then(res => {
                        _this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            type : "success",
                            callback: action => {
                                _this.reload();
                            }
                        });
                    }).catch(err =>{
                        _this.$alert('操作失败', '提示', {
                            confirmButtonText: '确定',
                            type : "error"
                        });
                    });
                }).catch(() => {

                });

            },
            modifyConfig() {
                let _this = this;
                copyCommonToOpt(_this.initConf).then(res => {
                    _this.$alert('操作成功', '提示', {
                        confirmButtonText: '确定',
                        type : "success",
                        callback: action => {
                            _this.reload()
                        }
                    });
                }).catch(err =>{
                    _this.$alert('操作失败', '提示', {
                        confirmButtonText: '确定',
                        type : "error"
                    });
                })
            },
            /**
             * 初始化配置
             *                   恢复通用配置         修改配置
             *
             *  企业是自定义          No               No
             *  企业是通用版本        Ok               Ok
             *
             *
             *
             *
             *  有spId  有appId      是common    需要复制后处理
             *                      不是common    不需要处理
             *
             *   无spId  有appId     是common     不需要处理
             *                      不是common    不需要处理
             *
             *  后端没法判断，那么前端每次操作前先复制。
             */
            init_config() {
                this.initConf.spId = this.spId;
                this.initConf.appId = this.appId;
                let _this = this;
                checkConfigInitStatus({appId: this.appId, spId: this.spId}).then(res => {
                    let editStatus = false;
                    // 如果是通用配置
                    if (res.common) {
                        //如果已经复制了数据，不需要显示 如果没有复制数据，需要提示先复制
                        //后端没有判断是否已经复制，有缺陷
                        if (res.corpConfId) {
                            _this.publishBtn = res.needRelease;
                            _this.restoreBtn = true;
                            _this.customBtn = false;
                            editStatus = false;
                        } else {
                            _this.restoreBtn = false;
                            if( null != _this.spId ){
                                _this.customBtn = true;
                                editStatus =  true;
                                _this.publishBtn = res.corpConfId && res.needRelease;
                            }else{
                                _this.publishBtn = res.needRelease;
                                _this.customBtn = false;
                                editStatus =  false;
                            }
                        }
                    } else {
                        _this.publishBtn = res.needRelease;
                        _this.restoreBtn = false;
                        _this.customBtn = false;
                        editStatus = false;
                    }
                    _this.SET_CONFIGEDITSTATUS(editStatus);
                }).catch(err => {
                    _this.$alert(err.message, "提示")
                });
            },
            routerReplace: function (e) {
                this.$router.replace(e)
            }
        },
        computed: {
            activeIndex: function () {
                let activeIndex = this.$route.fullPath
                return activeIndex
            },
            ...mapState(["spId", "appId", "configEditStatus"])

        }
//    components:{
//      WorkbenchConfig,ModifyConfiguration,FooterMenu
//    }
    }
</script>

<style>

  .btnModify{
     background: palevioletred;
  }
  .disabled{
    background-color: lightgray;
    color: lightslategray;
  }
  .fs-14{
    font-size: 14px;
    font-weight: 500;
  }
</style>