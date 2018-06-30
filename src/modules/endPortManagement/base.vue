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
                  }
              }
              if (action === 'add') {
                  console.log("fffgsgs")
              }
              // _this.SET_EDITABLETABSVALUE(targetName)
              // console.log(this.editableTabsValue)
              // this.options = options.filter(tab => tab.name !== targetName);
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


          }

      },
    components:{
      Slide
    },
    computed: {
        // ...mapState(["options","editableTabsValue"]),
        // editableTabsValue:{
        //     get:function () {
        //         return this.editableTabsValue
        //     },
        //     set:function (value) {
        //         // this.SET_EDITABLETABSVALUE(value)
        //     }
        // }
        options(){
            console.log("dddd")
            console.log(this.$store.state.options)
            return this.$store.state.options
        },
        // editableTabsValue(){
        //     return this.$store.state.editableTabsValue
        // },
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
          // options(){
          //     console.log("options is ")
          //     console.log(this.$store.state.options)
          //     console.log(this.options)
          //     return this.options
          // },
          // editableTabsValue(){
          //     console.log("dddttt"+this.editableTabsValue)
          //     return this.editableTabsValue
          // }
      }
  }
</script>

<style lang="scss">

</style>
