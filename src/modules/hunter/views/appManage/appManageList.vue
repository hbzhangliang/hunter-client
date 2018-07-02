<!-- Created by chunmingdeng on 2017/12/18 -->
<template>
  <div class="end-container" v-loading.fullscreen="loading">
    <!--<div style="padding: 10px 0;">-->
      <!--<NavBar></NavBar>-->
    <!--</div>-->
    <div class="bgc-fff">
      <div style="padding: 10px 0px;margin-bottom: 10px;display: flex;justify-content: flex-end">
        <el-input placeholder="App搜索" class="w-250 marr-15" size="small" v-model="searchCondition">
          <el-button slot="append" class="el-icon-search" @click="search"></el-button></el-input>
        <el-button type="primary" size="small" @click="newApp"><i class="el-icon-plus"></i><span>新建App</span></el-button>
      </div>
      <!--数据表单-->
      <div style="margin-bottom: 30px;">
        <el-table
          id="table-data"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="AppId"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="appName"
            label="App名称"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop=""
            label="图标"
            align="center"
            min-width="20%">
            <template slot-scope="scope">
              <img :src="scope.row.icon" style="width: 40px;height: 40px;"/>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="类型"
            align="center"
            min-width="10%">
            <template slot-scope="scope">
              {{scope.row.common==false?'定制':scope.row.common==true?'通用':''}}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="所属行业"
            align="center"
            min-width="20%">
            <template slot-scope="scope">
              {{scope.row.category?scope.row.category.category:''}}
            </template>
          </el-table-column>
          <el-table-column
                  prop="createBy"
                  label="创建人"
                  align="center"
                  min-width="10%">
          </el-table-column>
          <el-table-column
            prop=""
            label="状态"
            align="center"
            min-width="10%">
            <template slot-scope="scope">
              <span v-if="scope.row.flag">启用</span>
              <span class="danger" v-else >禁用</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="20%">
            <template slot-scope="scope">
              <el-dropdown trigger="click" placement="bottom-end" style="margin-right: 10px;" @visible-change="showQrCode(scope.row)">
                <span class="el-dropdown-link qrSpan">二维码</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="qr-item">
                    <a :href="scope.row.downloadUrl" target="_blank">
                      <div :id="generateId(scope.row.id)" style="width:200px;height:213px;"></div>
                    </a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

                <!--<el-button type="text">编辑</el-button>-->
                <el-button type="text" v-if="scope.row.flag==false" @click="disableApp(scope.row)">启用</el-button>
                <el-button type="text" v-if="scope.row.flag==true" @click="disableApp(scope.row)">禁用</el-button>
                <el-button type="text" @click="manageApp(scope.row)">管理</el-button>
                <!--<el-button type="text">日志</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="block mart-30">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageParams.currentPage"
          :page-size="pageParams.pageSize"
          layout="prev, pager, next, jumper"
          :total="pageParams.totalCount">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/navBar'
  import {getAppManageList,changeAppFlag} from '@/api/api';
  import VueQArt from 'vue-qart'
  import QRCode from 'qrcodejs2'
  import VueQr from 'vue-qr'
  import $ from 'jquery'
  import {mapMutations} from 'vuex'
  export default {
    data: function () {
      return {
        companyInfo:{},
        searchCondition:'',
        loading: false,
        newMethod:false,
        currencyAppTable:false,
        addMethod:'0',
        tableData: [
        ],
        currencyAppTableList:[],
        pageParams: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 108,
        },
        config: {
          value: 'https://www.baidu.com',
          imagePath: '/static/img/appIcon.png',
          filter: 'color'
        },
        qrShowIds:[]
      }
    },
    mounted(){
      document.title = 'App管理列表';
      this.companyInfo = this.$route.query;
      this.getData();
    },
    methods: {
      ...mapMutations(['SET_APPID','SET_SPID','SET_COMMONAPP_STATUS','SET_COMPANY_INFO']),
      getData: function (page) {
        var _this = this;
        _this.loading = true;
        getAppManageList({
          "page": _this.pageParams.currentPage,
          "pageSize": 10,
          "filter": {appName:_this.searchCondition?_this.searchCondition:null}
        }).then(function (res) {
          _this.loading = false;
          _this.tableData = res.data?res.data:[];
            // _this.tableData.forEach(p=>{
            //     console.log("ddddddd")
            //     console.log(p)
            //     _this.showQrCode(p)
            // });
          _this.pageParams.totalCount = res.tatalRows;
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, '提示')
        })
      },
      newApp:function () {
        this.$router.push({path:'/base/structureApp'})
      },

      /**
       * handleCurrentChange*/
      handleCurrentChange: function (currentPage) {
        this.pageParams.currentPage = currentPage;
        this.getData();
      },
      search:function () {
        this.getData();
      },
      disableApp:function (params) {
        var that = this;
        that.$confirm('确认'+(params.flag==true?'禁用':'启用')+params.appName+'？','提示').then(function () {
          that.loading = true;
          changeAppFlag({
            "id" :params.id ,
            "flag" : params.flag==true?false:true
          }).then(function (res) {
            that.loading = false;
            that.$alert('操作成功！','提示');
            that.getData();
          }).catch(function (err) {
            that.loading = false;
            that.$alert(err.message,'提示');
          })
        }).catch(function () {
        })
      },
      manageApp:function (params) {
        this.SET_APPID({id:params.id});
        this.SET_SPID(null);
        this.SET_COMPANY_INFO(null);
        this.SET_COMMONAPP_STATUS({status:params.common});
        this.$router.push({path:'/appManage/appManageSummary'})
      },
      targetUrl(url){
          window.open(url);
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
        }
    },

    components: {
      NavBar, VueQArt,VueQr
    }
  }
</script>

<style scoped>
  #table-data .el-button.el-button--text {
    padding: 0;
  }
  .danger{
    display: inline-block;
    padding:3px 9px;
    border-radius: 15px;
    background-color: #f56c6c;
    color: #fff;
  }

  .qrSpan{
    color: #409EFF;
    cursor : pointer;
  }

  .qr-item:hover{
    background: inherit !important;
  }
</style>
