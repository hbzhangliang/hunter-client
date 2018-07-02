<template>
    <section class="end-container">
        <NavBar></NavBar>
        <div class="content">
            <div class="main">
                <div class="banner">
                </div>
                <div class="tableBox">
                    <div class="pageTableContent">
                        <el-button type="primary" class="addBanner" @click="addBrand"><i class="el-icon-plus"></i>新增品牌</el-button>
                        <el-table :data="tableData" border width="100%" v-loading="isBusy">
                            <el-table-column prop="code" label="编码" min-width="12%">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" min-width="12%">
                            </el-table-column>
                            <el-table-column prop="" label="机型列表" min-width="25%">
                                <template slot-scope="scope">
                                    <span v-for="item in scope.row.phoneTypeList">
                                        {{item.code}}  <el-button type="text" @click="delRef(scope.row,item.code)">删除关联</el-button><br/>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="创建时间" min-width="10%">
                                <template slot-scope="scope">
                                    {{scope.row.dateCreated?scope.row.dateCreated:'--'|formatTime('yyyy-MM-dd hh:mm')}}
                                </template>
                            </el-table-column>

                            <el-table-column  label="操作" min-width="15%">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="addRef(scope.row)">添加关联</el-button>
                                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                                    <!--<el-button type="text" @click="view(scope.row)">查看</el-button>-->
                                    <el-button type="text" @click="del(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>


                <el-dialog custom-class="info" title="品牌机型绑定" :visible.sync="moduleVisible" size="tiny"
                           @close="closeDialog">
                    <div class="modalContent">

                        <el-table :data="phoneTypeList" border width="100%">
                            <el-table-column prop="" label="选择" width="220px">
                                <template slot-scope="scope">
                                    <input type="checkbox" value="选择" name="inputCheck" :id="generateId(scope.row.code)"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="code" label="机型" width="360px">
                            </el-table-column>

                        </el-table>

                        <!--</div>-->
                        <div style="text-align: center;margin-top: 10px">
                            <el-button @click="closeDialog">取消</el-button>
                            <el-button type="primary" @click="saveBrandRef">确定</el-button>
                        </div>
                    </div>
                </el-dialog>



                <el-dialog custom-class="info" title="添加品牌" :visible.sync="brandVisible" size="tiny"
                           @close="closeBrandDialog">
                    <div class="modalContent">
                        <el-form label-width="200px" style="width: 500px">
                            <el-form-item label="品牌编码">
                                <el-input type="text" v-model="brandInfo.code"></el-input>
                            </el-form-item>
                            <el-form-item label="品牌名称">
                                <el-input type="text" v-model="brandInfo.name"></el-input>
                            </el-form-item>

                            <!--</div>-->
                            <div style="text-align: center;margin-top: 10px">
                                <el-button @click="closeBrandDialog">取消</el-button>
                                <el-button type="primary" @click="saveBrand">确定</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-dialog>


            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
    .search_input{
        width:24%;
        margin: 0 auto;
    }

    .floatImgDiv{
        position: absolute;
        left: 40%;top: 20%;
        width: 300px;height: 300px;
    }
</style>
<script>
    import NavBar from '@/components/navBar'
    import end from '@/common/js/utils.js'
    import {brandList,brandCreate,brandDel,brandGet,deviceTypeList,deviceTypeListNotSts,
        brandAddDeviceType,brandDelDeviceType
    } from '@/api/api'
    import $ from 'jquery'
    export default {
        data() {
            return {
                tableData:[],
                defaultPageSize:10,
                isBusy: false,
                moduleVisible:false,
                phoneTypeList:[],
                choseBrandCode:null,
                brandVisible:false,
                brandInfo:{
                    code:null,
                    name:null
                }

            }
        },
        methods:{
            init(){
                var _this=this;
                _this.isBusy=true;
                brandList().then(res => {
                    _this.tableData=res;
                    _this.isBusy=false;
                });
            },
            edit(item){
                this.brandVisible=true;
                this.brandInfo={
                    code:item.code,
                    name:item.name
                }
            },
            del(item){
                let _this=this
                brandDel({code:item.code}).then(res=>{
                    _this.$alert(res.message,'提示')
                    _this.init()
                }).catch(function(err){
                    _this.$alert(err.message,'提示')
                })
            },
            addBrand(){
                this.brandVisible=true;
            },
            delRef(item,code){
                let _this=this
                _this.choseBrandCode=item.code
                brandDelDeviceType({brandCode:item.code,typeCode:code}).then(res=>{
                    _this.$alert(res.message,'提示')
                    _this.init()
                }).catch(function(err){
                    _this.$alert(err.message,'提示')
                })
            },
            addRef(item){
                this.moduleVisible=true
                let _this=this
                _this. phoneTypeList=[]
                _this.choseBrandCode=item.code
                deviceTypeListNotSts().then(res=>{
                    _this. phoneTypeList=res
                    console.log(res)
                    _this.init()
                });
            },
            closeDialog(){
                this.moduleVisible=false
            },
            saveBrandRef(){
                var _this=this
                var list=[]
                $("input[name='inputCheck']").each(function (index,item) {
                    if($(item).is(":checked")==true) {
                        var p = {
                            code: $(item).prop("id").toString().substring(5)
                        }
                        list.push(p);
                    }
                    console.log(list)
                    console.log(_this.choseBrandCode)
                })
                brandAddDeviceType({brandCode:_this.choseBrandCode,list:list}).then(res=>{
                    _this.moduleVisible=false
                    _this.$alert(res.message,'提示')
                }).catch(function(err){
                    _this.$alert(err.message,'提示')
                })
            },
            generateId(id){
                return "input"+id;
            },
            closeBrandDialog(){
                this.brandVisible=false
            },
            saveBrand(){
                let _this=this
                brandCreate(this.brandInfo).then(res=>{
                    _this.$alert(res.message,'提示')
                    _this.brandVisible=false
                    _this.init()
                }).catch(function(err){
                    _this.$alert(err.message,'提示')
                })
            }
        },
        created () {
            this.init();
        },
        components: {
            NavBar
        }
    }
</script>