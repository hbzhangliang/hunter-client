<template>
  <header class="header">
      <el-row class="hd_row">
          <el-col :span="4">
              <div>
                  <img class="hd_img" src="~@/assets/images/logo.png"/>
                  <span class="hd_icon_tog" @click="hideMenu()">
                      <i class="hd_icon_i el-icon-caret-left"></i>
                  </span>
              </div>
          </el-col>
          <el-col :span="8">
              <div style="position: relative">
                  <div class="hd_menu" @click="headMenu('user')">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_user.png"/></div>
                      <div class="hd_menu_span"><span>人才</span></div>
                  </div>
                  <div class="hd_menu" @click="headMenu('company')">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_company.png"/></div>
                      <div class="hd_menu_span"><span>公司</span></div>
                  </div>
                  <div class="hd_menu" @click="headMenu('project')">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_project.png"/></div>
                      <div class="hd_menu_span"><span>项目</span></div>
                  </div>
                  <div class="hd_menu" @click="headMenu('report')">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_report.png"/></div>
                      <div class="hd_menu_span"><span>报表</span></div>
                  </div>
                  <div class="hd_menu" @click="headMenu('setting')">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_setting.png"/></div>
                      <div class="hd_menu_span"><span>配置</span></div>
                  </div>
              </div>
          </el-col>
          <el-col :span="12" style="float: right;">
              <div style="float: right;border-left: 1px solid #bdbdbd">
                  <el-dropdown style="float: left" @command="handleMySetting">
                                  <span class="el-dropdown-link hd_r_userInfo">
                                    {{userInfo==null?'未登录':userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                      <el-dropdown-menu slot="dropdown">
                          <!--<el-dropdown-item command="city">城市设置</el-dropdown-item>-->
                          <!--<el-dropdown-item command="business">行业设置</el-dropdown-item>-->
                          <!--<el-dropdown-item command="career">职能设置</el-dropdown-item>-->
                          <!--<el-dropdown-item command="tag">标签管理</el-dropdown-item>-->
                          <!--<el-dropdown-item command="dict">字典项管理</el-dropdown-item>-->
                          <!--<el-dropdown-item command="position">职位管理</el-dropdown-item>-->
                          <!--<el-dropdown-item command="team">团队管理</el-dropdown-item>-->
                          <!--<el-dropdown-item command="corp">企业管理</el-dropdown-item>-->
                          <!--<el-dropdown-item command="account">用户管理</el-dropdown-item>-->
                          <!--<el-dropdown-item command="doc">共享文件夹</el-dropdown-item>-->
                          <el-dropdown-item command="attachment">附件处理</el-dropdown-item>
                          <el-dropdown-item command="webSocket">webSocket</el-dropdown-item>
                          <el-dropdown-item command="calendar">我的日历</el-dropdown-item>
                          <el-dropdown-item command="myInfo">我的信息</el-dropdown-item>
                          <el-dropdown-item command="email">邮件设置</el-dropdown-item>
                          <el-dropdown-item command="applyMail">应聘邮箱</el-dropdown-item>
                          <el-dropdown-item command="warning">系统提醒</el-dropdown-item>
                          <el-dropdown-item command="pwd">密码设置</el-dropdown-item>
                          <el-dropdown-item divided  command="logout">退出</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>

                  <img class="hd_r_userIcon" src="~@/assets/images/xp_19.png"/>
              </div>
              <div style="float: right;margin-right: 5px;">
                          <el-dropdown>
                                  <span class="el-dropdown-link hd_r_span">
                                    反馈<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                              <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>密码设置</el-dropdown-item>
                                  <el-dropdown-item>信息配置</el-dropdown-item>
                                  <el-dropdown-item>我的图像</el-dropdown-item>
                              </el-dropdown-menu>
                          </el-dropdown>
                          |
                          <span class="el-dropdown-link hd_r_span">
                            <i class="el-icon-delete"></i>邮件
                          </span>
                        |
                          <span class="el-dropdown-link hd_r_span">
                            <i class="el-icon-date"></i>日历</span>

                            |
                          <span class="el-dropdown-link hd_r_span">
                            <i class="el-icon-time"></i>代办</span>
                        |
                          <span class="el-dropdown-link hd_r_span">
                            <i class="el-icon-document"></i>消息
                          </span>
                          |<el-dropdown @command="handleThemeCommand">
                                  <span class="el-dropdown-link hd_r_span">
                                    主题<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                          <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item command="azure" class="azure">浅蓝</el-dropdown-item>
                              <el-dropdown-item command="green" class="green">绿色</el-dropdown-item>
                              <el-dropdown-item command="purple" class="purple">浅红</el-dropdown-item>
                              <el-dropdown-item command="silver" class="silver">素银</el-dropdown-item>
                              <el-dropdown-item command="default" divided class="blue">默认</el-dropdown-item>
                          </el-dropdown-menu>
                      </el-dropdown>
              </div>
          </el-col>
      </el-row>
  </header>
</template>

<script>
    import $ from 'jquery'
    import end from '@/common/js/utils.js'
    import {mapState,mapMutations} from 'vuex'
    import {accountLogout,healthcheck} from '@/api/api'
    export default {
        data () {
            return {
                theme:"default"

            }
        },
        methods: {
            ...mapMutations(['SET_LEFTMENUCOLLASPSE']),
            init_header(){
                if(end.getCookie('theme')!=null){
                    end.changeTheme(end.getCookie('theme'))
                }
            },
            hideMenu(){
                let _this=this
                setTimeout(function () {
                    if($(".hd_icon_i").hasClass("el-icon-caret-left")){
                        _this.SET_LEFTMENUCOLLASPSE(false)
                    }
                    else {
                        _this.SET_LEFTMENUCOLLASPSE(true)
                    }
                },100);
            },
            handleThemeCommand(command){
                end.changeTheme(command)
                //写入cookie
                end.setCookie("theme",command,0);
            },
            headMenu(item){
                this.$store.state.activeMenuContent="menu_"+item
            },
            handleMySetting(command){
                let _this=this
                switch(command){
                    case "logout":{
                        accountLogout().then(p=>{
                            if(p){
                                _this.$store.state.userInfo=null
                                _this.$message({
                                    message: '退出成功',
                                    type: 'success'
                                });
                            }
                            else {
                                _this.$message.error('退出失败');
                            }
                        })
                    }break;
                    // case "city":_this.doSelect("city");break;
                    // case "business":_this.doSelect("business");break;
                    // case "career":_this.doSelect("career");break;
                    // case "tag":_this.doSelect("tag");break;
                    // case "calendar":_this.doSelect("calendar");break;
                    // case "dict":_this.doSelect("dict");break;
                    default:_this.doSelect(command);break
                }
            },
            doSelect(str) {
                console.log(str)
                console.log(this.$store.state.menus)
                let _this = this
                //不存在才加上去
                var bool = false
                _this.$store.state.options.forEach(p => {
                    if (p.key == str) {
                        bool = true
                    }
                })
                _this.$store.state.menus.forEach(p => {
                    if (str == p.key) {
                        if(!bool) {
                            _this.$store.state.options.push(p)
                        }
                        _this.$router.replace(p.key)
                        _this.$store.state.editableTabsValue=p.key
                    }
                })
            }
        },
        created () {
            this.init_header()
        },
        computed: {
            ...mapState(["leftMenuCollapse"]),
            userInfo(){
                return this.$store.state.userInfo
            }
        }

    }
</script>
<style lang="scss">

</style>
