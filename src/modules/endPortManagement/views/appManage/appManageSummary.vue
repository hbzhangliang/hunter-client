<template>
  <div class="end-container" v-loading.fullscreen="loading">
    <!--<div style="padding: 0;">-->
      <!--&lt;!&ndash;<NavBar></NavBar>&ndash;&gt;-->
      <!--<div><div class="fs-14"><a href="/">首页</a> &nbsp>&nbsp <a href="#" @click="routerReplace('/base/appManageList')">App管理列表</a> &nbsp>&nbsp 概览 </div></div>-->
    <!--</div>-->
    <div class="bgc-fff">
      <!--<div id="action-btns">-->
        <!--<router-link :to="{path:'/base/versionManage'}"><el-button type="primary" size="small">版本管理</el-button></router-link>-->
        <!--<router-link :to="{path:'/base/appVersionPublish'}"><el-button type="primary" size="small">发布版本</el-button></router-link>-->
        <!--<router-link :to="{path:'/base/grayLevelPublic'}"><el-button type="primary" size="small">灰度设置</el-button></router-link>-->
        <!--<router-link :to="{path:'/appConfig/modifyConfiguration'}"><el-button type="primary" size="small">配置管理</el-button></router-link>-->
        <!--<router-link :to="{path:'/base/structureApp',query:{repackage:true}}"><el-button type="primary" size="small">重新打包</el-button></router-link>-->
      <!--</div>-->
      <div id="panel-container" class="mart-20">
        <div id="panel">
          <div class="panel-item">
            <div class="title">关联企业数</div>
            <div class="content fs-20">
              <div class="fs-20">{{summary.corpNumber | numberFormat}}</div>
              <el-button v-show="summary.common" @click="addCompany" type="primary" size="small" class="mart-20">添加企业</el-button>
            </div>
          </div>
          <div class="panel-item">
            <div class="title">下载量</div>
            <div class="content">
              <div class="fs-20">{{summary.downloadCount | numberFormat}}</div>
              <div>当前发布版本</div>
              <div>iOS:{{summary.versionInfo.length!=0 ? ( summary.versionInfo[1] != null ? summary.versionInfo[1].downloadCount : 0 ) : 0 | numberFormat }}</div>
              <div>Android:{{summary.versionInfo.length!=0 ? summary.versionInfo[0].downloadCount:0 | numberFormat}}</div>
            </div>
          </div>
          <div class="panel-item">
            <div class="title">日活跃用户</div>
            <div class="content fs-20">{{ activeUserCount | numberFormat}}</div>
          </div>
          <div class="mart-20" style="width: 100%;">
            <el-table
              :data="summary.corps"
              id="table-data"
              style="min-width: 630px;width: 100%;"
              border>
              <el-table-column
                label="企业编号"
                prop="spId"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                label="企业名称"
                prop="spName"
                align="center"
                min-width="20%">
              </el-table-column>
              <el-table-column
                label="状态"
                prop="flag"
                align="center"
                min-width="20%">
                <template slot-scope="scope">
                  {{scope.row.flag==true?"正常":"停用"}}
                </template>
              </el-table-column>
              <el-table-column
                label="修改时间"
                prop="modifyTime"
                align="center"
                min-width="20%">
                <template slot-scope="scope">
                  {{scope.row.modifyTime | formatTime('yyyy-MM-dd hh:mm')}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                prop="id"
                align="center"
                min-width="20%">
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.flag==true" @click="appUncorrelation(scope.row)">禁用</el-button>
                  <el-button type="text" v-else @click="appUncorrelation(scope.row)">启用</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>




        <div class="qrCode panel-item">
          <div class="title">基本信息</div>
          <div class="content fs-20">
            <div>
              <!--<vue-q-art :config="{value:summary.installUrl,-->
              <!--imagePath: '/static/img/banner.14ad089.png',filter: 'color'}"></vue-q-art>-->
              <!--<vue-qr-->
                      <!--:logoSrc="summary.icon"-->
                      <!--:text="summary.installUrl" :size="200" :margin="5"></vue-qr>-->
                  <a :href="summary.installUrl" target="_blank">
                    <div id="qrCode"></div>
                  </a>
            </div>
            <div style="width: 100%;padding: 0px 20px 20px">
              <div style="text-align: left">
                <div>APPkey <span>328947928</span></div>
                <div>证书到期日 <span>2019/09/08</span></div>
              </div>
            </div>
          </div>
        </div>


      </div>

    </div>

    <el-dialog
      title="选择企业"
      :visible.sync="chooseCompanyVis">

      <span>
        <el-input style="width: 260px;margin-bottom: 15px;" v-model="searchCorpName" placeholder="请输入企业名称" size="medium"></el-input>
        <el-button type="primary" size="mini"  icon="el-icon-search"  @click="searchCorp">查询</el-button>
      </span>

      <el-table
        :data="companyList"
        border
        id="table-data"
        v-loading="tableLoading">
        <el-table-column
          width="50">
          <template slot-scope="scope">
            <el-radio v-model="bindCompany" :label="JSON.stringify(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="企业id" prop="spId" align="center"></el-table-column>
        <el-table-column label="企业编号" prop="spCode" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="spName" align="center"></el-table-column>
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
      <span slot="footer" class="dialog-footer">
                <el-button @click="chooseCompanyVis = false" size="small">取 消</el-button>
                <el-button type="primary" @click="chooseCompnaySure" size="small">确 定</el-button>
              </span>
    </el-dialog>
  </div>
