<!-- Created by chunmingdeng on 2018/1/8 -->
<template>
    <section class="end-container" v-loading.fullscreen="loading">
        <div style="padding:10px 0;">
            <!--<NavBar></NavBar>-->
        </div>
        <div class="content">
            <div class="main">
                <el-row type="flex" justify="center">
                    <el-col :span="23">
                        <div class="">
                            <el-row>
                                <div v-if="pubIOsInfo != null || pubAndroidInfo != null" class="version-row gary-info">
                                    <el-col :span="24">
                                        <el-row>
                                            <el-col :span="2">
                                                <label class="version-label">灰度范围:</label>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="platform-label">iOS</div>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-tag size="medium" class="version-tag" color="white">
                                                    {{null != pubIOsInfo ? pubIOsInfo.version : ""}}
                                                </el-tag>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="platform-label">Android</div>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-tag size="medium" class="version-tag" color="white">
                                                    {{ null != pubAndroidInfo ? pubAndroidInfo.version : ""}}
                                                </el-tag>
                                            </el-col>
                                            <el-col :offset="6" :span="4">
                                                <div style="text-align: center">
                                                    <el-button size="small" @click="clearGrayWarning">重置发布</el-button>
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <div>
                                                <el-col :span="2">
                                                    <label class="version-label">指定人员:</label>
                                                </el-col>
                                                <el-col :span="22">
                                                    <div v-if="pubMobiles != null" class="mobile-row">
                                              <span class="mobile-tag" v-for="item in pubMobiles" @click="addMobile(item.mobile)">
                                                  {{item.mobile}}
                                              </span>
                                                    </div>
                                                </el-col>
                                            </div>
                                        </el-row>
                                    </el-col>
                                </div>
                                <div v-else>
                                    <el-alert
                                            title="您还没进行灰度配置"
                                            type="error"
                                            show-icon
                                            :closable="false">
                                    </el-alert>
                                </div>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-form label-width="200px" size="small" style="width: 600px">
                <!--<el-form-item label="APP名称：">-->
                <!--<el-input size="small" class="w-350"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="灰度范围：">
                    <div>
                        <el-checkbox v-model="publishIos" class="w-60">
                            <span>ios</span></el-checkbox>
                        <el-select v-model="iosVersionSel" size="small" class="w-170 marr-15">
                            <el-option v-if="null != iosVersionList" v-for="item in iosVersionList"
                                       :key="item.id"
                                       :label="item.version"
                                       :value="item.id"></el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-checkbox v-model="publishAndroid" class="mart-15 w-60">
                            <span>安卓</span></el-checkbox>
                        <el-select v-model="androidVersionSel" size="small" class="w-170">
                            <el-option v-if="null != androidVersionList" v-for="item in androidVersionList"
                                       :key="item.id"
                                       :label="item.version"
                                       :value="item.id"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="指定人员：">
                    <!--<el-select multiple v-model="value" size="small" class="w-250">-->
                    <!--<el-option v-for="item in options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value"></el-option>-->
                    <!--</el-select>-->
                    <el-input v-model="currentPhone" placeholder="请输入添加人员的手机号" class="w-250">
                        <el-button slot="append" @click="addPerson">添加</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item>
                        <span v-for="item in phones" class="person-item marr-15">
                            <span>{{item}}</span>
                            <i class="el-icon-delete cur-p" @click="deletePerson(item)"></i>
                        </span>
                </el-form-item>
                <!--<el-form-item label="规则设置：">-->
                <!--<el-radio v-model="updateType" label="1">正式发版时覆盖</el-radio>-->
                <!--<el-radio v-model="updateType" label="2">按时间设定</el-radio>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="结束时间：" v-show="updateType == 2">-->
                <!--<el-date-picker-->
                <!--v-model="time"-->
                <!--type="datetime"-->
                <!--size="small"-->
                <!--value-format="yyyy-MM-dd HH:mm"-->
                <!--format="yyyy-MM-dd HH:mm"-->
                <!--:picker-options="pickerOptions"-->
                <!--@change="dataTimeChange">-->
                <!--</el-date-picker>-->
                <!--</el-form-item>-->
                <el-form-item label="">
                    <!--<el-button size="small" class="w-120">取消</el-button>-->
                    <el-button size="small" type="primary" :disabled=" !publishIos && !publishAndroid"  class="w-120" @click="publishGeryLevelConfig">发布</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
    import NavBar from '@/components/navBar'
    import {getGeryLevelConfig, getAppVersionList, publishGeryLevelConfig, clearGeryLevelConfig} from '@/api/api'
    import {mapState} from 'vuex'

    export default {
        data: function () {
            return {
                loading: false,
                grayLevelRange: ['1'],
                updateType: '1',
                options: [],
                value: '选项1',
                publishIos: true,
                publishAndroid: true,
                iosVersionList: [],
                androidVersionList: [],
                androidVersionSel: '',
                iosVersionSel: '',
                currentPhone: null,
                phones: [],
                time: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() - 24 * 3600 * 1000 * 3 > Date.now() || time.getTime() + 24 * 3600 * 1000 < Date.now();
                    },
                },
                pubIOsInfo: null,
                pubAndroidInfo: null,
                pubMobiles: []
            }
        },
        mounted() {
//            this.getGeryLevelConfig();
            var that = this;
            this.getAppVersionListAndroid({
                "page": "1",
                "pageSize": "10",
                "filter": {
                    "appId": that.appId,
                    "platform": 'android'
                }
            });
            this.getAppVersionListIos({
                "page": "1",
                "pageSize": "10",
                "filter": {
                    "appId": that.appId,
                    "platform": 'ios'
                }
            });


            this.getGeryLevelConfig();
        },
        inject: ['reload'],
        methods: {
            //获取灰度发布信息
            getGeryLevelConfig() {
                let _this = this
                getGeryLevelConfig({appId: this.appId}).then(res => {
                    if (null != res) {
                        _this.id = res.id;
                        _this.pubIOsInfo = res.ios
                        _this.pubAndroidInfo = res.android
                        _this.pubMobiles = res.mobiles
                    }
                });

            },
            /**
             * 时间校验 结束时间选择：可选当前日期后3天，精确到分。例如 2017.12.10 9:40*/
//            dataTimeChange(val){
//                var _this = this;
//                if(new Date().getTime()+24*3600*1000*3<new Date(val)){
//                    _this.$message({message:'时间必须是当天日期后三天以内！',type:'error'});
//                    _this.time = '';
//                    return;
//                }else if(new Date().getTime()-new Date(val)>60000){
//                    _this.$message({message:'时间必须是当天日期后三天以内！',type:'error'});
//                    _this.time = '';
//                    return;
//                }
//            },

            /**
             * 查询下拉列表版本*/
            getAppVersionListAndroid: function (params) {
                var _this = this;
                _this.loading = true;
                getAppVersionList(params).then(function (res) {
                    _this.loading = false;
                    _this.androidVersionList = res.data;
                }).catch(function (err) {
                    _this.loading = false;
                    _this.$alert(err.message, '提示')
                })
            },
            getAppVersionListIos: function (params) {
                var _this = this;
                _this.loading = true;
                getAppVersionList(params).then(function (res) {
                    _this.loading = false;
                    _this.iosVersionList = res.data;
                }).catch(function (err) {
                    _this.loading = false;
                    _this.$alert(err.message, '提示')
                })
            },
            /**
             * grey publish*/
            publishGeryLevelConfig: function () {
                var that = this;
                if (that.publishIos && that.iosVersionSel == '') {
                    that.$alert('请选择iOS版本！');
                    return;
                }
                if (that.publishAndroid && that.androidVersionSel == '') {
                    that.$alert('请选择安卓版本！');
                    return;
                }
                if (that.phones.length < 1) {
                    that.$alert('请添加指定人员！');
                    return;
                }
                var params = {
                    "appId": that.appId,
                    "iosVersionId": that.publishIos ? that.iosVersionSel : '',
                    "androidVersionId": that.publishAndroid ? that.androidVersionSel : '',
                    "updateType": 1,
                    "mobiles": that.phones.map(function (val, index) {
                        return {mobile: val}
                    })
                }
                that.loading = true;
                publishGeryLevelConfig(params).then(function (res) {
                    that.loading = false;
                    that.$alert('灰度设置成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            that.reload();
                        }
                    })
                }).catch(function (err) {
                    that.loading = false;
                    that.$alert(err.message, '提示')
                })
            },
            clearGrayWarning() {
                let _this = this;
                this.$confirm('此操作将清空当前发布配置，并且无法恢复，请谨慎操作。', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.clearGrayLaunchConf();
                }).catch(() => {
                    //do nothing...
                });
            },
            clearGrayLaunchConf() {
                let _this = this;
                let params = {
                    "id": _this.id
                };
                _this.loading = true;
                clearGeryLevelConfig(params).then(function (res) {
                    _this.loading = false;
                    _this.$alert('重置成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            _this.reload();
                        }
                    })
                }).catch(function (err) {
                    _this.loading = false;
                    _this.$alert(err.message, '提示')
                })
            },
            /**
             * add person*/
            addPerson: function () {
                var reg = /^((13[0-9])|(17[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
                if (!reg.test(this.currentPhone)) {
                    console.log(this);
                    this.$message.error('请校验输入的手机格式！');
                    return;
                }
                if (this.phones.indexOf(this.currentPhone) != -1) {
                    this.$message.error('请勿重复输入同一手机号！');
                    return;
                }
                this.phones.push(this.currentPhone);
            },
            addMobile: function (mobile) {
                if( this.phones.indexOf(mobile) == -1 ){
                    this.phones.push(mobile);
                }

            },
            /**
             * deletePhone*/
            deletePerson: function (item) {
                var index = this.phones.indexOf(item);
                this.phones.splice(index, 1);
            },
            routerReplace: function (e) {
                this.$router.replace(e)
            }
        },
        components: {
            NavBar
        },
        computed: {
            ...mapState(["spId", "appId"])
        }
    }
</script>

<style>
    .person-item {
        border: 1px solid #eeeeee;
        border-radius: 2px;
        display: inline-block;
        padding: 0px 8px;
        line-height: 24px;
    }

    .person-item:hover {
        color: #409EFF;
        border: 1px solid #409EFF;
    }

    .el-icon-delete:hover {
        color: #409EFF;
    }

    .fs-14 {
        font-size: 14px;
        font-weight: 500;
    }

    .gary-info {
        border-radius: 4px;
        min-height: 36px;
        background: #f8f8f9;
        margin-bottom: 20px;
        padding: 5px 10px;
    }

    .mobile-row {
        min-height: 25px;
        line-height: 25px;
    }

    .mobile-tag {
        display: inline-block;
        background-color: rgba(114, 211, 255, 0.1);
        font-size: 12px;
        color: rgba(66, 137, 234, 0.8);
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid rgba(114, 211, 255, .2);
        white-space: nowrap;
        height: 20px;
        padding: 0 5px;
        line-height: 19px;
        cursor: pointer;
        margin: auto 5px auto auto;
        -webkit-transition: 0.5s;
        -moz-transition: 0.5s;
        -ms-transition: 0.5s;
        -o-transition: 0.5s;
        transition: 0.5s;
    }

    .mobile-tag:hover{
        -webkit-box-shadow: 2px 2px 2px rgba(108, 163, 255, 0.75);
        -moz-box-shadow: 2px 2px 2px rgba(108, 163, 255, 0.75);
        box-shadow: 2px 2px 2px rgba(108, 163, 255, 0.75);
    }
    
    .version-tag {
        color: #656565;
        padding: 0 20px;
        min-width: 79px;
        border-color: rgba(228, 228, 228, 0.76);
    }

    .version-row {
        height: 33px;
        line-height: 33px;
    }

    .version-label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 33px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
    }
    .platform-label{
        text-align: right;
        padding-right: 10px;
        font-weight: bold;
    }
</style>