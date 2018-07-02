<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner">
        </div>


        <div class="tableBox">
          <div class="pageTableContent">
            <el-button type="primary" class="addBanner" @click="addUser"><i class="el-icon-plus"></i>新增用户</el-button>
            <el-table :data="PageParams.data" border width="100%">
              <el-table-column prop="account" label="账号" width="240px">
              </el-table-column>
              <el-table-column prop="realName" label="名称" width="260px">
              </el-table-column>
              <el-table-column prop="pwd" label="密码" width="200px">
              </el-table-column>
              <el-table-column prop="mail" label="邮箱" width="260px">
              </el-table-column>
              <el-table-column  label="操作" width="300px">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row,scope.row.id)">编辑</el-button>
                  <el-button type="text" @click="view(scope.row,scope.row.id)">查看</el-button>
                  <el-button type="text" @click="del(scope.$index,scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="block">
          <span class="demonstration"></span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="PageParams.page"
            :page-size="PageParams.pageSize"
            layout="prev, pager, next, jumper"
            :total="PageParams.tatalRows">
          </el-pagination>
        </div>

        <!--弹出框-->
        <el-dialog custom-class="info" title="管理用户信息" :visible.sync="moduleVisible" size="tiny"
                   @close="closeDialog">
          <div class="modalContent">
            <div class="demo-input-suffix">
              账号:<el-input v-model="temp.account" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              名称:<el-input v-model="temp.realName" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              密码:<el-input v-model="temp.pwd" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              邮箱:<el-input v-model="temp.mail" placeholder="email" size="medium"></el-input>
            </div>
            <!--</div>-->
            <div style="text-align: center;margin-top: 10px">
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="saveUser">确定</el-button>
            </div>
          </div>
        </el-dialog>



      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>


</style>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import {userList,getUser,saveUser,delUser} from '@/api/api'
  import $ from 'jquery'
  export default{
    data () {
      return {
        PageParams:{
          page:1,
          pageSize:10,
          tatalRows:10,
          totalPage:1,
          data:[]
        },
        temp:{
          id:null,
          account:null,
          realName:null,
          pwd:null,
          mail:null,
          roleList:[],
          aclList:[],
          dateCreated:null
        },
        moduleVisible:false,
        defaultPageSize:10
      }
    },
    methods: {
      init(page,pageSize){
        var _this=this;
        _this.PageParams.data=[];
        userList({"page":page,"pageSize":pageSize}).then(res => {
          _this.PageParams.page=res.page;
          _this.PageParams.pageSize=res.pageSize;
          _this.PageParams.tatalRows=res.tatalRows;
          _this.PageParams.totalPage=res.totalPage;
          _this.PageParams.data=res.data;
        });
      },
      handleCurrentChange(item){
        this.init(item,this.defaultPageSize);
      },
      closeDialog(){
        this.moduleVisible = false
      },
      addUser(){
        this.moduleVisible = true;
        this.temp={
          id:null,
          account:null,
          realName:null,
          pwd:null,
          mail:null,
          roleList:[],
          aclList:[],
          dateCreated:null
        }
      },
      edit (item, id) {
        this.temp={
          id:item.id,
          account:item.account,
          realName:item.realName,
          pwd:item.pwd,
          mail:item.mail,
          roleList:item.roleList,
          aclList:item.aclList,
          dateCreated:item.dateCreated
        }
        this.moduleVisible = true
        $(".modalContent input").removeAttr("readonly");
      },
      view(item,id){
        this.edit(item,id);
        $(".modalContent input").attr("readonly","readonly");
      },
      del (index, id) {
        this.$confirm('确认删除？')
          .then(res => {
            delUser({id}).then(() => {
              this.$message.success('删除数据成功')
              this.moduleVisible = false
              this.init(1,this.defaultPageSize);
            })
          });
      },
      saveUser(){
        saveUser(this.temp).then(() => {
          this.$message.success('保存成功')
          this.moduleVisible = false
          this.init(1,this.defaultPageSize);
        })
      }
    },
    created () {
      this.init(1,this.defaultPageSize);
    },
    components: {
      NavBar
    }
  }

</script>
