<!-- Created by chunmingdeng on 2018/1/8 -->
<template>
    <section class="end-container version-manage" v-loading.fullscreen="loading">
      <div class="p-t-20">
        <!--<NavBar></NavBar>-->
          <!--<div><div class="fs-14"><a href="/">首页</a> &nbsp>&nbsp <a href="#" @click="routerReplace('/base/appManageList')">App管理列表</a> &nbsp>&nbsp 版本管理 </div></div>-->
      </div>
        <div class="content">
            <el-button type="primary" icon="el-icon-upload2" @click="uploadVersion">上传软件包</el-button>
            <div class="main">、
                <el-tabs v-model="activeName" @tab-click="">
                    <el-tab-pane name="tab01">
                        <span slot="label" class="w-70 dis-i-b tac fs-16">iOS</span>
                        <div>
                            <el-table
                                    :data="tableDataIos"
                                    border
                                    style="width: 100%"
                                    :header-cell-style="{textAlign:'center',padding:' 5px 10px'}"
                                    :cell-style="{textAlign:'center'}"
                                    cclass="fs-14 marb-30">
                                <el-table-column
                                        prop="appName"
                                        label="app名称"
                                        min-width="20%">
                                </el-table-column>
                                <el-table-column
                                        prop="version"
                                        label="版本号"
                                        min-width="20%">
                                </el-table-column>
                                <el-table-column
                                        label="图标"
                                        min-width="15%">
                                  <template slot-scope="scope">
                                    <img :src="scope.row.icon" style="width: 40px;height: 40px;"/>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                        label="备注"
                                        min-width="20%">
                                  <template slot-scope="scope">
                                    <el-input type="textarea" :value="scope.row.note" @blur="saveComment(scope.row)"></el-input>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                        prop=""
                                        label="状态"
                                        min-width="15%">
                                    <template slot-scope="scope">
                                        {{scope.row.flag==true?'启用':'禁用'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop=""
                                        label="操作"
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
                                        <el-button size="small" type="text" v-if="scope.row.flag==true" @click="changeAppStatus(scope.row)">禁用</el-button>
                                        <el-button size="small" type="text" v-else @click="changeAppStatus(scope.row)">启用</el-button>
                                        <el-button size="small" type="text">日志</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    @current-change="handleCurrentChangeIos"
                                    :current-page="pageObjIos.currentPage"
                                    :total="pageObjIos.total"
                                    layout="total,prev,pager,next,jumper"
                                    v-if="tableDataIos.length>0">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane name="tab02">
                        <span slot="label" class="w-70 dis-i-b tac fs-16">Android</span>
                        <div>
                            <el-table
                                    :data="tableDataAndroid"
                                    border
                                    style="width: 100%;"
                                    :header-cell-style="{textAlign:'center',padding:' 5px 10px'}"
                                    :cell-style="{textAlign:'center'}"
                                    class="fs-14 marb-30">
                                <el-table-column
                                        prop="appName"
                                        label="app名称"
                                        min-width="20%"">
                                </el-table-column>
                                <el-table-column
                                        prop="version"
                                        label="版本号"
                                        min-width="20%">
                                </el-table-column>
                                <el-table-column
                                        label="图标"
                                        min-width="15%">
                                  <template slot-scope="scope">
                                    <img :src="scope.row.icon" style="width: 40px;height: 40px;"/>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                        label="备注"
                                        min-width="20%"
                                        show-overflow-tooltip>
                                  <template slot-scope="scope">
                                    <el-input type="textarea" :value="scope.row.note" @blur="saveComment(scope.row)"></el-input>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                        prop="flag"
                                        label="状态"
                                        min-width="15%">
                                    <template slot-scope="scope">
                                        {{scope.row.flag==true?'启用':'禁用'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop=""
                                        label="操作"
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

                                        <el-button size="small" type="text" v-if="scope.row.flag==true" @click="changeAppStatus(scope.row)">禁用</el-button>
                                        <el-button size="small" type="text" v-else @click="changeAppStatus(scope.row)">启用</el-button>
                                        <el-button size="small" type="text">日志</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    :current-page="pageObjAndroid.currentPage"
                                    :total="pageObjAndroid.total"
                                    layout="total,prev,pager,next,jumper"
                                    v-if="tableDataAndroid.length>0">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <!--<el-tab-pane disabled id="tab-tab03">-->
                    <!--<span slot="label"><el-button  type="primary" icon="el-icon-upload2" @click="uploadVersion">上传软件包</el-button></span>-->
                <!--</el-tab-pane>-->

                <!--弹出框-->
                <el-dialog title="上传软件包--版本" :visible.sync="versionVisible" size="tiny"
                           @close="closeVersionDialog">
                    <el-form label-width="150px" size="small">
                        <!--<el-form-item label="appId">-->
                            <!--<el-input v-model="appVersionForm.appId" placeholder="请输入内容" size="medium"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="平台">
                            <el-radio v-model="appVersionForm.platform" label="Android">Android</el-radio>
                            <el-radio v-model="appVersionForm.platform" label="iOS">iOS</el-radio>
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
    </section>
</template>

<script>
    import NavBar from '@/components/navBar'
    import {getAppVersionList,appVersionUpdate,uploadApk,versionPublishQurery} from '@/api/api'
    import {mapState,mapMutations} from 'vuex'
    import QRCode from 'qrcodejs2'
    import $ from 'jquery'
    export default {
        data: function () {
            return {
                loading:false,
                activeName:'tab01',
                tableDataAndroid:[
                ],
                tableDataIos:[
                ],
                pageObjAndroid:{
                    currentPage:1,
                    total:101
                },
                pageObjIos:{
                    currentPage:1,
                    total:101
                },
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
                androidPubVersionId:null,
                iosPubversionId:null
            }
        },
        created(){
            document.title = '版本管理';
            var that = this;
            this.getAppVersionListAndroid()
            this.getAppVersionListIos()
            this.initVersionPubInfo()
        },
        inject : ['reload'],
        methods:{
            initVersionPubInfo(){
                let _this=this
                versionPublishQurery({appId:this.appId}).then(res=>{
                    if(null!=res){
                        if(null!=res.android&&null!=res.android.versionId){
                            _this.androidPubVersionId=res.android.versionId
                        }
                        if(null!=res.ios&&null!=res.ios.versionId){
                            _this.iosPubversionId= res.ios.versionId
                        }
                    }
                })
            },
            getAppVersionListAndroid: function (params) {
                var _this = this;
                _this.loading = true;
                getAppVersionList({
                    "page" : _this.pageObjAndroid.currentPage,
                    "pageSize" : "10" ,
                    "filter" : {
                        "appId": _this.appId,
                        "platform": 'android'
                    }
                }).then(function(res){
                    _this.loading = false;
                    _this.tableDataAndroid = res.data;
                    _this.pageObjAndroid.total = res.tatalRows;
                }).catch(function(err){
                    _this.loading = false;
                    _this.$alert(err.message,'提示')
                })
            },
            getAppVersionListIos: function (params) {
                var _this = this;
                _this.loading = true;
                getAppVersionList({
                    "page" : _this.pageObjIos.currentPage,
                    "pageSize" : "10" ,
                    "filter" : {
                        "appId": _this.appId,
                        "platform": 'ios'
                    }
                }).then(function(res){
                    _this.loading = false;
                    _this.tableDataIos= res.data;
                    _this.pageObjIos.total = res.tatalRows;
                }).catch(function(err){
                    _this.loading = false;
                    _this.$alert(err.message,'提示')
                })
            },
            /**
             * 失去焦点保存备注信息*/
            saveComment: function (item) {
              var that = this;
              that.loading = true;
              appVersionUpdate({
                "id" :item.id ,
                "note" : event.target.value
              }).then(function (res) {
                that.loading = false;
              }).catch(function (err) {
                that.loading = false;
                that.$alert(err.message,'提示');
              })
            },
            /**
             * paginatoin*/
            handleCurrentChange:function (val) {
                var that = this;
                that.pageObjAndroid.currentPage = val;
                this.getAppVersionListAndroid();
            },
            handleCurrentChangeIos:function (val) {
                var that = this;
                that.pageObjIos.currentPage = val;
                this.getAppVersionListIos();
            },
            changeAppStatus:function (params) {
                let _this=this
                if((null!=this.androidPubVersionId&&this.androidPubVersionId==params.id)||
                    null!=this.iosPubversionId&&this.iosPubversionId==params.id){
                    _this.$alert('操作的版本是发布版本,不能被禁用','提示');
                    return;
                }

                var that = this;
                that.$confirm('确认'+(params.flag==true?'禁用':'启用')+params.appName+
                  '，版本号：'+params.version+'？','提示').then(function () {
                    that.loading = true;
                    appVersionUpdate({
                        "id" :params.id ,
                        "flag" : params.flag==true?false:true
                    }).then(function (res) {
                        that.loading = false;
                        that.$alert('操作成功！','提示');
                        that.getAppVersionListAndroid();
                        that.getAppVersionListIos();
                    }).catch(function (err) {
                        that.loading = false;
                        that.$alert(err.message,'提示');
                    })
                }).catch(function () {
                })
            },
            uploadVersion(){
                let _this=this
                this.appVersionForm={
                    appId:_this.appId,
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
                    _this.$alert('上传安装包成功','提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            _this.reload();
                        }
                    })
                    // _this.uploadApkPannel = res[0].value;
                }).catch(function (err) {
                    console.log(err)
                    _this.loading = false;
                    _this.$alert("上传软件包失败",'提示')
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
                // fileData.append('form',JSON.stringify(_this.appVersionForm));
                // _this.loading = true;
                // uploadApk(fileData).then(function (res) {
                //     _this.loading = false;
                //     console.log(res);
                //     // _this.uploadApkPannel = res[0].value;
                // }).catch(function (err) {
                //     console.log(err)
                //     _this.loading = false;
                //     _this.$alert(err.message,'提示')
                // })


                // reader.readAsDataURL(data.file)
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
            }
        },
        components: {
            NavBar
        },
        computed:{
            ...mapState(['spId','appId']),
        }
    }
</script>

<style lang="scss">
    .version-manage{
        .el-tabs__nav{
            width: 100%;
            #tab-tab03{
                float: right;
               height: 52px;
            }
        }
        .avatar-uploader{
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .fs-14{
            font-size: 14px;
            font-weight: 500;
        }
        .qrSpan{
            color: #409EFF;
            cursor : pointer;
        }

        .qr-item:hover{
            background: inherit !important;
        }
    }
</style>
