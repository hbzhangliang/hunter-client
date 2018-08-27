<template>
    <section>
        <div class="searchBar">
            <b>职位编码:</b> <el-input class="search_input w-240" v-model="pageParams.filter.code" placeholder="请输入内容"></el-input>
            <b>职位名称:</b> <el-input  class="search_input w-240" v-model="pageParams.filter.name" placeholder="请输入内容"></el-input>
            <el-button type="primary" icon="el-icon-search"  @click="searchPosition" size="small">搜索</el-button>
        </div>

        <div class="tableBox">
            <div class="pageTableContent">
                <el-button type="primary" size="mini" class="addBanner" @click="addPosition"><i class="el-icon-plus"></i>新增</el-button>
                <el-button type="danger" size="mini" class="addBanner" @click="delBatchPosition"><i class="el-icon-delete"></i>批量删除</el-button>
                <el-button type="warning" size="mini" @click="colSetting"><i class="el-icon-setting"></i>配置列</el-button>
                <el-table :data="pageParams.data" border v-loading="loading"
                          :stripe="tableCss.stripe" size="mini"
                          border
                          :cell-style=cellStyle
                          :row-style=rowStyle
                          :header-cell-style=headerCellStyle
                          height="560"
                          max-height="580"
                          @sort-change="sortChange"
                          @selection-change="handleSelectionChange"
                >
                    <el-table-column width="60"
                                     fixed
                                     type="selection">
                    </el-table-column>

                    <el-table-column sortable="custom" prop="id" label="编号" align="center" width="100">
                    </el-table-column>
                    <el-table-column sortable="custom" prop="code" label="编码" align="center" min-width="120">
                        <template scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.code"></el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.code }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable="custom" prop="name" label="名称" align="center" min-width="140">
                        <template scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable="custom" prop="remark" label="备注" align="center" min-width="160">
                        <template scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.remark"></el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.remark }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable="custom" prop="seq" label="排序号" align="center" min-width="100">
                        <template scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.seq"></el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.seq }}</span>
                        </template>
                    </el-table-column>



                    <el-table-column v-for="item in showsOrgin" :sortable="item.sortable" :prop="item.prop" :label="item.label" :width="item.width">
                    </el-table-column>
                    <el-table-column  label="操作" width="240" fixed="right">
                        <template slot-scope="scope">
                            <el-button v-if="!scope.row.edit" size="mini" type="primary" icon="el-icon-edit" @click="editInner(scope.row)"></el-button>
                            <el-button v-if="scope.row.edit" size="mini" type="success" icon="el-icon-check" @click="saveInner(scope.row)"></el-button>
                            <el-button v-if="scope.row.edit" size="mini" type="info" icon="el-icon-close" @click="cancelInner(scope.row)"></el-button>

                            <el-button size="mini" type="primary" icon="el-icon-edit-outline" @click="edit(scope.row)"></el-button>
                            <el-button size="mini" type="success" icon="el-icon-view" @click="view(scope.row)"></el-button>
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="block">
            <span class="demonstration"></span>
            <el-pagination v-if="pageParams.totalRows"
                           @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
                           :current-page.sync="pageParams.page"
                           :page-sizes="[10, 20, 50, 100,200]"
                           :page-size="pageParams.pageSize"
                           layout="total,sizes,prev, pager, next, jumper"
                           :total="pageParams.totalRows">
            </el-pagination>
        </div>


        <!--配置 列数据的显示与否-->
        <el-dialog title="字典项列展示选择" :visible.sync="colSettingVisible" size="tiny"
                   @close="closeColSettingDialog" width="550px">
            <template>
                <el-transfer v-model="chShows" :data="nchShows"></el-transfer>
            </template>
            <div style="text-align: center;margin-top: 25px">
                <el-button size="mini" @click="closeColSettingDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button size="mini" type="primary" @click="saveColSetting" icon="el-icon-success">确定</el-button>
            </div>
        </el-dialog>




        <el-dialog title="职位信息编辑" :visible.sync="positionVisible" size="tiny"
                   @close="closePositionDialog">
            <el-row>
                <el-col :span="24"><div class="grid-content bg-header">
                    <label style="float:left;">职位信息</label>
                </div></el-col>
            </el-row>

            <el-form  size="small">
                <el-form-item label="编号" class="hidden">
                    <el-input v-model="positionBean.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">编码：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="positionBean.code" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="positionBean.name" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">备注：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="positionBean.remark" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">排序号：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="positionBean.seq" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">状态：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="positionBean.status" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>
            </el-form>

            <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;" v-if="strOp!='view'">
                <el-button size="mini" @click="closePositionDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button size="mini" type="primary" @click="savePosition" icon="el-icon-success">确定</el-button>
            </div>

        </el-dialog>
    </section>
