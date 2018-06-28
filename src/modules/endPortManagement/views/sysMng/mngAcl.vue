<template>
  <section class="acl-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div style="margin: 10px;">
        <template>
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="角色赋予权限" name="first" style="height: 560px;">
              <div style="float: left;width: 300px;margin-right: 10px;height: 400px;overflow-y: auto;">
              <el-tree :data="oneRole" :props="defaultTreeProps"
                       node-key="id"
                       show-checkbox
                       ref="oneRoleTree"
                       @check-change="oneRoleNodeChange"></el-tree>
              </div>
              <div style="float: left;width: 600px;height: 400px;overflow-y: auto;">
              <el-tree :data="oneAcl"  :props="defaultTreeProps"
                       show-checkbox
                       node-key="id"
                       ref="oneAclTree"
                       :default-checked-keys="oneCheckAcls"
                       @check-change="oneAclNodeChange"></el-tree>
              </div>
              <div style="text-align: left;margin-top: 10px;width: 600px;">
                <el-button type="primary" @click="oneSave">保存</el-button>
              </div>
            </el-tab-pane>


            <el-tab-pane label="用户赋予角色" name="second" style="height: 560px;">
              <div style="float: left;width: 300px;margin-right: 10px;height: 400px;overflow-y: auto;">
                <el-tree :data="twoUser" :props="defaultTreeProps"
                         node-key="id"
                         show-checkbox
                         ref="twoUserTree"
                         @check-change="twoUserNodeChange"></el-tree>
              </div>
              <div style="float: left;width: 600px;height: 400px;overflow-y: auto;">
                <el-tree :data="twoRole"  :props="defaultTreeProps"
                         show-checkbox
                         node-key="id"
                         ref="twoRoleTree"
                         @check-change="twoRoleChange"></el-tree>
              </div>
              <div style="text-align: left;margin-top: 10px;width: 600px;">
                <el-button type="primary" @click="twoSave">保存</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="用户自定义权限" name="fourth" style="height: 560px;">
              <div style="float: left;width: 300px;margin-right: 10px;height: 400px;overflow-y: auto;">
                <el-tree :data="threeUser" :props="defaultTreeProps"
                         node-key="id"
                         show-checkbox
                         ref="threeUserTree"
                         @check-change="threeUserNodeChange"></el-tree>
              </div>
              <div style="float: left;width: 600px;height: 400px;overflow-y: auto;">
                <el-tree :data="threeAcl"  :props="defaultTreeProps"
                         show-checkbox
                         node-key="id"
                         ref="threeAclTree"
                         @check-change="threeAclNodeChange"></el-tree>
              </div>
              <div style="text-align: left;margin-top: 10px;width: 600px;">
                <el-button type="primary" @click="threeSave">保存</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="查询用户权限" name="five" style="height: 560px;">
              <div style="float: left;width: 300px;margin-right: 10px;height: 400px;overflow-y: auto;">
                <el-tree :data="fourUser" :props="defaultTreeProps"
                         node-key="id"
                         show-checkbox
                         ref="fourUserTree"
                         @check-change="fourUserNodeChange"></el-tree>
              </div>
              <div style="float: left;width: 300px;height: 400px;overflow-y: auto;margin-right: 10px;">
                <el-tree :data="fourRole"  :props="defaultTreeProps"
                         show-checkbox
                         node-key="id"
                         ref="fourRoleTree"></el-tree>
              </div>
              <div style="float: left;width: 300px;height: 400px;overflow-y: auto;">
                <el-tree :data="fourAcl"  :props="defaultTreeProps"
                         show-checkbox
                         node-key="id"
                         ref="fourAclTree"></el-tree>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .main{
    height: 650px;
  }

</style>

