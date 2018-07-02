<!-- Created by chunmingdeng on 2017/12/18 -->
<template>
  <div class="end-container" v-loading.fullscreen="loading">
    <!--<div style="padding: 10px 0;">-->
      <!--<NavBar></NavBar>-->
    <!--</div>-->
    <div class="bgc-fff">
      <div style="padding: 10px 0px;margin-bottom: 10px;">
        <span class="fs-18">企业App管理</span>
        <el-button type="primary" size="small" class="flr" @click="newMethod=true"><i class="el-icon-plus"></i><span>新建app</span></el-button>
      </div>
      <div style="margin-bottom: 30px;">
        <el-table
          id="table-data"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="appName"
            label="终端项"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop=""
            label="类型"
            align="center"
            min-width="15%">
            <template slot-scope="scope">
              {{scope.row.common==false?'定制':'通用'}}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="当前配置版本"
            align="center"
            min-width="18%">
            <template slot-scope="scope">
              <el-popover
                placement="right"
                title=""
                trigger="hover">
                <iframe :src="scope.row.preview.url"
                        width="303" height="490" frameborder="0" v-if="scope.row.preview"></iframe>
                <el-button slot="reference" type="text">预览</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="桌面图标"
            align="center"
            min-width="15%">
            <template slot-scope="scope">
              <img :src="scope.row.icon" style="width: 40px;height: 40px;"></img>
            </template>
          </el-table-column>
          <el-table-column
            label="安装二维码"
            align="center"
            min-width="15%">
            <template slot-scope="scope">
              <el-dropdown trigger="click" style="margin-right: 10px;" @visible-change="showQrCode(scope.row)">
                <span class="el-dropdown-link qrSpan">查看</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="qr-item">
                    <a :href="scope.row.downloadUrl" target="_blank">
                      <div :id="generateId(scope.row.id)"></div>
                    </a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="20%">
            <template slot-scope="scope">
              <el-button type="text" @click="manageApp(scope.row)">管理</el-button>
              <el-button type="text">日志</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="block mart-30" v-if="pageParams.totalCount>0">
        <el-pagination
          @current-change="handleCurrentChangeApp"
          :current-page.sync="pageParams.currentPage"
          :page-size="pageParams.pageSize"
          layout="prev, pager, next, jumper"
          :total="pageParams.totalCount">
        </el-pagination>
      </div>

    </div>

    <!--新建app方式选择-->
    <el-dialog
      title="提示"
      :visible.sync="newMethod"
      width="300px">
      <div><span>选择新增App方式</span></div>
      <div class="tac"><el-radio v-model="addMethod" label="0">选择通用</el-radio>
        <el-radio v-model="addMethod" label="1">重新构建</el-radio></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newMethod = false" size="small">取 消</el-button>
        <el-button type="primary" @click="newApp" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!--通用app展示列表-->
    <el-dialog
      :title="companyInfo.spName"
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
            <img :src="scope.row.icon" style="width: 40px;height: 40px;"></img>
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

      <div class="block mart-30" v-if="pageParamsCop.totalCount>0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageParamsCop.currentPage"
          :page-size="pageParamsCop.pageSize"
          layout="prev, pager, next, jumper"
          :total="pageParamsCop.totalCount">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="currencyAppTable = false" size="small">取 消</el-button>
        <el-button type="primary" @click="bindApp" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import NavBar from '@/components/navBar'
  import {getAppManageList,companyBindCommonApp} from '@/api/api';
  import {mapMutations} from 'vuex'
  import QRCode from 'qrcodejs2'
  import $ from 'jquery'
  export default {
    data: function () {
      return {
        companyInfo:{},
        loading: false,
        tableLoading: false,
        newMethod:false,
        currencyAppTable:false,
        addMethod:'0',
        tableData: [],
        commonAppList:[],
        bindAppIds:[],
        pageParams: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 108,
        },
        pageParamsCop: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 108,
        },
        config: {
          value: 'https://www.baidu.com',
          imagePath: '/static/img/appIcon.png',
          filter: 'color'
        }
      }
    },
    mounted(){
      document.title = '企业App管理';
      this.companyInfo = this.$route.query;
      this.initData();
    },
    methods: {
      ...mapMutations(['SET_APPID','SET_COMMONAPP_STATUS']),
      initData: function (page) {
        var _this = this;
        _this.loading = true;
        getAppManageList({
          "page": _this.pageParams.currentPage,
          "pageSize": 10,
          "filter": {
            "spId": _this.companyInfo.spId,
          }
        }).then(function (res) {
          _this.loading = false;
          _this.tableData = res.data?res.data:[];
          _this.pageParams.totalCount = res.tatalRows;
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
          _this.pageParamsCop.totalCount = res.tatalRows
        }).catch(function (err) {
          _this.tableLoading = false;
          _this.$alert(err.message,'提示');

        })
      },
      /**
       * handleCurrentChange*/
      handleCurrentChange: function (currentPage) {
        this.pageParamsCop.currentPage = currentPage;
        this.getAppManageList();
      },
      handleAppListCurrentChange: function (currentPage) {
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
          _this.$router.push({path:'/base/structureApp',query:_this.companyInfo})
        }
      },
      manageApp:function (params) {
        this.SET_APPID({id:params.id});
        this.SET_COMMONAPP_STATUS({status:params.common});
        this.$router.push({path:'/appManage/appManageSummary'})
      },
      handleSelectionChange:function (val) {
        this.bindAppIds = val.map(function (val,index) {
          return {appId:val.id};
        });
      },

      /**
       * 新建app是绑定通用app*/
      bindApp:function () {
        var _this = this;
        _this.loading = true;
        var params = {
          "spId" : _this.companyInfo.spId,
          "spName" : _this.companyInfo.spName,
          "apps" : this.bindAppIds
        }
        companyBindCommonApp(params).then(function (res) {
          _this.loading = false;
          _this.$alert('绑定通用APP成功！','提示')
          _this.initData();
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message,'提示')
        })
        this.currencyAppTable = false;
        this.newMethod=false;
      },


        targetUrl(url){
            // console.log(url)
            window.open(url);
        },
        routerReplace:function (e) {
            this.$router.replace(e)
        },
        hideQrCode(item){
            let id="qrcode"+item.id;
            // $("#qrcode"+item.id).html("");
            $("#qrcode"+item.id).hide()
        },
        generateId(id){
            return "qrcode"+id
        },
        showQrCode(item){
            $("#qrcode"+item.id).empty();
            let iconUrl = item.icon ? item.icon : "/static/img/default_icon.png";
            let iconImg = new Image();
            iconImg.src = iconUrl;
            let label  = null;
            if( iconImg ){
                iconImg.onload = function () {
                    $("#qrcode"+item.id).qrcode({
                        render: 'canvas',
                        minVersion: 1,
                        maxVersion: 40,
                        ecLevel: 'Q',
                        size: 200,
                        fill: '#333',
                        background: null,
                        text: item.downloadUrl,
                        radius: 0.1,
                        quiet: 1,
                        mode: iconUrl ? 4 : label ? 2 : 0,
                        label: label,
                        fontname: 'sans',
                        fontcolor: '#ff9818',
                        mSize: 0.13,
                        mPosX: 0.5,
                        mPosY: 0.5,
                        image: iconImg
                    });
                }
            }
        },
        handleCurrentChangeApp(item){
            this.pageParams.currentPage = item;
            this.initData(item);
        }

    },

    components: {
      NavBar
    }
  }
</script>

<style scoped>
  #table-data .el-button.el-button--text {
    padding: 0;
  }
  .qrSpan{
    color: #409EFF;
    cursor : pointer;
  }

  .qr-item:hover{
    background: inherit !important;
  }
</style>
