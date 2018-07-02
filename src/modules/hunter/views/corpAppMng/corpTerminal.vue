<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner">
        </div>


        <div class="tableBox">
          <div class="pageTableContent">
            <!--<el-button type="primary" class="addBanner" @click="addAcl"><i class="el-icon-plus"></i>新增企业</el-button>-->
            <el-table :data="PageParams.data" border width="100%">
              <el-table-column prop="id" label="编号" width="220px">
              </el-table-column>
              <el-table-column prop="spCode" label="spCode" width="180px">
              </el-table-column>
              <el-table-column prop="spId" label="spId" width="240px">
              </el-table-column>
              <el-table-column prop="spName" label="企业名称" width="240px">
              </el-table-column>
              <el-table-column prop="status" label="企业状态" width="120px">
              </el-table-column>
              <el-table-column  label="操作" width="260px">
                <template slot-scope="scope">
                  <!--<el-button type="text" @click="edit(scope.row,scope.row.id)">编辑</el-button>-->
                  <!--<el-button type="text" @click="view(scope.row,scope.row.id)">查看</el-button>-->
                  <!--<el-button type="text" @click="del(scope.$index,scope.row.id)">删除</el-button>-->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="block">
          <span class="demonstration"></span>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="PageParams.page"
            :page-size="PageParams.pageSize"
            layout="prev, pager, next, jumper"
            :total="PageParams.tatalRows">
          </el-pagination>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>


</style>
<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import {corpList} from '@/api/api'
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
          spCode:null,
          spId:null,
          spName:null,
          status:null
        },
        moduleVisible:false,
        defaultPageSize:10
      }
    },
    methods: {
      init(page,pageSize){
        var _this=this;
        _this.PageParams.data=[];
        corpList({"page":page,"pageSize":pageSize}).then(res => {
          _this.PageParams.page=res.page;
          _this.PageParams.pageSize=res.pageSize;
          _this.PageParams.tatalRows=res.tatalRows;
          _this.PageParams.totalPage=res.totalPage;
          _this.PageParams.data=res.data;
        });
      },
      handleCurrentChange(item){
        this.init(item,this.defaultPageSize);
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
