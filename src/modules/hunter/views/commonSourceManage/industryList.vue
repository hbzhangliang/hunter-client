<!-- Created by chunmingdeng on 2018/1/8 -->
<template>
  <section class="end-container" v-loading.fullscreen="loading">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">

        <div class="clearfix marb-30">
          <router-link :to="{path:'/base/newIndustryDefaultConfig',query:{}}">
            <el-button type="primary" class="w-120 flr" size="small" @click="newTheme">新建</el-button>
          </router-link>
        </div>

        <el-table
          :data="tableData"
          border
          style="width: 100%;"
          :header-cell-style="{textAlign:'center',padding:' 5px 10px'}"
          :cell-style="{textAlign:'center'}"
          class="fs-14 marb-30">
          <el-table-column
            prop="createTime"
            label="编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="category"
            label="行业"
            width="150">
          </el-table-column>
          <el-table-column
            prop="categoryId"
            label="行业ID"
            width="150">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            width="">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="itemEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="itemDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageObj.currentPage"
          layout="total, prev, pager, next"
          :total="pageObj.total">
        </el-pagination>

        <!--<el-dialog title="新增行业" :visible.sync="dialogShow">-->
        <!--<el-form label-width="100px" style="width: 450px;margin: 0 auto;" size="small">-->
        <!--<el-form-item label="行业名称"><el-input placeholder="qing"></el-input></el-form-item>-->
        <!--<el-form-item label="对应AppID"><el-input placeholder="qing"></el-input></el-form-item>-->
        <!--</el-form>-->
        <!--<div slot="footer" class="tac">-->
        <!--<el-button type="" class="w-120" size="small" @click="dialogShow = false;">取消</el-button>-->
        <!--<el-button type="primary" class="w-120" size="small" @click="dialogShow = false;">确定</el-button>-->
        <!--</div>-->
        <!--</el-dialog>-->
      </div>
    </div>
  </section>
</template>

<script>
  import NavBar from '@/components/navBar'
  import {getInitDataIndustry, delIndustry, delCategory} from '@/api/api'
  export default {
    data: function () {
      return {
        loading: false,
//                dialogShow:false,
        activeName: 'tab01',
        tableData: [
//                    {
//                        "id":"1",
//                        "status":null,
//                        "flag":true,
//                        "createBy":"meng.liu",
//                        "createTime":1513923330000,
//                        "modifyBy":null,
//                        "modifyTime":1515997785272,
//                        "name":"党建",
//                        "androidPackageName":"cn.com.flaginfo.100",
//                        "iosPackageName":"com.flaginfo.umsapp.iphone.appid98",
//                        "defaultConfigId":"5a3ccf97239d167f7bc080d9"
//                    },
//                    {
//                        "id":"2",
//                        "status":null,
//                        "flag":true,
//                        "createBy":"meng.liu",
//                        "createTime":1513938307000,
//                        "modifyBy":null,
//                        "modifyTime":1515997785272,
//                        "name":"会议",
//                        "androidPackageName":"com.flaginfo.umsapp.aphone.appid108",
//                        "iosPackageName":"com.flaginfo.umsapp.iphone.appid113",
//                        "defaultConfigId":null
//                    },
//                    {
//                        "id":"3",
//                        "status":null,
//                        "flag":true,
//                        "createBy":"meng.liu",
//                        "createTime":1513938377000,
//                        "modifyBy":null,
//                        "modifyTime":1515997785272,
//                        "name":"扶贫",
//                        "androidPackageName":"cn.com.flaginfo.98",
//                        "iosPackageName":"cn.com.flaginfo.98",
//                        "defaultConfigId":null
//                    },
//                    {
//                        "id":"4",
//                        "status":null,
//                        "flag":true,
//                        "createBy":"meng.liu",
//                        "createTime":1513938377000,
//                        "modifyBy":null,
//                        "modifyTime":1515997785272,
//                        "name":"环保",
//                        "androidPackageName":"cn.com.flaginfo.97",
//                        "iosPackageName":"cn.com.flaginfo.97",
//                        "defaultConfigId":null
//                    },
//                    {
//                        "id":"5",
//                        "status":null,
//                        "flag":true,
//                        "createBy":"jun.liu",
//                        "createTime":1515732007000,
//                        "modifyBy":null,
//                        "modifyTime":1515997785272,
//                        "name":"测试环境",
//                        "androidPackageName":"com.flaginfo.umsapp.aphone.appid98",
//                        "iosPackageName":"com.flaginfo.umsapp.iphone.appid98",
//                        "defaultConfigId":null
//                    }
        ],

        pageObj: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        }
      }
    },
    mounted: function () {
      this.getInitDataIndustry();
    },
    methods: {
      newTheme:function () {
        this.$router.push({path:'/base/newIndustryDefaultConfig'})
      },
      getInitDataIndustry: function () {
        var _this = this;
        _this.loading = true;
        getInitDataIndustry({
          "page": _this.pageObj.currentPage.toString(),
          "pageSize": _this.pageObj.pageSize.toString()
        }).then(function (res) {
          _this.loading = false;
          _this.tableData = res.data;
          _this.pageObj.total = res.tatalRows;
        }).catch(function (err) {
          _this.loading = false;
        })
      },

      /**
       * @param
       * item:编辑的对象*/
      itemEdit: function (item) {
        this.$router.push({path: '/base/newIndustryDefaultConfig', query: {id: item.id}})
      },

      /**
       * @param
       * item:的对删除象*/
      itemDel: function (item) {
        var _this = this;
        _this.$confirm('是否确认删除该信息？').then(function () {
          _this.loading = true;
          delIndustry({id: item.id}).then(function (res) {
            _this.loading = false;
            _this.$message({message: res.message, type: 'success'})
            _this.getInitDataIndustry();
          }).catch(function (err) {
            _this.loading = false;
            _this.$message({message: err.message, type: 'error'})
          })
        }).catch(function () {
          _this.$message('删除取消！')
        })
      },

      /**
       * pagination*/
      handleCurrentChange: function (curPage) {
        this.pageObj.currentPage = curPage;
        this.getInitDataIndustry();
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
</style>