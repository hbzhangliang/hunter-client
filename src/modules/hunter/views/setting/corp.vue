<template>
    <section v-loading="loading">
        <div>
            <el-row>
                <el-col :span="24"><div class="grid-content bg-header">
                    <label style="float:left;">企业信息</label>
                </div></el-col>
            </el-row>

            <el-form  size="small">
                <el-form-item label="编号" class="hidden">
                    <el-input v-model="corp.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="corp.name" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">logo：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="corp.logo" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">主页：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="corp.homepage" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">微信号：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="corp.wechat" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">电话：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="corp.telphone" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">email：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="corp.email" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">城市：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input readonly="true" class="w-300" v-model="corp.cityNames" placeholder="请输入内容" size="medium"></el-input>
                        <el-button size="mini" type="primary" @click="chooseCityDialog" icon="el-icon-location-outline">选择</el-button>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">详细地址：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="corp.address" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">行业：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input readonly="true" class="w-300" v-model="corp.businessNames" placeholder="请输入内容" size="medium"></el-input>
                        <el-button size="mini" type="primary" @click="chooseBusinessDialog" icon="el-icon-location-outline">选择</el-button>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">职能：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input readonly="true" class="w-300" v-model="corp.careerNames" placeholder="请输入内容" size="medium"></el-input>
                        <el-button size="mini" type="primary" @click="chooseCareerDialog" icon="el-icon-location-outline">选择</el-button>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">介绍：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input  type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="corp.introduce" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">备注：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input  type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="corp.remark" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">app登录：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <template>
                            <el-radio-group v-model="corp.terminalOn">
                                <el-radio  :label=true>显示</el-radio>
                                <el-radio  :label=false>隐藏</el-radio>
                            </el-radio-group>
                        </template>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">状态：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="corp.status" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

            </el-form>

            <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;" v-if="strOp!='view'">
                <el-button size="mini" type="primary" @click="saveCorp" icon="el-icon-success">确定</el-button>
            </div>


            <el-dialog title="城市选择" :visible.sync="cityVisible" size="tiny"
                       @close="closeCityDialog" width="30%" height="70%" max-height="72%">
                <el-tree
                        class="filter-tree city-tree"
                        :data="cityTree"
                        :props="defaultProps"
                        show-checkbox
                        highlight-current
                        :default-checked-keys="defaultCityIds"
                        node-key="id"
                        ref="cityTree">
                </el-tree>
                <div style="text-align: center;margin-top: 25px">
                    <el-button @click="closeCityDialog">取消</el-button>
                    <el-button type="primary" @click="chooseCity">确定</el-button>
                </div>
            </el-dialog>



            <el-dialog title="行业选择" :visible.sync="businessVisible" size="tiny"
                       @close="closeBusinessDialog" width="30%" height="70%" max-height="72%">
                <el-tree
                        class="filter-tree city-tree"
                        :data="businessTree"
                        :props="defaultProps"
                        show-checkbox
                        highlight-current
                        :default-checked-keys="defaultBusinessIds"
                        node-key="id"
                        ref="businessTree">
                </el-tree>
                <div style="text-align: center;margin-top: 25px">
                    <el-button @click="closeBusinessDialog">取消</el-button>
                    <el-button type="primary" @click="chooseBusiness">确定</el-button>
                </div>
            </el-dialog>


            <el-dialog title="职能选择" :visible.sync="careerVisible" size="tiny"
                       @close="closeCareerDialog" width="30%" height="70%" max-height="72%">
                <el-tree
                        class="filter-tree city-tree"
                        :data="careerTree"
                        :props="defaultProps"
                        show-checkbox
                        highlight-current
                        :default-checked-keys="defaultCareerIds"
                        node-key="id"
                        ref="careerTree">
                </el-tree>
                <div style="text-align: center;margin-top: 25px">
                    <el-button @click="closeCareerDialog">取消</el-button>
                    <el-button type="primary" @click="chooseCareer">确定</el-button>
                </div>
            </el-dialog>

        </div>
    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {corpGet,corpSave,cityTree,cityListAll,businessTree,businessListAll,careerTree,careerListAll} from '@/api/api'
    import $ from 'jquery'
    export default {
        data() {
            return {
                loading: false,
                corp:{
                    id:null,
                    name:null,
                    logo:null,
                    homepage:null,
                    wechat:null,
                    telphone:null,
                    email:null,
                    city:null,
                    cityIds:null,
                    cityNames:null,
                    address:null,
                    business:null,
                    businessIds:null,
                    businessNames:null,
                    career:null,
                    careerIds:null,
                    careerNames:null,
                    introduce:null,
                    terminalOn:false,
                    remark:null,
                    status:null
                },
                strOp:'edit',
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                cityTree:null,
                cityList:null,
                defaultCityIds:null,
                cityVisible:false,

                businessTree:null,
                businessList:null,
                defaultBusinessIds:null,
                businessVisible:false,

                careerTree:null,
                careerList:null,
                defaultCareerIds:null,
                careerVisible:false,
            }
        },
        watch: {

        },
        methods: {
            initData(){
                let _this=this
                if(_this.cityTree==null) {
                    cityTree().then(v => {
                        _this.cityTree = v
                    });
                }
                if(_this.cityList==null) {
                    cityListAll().then(p => {
                        _this.cityList = p
                    })
                }

                if(_this.businessTree==null) {
                    businessTree().then(v => {
                        _this.businessTree = v
                    });
                }
                if(_this.businessList==null) {
                    businessListAll().then(p => {
                        _this.businessList = p
                    })
                }


                if(_this.careerTree==null) {
                    careerTree().then(v => {
                        _this.careerTree = v
                    });
                }
                if(_this.careerList==null) {
                    careerListAll().then(p => {
                        _this.careerList = p
                    })
                }

                
                setTimeout(function () {
                    var bean=_this.corp
                    bean.cityIds=end.strToArray(_this.corp.city)
                    bean.cityNames=end.arrayToStrArray(bean.cityIds,_this.cityList)
                    _this.defaultCityIds=bean.cityIds

                    bean.businessIds=end.strToArray(_this.corp.business)
                    bean.businessNames=end.arrayToStrArray(bean.businessIds,_this.businessList)
                    _this.defaultBusinessIds=bean.businessIds

                    bean.careerIds=end.strToArray(_this.corp.career)
                    bean.careerNames=end.arrayToStrArray(bean.careerIds,_this.careerList)
                    _this.defaultCareerIds=bean.careerIds

                    _this.corp=null
                    _this.corp=bean
                },500);
            },
            initCorp(){
                let _this=this
                corpGet().then(p=>{
                    _this.corp=p
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            saveCorp(){
                let _this=this
                _this.corp.city=end.arrayToStr(_this.corp.cityIds)
                _this.corp.business=end.arrayToStr(_this.corp.businessIds)
                _this.corp.career=end.arrayToStr(_this.corp.careerIds)
                corpSave(_this.corp).then(p=>{
                    _this.$message({
                        message: '保存企业数据成功',
                        type: 'success'
                    });
                    _this.initCorp()
                    _this.initData()
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            closeCityDialog(){
                this.cityVisible=false
            },
            chooseCity(){
                let _this=this
                let nodes=this.$refs.cityTree.getCheckedNodes();
                _this.corp.cityIds=[]
                _this.corp.cityNames=''
                nodes.forEach(p=>{
                    if(null==p.children){
                        _this.corp.cityNames+=p.name+','
                        _this.corp.cityIds.push(p.id)
                    }
                })
                this.cityVisible=false
            },
            chooseCityDialog(){
                this.cityVisible=true
            },
            chooseBusinessDialog(){
                this.businessVisible=true
            },
            chooseCareerDialog(){
                this.careerVisible=true
            },
            closeBusinessDialog(){
                this.businessVisible=false
            },
            chooseBusiness(){
                let _this=this
                let nodes=this.$refs.businessTree.getCheckedNodes();
                _this.corp.businessIds=[]
                _this.corp.businessNames=''
                nodes.forEach(p=>{
                    if(null==p.children){
                        _this.corp.businessNames+=p.name+','
                        _this.corp.businessIds.push(p.id)
                    }
                })
                this.businessVisible=false
            },
            closeCareerDialog(){
                this.careerVisible=false
            },
            chooseCareer(){
                let _this=this
                let nodes=this.$refs.careerTree.getCheckedNodes();
                _this.corp.careerIds=[]
                _this.corp.careerNames=''
                nodes.forEach(p=>{
                    if(null==p.children){
                        _this.corp.careerNames+=p.name+','
                        _this.corp.careerIds.push(p.id)
                    }
                })
                this.careerVisible=false
            }

        },
        created () {
            this.initCorp()

            this.initData()
            
        },
        components: {
        }
    }
</script>
<style lang="scss" scoped>
</style>