<!-- Created by chunmingdeng on 2017/12/18 -->
<template>
  <div class="end-container" v-loading.fullscreen="loading">
    <!--<div style="padding: 10px 0;">-->
      <!--<NavBar></NavBar>-->
    <!--</div>-->
    <div class="bgc-fff">
      <div style="padding: 10px 0px;margin-bottom: 10px;" class="search-container">
        <el-input placeholder="企业搜索" class="w-250" size="small" v-model="searchCondition">
          <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
        </el-input>
      </div>

      <el-table
        :data="tableData"
        border
        id="table-data">
        <!--<el-table-column label="管理ID" prop="id" align="center" width="150"></el-table-column>-->
        <!--<el-table-column label="企业编号" prop="spId" align="center" width="160"></el-table-column>-->
        <el-table-column label="企业编号" prop="spCode" align="center" min-width="20%"></el-table-column>
        <el-table-column label="企业名称" prop="spName" align="center" min-width="20%"></el-table-column>
        <el-table-column label="终端开通状态" prop="" align="center" min-width="20%">
          <template slot-scope="scope">
            App({{scope.row.appCount?scope.row.appCount:0}})&nbsp;&nbsp;&nbsp;&nbsp;
            微信({{scope.row.weChatCount?scope.row.weChatCount:0}})&nbsp;&nbsp;&nbsp;&nbsp;
            钉钉({{scope.row.dingTalkCount?scope.row.dingTalkCount:0}})
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" align="center" min-width="20%">
          <template slot-scope="scope">
            <el-button type="text" @click="newMethod=true;company = scope.row">新建App</el-button>
            <el-button type="text" @click="manageApp(scope.row)">管理</el-button>
            <!--<el-button type="text">删除</el-button>-->
          </template>
        </el-table-column>
        <el-table-column label="日志" prop="" align="center" min-width="12%">
          <template slot-scope="scope">
            <el-button type="text" @click="corpLog(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block mart-30" v-if="pageParams.totalRows>0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageParams.currentPage"
          :page-size="pageParams.pageSize"
          layout="prev, pager, next, jumper"
          :total="pageParams.totalRows">
        </el-pagination>
      </div>

    </div>
    <el-dialog
      title="提示"
      :visible.sync="newMethod"
      width="300px">
      <div><span>选择新增APP方式</span></div>
      <div class="tac"><el-radio v-model="addMethod" label="0">选择通用</el-radio>
        <el-radio v-model="addMethod" label="1">重新构建</el-radio></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newMethod = false" size="small">取 消</el-button>
        <el-button type="primary" @click="newApp" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="company.spName"
      :visible.sync="currencyAppTable"
      width="1000px"
      v-loading="tableLoading">
      <el-table
        :data="commonAppList"
        border
        @selection-change="handleSelectionChange"
        id="table-data">
        <el-table-column
          type="selection"
          width="35">
        </el-table-column>
        <el-table-column label="AppId" prop="id" align="center" width="150"></el-table-column>
        <el-table-column label="App名称" prop="appName" align="center" width="160"></el-table-column>
        <el-table-column label="桌面图标" prop="" align="center" width="90">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="width: 40px;height: 40px;"/>
          </template>
        </el-table-column>
        <el-table-column label="所属行业" prop="" align="center" width="200">
          <template slot-scope="scope">
            {{scope.row.category?scope.row.category.category:''}}
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="note" align="center" show-overflow-tooltip>
        </el-table-column>
      </el-table>

      <div class="block mart-30" v-if="pageParamsCop.totalRows>0">
        <el-pagination
          @current-change="handleCurrentChangeCop"
          :current-page.sync="pageParamsCop.currentPage"
          :page-size="pageParamsCop.pageSize"
          layout="prev, pager, next, jumper"
          :total="pageParamsCop.totalRows">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="currencyAppTable = false" size="small">取 消</el-button>
        <el-button type="primary" @click="bindApp" size="small">确 定</el-button>
      </span>
    </el-dialog>





    <el-dialog
            :title="company.spName"
            :visible.sync="showLogCorp"
            width="700px"
            v-loading="tableLoading">
      <el-table
              :data="logCorpList"
              border>
        <el-table-column label="操作时间" prop="" align="center" min-width="25%">
          <template slot-scope="scope">
            {{scope.row.dateCreated?scope.row.dateCreated:'--'|formatTime('yyyy-MM-dd hh:mm')}}
          </template>
        </el-table-column>
        <!--<el-table-column label="操作编号" prop="opCode" align="center" min-width="25%"></el-table-column>-->
        <el-table-column label="操作名称" prop="opName" align="center" min-width="25%"></el-table-column>
        <el-table-column label="操作人" prop="createBy" align="center" min-width="25%"></el-table-column>
      </el-table>

      <div class="block mart-30">
        <el-pagination
                @size-change="handleSizeChangeLog"
                @current-change="handleCurrentChangeLog"
                :current-page.sync="PageParams.page"
                :page-size="PageParams.pageSize"
                layout="prev, pager, next, jumper"
                :total="PageParams.tatalRows">
        </el-pagination>
      </div>
    </el-dialog>


  </div>

</template>

