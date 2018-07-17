<template>
  <div>
    <el-menu
            @select="doSelect"
            :default-active="activeIndex"
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="leftMenuCollapse">

      <el-submenu :index="item1.id" v-for="item1 in activeMenuContent">
           <template slot="title"><i :class="item1.icon"></i><span>{{item1.name}}</span></template>
          <el-submenu :index="item2.id" v-for="item2 in item1.children">
            <template slot="title"><i :class="item2.icon"></i><span>{{item2.name}}</span></template>
            <el-menu-item :index="item3.id" v-for="item3 in item2.children"><i :class="item3.icon"></i><span>{{item3.name}}</span></el-menu-item>
          </el-submenu>
      </el-submenu>

      <!--<el-submenu index="1">-->
        <!--<template slot="title"><i class="el-icon-location"></i><span>导航一</span></template>-->
        <!--<el-submenu index="1-7">-->
          <!--<template slot="title"><i class="el-icon-menu"></i><span>选项1</span></template>-->
          <!--<el-menu-item index="1-7-1"><i class="el-icon-document"></i><span>选项2</span></el-menu-item>-->
          <!--<el-menu-item index="1-7-2"><i class="el-icon-document"></i><span>选项4</span></el-menu-item>-->
          <!--<el-menu-item index="1-7-3"><i class="el-icon-document"></i><span>选项5</span></el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-submenu index="1-8">-->
          <!--<template slot="title"><i class="el-icon-menu"></i><span>选项5</span></template>-->
          <!--<el-menu-item index="1-8-1"><i class="el-icon-document"></i><span>选项2</span></el-menu-item>-->
        <!--</el-submenu>-->
      <!--</el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
  import end from '@/common/js/utils.js'
  import {} from '@/api/api'
  import {mapState,mapMutations} from 'vuex'
  import $ from 'jquery'
  export default {
    data () {
      return {
          isCollapse:false,
          menu_user:[{id:"1",path:"1",icon:"el-icon-menu",name:"订阅搜索",children:
                  [{id:"1-1",path:"1-1",icon:"el-icon-menu",name:"我创建的",children:
                      [{id:"1-1-1",path:"1-1-1",icon:"el-icon-document",name:"所有人才"},{id:"1-1-2",path:"1-1-2",icon:"el-icon-document",name:"我的候选人"},{id:"1-1-3",path:"1-1-3",icon:"el-icon-document",name:"客户联系人"},{id:"1-1-4",path:"1-1-4",icon:"el-icon-document",name:"cold call"}]},
                  {id:"1-2",path:"1-2",icon:"el-icon-document",name:"共享人才",children:
                          [{id:"1-2-1",path:"1-2-1",icon:"el-icon-document",name:"所有人才"},{id:"1-2-2",path:"1-2-2",icon:"el-icon-document",name:"候选人"},{id:"1-2-3",path:"1-2-3",icon:"el-icon-document",name:"客户联系人"},{id:"1-2-4",path:"1-2-4",icon:"el-icon-document",name:"cold call"}]},
                      {id:"1-3",path:"1-3",icon:"el-icon-menu",name:"收取简历",children:
                              [{id:"1-3-1",path:"1-3-1",icon:"el-icon-document",name:"收取邮箱简历"},{id:"1-3-2",path:"1-3-2",icon:"el-icon-document",name:"设置邮箱"}]},
                      {id:"1-4",path:"1-4",icon:"el-icon-document",name:"回收站",children:
                              [{id:"1-4-1",path:"1-4-1",icon:"el-icon-document",name:"我删除的"},{id:"1-4-2",path:"1-4-2",icon:"el-icon-document",name:"所有删除"}]}]},
              {id:"2",path:"2",icon:"el-icon-menu",name:"文件夹",children:
                      [{id:"2-1",path:"2-1",icon:"el-icon-document",name:"我的文件夹",children:
                              [{id:"2-1-1",path:"2-1-1",icon:"el-icon-document",name:"A文件夹"},{id:"2-1-2",path:"2-1-2",icon:"el-icon-document",name:"B文件夹"},{id:"2-1-3",path:"2-1-3",icon:"el-icon-document",name:"C文件夹"},{id:"2-1-4",path:"2-1-4",icon:"el-icon-document",name:"D文件夹"}]}
                         ]}],


          menu_company:[{id:"1",path:"1",icon:"el-icon-document",name:"共享人才",children:[{id:"2",path:"2",icon:"el-icon-document",name:"所有人才",children:
                      [{id:"4",path:"4",icon:"el-icon-document",name:"c",},{id:"5",path:"5",icon:"el-icon-document",name:"d"}]},
                  {id:"3",path:"3",icon:"el-icon-document",name:"e",children:[{id:"6",path:"6",icon:"el-icon-document",name:"f"}]}]}]
      }
    },
    methods: {
        ...mapMutations(['ADD_OPTIONS',"SET_EDITABLETABSVALUE"]),
        initMenuCollapse(){
            // console.log(this.leftMenuCollapse)
            // this.isCollapse=this.leftMenuCollapse
            // console.log(this.isCollapse)
        },

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        activeIndex: function () {
            let activeIndex="1"
            if(this.$route.name!=null){
                activeIndex = this.$route.name
            }
            console.log(activeIndex)
            return activeIndex
        },
        doSelect(str) {
            console.log(str)
            let _this = this
            //不存在才加上去
            var bool = false
            _this.options.forEach(p => {
                if (p.key == str) {
                    bool = true
                }
            })

            this.$store.state.menus.forEach(p => {
                if (str == p.key) {
                    if(!bool) {
                        _this.ADD_OPTIONS(p)
                    }
                    _this.$router.replace(p.key)
                    _this.SET_EDITABLETABSVALUE(p.key)
                }
            })

        }


    },
    components: {},
    computed: {
        ...mapState(["leftMenuCollapse","options"]),
        activeMenuContent(){
            let _this=this
            let paras=this.$store.state.activeMenuContent
            if(paras=="menu_user"){
                return _this.menu_user
            }
            else if(paras=="menu_company"){
                return _this.menu_company
            }
        }

    },
    watch: {
        leftMenuCollapse(){
            console.log(this.leftMenuCollapse)
            return this.leftMenuCollapse
        }
    },
    created () {
        this.initMenuCollapse()
    }
  }
</script>

<style lang="scss">

</style>
