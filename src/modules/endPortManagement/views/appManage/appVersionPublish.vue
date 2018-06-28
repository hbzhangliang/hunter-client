<!-- Created by chunmingdeng on 2018/1/8 -->
<template>
    <section class="end-container" v-loading.fullscreen="loading">
      <div style="padding: 0;">
        <!--<NavBar></NavBar>-->
          <!--<div><div class="fs-14"><a href="/">首页</a> &nbsp>&nbsp <a href="#" @click="routerReplace('/base/appManageList')">App管理列表</a> &nbsp>&nbsp 发布版本 </div></div>-->
      </div>
        <div class="content">
            <div class="main" style="border: 1px solid lightgrey;width: 90%;height: 70px;">
                <div style="float: left">
                <div v-if="pubAndroid!=null" class="spanInfo">
                    <span v-if="pubAndroid.modifyTime!=null">{{pubAndroid.modifyTime| formatTime('yyyy-MM-dd hh:mm')}}&nbsp;&nbsp;&nbsp;&nbsp;发布最新版本&nbsp;&nbsp;&nbsp;&nbsp;Android&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="pubAndroid.version!=null">{{pubAndroid.version.version}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="pubAndroid.constraint">强制升级</span>
                    <span v-else>非强制升级
                         向下兼容至{{pubAndroid.minVersion!=null&&pubAndroid.minVersion.version}}
                    </span>
                </div>
                <div v-else class="spanInfo">
                    Android未发布过
                </div>
                <div v-if="pubIos!=null" class="spanInfo">
                    <span  v-if="pubIos!=null&&pubIos.modifyTime!=null">{{pubIos.modifyTime| formatTime('yyyy-MM-dd hh:mm')}}&nbsp;&nbsp;&nbsp;&nbsp;发布最新版本&nbsp;&nbsp;&nbsp;&nbsp;iOS&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span  v-if="pubIos!=null&&pubIos.version!=null">{{pubIos.version.version}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span  v-if="pubIos!=null&&pubIos.constraint">强制升级</span>
                    <span  v-else>非强制升级
                        向下兼容至{{pubIos!=null&&pubIos.minVersion!=null&&pubIos.minVersion.version}}
                    </span>
                </div>
                <div v-else class="spanInfo">
                    iOS未发布过
                </div>
                </div>
                <div v-if="pubAndroid!=null||pubIos!=null" style="float: right;margin-right: 20px;margin-top: 20px;">
                    <el-button size="small"  @click="rollBackVersion">回滚操作</el-button>
                </div>
            </div>
            <div class="main">
                <el-form label-width="200px" style="width: 500px">
                    <!--<el-form-item label="企业版本名称：">-->
                        <!--<el-input size="small"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="发布范围：">
                        <el-checkbox v-model="publishIos" class="marr-15">
                            <span>iOS</span></el-checkbox>
                        <el-checkbox v-model="publishAndroid" class="marr-15">
                            <span>Android</span></el-checkbox>
                    </el-form-item>
                    <el-form-item label="iOS发布版本" v-show="publishIos">
                        <el-select v-model="iosVersionSel" size="small">
                            <el-option v-for="item in iosVersionList"
                                       :key="item.id"
                                       :label="item.version"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否强制升级" v-show="publishIos">
                        <el-radio v-model="iosForceUpdate" label="1">是</el-radio>
                        <el-radio v-model="iosForceUpdate" label="2">否</el-radio>
                    </el-form-item>

                    <el-form-item label="最低版本" v-show="iosForceUpdate=='2'">
                        <el-select v-model="iosMinVersion" size="small">
                            <el-option v-for="item in iosVersionList"
                                       :key="item.id"
                                       :label="item.version"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <hr/>
                    <br/>

                    <el-form-item label="Android发布版本" v-show="publishAndroid">
                        <el-select v-model="androidVersionSel" size="small">
                            <el-option v-for="item in androidVersionList"
                                       :key="item.id"
                                       :label="item.version"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否强制升级" v-show="publishAndroid">
                        <el-radio v-model="androidForceUpdate" label="1">是</el-radio>
                        <el-radio v-model="androidForceUpdate" label="2">否</el-radio>
                    </el-form-item>

                    <el-form-item label="最低版本" v-show="androidForceUpdate=='2'">
                        <el-select v-model="androidMinVersion" size="small">
                            <el-option v-for="item in androidVersionList"
                                       :key="item.id"
                                       :label="item.version"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="备注" v-show="publishAndroid">
                        <el-input type="textarea" v-model="note"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <!--<el-button size="small" class="w-120">取消</el-button>-->
                        <el-button size="small" type="primary" :disabled=" !publishIos && !publishAndroid" class="w-120" @click="versionPublish">发布</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script>
    import NavBar from '@/components/navBar'
    import {versionPublish,getAppVersionList,versionPublishQurery,rollBackVersion} from '@/api/api'
    import {mapState} from 'vuex'
    export default {
        data: function () {
            return {
                loading:false,
                grayLevelRange:['1'],
                updateType:'1',
                options: [],
                value:'选项1',
                publishIos:true,
                publishAndroid:true,
                iosVersionList:[],
                androidVersionList:[],
                androidVersionSel:'',
                iosVersionSel:'',
                iosForceUpdate:'1',
                androidForceUpdate:'1',
                note:'',
                androidPublishVesionId:"",
                iosPublishVersionId:"",
                iosMinVersion:null,
                androidMinVersion:null,
                pubAndroid:null,
                pubIos:null
            }
        },
        inject : ['reload'],
        mounted(){
            var that = this;
            this.initVersionPublish();
        },
        methods:{
            initVersionPublish(){
                let _this=this
                _this.loading = true;
                versionPublishQurery({appId:this.appId}).then(res=>{
                    _this.pubObj=res
                    console.log(res)
                    _this.loading=false
                    if(null!=res.android) {
                        _this.pubAndroid=res.android
                        // _this.androidPublishVesionId = res.android.versionId
                        // _this.androidMinVersion=res.android.minVersionId
                        // _this.androidForceUpdate=res.android.constraint?'1':'2'
                    }
                    if(null!=res.ios) {
                        _this.pubIos=res.ios
                        // _this.iosPublishVersionId = res.ios.versionId
                        // _this.iosMinVersion=res.ios.minVersionId
                        // _this.iosForceUpdate=res.ios.constraint?'1':'2'
                    }



                    _this.getAppVersionListAndroid({
                        "page" : "1",
                        "pageSize" : "10000" ,
                        "filter" : {
                            "appId": _this.appId,
                            "platform": 'android'
                        }
                    });
                    _this.getAppVersionListIos({
                        "page" : "1",
                        "pageSize" : "10000" ,
                        "filter" : {
                            "appId": _this.appId,
                            "platform": 'ios'
                        }
                    });

                })
            },
            /**
             * 查询下拉列表版本*/
            getAppVersionListAndroid: function (params) {
                var _this = this;
                _this.loading = true;
                getAppVersionList(params).then(function(res){
                    _this.loading = false;
                    _this.androidVersionList = res.data;
                    _this.androidVersionSel=_this.androidPublishVesionId

                }).catch(function(err){
                    _this.loading = false;
                    _this.$alert(err.message,'提示')
                })
            },
            getAppVersionListIos: function (params) {
                var _this = this;
                _this.loading = true;
                getAppVersionList(params).then(function(res){
                    _this.loading = false;
                    _this.iosVersionList = res.data;
                    _this.iosVersionSel=_this.iosPublishVersionId
                }).catch(function(err){
                    _this.loading = false;
                    _this.$alert(err.message,'提示')
                })
            },


            /**
             * version publish*/
            versionPublish:function () {
                let that = this;
                let params = {
                    "appId" : that.appId,
                    note:that.note
                };
                if(that.publishIos){
                    params["ios"] = {
                        "versionId" : that.iosVersionSel,
                        "minVersionId" : that.iosMinVersion,
                        "constraint" : that.iosForceUpdate==1?true:false
                    };
                }
                if(that.publishAndroid){
                    params["android"] = {
                        "versionId" : that.androidVersionSel,
                        "minVersionId" : that.androidMinVersion,
                        "constraint" : that.androidForceUpdate==1?true:false
                    };
                }
                that.loading = true;
                versionPublish(params).then(function (res) {
                    that.loading = false;
                    that.$alert('发布成功！','提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                           that.reload();
                        }
                    });
                }).catch(function (err) {
                    that.loading = false;
                    that.$alert(err.message,'提示');
                })
            },
            rollBackVersion(){
                // rollBackVersion
                let that=this
                that.loading = true;
                rollBackVersion({appId:this.appId}).then(res=>{
                    that.loading = false;
                    that.$alert('回滚成功！','提示');
                }).catch(function (err) {
                    that.loading = false;
                    that.$alert(err.message,'提示');
                })
            },
            routerReplace:function (e) {
                this.$router.replace(e)
            }
        },
        components: {
            NavBar
        },
        computed:{
            ...mapState(["spId","appId"])
        }
    }
</script>

<style scoped>

    .floatLeft{
        float: left;
        font-size: large;
    }
    .fs-14{
        font-size: 14px;
        font-weight: 500;
    }

    .spanInfo{
        margin-top: 5px;
        margin-left: 10px;
        font-size: 16px;
    }
    .spanInfo span{
        font-size: 16px;
    }
</style>