</template>
<script>

    import end from '@/common/js/utils.js'
    import {positionList,positionListAll,positionSave,positionGet,positionDel} from '@/api/api'
    import $ from 'jquery'
    export default {
        data() {
            return {
                defaultPageSize: 10,
                loading: false,
                pageParams: {
                    page: 1,
                    pageSize: 10,
                    totalRows: null,
                    totalPage: null,
                    orderBy: 'seq',
                    direction: 'asc',
                    filter: {
                        name: null,
                        code: null
                    },
                    data: []
                },
                tableCss: {
                    stripe: true
                },
                cellStyle: {
                    padding: 6
                },
                rowStyle: {},
                headerCellStyle: {
                    background: "#ededed",
                    fontSize: "18px",
                    fontWeight: "bolder",
                    border: '1px groove #dedede'
                },
                childheaderCellStyle: {
                    background: "#c9E5FF",
                    fontSize: "18px",
                    fontWeight: "bolder",
                    border: '1px groove #dedede'
                },
                multipleSelection: [],
                shows: [
                    {
                        key: 6,
                        prop: 'createTimeStr',
                        label: '创建时间',
                        sortable: 'custom',
                        type: 'date',
                        orgin: 'createTime',
                        width: '180'
                    },
                    {
                        key: 7,
                        prop: 'createBy',
                        label: '创建人',
                        sortable: 'custom',
                        type: '',
                        orgin: 'createBy',
                        width: '120'
                    },
                    {
                        key: 8,
                        prop: 'modifyTimeStr',
                        label: '修改时间',
                        sortable: 'custom',
                        type: 'date',
                        orgin: 'modifyTime',
                        width: '180'
                    },
                    {
                        key: 9,
                        prop: 'modifyBy',
                        label: '修改人',
                        sortable: 'custom',
                        type: '',
                        orgin: 'modifyBy',
                        width: '120'
                    }
                ],
                showsOrgin: [],
                chShows: [],
                nchShows: [],
                colSettingVisible: false,
                positionVisible: false,
                positionBean: {
                    id: null,
                    code: null,
                    name: null,
                    remark: null,
                    seq: null,
                    status: null,
                    flag: null
                },
                strOp: null
            }
        },
        methods: {
            init_chShows(){
                let _this=this
                this.showsOrgin.forEach(p=>{
                    _this.chShows.push(p.key)
                })
                this.shows.forEach(p=>{
                    let b=false
                    _this.showsOrgin.forEach(v=>{
                        if(p.key==v){
                            b=true
                        }
                    })
                    if(!b){
                        _this.nchShows.push(p)
                    }
                })
            },
            init(page,pageSize){
                var _this=this;
                _this.loading=true;
                _this.pageParams.page=page;
                _this.pageParams.pageSize=pageSize;
                positionList(_this.pageParams).then(res => {
                    res.data.forEach(p => {
                        p.modifyTimeStr = end.getDate_YMDHM(p.modifyTime)
                        p.createTimeStr = end.getDate_YMDHM(p.createTime)
                        p.edit=false
                    })
                    _this.pageParams=res
                    _this.loading=false;
                });
            },
            init(){
                var _this=this;
                _this.loading=true;
                positionList(_this.pageParams).then(res => {
                    res.data.forEach(p => {
                        p.modifyTimeStr = end.getDate_YMDHM(p.modifyTime)
                        p.createTimeStr = end.getDate_YMDHM(p.createTime)
                        p.edit=false
                    })
                    _this.pageParams=res
                    _this.loading=false;
                });
            },
            /**
             * 修改页码
             * @param item
             */
            handleCurrentChange(item){
                this.init(item,this.defaultPageSize)
            },
            /**
             * 检索
             */
            searchPosition(){
                this.init(1,this.defaultPageSize)
            },
            /**
             * 新增
             */
            addPosition(){
                this.positionBean={
                    id:null,
                    code:null,
                    name:null,
                    remark:null,
                    seq:null,
                    status:null,
                    flag:null
                }
                this.positionVisible=true
                this.strOp='add'
            },
            edit(item){
                let _this=this
                positionGet({id:item.id}).then(p=>{
                    _this.positionBean=p
                })
                this.positionVisible=true
                this.strOp='edit'
            },
            view(item){
                this.edit(item)
                this.strOp='view'
            },
            del(item){
                this.multipleSelection=[]
                this.multipleSelection.push(item.id)
                this.delBatchPosition()
            },
            handleSizeChange(count){
                this.pageParams.pageSize=count
                this.init();
            },
            /**
             * 批量删除的选择
             * @param val
             */
            handleSelectionChange(val){
                let _this=this
                var delIds=[]
                val.forEach(p=>{
                    delIds.push(p.id)
                })
                _this.multipleSelection=delIds
            },
            delBatchPosition(){
                let _this=this
                if(_this.multipleSelection==null||_this.multipleSelection.length<1){
                    _this.$message({
                        message: '请先选择需要删除的字典项',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('此操作将永久删除该字典项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    positionDel({ids:_this.multipleSelection}).then(p=>{
                        _this.$message({
                            message: '删除字典数据成功',
                            type: 'success'
                        });
                        _this.init()
                    }).catch(function (error) {
                        _this.$message.error('后端错误:'+error.message);
                    })
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            sortChange(column){
                let _this=this
                _this.shows.forEach(p=>{
                    if(p.prop==column.prop){
                        _this.pageParams.orderBy=p.orgin
                    }
                })
                _this.pageParams.direction=column.order=="descending"?"desc":"asc"
                _this.init();
            },
            colSetting(){
                this.colSettingVisible=true
            },
            closeColSettingDialog(){
                this.colSettingVisible=false
            },
            saveColSetting(){
                console.log(this.chShows)
                let _this=this
                _this.showsOrgin=[]
                _this.chShows.forEach(p=>{
                    _this.shows.forEach(v=>{
                        if(p==v.key){
                            _this.showsOrgin.push(v)
                        }
                    })
                })
                _this.colSettingVisible=false
            },
            closePositionDialog(){
                this.positionVisible=false
            },
            savePosition(){
                let _this=this
                positionSave(_this.positionBean).then(p=>{
                    _this.$message({
                        message: '保存字典数据成功',
                        type: 'success'
                    });
                    _this.positionVisible=false
                    _this.init()
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            editInner(item){
                this.pageParams.data.forEach(p=>{
                    if(p.id==item.id){
                        p.edit=true
                    }
                })
            },
            cancelInner(item){
                this.pageParams.data.forEach(p=>{
                    if(p.id==item.id){
                        p.edit=false
                    }
                })
            },
            saveInner(item){
                let _this=this
                positionSave(item).then(p=>{
                    _this.$message({
                        message: '保存字典数据成功',
                        type: 'success'
                    });
                    _this.init()
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
        },
        components: {},
        watch: {},
        created() {
            this.init();
            this.init_chShows();
        }
    }
</script>
<style lang="scss" scoped>
    .addBanner{
        margin-bottom: 6px;
    }
</style>
