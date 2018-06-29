<!-- Created by chunmingdeng on 2018/4/2 -->
<template>
  <div id="main-container" class="clearfix">
    <Slide class="slider"></Slide>


    <div class="right clearfix">
      <div class="custom-analysis page-wrap-tabs">
        <el-tabs v-model="$route.name"  editable closable type="border-card" class="tabs-nopadding" @edit="handleTabsEdit">
          <!--<el-tab-pane  key="main" label="主页" name="主页">-->
            <!--this is good-->
          <!--</el-tab-pane>-->
          <el-tab-pane v-for="option in options" :key="option.key" :label="option.label" :name="option.key">
            <!--<keep-alive>-->
              <router-view style="height: 600px;background: yellow"></router-view>
            <!--</keep-alive>-->

          </el-tab-pane>
        </el-tabs>

      </div>
    </div>

    <!--<router-view class="right clearfix">-->
    <!--</router-view>-->
  </div>
</template>

<script>
  import Slide from '@/components/slider'
  import {mapState,mapMutations} from 'vuex'
  export default {
    name:'base',
    data: function () {
      return {

      }
    },
      methods:{
          ...mapMutations(['ADD_OPTIONS','REMOVE_OPTIONS']),
          removeTab(str){
              let _this=this
              _this.REMOVE_OPTIONS(str)
          },
          handleTabsEdit(targetName, action){
              let _this=this
              console.log(targetName)
              console.log(action)
              if (action === 'remove') {
                  _this.removeTab(targetName)
              }
              if (action === 'add') {
                  console.log("fffgsgs")
              }
              // this.editableTabsValue = activeName;
              // this.options = options.filter(tab => tab.name !== targetName);
          }

      },
    components:{
      Slide
    },
    computed: {
        ...mapState(["options"])
    },
      watch: {
          options(){
              console.log("options is "+this.options)
              return this.options
          }
      }
  }
</script>

<style lang="scss">

</style>
