<template>
    <section class="end-container">
        <NavBar></NavBar>
        <div class="content">
            <div class="main">
                <div class="banner">

                </div>
                <p  style="margin: 5px 2px">
                    <b>企业spId:</b> <el-input class="search_input" v-model="PageForm.params.spId" placeholder="请输入内容"></el-input>
                    <el-button type="primary" icon="el-icon-search"  @click="searchWorkBench">搜索</el-button>
                </p>

                <div class="tableBox">
                    <div class="pageTableContent">
                        <el-button style="margin-bottom: 15px;margin-top: 10px;" type="primary" class="addBanner" @click="addWorkBench" icon="el-icon-plus" circle>新  建</el-button>

                        <el-button type="primary" class="addBanner" @click="delBatchWorkBench" icon="el-icon-delete" circle>删  除</el-button>

                        <el-table :data="benchList" border width="100%" v-loading="isBusy">
                            <el-table-column prop="" label="选择" min-width="5%">
                                <template slot-scope="scope">
                                    <input type="checkbox" name="chooseIds" :id="generatId(scope.row.id)"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="id" label="编号" min-width="5%">
                            </el-table-column>
                            <el-table-column prop="spId" label="spId" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="type" label="类型" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="seq" label="排序号" min-width="5%">
                            </el-table-column>
                            <el-table-column prop="status" label="企业状态" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="createBy" label="创建人" min-width="6%">
                            </el-table-column>
                            <el-table-column prop="" label="创建时间" min-width="8%">
                                <template slot-scope="scope">
                                    {{scope.row.createTime?scope.row.createTime:'--'|formatTime('yyyy-MM-dd hh:mm')}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="modifyBy" label="修改人" min-width="6%">
                            </el-table-column>
                            <el-table-column prop="" label="修改时间" min-width="8%">
                                <template slot-scope="scope">
                                    {{scope.row.modifyTime?scope.row.modifyTime:'--'|formatTime('yyyy-MM-dd hh:mm')}}
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" min-width="12%">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                                    <el-button type="text" @click="del(scope.row)">删除</el-button>
                                    <el-button type="text" @click="workBenchConfig(scope.row)">配置</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="block">
                    <span class="demonstration"></span>
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="PageForm.page"
                            :page-size="PageForm.pageSize"
                            layout="prev, pager, next, jumper"
                            :total="PageForm.totalRows">
                    </el-pagination>
                </div>

            </div>



            <el-dialog :title="dialogTitle" :visible.sync="workBenchShow" size="tiny"
                       @close="closeDialog">
                <div class="modalContent">
                    <div class="demo-input-suffix">
                        名称:<el-input v-model="workBench.name" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <div class="demo-input-suffix">
                        spId:<el-input v-model="workBench.spId" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <div class="demo-input-suffix">
                        排序号:<el-input v-model="workBench.seq" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <div class="demo-input-suffix">
                        备注:<el-input v-model="workBench.remark" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <div class="demo-input-suffix">
                        状态:<el-input v-model="workBench.status" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <div class="demo-input-suffix">
                        逻辑位:
                        <el-radio-group v-model="workBench.flag">
                            <el-radio  label='true'>1</el-radio>
                            <el-radio  label='false'>0</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div style="text-align: center;margin-top: 25px">
                    <el-button @click="closeDialog">取消</el-button>
                    <el-button type="primary" @click="saveWorkBench">确定</el-button>
                </div>
            </el-dialog>



        </div>
    </section>
</template>

<style lang="scss" scoped>
    .search_input{
        width:24%;
        margin: 0 auto;
    }

</style>
<script>
    import NavBar from '@/components/navBar'
    import end from '@/common/js/utils.js'
    import {workBenchList,workBenchSave,workBenchGet,workBenchDel} from '@/api/api'
    import $ from 'jquery'
    export default{
        data () {
            return {
                benchList:[],
                workBench:{
                    id:null,
                    name:null,
                    type:null,
                    spId:null,
                    seq:null,
                    remark:null,
                    status:null,
                    flag:null
                },

                PageForm:{
                    page:1,
                    pageSize:10,
                    totalRows:null,
                    totalPage:null,
                    params:{
                        spId:null
                    }
                },
                moduleVisible:false,
                defaultPageSize:10,

                isBusy: false,
                dialogTitle:null,
                workBenchShow:false
            }
        },
        methods: {
            init(page,pageSize){
                var _this=this;
                _this.isBusy=true;
                _this.tableData=[];
                _this.PageForm.page=page;
                _this.PageForm.pageSize=pageSize;
                workBenchList(_this.PageForm).then(res => {
                    _this.benchList=res.data;
                    _this.PageForm.totalRows=res.tatalRows;
                    _this.PageForm.totalPage=res.totalPage;
                    _this.isBusy=false;
                });
            },
            searchWorkBench(){
                this.init(1,this.defaultPageSize);
            },
            handleCurrentChange(item){
                this.init(item,this.defaultPageSize);
            },

            workBenchConfig(item) {
                this.$router.push({path:'/base/corp_workBenchConfig',query:{id:item.id}})
            },
            addWorkBench(){
                this.workBenchShow=true
                this.dialogTitle='添加工作台'
            },
            saveWorkBench(){
                let _this=this
                workBenchSave(_this.workBench).then(res=>{
                    _this.$message.success("保存数据成功");
                    _this.init(1,this.defaultPageSize);
                    _this.workBenchShow=false
                }).catch(function (err) {
                    _this.$message.error('保存数据失败');
                    _this.workBenchShow=false
                })
            },
            closeDialog(){
                this.workBenchShow=false
            },
            edit(item){
                this.workBench={
                    id:item.id,
                    name:item.name,
                    type:item.type,
                    spId:item.spId,
                    seq:item.seq,
                    remark:item.remark,
                    status:item.status,
                    flag:item.flag
                }
                this.workBenchShow=true
                this.dialogTitle='编辑工作台'
            },
            del(item){
                var ids=[]
                ids.push(item.id)
                let _this=this
                workBenchDel({ids:ids}).then(res=>{
                    _this.init(1,this.defaultPageSize);
                    _this.$message.success('删除数据成功');
                }).catch(function (err) {
                    _this.$message.error('删除数据失败');
                })
            },
            generatId(id){
                return id
            },
            delBatchWorkBench(){
                var ids=[]
                let _this=this
                $("input[name='chooseIds']").each(function (index,item) {
                    if($(item).is(":checked")){
                        ids.push(parseFloat($(item).prop("id")))
                    }
                })
                if(ids.length<1){
                    _this.$message('请先选择要删除的工作台');
                    return;
                }
                workBenchDel({ids:ids}).then(res=>{
                    _this.init(1,this.defaultPageSize);
                    _this.$message.success('删除数据成功');
                }).catch(function (err) {
                    _this.$message.error('删除数据失败');
                })
            }

        },
        created () {
            this.init(1,this.defaultPageSize);
        },
        components: {
            NavBar
        }
    }

</script>
