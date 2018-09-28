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
  import {mapState,mapMutations,
      docListOwner,docListShare} from 'vuex'
  import $ from 'jquery'
  export default {
    data () {
      return {
          isCollapse:false,
          menu_user:[{id:"1",path:"1",icon:"el-icon-menu",name:"订阅搜索",children:
                  [{id:"1-1",path:"1-1",icon:"el-icon-menu",name:"我创建的",children:
                      [{id:"my-talent",path:"my-talent",icon:"el-icon-document",name:"所有人才"},
                          {id:"my-candidate",path:"my-candidate",icon:"el-icon-document",name:"我的候选人"},
                          {id:"my-linkman",path:"my-linkman",icon:"el-icon-document",name:"客户联系人"},
                          {id:"my-coldcall",path:"my-coldcall",icon:"el-icon-document",name:"cold call"}]},
                  {id:"1-2",path:"1-2",icon:"el-icon-menu",name:"共享人才",children:
                          [{id:"all-talent",path:"all-talent",icon:"el-icon-document",name:"所有人才"},
                              {id:"all-candidate",path:"all-candidate",icon:"el-icon-document",name:"我的候选人"},
                              {id:"all-linkman",path:"all-linkman",icon:"el-icon-document",name:"客户联系人"},
                              {id:"all-coldcall",path:"all-coldcall",icon:"el-icon-document",name:"cold call"}]},
                      {id:"1-3",path:"1-3",icon:"el-icon-menu",name:"收取简历",children:
                              [{id:"1-3-1",path:"1-3-1",icon:"el-icon-document",name:"收取邮箱简历"},
                                  {id:"1-3-2",path:"1-3-2",icon:"el-icon-document",name:"设置邮箱"}]},
                      {id:"1-4",path:"1-4",icon:"el-icon-menu",name:"回收站",children:
                              [{id:"my-talentfaked",path:"my-talentfaked",icon:"el-icon-document",name:"我删除的"},
                                  {id:"all-talentfaked",path:"all-talentfaked",icon:"el-icon-document",name:"所有删除"}]}]},
              {id:"2",path:"2",icon:"el-icon-menu",name:"文件夹",children:
                      [{id:"2-1",path:"2-1",icon:"el-icon-menu",name:"我的文件夹",children:
                              [{id:"talent-doc6",path:"talent-doc6",icon:"el-icon-document",name:"111"},
                                  {id:"talent-doc7",path:"talent-doc7",icon:"el-icon-document",name:"222"},
                                  {id:"talent-doc8",path:"talent-doc8",icon:"el-icon-document",name:"333"}
                                  ]},
                          {id:"2-2",path:"2-2",icon:"el-icon-menu",name:"共享文件夹",children:
                                  [{id:"talent-doc9",path:"talent-doc9",icon:"el-icon-document",name:"共享111"},
                                      {id:"talent-doc10",path:"talent-doc10",icon:"el-icon-document",name:"共享222"}
                                  ]}
                         ]}],
          menu_company:[{id:"3",path:"3",icon:"el-icon-menu",name:"订阅搜索",children:
                  [{id:"3-1",path:"3-1",icon:"el-icon-menu",name:"我创建的",children:
                          [{id:"my-company",path:"my-company",icon:"el-icon-document",name:"所有公司"},
                              {id:"my-con-company",path:"my-con-company",icon:"el-icon-document",name:"普通公司"},
                              {id:"my-dev-company",path:"my-dev-company",icon:"el-icon-document",name:"开发中客户"},
                              {id:"my-sign-company",path:"my-sign-company",icon:"el-icon-document",name:"已签约客户"},
                              {id:"my-terminal-company",path:"my-terminal-concompany",icon:"el-icon-document",name:"终止合作"}]},
                      {id:"3-2",path:"3-2",icon:"el-icon-document",name:"共享公司",children:
                              [{id:"share-company",path:"share-company",icon:"el-icon-document",name:"所有公司"},
                              {id:"share-con-company",path:"share-con-company",icon:"el-icon-document",name:"普通公司"},
                              {id:"share-dev-company",path:"share-dev-company",icon:"el-icon-document",name:"开发中客户"},
                              {id:"share-sign-company",path:"share-sign-company",icon:"el-icon-document",name:"已签约客户"},
                              {id:"share-terminal-company",path:"share-terminal-company",icon:"el-icon-document",name:"终止合作"}]},
                      {id:"3-3",path:"3-3",icon:"el-icon-document",name:"回收站",children:
                              [{id:"my-faked-company",path:"my-faked-company",icon:"el-icon-document",name:"我删除的"},
                                  {id:"all-faked-company",path:"all-faked-company",icon:"el-icon-document",name:"所有删除"}]}]},
              {id:"4",path:"4",icon:"el-icon-menu",name:"文件夹",children:
                      [{id:"4-1",path:"4-1",icon:"el-icon-document",name:"我的文件夹",children:
                              [{id:"company-doc11",path:"company-doc11",icon:"el-icon-document",name:"公司001"},
                                  {id:"company-doc12",path:"company-doc12",icon:"el-icon-document",name:"公司002"},
                                  {id:"company-doc13",path:"company-doc13",icon:"el-icon-document",name:"公司003"}]},
                          {id:"4-2",path:"4-2",icon:"el-icon-document",name:"共享文件夹",children:
                                  [{id:"company-doc14",path:"company-doc14",icon:"el-icon-document",name:"共享公司a"},
                                      {id:"company-doc15",path:"company-doc15",icon:"el-icon-document",name:"共享公司b"}]}
                      ]}],
          menu_project:[],

          menu_report:[],

          menu_setting:[{id:"5",path:"5",icon:"el-icon-document",name:"设置",children:[{id:"5-1",path:"5-1",icon:"el-icon-document",name:"系统设置",children:[
                      {id:"5-1-1",path:"5-1-1",icon:"el-icon-document",name:"企业信息维护"},
                      {id:"5-1-2",path:"5-1-2",icon:"el-icon-document",name:"用户管理"},
                      {id:"5-1-3",path:"5-1-3",icon:"el-icon-document",name:"角色管理"},
                      {id:"5-1-4",path:"5-1-4",icon:"el-icon-document",name:"权限管理"},
                      {id:"5-1-5",path:"5-1-5",icon:"el-icon-document",name:"字典项管理"}
                  ]}]}]
      }
    },
    methods: {
        ...mapMutations(['ADD_OPTIONS',"SET_EDITABLETABSVALUE"]),
        initMenuCollapse(){
            // console.log(this.leftMenuCollapse)
            // this.isCollapse=this.leftMenuCollapse
            // console.log(this.isCollapse)

            //共享目录的初始化



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
            var result=[];
            switch (paras){
                case "menu_user":result=_this.menu_user;break;
                case "menu_company":result=_this.menu_company;break;
                case "menu_project":result=_this.menu_project;break;
                case "menu_report":result=_this.menu_report;break;
                case "menu_setting":result=_this.menu_setting;break;
                default:result=_this.menu_user;
            }
            return result;
        }

    },
    watch: {
        leftMenuCollapse(){
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
