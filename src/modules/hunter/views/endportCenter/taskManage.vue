<!-- Created by chunmingdeng on 2017/12/18 -->
<template>
  <div class="end-container" v-loading.fullscreen="loading">
    <!--<div style="padding: 10px 0;">-->
      <!--<NavBar></NavBar>-->
    <!--</div>-->
    <div class="bgc-fff">
      <div style="padding: 10px 0px;margin-bottom: 10px;">
        <!--<span class="fs-18">企业app管理</span>-->
        <span>任务ID</span>
        <el-input class="w-150 marr-15" size="small" v-model="taskId"></el-input>
        <span>所属终端</span>
        <el-select class="2-150 marr-15" size="small" v-model="endportType">
          <!--<el-option label="App" value="1"></el-option>-->
          <!--<el-option label="微信" value="2"></el-option>-->
          <!--<el-option label="钉钉" value="3"></el-option>-->
          <!--<el-option label="门户" value="4"></el-option>-->
          <el-option label="全部" value=""></el-option>
          <el-option label="iOS" value="ios"></el-option>
          <el-option label="Android" value="android"></el-option>
        </el-select>
        <span>企业编号</span>
        <el-input class="w-150 marr-15" size="small" v-model="spId"></el-input>
        <el-button type="primary" size="small" class="flr" @click="search"><span>搜索</span><i class="el-icon-search"></i></el-button>
      </div>
      <div style="margin-bottom: 30px;">
        <el-table
          id="table-data"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="任务ID"
            align="center"
            min-width="15%">
          </el-table-column>
          <el-table-column
            prop=""
            label="任务名称"
            align="center"
            min-width="15%">
            <template slot-scope="scope">
                <div v-if="scope.row.platform=='ios'">打包iOS</div>
                <div v-else>打包Android</div>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="企业编号"
            align="center"
            min-width="18%">
            <template slot-scope="scope">
              <div v-if="scope.row.common==true"></div>
              <div v-else>{{scope.row.spId}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="任务创建时间|完成时间"
            align="center"
            min-width="20%">
            <template slot-scope="scope">
                  {{scope.row.createTime?scope.row.createTime:'--'  | formatTime('yyyy-MM-dd hh:mm')}} |
                  {{scope.row.completeTime?scope.row.completeTime:'--' | formatTime('yyyy-MM-dd hh:mm')}}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="所属终端"
            align="center"
            min-width="10%">
            <template slot-scope="scope">
                {{scope.row.platform}}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="状态"
            align="center"
            min-width="10%">
            <template slot-scope="scope">
              {{buildStatus[scope.row.buildStatus]}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="10%">
            <template slot-scope="scope">
                 <div :class="{'v-h':scope.row.buildStatus==-1}">
                   <el-button type="text" v-if="scope.row.buildStatus==3||scope.row.buildStatus==500||scope.row.buildStatus==-2" @click="rebuildTask(scope.row)">重新构建</el-button>
                   <el-button type="text" v-if="scope.row.buildStatus==1||scope.row.buildStatus==2||scope.row.buildStatus==200||
                   scope.row.buildStatus==500||scope.row.buildStatus==-2" @click="getLogData(scope.row)">日志</el-button>
                   <!--<el-button type="text" v-if="scope.row.buildStatus==200">配置</el-button>-->
                   <el-button type="text" v-if="scope.row.buildStatus==2||scope.row.buildStatus==1" @click="cancelBuildTask(scope.row)">取消</el-button>
                   <el-button type="text" v-if="scope.row.buildStatus==3||scope.row.buildStatus==500||scope.row.buildStatus==-2" @click="buildTaskSelf(scope.row)">手动打包</el-button>
                 </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--pagination-->
      <div class="block mart-30" v-if="pageParams.totalPage>0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageParams.currentPage"
          :page-size="pageParams.pageSize"
          layout="prev, pager, next, jumper"
          :total="pageParams.totalPage">
        </el-pagination>
      </div>
      <!--pagination end-->

      <!--log dialog start-->
      <el-dialog
        title="日志"
        :visible.sync="logShow">
        <!--<div slot="title"><span>日志</span><i class="el-icon el-icon-loading"></i></div>-->
        <div id="log-content">{{logContent}}</div>
        <div slot="footer">
          <i class="el-icon el-icon-loading marr-15" v-if="logBuilding"></i>
          <el-button type="primary" size="small" @click="logShow = false;">关闭</el-button>
        </div>
      </el-dialog>
      <!--log end-->



      <!--弹出框-->
      <el-dialog title="上传软件包--版本" :visible.sync="versionVisible" size="tiny"
                 @close="closeVersionDialog">
        <el-form label-width="150px" size="small">
          <!--<el-form-item label="appId">-->
          <!--<el-input v-model="appVersionForm.appId" placeholder="请输入内容" size="medium"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="平台">
            <el-radio v-model="appVersionForm.platform" label="android">android</el-radio>
            <el-radio v-model="appVersionForm.platform" label="ios">ios</el-radio>
          </el-form-item>
          <el-form-item label="是否覆盖">
            <el-radio v-model="appVersionForm.override" label="1">是</el-radio>
            <el-radio v-model="appVersionForm.override" label="0">否</el-radio>
          </el-form-item>
          <!--<el-form-item label="发布说明">-->
            <!--<el-input v-model="appVersionForm.releaseNote" placeholder="请输入内容" size="medium"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="备注">
            <el-input v-model="appVersionForm.note" placeholder="请输入内容" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="软件包">
            <el-upload
                    class="avatar-uploader"
                    action=""
                    :http-request="uploadApk"
                    :show-file-list="false"
                    id="uploadApkPannel">
              <img v-if="uploadApkPannel" :src="uploadApkPannel" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class="c-999">上传apk包,最大30M.点击确定的时候才会真实上传</span>
          </el-form-item>
        </el-form>
        <div style="text-align: center;margin-top: 25px">
          <el-button @click="closeVersionDialog">取消</el-button>
          <el-button type="primary" @click="saveVersion">确定</el-button>
        </div>

      </el-dialog>


    </div>
  </div>

</template>

<script>
  import NavBar from '@/components/navBar'
  import {getTaskList, getTaskLog, rebuildTask, cancelBuildTask,uploadApk} from '@/api/api';
  import VueQArt from 'vue-qart'
  export default {
    data: function () {
      return {
        loading: false,
        //search conditions
        logShow:false,
        logContent:'',
        logBuilding:false,
        endportType:'',
        taskId:'',
        spId:'',
        buildStatus:{
          '-1':'未构建',//按钮显示空
          '1':'构建中',//取消、日志
          '2':'等待中',//显示取消、日志
          '3':'取消',//重新构建、手动打包
          '200':'成功',//日志、配置
          '-2':'构建异常',//日志
          '500':'失败',//重新构建、手动打包、日志
        },
        tableData: [
        ],
        pageParams: {
          currentPage: 1,
          pageSize: 10,
          totalPage: 108,
        },
        config: {
          value: 'https://www.baidu.com',
          imagePath: '/static/img/appIcon.png',
          filter: 'color'
        },


          //手动打包
          appVersionForm:{
              appId:null,
              platform:null,
              // appName:null,
              override:null,
              releaseNote:null,
              note:null
          },
          versionVisible:false,
          uploadApkPannel:null,
          apkData:null,
          appId:null
      }
    },
    mounted(){
      document.title = '任务管理';
      this.getTaskList();
    },
    methods: {
      getTaskList: function () {
        var _this = this;
        _this.loading = true;
        getTaskList({
          "page": _this.pageParams.currentPage,
          "pageSize": _this.pageParams.pageSize,
          "filter" : {
            platform:_this.endportType==''?null:_this.endportType,
            id:_this.taskId==''?null:_this.taskId,
            spId:_this.spId==''?null:_this.spId,
          }
        }).then(function (res) {
            console.log(res)
          _this.loading = false;
          if (res && res.data) {
            _this.tableData = res.data;
            _this.pageParams.totalPage = res.tatalRows
          }
        }).catch(function (err) {
          _this.loading = false;
          _this.$alert(err.message, '提示')
        })
      },

      /**
       * action
       * getLogData*/
      getLogData:function(item){
        console.log(item);
        this.logShow = true;
        this.getTaskLog(item);
      },

      /**
       * get log data*/
      getTaskLog:function(params){
        var that = this;
        getTaskLog({
          "jobId": params.id, //任务Id
          "platform": params.platform, //所属平台
          "position": params.position?params.position:0 //日志的偏移值
        }).then(function (res) {
          that.logContent += res&&res.log;
          that.logBuilding = res.building;
          var setTask = setTimeout(function () {
            if(res.building&&that.logShow){//日志窗口没有关闭&还在打包中会执行
              that.getTaskLog({
                "id": params.id,
                "platform": params.platform,
                "position": res.position
              })
            }else{
              clearTimeout(setTask);
            }
          },1000)
        }).catch(function (err) {
          that.$alert(err.message,'提示');
        })
      },

      /**
       * rebuildTask*/
      rebuildTask:function (item) {
        var that = this;
        that.loading = true;
        rebuildTask({id:item.id}).then(function (res) {
          that.loading = false;
          that.getTaskList();
          that.$alert('开始重新构建！','提示');
        }).catch(function (err) {
          that.loading = false;
          that.$alert(err.message,'提示');
        })
      },

      /**
       * cancelBuild*/
      cancelBuildTask:function (item) {
        var that = this;
        that.loading = true;
        cancelBuildTask({id:item.id}).then(function (res) {
          that.loading = false;
          that.getTaskList();
          that.$alert('取消构建成功！','提示');
        }).catch(function (err) {
          that.loading = false;
          that.$alert(err.message,'提示')
        })
      },

      /**
       * handleCurrentChange*/
      handleCurrentChange: function (currentPage) {
        this.pageParams.currentPage = currentPage;
        this.getTaskList(currentPage);
      },
      /**
       * click search button*/
      search:function () {
        this.getTaskList(this.pageParams.currentPage);
      },



        buildTaskSelf(item){
            this.appVersionForm={
                appId:item.appId,
                platform:null,
                // appName:null,
                override:null,
                releaseNote:null,
                note:null
            }
            this.versionVisible=true
        },
        closeVersionDialog(){
            this.versionVisible=false;
        },
        saveVersion(){
            let _this=this
            console.log(_this.appVersionForm.appId)
            _this.apkData.append('appId',_this.appVersionForm.appId);
            _this.apkData.append('platform',_this.appVersionForm.platform);
            _this.apkData.append('override',_this.appVersionForm.override);
            _this.apkData.append('releaseNote',_this.appVersionForm.releaseNote);
            _this.apkData.append('note',_this.appVersionForm.note);
            _this.loading = true;
            uploadApk(_this.apkData).then(function (res) {
                _this.loading = false;
                console.log(res);
                _this.$alert('上传安装包成功','提示')
            }).catch(function (res) {
                console.log(res)
                _this.loading = false;
                _this.$alert(res.message,'提示')
            })
            this.versionVisible=false;
        },
        uploadApk(data){
            var _this =  this;
            if(data.file.size>30*1024*1024){
                _this.$alert('上传Apk不能大于30M！','提示');
                return;
            }

            _this.apkData = new FormData();
            _this.apkData.append('pkg',data.file);

            _this.uploadApkPannel='/static/img/default-styleconfig.1a95d96.png';
        }
    },

    components: {
      NavBar, VueQArt
    }
  }
</script>

<style scoped>
  #table-data .el-button.el-button--text {
    padding: 0;
  }
  .content-rowspan{
    margin: -12px 0;
  }
  .content-rowspan div {
    margin-left: -10px!important;
    margin-right: -10px!important;
    line-height: 46px;
    border-bottom: 1px solid #ECEDEE;
  }
  .content-rowspan div:last-child {
    border-bottom: 0;
  }
  #log-content{
    max-height: 400px;
    overflow-y: scroll;

  }
</style>
