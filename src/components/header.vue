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
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_15.png"/></div>
                      <div class="hd_menu_span"><span>静态演示</span></div>
                  </div>
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_16.png"/></div>
                      <div class="hd_menu_span"><span>动态演示</span></div>
                  </div>
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_17.png"/></div>
                      <div class="hd_menu_span"><span>我的管理</span></div>
                  </div>
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_18.png"/></div>
                      <div class="hd_menu_span"><span>系统配置</span></div>
                  </div>
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/xp_19.png"/></div>
                      <div class="hd_menu_span"><span>系统配置</span></div>
                  </div>
              </div>
          </el-col>
          <el-col :span="9" style="float: right;">
              <div style="float: right;margin-right: 12px;">
                          <el-dropdown>
                                  <span class="el-dropdown-link hd_r_span">
                                    设置<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                              <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>密码设置</el-dropdown-item>
                                  <el-dropdown-item>信息配置</el-dropdown-item>
                                  <el-dropdown-item>我的图像</el-dropdown-item>
                              </el-dropdown-menu>
                          </el-dropdown>
                          |<el-dropdown>
                                  <span class="el-dropdown-link hd_r_span">
                                    选择城市<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                          <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>上海</el-dropdown-item>
                              <el-dropdown-item>无锡</el-dropdown-item>
                              <el-dropdown-item>苏州</el-dropdown-item>
                          </el-dropdown-menu>
                      </el-dropdown>
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
                          |<el-dropdown>
                                  <span class="el-dropdown-link hd_r_span">
                                    工具箱<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                          <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>锤子</el-dropdown-item>
                              <el-dropdown-item>🔨</el-dropdown-item>
                              <el-dropdown-item>斧头</el-dropdown-item>
                              <el-dropdown-item>大刀</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      |<el-dropdown>
                          <span class="el-dropdown-link hd_r_span">
                            样式<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>aaa</el-dropdown-item>
                              <el-dropdown-item>bbb</el-dropdown-item>
                              <el-dropdown-item>ccc</el-dropdown-item>
                              <el-dropdown-item disabled>ddd</el-dropdown-item>
                              <el-dropdown-item divided>eee</el-dropdown-item>
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
    import {} from '@/api/api'
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
            }
        },
        created () {
            this.init_header()
        },
        computed: {
            ...mapState(["leftMenuCollapse"])
        }

    }
</script>
<style lang="scss">

</style>