</template>

<script>
  import NavBar from '@/components/navBar'
  import {getAppManageList,getAppSummaryInfo,getCompanyList,companyBindCommonApp,appUpdateCorrelation,appActiveUseStsDay} from '@/api/api';
  import QRCode from 'qrcodejs2'
  import $ from 'jquery'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data: function () {
      return {
        loading:false,
        tableLoading:false,
        chooseCompanyVis:false,
        companyList:[],
        choosedCompany:null,//企业最终选择确定后存储
        bindCompany:null,
        pageParams: {
          currentPage: 1,
          pageSize: 10,
          totalRows: 108,
        },
        summary:{
          corpNumber:0,
          downloadCount:0,
          installUrl:'',
          versionInfo:[
            {downloadCount:0},
            {downloadCount:0},
          ],
            icon:null
        },
        tableData:[{
          "id":1520925912264,
          "status":null,
          "flag":true,
          "createBy":null,
          "createTime":1520925912000,
          "modifyBy":null,
          "modifyTime":1520925912000,
          "appName":"test01",
          "icon":"http://terminal-center.oss-cn-hangzhou.aliyuncs.com/umsapp6.1.0/file/temp/5aa77ccfe4b062db16aa976f",
          "categoryId":"100",
          "common":false,
          "note":"test"
        }],
        activeUserCount:0,

          searchCorpName:null

      }
    },
    mounted(){
      this.$router.replace('/appManage/appManageSummary')
      document.title = 'App管理列表';
      this.companyInfo = this.$route.query;
      this.getAppSummaryInfo();
      this.getActiveUserCount();
    },
    methods: {
      ...mapMutations(['SET_SPID','count','SET_APPSUMMARYINFO']),
        getActiveUserCount(){
          let _this=this
            console.log(_this.appId)
            //统计昨天和今天的活跃用户
            appActiveUseStsDay({appId:_this.appId+'',spId:_this.spId}).then(res=>{
              if(res!=null&&res.length>0){
                  res.forEach(p=>{
                      _this.activeUserCount+=p.count
                  })
              }
          })
        },
      getAppSummaryInfo:function () {
        var that = this;
        that.loading = true;
        getAppSummaryInfo({
          id:that.appId
        }).then(function (res) {
          that.loading = false;
          console.log(res);
          that.summary = res;
          //展示二维码
            that.showQrCode()
          that.SET_APPSUMMARYINFO(res)
        }).catch(function (err) {
            console.log(err)
          that.loading = false;
          that.$alert(err.message,'提示')
        })
      },
      addCompany:function () {
        this.chooseCompanyVis=true;
        this.getData();
      },
      /**
       * 获取企业列表*/
      getData: function () {
        var _this = this;
        _this.tableLoading = true;
        getCompanyList({
          "page": _this.pageParams.currentPage,
          "pageSize": 10,
          "filter": {
              spName:_this.searchCorpName
          }
        }).then(function (res) {
          _this.tableLoading = false;
          if (res && res.data) {
            _this.companyList = res.data;
            _this.pageParams.totalRows = res.tatalRows
          }
        }).catch(function (err) {
          _this.tableLoading = false;
          _this.$alert(err.message, '提示')
        })
      },
      /**
       * handleCurrentChange*/
      handleCurrentChange:function () {
        this.getData();
      },
      chooseCompnaySure:function () {
        if(this.bindCompany){
          this.choosedCompany = JSON.parse(this.bindCompany)
          this.chooseCompanyVis = false;
          this.bindCompanys(this.choosedCompany);
        }else{
          this.$alert('请选择企业！','提示')
        }
      },
      /**
       * app绑定企业*/
      bindCompanys:function (arg) {
        var _this = this;
        _this.loading = true;
        var apps = [];
        apps.push({appId:_this.appId});
        var params = {
          "spId" : arg.spId,
          "spName" : arg.spName,
          "apps" : apps
        }
        companyBindCommonApp(params).then(function (res) {
          _this.loading = false;
          _this.$alert('绑定企业成功！','提示');
          _this.getAppSummaryInfo();
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message,'提示')
        })
      },
      /**
       * app绑定企业的启用停用*/
      appUncorrelation:function (params) {
        var that = this;
        that.loading = true;
        appUpdateCorrelation({
          id:params.id,
          flag:params.flag==true?false:true
        }).then(function (res) {
          that.loading = false;
          that.$alert(params.flag==true?'解绑成功！':'绑定成功！','提示');
          that.getAppSummaryInfo();
        }).catch(function (err) {
          that.loading = false;
          that.$alert(err.message,'提示');
        })
      },
        routerReplace:function (e) {
            this.$router.replace(e)
        },
        showQrCode(){
          let _this=this
            console.log(_this.summary.icon)
            console.log(_this.summary.installUrl)
            $("#qrCode").empty();
            let iconUrl = _this.summary.icon ? _this.summary.icon : "/static/img/default_icon.png";
            let iconImg = new Image();
            iconImg.src = iconUrl;
            let label  = null;
            if( iconImg ){
                iconImg.onload = function () {
                    $("#qrCode").qrcode({
                        render: 'canvas',
                        minVersion: 1,
                        maxVersion: 40,
                        ecLevel: 'Q',
                        size: 200,
                        fill: '#333',
                        background: null,
                        text: _this.summary.installUrl,
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
        searchCorp(){
          let _this =this
            _this.getData()
          // console.log(_this.searchCorpName)
        }
    },

    components: {
      NavBar
    },
    computed:{
      ...mapState(['appId','spId'])
    }
  }
</script>

<style scoped>
  #table-data .el-button.el-button--text {
    padding: 0;
  }
  #action-btns{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  #action-btns a{
    margin-right: 15px;
  }
  #panel-container{
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }
  #panel{
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .panel-item .title{
    background: #eeeeee;
    font-size: 14px;
    padding: 10px 0px;
  }
  .panel-item .content{
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
  }
  .panel-item{
    border:1px solid #d9d9d9;
    width: 30%;
    text-align: center;
    border-radius: 3px;
  }
  .qrCode{
    width: 25%;
    border:1px solid #d9d9d9;
    border-radius: 3px;
  }
  .fs-14{
    font-size: 14px;
    font-weight: 500;
  }
</style>