<script>
  import NavBar from '@/components/navBar'
  import {getCompanyList,getAppManageList,companyBindCommonApp,logcorpList} from '@/api/api';
  import VueQArt from 'vue-qart'
  import {mapMutations} from 'vuex'
  export default {
    data: function () {
      return {
        loading: false,
        tableLoading: false,
        searchCondition:'',
        tableData:[],
        commonAppList:[],
        bindAppIds:[],
        pageParams: {
          currentPage: 1,
          pageSize: 10,
          totalRows: 108,
        },
        pageParamsCop: {
          currentPage: 1,
          pageSize: 10,
          totalRows: 108,
        },
        newMethod: false,
        currencyAppTable:false,
        addMethod:'0',
        company:{},
        config: {
          value: 'https://www.baidu.com',
          imagePath: '/static/img/appIcon.png',
          filter: 'color'
        },
          showLogCorp:false,
          PageParams:{
              page:1,
              pageSize:10,
              tatalRows:10,
              totalPage:1
          },
          logCorpList:[],
          choseSpId:null,
          defaultPageSize:10

      }
    },
    mounted(){
      document.title = '企业列表';
      this.getData();
    },
    methods: {
      ...mapMutations(['SET_SPID','SET_COMPANY_INFO']),
      /**
       * get table data list*/
      getData: function () {
        var _this = this;
        _this.loading = true;
        getCompanyList({
          "page": _this.pageParams.currentPage,
          "pageSize": 10,
          "filter": {
            "spName": _this.searchCondition
          }
        }).then(function (res) {
          _this.loading = false;
          if (res && res.data) {
            console.log(res);
            _this.tableData = res.data;
            _this.pageParams.totalRows = res.tatalRows
          }
          else {
              _this.tableData=[]
              _this.pageParams.totalRows = 1
          }
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, '提示')
        })
      },
      /**
       * get common app list*/
      getAppManageList:function () {
        var _this = this;
        _this.tableLoading = true;
        getAppManageList({
          "page": _this.pageParamsCop.currentPage,
          "pageSize": 10,
          "filter": {common:true}
        }).then(function (res) {
          _this.tableLoading = false;
          _this.commonAppList = res.data;
          _this.pageParamsCop.totalRows = res.tatalRows
        }).catch(function (err) {
          _this.tableLoading = false;
          _this.$alert(err.message,'提示');

        })
      },
      search:function () {
        this.pageParams.currentPage = 1;
        this.getData();
      },

      /**
       * handleCurrentChange*/
      handleCurrentChange: function (currentPage) {
        this.pageParams.currentPage = currentPage;
        this.getData();
      },
      /**
       * handleCurrentChange*/
      handleCurrentChangeCop: function (currentPage) {
        this.pageParamsCop.currentPage = currentPage;
        this.getAppManageList();
      },
      /**
       * newApp*/
      newApp: function () {
        var _this = this;
        if(_this.addMethod==0){//通用
          this.currencyAppTable = true;
          this.getAppManageList();
        }else{
          _this.$router.push({path:'/base/structureApp',query:_this.company})
        }
      },

      /**
       * 新建app是绑定通用app*/
      bindApp:function () {
        var _this = this;
        _this.loading = true;
        var params = {
          "spId" : _this.company.spId,
          "spName" : _this.company.spName,
          "apps" : this.bindAppIds
        }
        companyBindCommonApp(params).then(function (res) {
          _this.newMethod=false;
          _this.loading = false;
            _this.getData();
          _this.$alert('绑定通用APP成功！','提示')
        }).catch(function (err) {
            _this.newMethod=false;
            _this.loading = false;
          _this.$alert(err.message,'提示')
        })
        this.currencyAppTable = false;

        console.log(this.bindAppIds);
      },

      /**
       * manageApp*/
      manageApp:function (company) {
        this.SET_SPID(company.spId);
        this.SET_COMPANY_INFO(company);
        this.$router.push({path:'/base/companyAppManage',query:company})
      },
      handleSelectionChange:function (val) {
        this.bindAppIds = val.map(function (val,index) {
          return {appId:val.id};
        });
      },

        corpLog(item){
          let _this=this
           _this.choseSpId=item.spId
           _this.showLogCorp=true
           _this.logCorpListQuery(1)
        },
        handleCurrentChangeLog(item){
            this.PageParams.page = item;
            this.logCorpListQuery(item);
        },
        logCorpListQuery(page){
            var _this=this;
            _this.logCorpList=[];
            _this.tableLoading = true;
            logcorpList({"page":page,"pageSize":_this.defaultPageSize,"search":_this.choseSpId}).then(res => {
                console.log(res)
                _this.tableLoading = false;
                _this.PageParams.page=res.page;
                _this.PageParams.pageSize=res.pageSize;
                _this.PageParams.tatalRows=res.tatalRows;
                _this.PageParams.totalPage=res.totalPage;
                _this.logCorpList=res.data;
            });
        },
        handleSizeChangeLog(item){
        }
    },

    components: {
      NavBar, VueQArt
    }
  }
</script>

<style scoped>
  .search-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  #table-data .el-button.el-button--text {
    padding: 0;
  }
</style>
