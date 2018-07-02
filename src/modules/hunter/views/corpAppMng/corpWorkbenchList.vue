<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner">

        </div>
        <p id="app" style="margin: 5px 2px">
          <b>工作台名称:</b> <el-input class="search_input" v-model="PageForm.params.name" placeholder="请输入内容"></el-input>
          <b>工作台类型:</b> <el-input  class="search_input" v-model="PageForm.params.type" placeholder="请输入内容"></el-input>
          <el-button type="primary" icon="el-icon-search"  @click="searchWorkBench">搜索</el-button>
        </p>

        <div class="tableBox">
          <div class="pageTableContent">
            <el-button type="primary" class="addBanner" @click="addWorkBench"><i class="el-icon-plus"></i>新增工作台</el-button>
            <el-table :data="tableData" border width="100%" v-loading="isBusy">
              <el-table-column prop="id" label="编号" width="160px">
              </el-table-column>
              <el-table-column prop="name" label="名称" width="220px">
              </el-table-column>
              <el-table-column prop="type" label="类型" width="160px">
              </el-table-column>
              <el-table-column prop="seq" label="排序号" width="160px">
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="200px">
              </el-table-column>
              <el-table-column prop="status" label="状态" width="100px">
              </el-table-column>
              <el-table-column  label="操作" width="260px">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row)">修改</el-button>
                  <el-button type="text" @click="view(scope.row)">查看</el-button>
                  <el-button type="text" @click="del(scope.row.id)">删除</el-button>
                  <el-button type="text" @click="module(scope.row.id)">模块管理</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="block">
          <span class="demonstration"></span>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="PageForm.page"
            :page-size="PageForm.pageSize"
            layout="prev, pager, next, jumper"
            :total="PageForm.totalRows">
          </el-pagination>
        </div>



        <!--弹出框-->
        <el-dialog custom-class="info" title="工作台管理" :visible.sync="moduleVisible" size="tiny"
                   @close="closeDialog">
          <div class="modalContent">
            <div class="demo-input-suffix">
              名称:<el-input v-model="temp.name" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              类型:<el-input v-model="temp.type" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              排序号:<el-input v-model="temp.seq" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              备注:<el-input v-model="temp.remark" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <div class="demo-input-suffix">
              状态:<el-input v-model="temp.status" placeholder="请输入内容" size="medium"></el-input>
            </div>
            <!--</div>-->
            <div style="text-align: center;margin-top: 10px">
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="saveWorkBench">确定</el-button>
            </div>
          </div>
        </el-dialog>


      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .search_input{
    width:24%;
    margin: 0 auto;
  }

</style>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import {bizWorkbenchList,getBizWorkbench,saveBizWorkbench,delBizWorkbench} from '@/api/api'
  import $ from 'jquery'
  export default{
    data () {
      return {
        tableData:[],
        temp:{
          id:null,
          name:null,
          type:null,
          seq:null,
          remark:null,
          status:null
        },

        PageForm:{
          page:1,
          pageSize:10,
          totalRows:null,
          totalPage:null,
          params:{
            name:null,
            type:null
          }
        },

        moduleVisible:false,
        defaultPageSize:10,

        isBusy: false
      }
    },
    methods: {
      init(page,pageSize){
        var _this=this;
        _this.isBusy=true;
        _this.tableData=[];
        _this.PageForm.page=page;
        _this.PageForm.pageSize=pageSize;
        bizWorkbenchList(_this.PageForm).then(res => {
          _this.tableData=res.data;
          _this.PageForm.totalRows=res.tatalRows;
          _this.PageForm.totalPage=res.totalPage;
          _this.isBusy=false;
        });
      },
      searchWorkBench(){
        this.init(1,this.defaultPageSize);
      },
      handleCurrentChange(item){
        this.init(item,this.defaultPageSize);
      },
      edit(item){
        this.temp.id=item.id
        this.temp.name=item.name
        this.temp.type=item.type
        this.temp.seq=item.seq
        this.temp.remark=item.remark
        this.temp.status=item.status
        this.moduleVisible = true
        $(".modalContent input").removeAttr("readonly");
      },
      view(item){
        this.edit(item);
        $(".modalContent input").attr("readonly","readonly");
      },
      del(id){
        this.$confirm('确认删除？')
          .then(res => {
            delBizWorkbench({id}).then(() => {
              this.$message.success('删除数据成功')
              this.moduleVisible = false
              this.init(1,this.defaultPageSize);
            })
          });
      },
      saveWorkBench(){
        saveBizWorkbench(this.temp).then(() => {
          this.$message.success('保存成功')
          this.moduleVisible = false
          this.init(1,this.defaultPageSize);
        })
      },
      closeDialog(){
        this.moduleVisible = false
      },
      module(id){
        window.location.href="#/corp_workbenchconf";
      },
      addWorkBench(){
        this.temp.id=null
        this.temp.name=null
        this.temp.type=null
        this.temp.seq=null
        this.temp.remark=null
        this.temp.status=null
        this.moduleVisible = true
        $(".modalContent input").removeAttr("readonly");
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
