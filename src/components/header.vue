<template>
  <header class="header">
      <el-row class="hd_row">
          <el-col :span="4">
              <div>
                  <img class="hd_img" src="~@/assets/images/logo.png"/>
                  <span class="hd_icon_tog">
                      <i class="el-icon-caret-left"></i>
                  </span>
              </div>
          </el-col>
          <el-col :span="8">
              <div style="position: relative">
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/mobile.png"/></div>
                      <div class="hd_menu_span"><span>静态演示</span></div>
                  </div>
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/beian-ico.png"/></div>
                      <div class="hd_menu_span"><span>动态演示</span></div>
                  </div>
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/mobile.png"/></div>
                      <div class="hd_menu_span"><span>我的管理</span></div>
                  </div>
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/password.png"/></div>
                      <div class="hd_menu_span"><span>系统配置</span></div>
                  </div>
                  <div class="hd_menu">
                      <div class="hd_menu_icon"><img src="~@/assets/images/password.png"/></div>
                      <div class="hd_menu_span"><span>系统配置</span></div>
                  </div>
              </div>
          </el-col>
          <el-col :span="6" style="float: right">
              <div>
                  <span class="hd_r_span"><i class="el-icon-upload el-icon--right"></i>城市</span>
                  |<span class="hd_r_span"><i class="el-icon-upload el-icon--right"></i>设置</span>
                  |<span class="hd_r_span"><i class="el-icon-upload el-icon--right"></i>主题</span>
                  |<span class="hd_r_span"><i class="el-icon-upload el-icon--right"></i>简介</span>
                  |<span class="hd_r_span"><i class="el-icon-upload el-icon--right"></i>
                     <el-dropdown trigger="click" show-timeout="0.2">
                        <span class="el-dropdown-link">注销</span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                             aaa
                          </el-dropdown-item>
                            <el-dropdown-item>
                             bbb
                          </el-dropdown-item>
                            <el-dropdown-item>
                             ccc
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                </span>
              </div>
          </el-col>
      </el-row>
  </header>
</template>

<script>
    import $ from 'jquery'
    import {mapMutations} from 'vuex'
    import {} from '@/api/api'
    export default {
        data () {
            return {

            }
        },
        methods: {

        },
        created () {

        }
    }
</script>
<style lang="scss">

</style>
