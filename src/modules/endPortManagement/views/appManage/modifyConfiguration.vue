<!-- Created by chunmingdeng on 2018/1/8 -->
<template>
        <div class="content">
            <div class="main">

                <div style="width: 70%;position: relative;">

                    <el-form label-width="180px" label-position="left">
                            <el-form-item :label="item.name" v-for="(item,index) in configurationData" :key="item">
                            <el-radio-group  v-if="item.type=='radio'" v-model="item.value">
                                <el-radio :disabled="configEditStatus" v-for="(item1,index1) in item.options" :label="item1.value" :key="item1">{{item1.label}}
                                </el-radio>
                            </el-radio-group>
                            <el-checkbox-group v-if="item.type=='checkbox'" v-model="item.value" :key="item">
                                <el-checkbox :disabled="configEditStatus" v-for="(item2,index2) in item.options" :label="item2.value" :key="item2">{{item2.label}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item size="large">
                        <!--<el-button @click="onCancel">复原</el-button>-->
                        <el-button type="primary" :disabled="configEditStatus"  @click="onSubmit">保存</el-button>
                        </el-form-item>

                    </el-form>
                </div>

            </div>
        </div>
</template>

<script>
    import NavBar from '@/components/navBar'
    import {getAppcommonConfiguration,getAppCommonConfData,saveAppcommonConfiguration} from '@/api/api'
    import {mapState} from 'vuex'
    export default {
        data: function () {
            return {
                loading:false,
                configurationData:[],//默认配置数据
                configurationLists:[],
                initConf:{
                    spId:this.spId,
                    appId:this.appId,
                }
            }
        },
        mounted(){
            //配置初始化数据
            this.init_data();
        },
        inject: ['reload'],
        methods:{
            init_data(){
                 //获取值
                 this.initConf.spId=this.spId
                 this.initConf.appId=this.appId


                var _this=this
                getAppCommonConfData().then(res1=>{
                    _this.configurationData=res1
                    getAppcommonConfiguration(_this.initConf).then(res2=>{
                        _this.configurationLists=res2

                        _this.configurationData.forEach(function (e1,index1) {
                              var field=e1.field
                            _this.configurationLists.forEach(function (e2,index2) {
                                if(field==e2.field) {
//                                    e1.value=e2.value.split(',')
                                    e1.value = e2.field == "MESSAGE_TYPE" ? e2.value.split(',') : e2.value
                                }
                            })
                        });
//                        _this.configurationData=JSON.parse(JSON.stringify(_this.configurationData))
//                        console.log(_this.configurationData)
                    }).catch(function (err) {
                        _this.$alert(err.message, "提示", {
                            callback : (action) => {
                                _this.$router.replace("/appManage/appManageSummary");
                            }
                        })
                    });

                });
            },
            onSubmit() {
                var _this=this
                var config=[]
                this.configurationData.forEach(function (item,index) {
                    var tmp={
                        field:item.field,
                        value:item.field=="MESSAGE_TYPE"?_this.transArrayToStr(item.value):item.value
                    }
                    config.push(tmp)
                })
                var paras={
                    spId:_this.initConf.spId,
                    appId:_this.initConf.appId,
                    configs:config
                }
                saveAppcommonConfiguration(paras).then(res=>{
                    _this.$message.success("保存数据成功");
                    _this.reload();
                }).catch(function (err) {
                    _this.$message.error('保存数据错误');
                })
             },
             transArrayToStr(arr){
                 if(arr==null||arr.length<1) return "";
                 var result=""
                 arr.forEach(function (item,index) {
                     result+=item+","
                 })
                 return result.substr(0,result.length-1)
             },
            getAppcommonConfiguration:function () {
                var _this = this;
                _this.loading = true;
                getAppcommonConfiguration({
                    "spId" : _this.spId, //企业编号
                    "categoryId" : _this.$route.query.id //行业编号
                }).then(function (res) {
                    _this.loading = false;
                    _this.configurationList = res;
                }).catch(function (err) {
                    _this.loading = false;
                    console.error(err)
                })
            },
            a:function () {
//                console.log(this.configurationLists);
//                console.log(this.ss);
            }
        },
        components: {
            NavBar
        },
        computed:{
            ...mapState(["spId","appId", "configEditStatus"])
        }
    }
</script>

<style>

</style>