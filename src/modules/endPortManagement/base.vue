<!-- Created by chunmingdeng on 2018/4/2 -->
<template>
  <div id="main-container" class="clearfix">
    <Slide class="slider"></Slide>


    <div class="right clearfix">
      <div class="custom-analysis page-wrap-tabs">
        <el-tabs  v-model="editableTabsValue" addable editable closable type="border-card" class="tabs-nopadding" @edit="handleTabsEdit" @tab-click="tabClick">
          <!--<el-tab-pane  key="main" label="主页" name="主页">-->
            <!--this is good-->
          <!--</el-tab-pane>-->
          <el-tab-pane v-for="option in options" :key="option.key" :label="option.label" :name="option.key">
            <keep-alive>
              <router-view class="rt_view"></router-view>
            </keep-alive>

          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
  </div>
</template>

<script>
  import Slide from '@/components/slider'
  import {mapState,mapMutations} from 'vuex'
  import $ from 'jquery'
  export default {
    name:'base',
    data: function () {
      return {

      }
    },
      methods:{
          ...mapMutations(['ADD_OPTIONS','REMOVE_OPTIONS','SET_EDITABLETABSVALUE']),
          removeTab(str){
              let _this=this
              _this.REMOVE_OPTIONS(str)
          },
          handleTabsEdit(targetName, action){
              let _this=this
              console.log(targetName)
              console.log(action)
              if (action === 'remove') {
                  if(targetName!="main") {
                      _this.removeTab(targetName)
                      _this.REMOVE_OPTIONS(targetName)
                      _this.showOptionLast()
                  }
              }
              if (action === 'add') {
                  // console.log("fffgsgs")
              }
          },
          tabClick(item){
              let _this=this
              this.$store.state.menus.forEach(p => {
                  if (item.name == p.key) {
                      console.log("router")
                      console.log(p.router)
                      // _this.ADD_OPTIONS(p)
                      _this.$router.replace(p.key)
                      _this.SET_EDITABLETABSVALUE(p.key)
                      // _this.$router.push({path: 'base/' + str})
                  }
              })
          },
          //搜索option，将最后一个设置为可见路由
          showOptionLast(){
              let _this=this
              var length=_this.$store.state.options.length
              var opLast=_this.$store.state.options[length-1]
              _this.$router.replace(opLast.key)
              _this.SET_EDITABLETABSVALUE(opLast.key)
          },

          init_base(){

              setTimeout(function () {
                  //tab后边菜单处理
                  var info="<span class='el-tabs__new-tab rt_tab_rm'><i class='el-icon-rank'></i></span>" +
                      "<span class='el-tabs__new-tab'><i class='el-icon-close'></i></span>" +
                      "<span class='el-tabs__new-tab'><i class='el-icon-refresh'></i></span>" +
                      "<span class='el-tabs__new-tab'><i class='el-icon-mobile-phone'></i></span>";
                  $(".el-tabs__new-tab").before(info)


                  //高度设置
                  var height=$(window).height()-138
                  $(".el-tabs__content").css({height:height})
                  $(".rt_view").css({height:height})
              },100)


          }
      },
    components:{
      Slide
    },
    computed: {
        options(){
            console.log("dddd")
            console.log(this.$store.state.options)
            return this.$store.state.options
        },
        editableTabsValue:{
            get: function () {
                console.log("showshow"+this.$store.state.editableTabsValue)
                return this.$store.state.editableTabsValue
            },
            set: function (value) {
                this.$store.state.editableTabsValue=value
            }
        }
    },
      watch: {

      },
      created () {
          this.init_base()
      }
  }
</script>

<style lang="scss">

</style>
