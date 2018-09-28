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
          td:'abc'
      }
    },
      methods:{
          ...mapMutations(['ADD_OPTIONS','REMOVE_OPTIONS','SET_EDITABLETABSVALUE']),
          removeTab(str){
              let _this=this;
              _this.REMOVE_OPTIONS(str)
          },
          handleTabsEdit(targetName, action){
              let _this=this;
              if (action === 'remove') {
                  if(targetName!="main") {
                      var index=_this.tabIndex(targetName);
                      index=index==0?0:index-1;
                      _this.removeTab(targetName);
                      _this.showOption(index)
                  }
              }
              if (action === 'add') {
                  // console.log("fffgsgs")
              }
          },
          tabIndex(str){
              let _this=this;
              let _pt=0;
              $.each(_this.$store.state.options,function (index,item) {
                  if(item.key==str){
                      _pt=index
                  }
              });
              return _pt;
          },
          tabClick(item){
              let _this=this;
              this.$store.state.menus.forEach(p => {
                  if (item.name == p.key) {
                      // _this.ADD_OPTIONS(p)
                      _this.$router.replace(p.key);
                      _this.SET_EDITABLETABSVALUE(p.key)
                      // _this.$router.push({path: 'base/' + str})
                  }
              })
          },
          //搜索option，将最后一个设置为可见路由
          showOptionLast(){
              let _this=this;
              var length=_this.$store.state.options.length;
              var opLast=_this.$store.state.options[length-1];
              _this.$router.replace(opLast.key);
              _this.SET_EDITABLETABSVALUE(opLast.key)
          },
          showOption(index){
              let _this=this;
              let opIndex=_this.$store.state.options[index];
              _this.$router.replace(opIndex.key);
              _this.SET_EDITABLETABSVALUE(opIndex.key)
          },
          init_base(){

              setTimeout(function () {
                  //tab后边菜单处理
                  var info="<span class='el-tabs__new-tab rt_tab_rm' id='base_el_search'><i class='el-icon-search'></i></span>" +
                      "<span class='el-tabs__new-tab' id='base_el_close'><i class='el-icon-close'></i></span>" +
                      "<span class='el-tabs__new-tab' id='base_el_refresh'><i class='el-icon-refresh'></i></span>" +
                      "<span class='el-tabs__new-tab' id='base_el_phone'><i class='el-icon-mobile-phone'></i></span>";
                  $(".el-tabs__new-tab").before(info);

                  //高度设置
                  var height=$(window).height()-138;
                  $(".el-tabs__content").css({height:height});
                  $(".rt_view").css({height:height})
              },100)


              $(function () {
                  $("#base_el_search").on("click",function () {

                  })
                  $("#base_el_close").on("click",function () {
                      console.log("clode")
                  })
                  $("#base_el_refresh").on("click",function () {

                  })
                  $("#base_el_phone").on("click",function () {

                  })
              })
          }
      },
    components:{
      Slide
    },
    computed: {
        options(){
            return this.$store.state.options
        },
        editableTabsValue:{
            get: function () {
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
