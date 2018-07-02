<template>
    <div>

        <template>
        <div class="tableBox">
            <div class="pageTableContent">
                <el-button type="primary" class="addBanner" @click="addWorkBench"><i class="el-icon-plus"></i>新增工作台</el-button>

                <el-button type="primary" @click="publishWorkBench"><i class="el-icon-edit-outline"></i>发布工作台</el-button>

                <el-table :data="tableData" border width="100%" v-loading="isBusy" style="margin-top: 5px;">
                    <el-table-column label="选择" width="60px">
                        <template slot-scope="scope">
                            <input type="radio" name="radioCh" @click="checkBench(scope.row.id)"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="编号" width="80px">
                    </el-table-column>
                    <el-table-column prop="name" label="名称" width="180px">
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" width="150px">
                    </el-table-column>
                    <el-table-column prop="seq" label="排序号" width="80px">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="80px">
                        <template slot-scope="scope">
                            <a v-if="scope.row.status=='publish'" style="color: green;font-size: large">发布</a>
                            <a v-else>保存</a>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" width="289px">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.row)">修改</el-button>
                            <el-button type="text" @click="view(scope.row)">查看</el-button>
                            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
                            <el-button type="text" @click="copy(scope.row.id)">复制</el-button>
                            <el-button type="text" @click="module(scope.row.id)">模块管理</el-button>
                            <el-button type="text" @click="prewView(scope.row.id)">预览</el-button>
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



            <!--弹出框-->
            <el-dialog custom-class="info" title="工作台管理" :visible.sync="moduleVisible" size="tiny"
                       @close="closeDialog">
                <div class="modalContent">
                    <div class="demo-input-suffix">
                        名称:<el-input v-model="temp.name" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <!--<div class="demo-input-suffix">-->
                        <!--类型:<el-input v-model="temp.type" placeholder="请输入内容" size="medium"></el-input>-->
                    <!--</div>-->
                    <div class="demo-input-suffix">
                        排序号:<el-input v-model="temp.seq" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <div class="demo-input-suffix">
                        备注:<el-input v-model="temp.remark" placeholder="请输入内容" size="medium"></el-input>
                    </div>
                    <!--<div class="demo-input-suffix">-->
                        <!--状态:<el-input v-model="temp.status" placeholder="请输入内容" size="medium"></el-input>-->
                    <!--</div>-->
                    <!--</div>-->
                    <div style="text-align: center;margin-top: 10px" v-if="viewMode==false">
                        <el-button @click="closeDialog">取消</el-button>
                        <el-button type="primary" @click="saveWorkBench">确定</el-button>
                    </div>
                    <div style="text-align: center;margin-top: 10px" v-else>
                        <el-button @click="closeDialog">取消</el-button>
                    </div>
                </div>
            </el-dialog>


        </template>


    </div>
</template>


<script>

    import {bizWorkbenchList,getBizWorkbench,saveBizWorkbench,delBizWorkbench,changePublishBizWorkbench} from '@/api/api'
    import {mapState} from 'vuex'
    export default {
        data: function () {
            return {
                tableData:[],
                temp:{
                    id:null,
                    name:null,
                    type:null,
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
                        name:null,
                        type:null
                    }
                },

                moduleVisible:false,
                defaultPageSize:10,
                publishWorkBenchId:null,
                isBusy: false,
                viewMode:false

            }
        },
        methods: {
            init(page,pageSize){
                //初始化时设置发布版本为空
                this.publishWorkBenchId=null
                this.viewMode=false

                console.log("appId is"+this.appId+",spId is"+this.spId)
                var _this=this;
                _this.isBusy=true;
                _this.tableData=[];
                _this.PageForm.page=page;
                _this.PageForm.pageSize=pageSize;
                _this.PageForm.params={"appId":_this.appId,"spId":_this.spId}
                bizWorkbenchList(_this.PageForm).then(res => {
                    _this.tableData=res.data;
                    _this.PageForm.totalRows=res.tatalRows;
                    _this.PageForm.totalPage=res.totalPage;
                    _this.isBusy=false;
                });
            },
            handleCurrentChange(item){
                this.init(item,this.defaultPageSize);
            },
            edit(item){
                this.temp.id=item.id
                this.temp.name=item.name
                this.temp.type=item.type
                this.temp.seq=item.seq
                this.temp.remark=item.remark
                this.temp.status=item.status
                this.temp.appId=this.appId
                this.temp.spId=this.spId
                this.temp.flag=item.flag
                this.moduleVisible = true
                $(".modalContent input").removeAttr("readonly");
                this.viewMode=false
            },
            view(item){
                this.edit(item);
                $(".modalContent input").attr("readonly","readonly");
                this.viewMode=true
            },
            del(id){
                this.$confirm('确认删除？')
                    .then(res => {
                        delBizWorkbench({id}).then(res => {
                            this.$message(res)
                            this.moduleVisible = false
                            this.init(1,this.defaultPageSize);
                        })
                    });
            },
            copy(id){
                console.log(id)
            },
            prewView(id){
                console.log(id)
            },
            saveWorkBench(){
                saveBizWorkbench(this.temp).then(() => {
                    this.$message.success('保存成功')
                    this.moduleVisible = false
                    this.init(1,this.defaultPageSize);
                })
            },
            closeDialog(){
                this.moduleVisible = false
            },
            module(id){
                this.$router.push({path: 'AppManage/AppConfig/moduleList',name:'moduleList',params:{workbenchId:id}});
            },
            addWorkBench(){
                this.temp.id=null
                this.temp.name=null
                this.temp.type=null
                this.temp.seq=null
                this.temp.remark=null
                this.temp.status=null
                this.temp.appId=this.appId
                this.temp.spId=this.spId
                this.temp.flag=true
                this.moduleVisible = true
                $(".modalContent input").removeAttr("readonly");
            },
            checkBench(id){
                this.publishWorkBenchId=id
            },
            publishWorkBench(){
                var _this =this
                if(this.publishWorkBenchId==null){
                    _this.$message('请先选择需要发布的工作台')
                }
                else {

                    _this.$confirm('此操作将会设置发布版本工作台编号：'+_this.publishWorkBenchId+', 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //调用成功
                        changePublishBizWorkbench({id:_this.publishWorkBenchId}).then(res=>{
                            this.$message({
                                type: 'success',
                                message: res
                            });

                            this.init(1,this.defaultPageSize)
                        })


                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });

                }
            }
        },
        components: {},
        computed: {
            ...mapState(["spId", "appId"])
        },
        mounted(){
            this.init(1,this.defaultPageSize);
        }
    }


</script>

<style>

    .hidden{
        display:none;
    }
</style>