<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import {dataTree,saveRoleAcl,saveUserRoleAcl} from '@/api/api'
  import $ from 'jquery'
  export default{
    data () {
      return {
        activeName: 'first',

        oneRole:[],
        oneAcl:[],
        oneCheckAcls:[],

        twoUser:[],
        twoRole:[],

        threeUser:[],
        threeAcl:[],

        fourUser:[],
        fourRole:[],
        fourAcl:[],

        defaultTreeProps:{
          children: 'children',
          label: 'label'
        }
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      oneRoleNodeChange(data,checked){
          if(checked) {
            this.oneCheckAcls = data.aclList;
            this.$refs.oneAclTree.setCheckedKeys(this.oneCheckAcls);
          }
          else {
            this.oneCheckAcls = [];
            this.$refs.oneAclTree.setCheckedKeys([]);
          }
      },
      oneAclNodeChange(data){
        console.log(data);
      },
      getInitData(){//初始化所有数据
        var _this=this;
        dataTree({}).then(res => {
            _this.oneRole=res.roleList;
            _this.oneAcl=res.aclList;


            _this.twoUser=res.userList;
            _this.twoRole=res.roleList;


            _this.threeUser=res.userList;
            _this.threeAcl=res.aclList;


            _this.fourUser=res.userList;
            _this.fourRole=res.roleList;
            _this.fourAcl=res.aclList;

        });
      },
      oneSave(){
          var length=this.$refs.oneRoleTree.getCheckedNodes().length;
          if(length!=1){
            this.$message({
              message: '角色需要选择且只能选择一个',
              type: 'warning'
            });
              return;
          }

          var roleId=this.$refs.oneRoleTree.getCheckedNodes()[0].id;
          var aclIds=[];
          $.each(this.$refs.oneAclTree.getCheckedNodes(),function (index,item) {
            aclIds.push(item.id);
          });
          var paras={
              roleId:roleId,
            aclIds:aclIds
          }

        saveRoleAcl(paras).then(res => {
          this.$message({
            message: '角色 权限保存成功',
            type: 'success'
          });
        });
      },

      twoUserNodeChange(data,checked){
          if(checked)
        this.$refs.twoRoleTree.setCheckedKeys(data.roleList);
          else
            this.$refs.twoRoleTree.setCheckedKeys([]);
      },
      twoRoleChange(data){
        console.log(data)
      },
      twoSave(){
        var length=this.$refs.twoUserTree.getCheckedNodes().length;
        if(length<1){
          this.$message({
            message: '至少选择一个用户',
            type: 'warning'
          });
          return;
        }
        var userIds=[];
        $.each(this.$refs.twoUserTree.getCheckedNodes(),function (index,item) {
          userIds.push(item.id);
        });
        var roleIds=[];
        $.each(this.$refs.twoRoleTree.getCheckedNodes(),function (index,item) {
          roleIds.push(item.id);
        });
        var paras={
          userIds:userIds,
          roleIds:roleIds
        }

        saveUserRoleAcl(paras).then(res => {
          this.$message({
            message: '用户 角色保存成功',
            type: 'success'
          });
        });
      },

      threeUserNodeChange(data,checked){
          if(checked) {
            this.$refs.threeAclTree.setCheckedKeys(data.aclList);
          }
          else {
            var tmp=[];
            this.$refs.threeAclTree.setCheckedKeys(tmp);
          }
      },
      threeAclNodeChange(data){
          console.log(data);
      },
      threeSave(){
        var length=this.$refs.threeUserTree.getCheckedNodes().length;
        if(length<1){
          this.$message({
            message: '至少选择一个用户',
            type: 'warning'
          });
          return;
        }
        var userIds=[];
        $.each(this.$refs.threeUserTree.getCheckedNodes(),function (index,item) {
          userIds.push(item.id);
        });
        var aclIds=[];
        $.each(this.$refs.threeAclTree.getCheckedNodes(),function (index,item) {
          aclIds.push(item.id);
        });
        var paras={
          userIds:userIds,
          aclIds:aclIds
        }

        saveUserRoleAcl(paras).then(res => {
          this.$message({
            message: '用户 权限保存成功',
            type: 'success'
          });
        });
      },

      fourUserNodeChange(data,checked){
         if(checked) {
           this.$refs.fourRoleTree.setCheckedKeys(data.roleList);
           this.$refs.fourAclTree.setCheckedKeys(data.aclList);
         }
         else {
             var tmp=[];
           this.$refs.fourRoleTree.setCheckedKeys(tmp);
           this.$refs.fourAclTree.setCheckedKeys(tmp);
         }
      }

    },
    created () {
    },
    mounted() {
      this.getInitData();
    },
    components: {
      NavBar
    }
  }
</script>
