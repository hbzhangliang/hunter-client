<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner">

        </div>
        <p id="app" style="margin: 5px 2px">
          <b>企业spId:</b> <el-input class="search_input" v-model="PageForm.params.spId" placeholder="请输入内容"></el-input>
          <b>app名称:</b> <el-input  class="search_input" v-model="PageForm.params.appName" placeholder="请输入内容"></el-input>
          <el-button type="primary" icon="el-icon-search"  @click="searchApp">搜索</el-button>
        </p>

        <div class="tableBox">
          <div class="pageTableContent">
            <el-button type="primary" class="addBanner" @click="addBizApp"><i class="el-icon-plus"></i>新增App</el-button>
            <el-table :data="tableData" border width="100%" v-loading="isBusy">
              <el-table-column prop="id" label="编号" width="180px">
              </el-table-column>
              <el-table-column prop="spid" label="spid" width="200px">
              </el-table-column>
              <el-table-column prop="spcode" label="spcode" width="160px">
              </el-table-column>
              <el-table-column prop="appName" label="app名称" width="200px">
              </el-table-column>
              <el-table-column prop="version" label="版本" width="200px">
              </el-table-column>
              <el-table-column prop="status" label="企业状态" width="100px">
              </el-table-column>
              <el-table-column  label="操作" width="220px">
                <template slot-scope="scope">
                  <el-button type="text" @click="workBenchConfig(scope.row)">配置工作台</el-button>
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
  import {bizAppList} from '@/api/api'
  import $ from 'jquery'
  export default{
    data () {
      return {
        tableData:[],
        temp:{
          id:null,
          spId:null,
          spCode:null,
          appName:null,
          status:null
        },

        PageForm:{
          page:1,
          pageSize:10,
          totalRows:null,
          totalPage:null,
          params:{
            spId:null,
            appName:null
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
        bizAppList(_this.PageForm).then(res => {
          _this.tableData=res.data;
          _this.PageForm.totalRows=res.tatalRows;
          _this.PageForm.totalPage=res.totalPage;
          _this.isBusy=false;
        });
      },
      searchApp(){
        this.init(1,this.defaultPageSize);
      },
      handleCurrentChange(item){
        this.init(item,this.defaultPageSize);
      },

      workBenchConfig(item) {
         alert(item.id+"dddd"+item.corpId);
      },
      addBizApp(){
        this.$message('新增企业app')
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
