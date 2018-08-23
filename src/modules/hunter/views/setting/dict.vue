<template>
    <section>
        <div class="searchBar">
            <b>字典项编码:</b> <el-input class="search_input w-240" v-model="pageParams.filter.code" placeholder="请输入内容"></el-input>
            <b>字典项名称:</b> <el-input  class="search_input w-240" v-model="pageParams.filter.name" placeholder="请输入内容"></el-input>
            <el-button type="primary" icon="el-icon-search"  @click="searchDict">搜索</el-button>
        </div>

        <div class="tableBox">
            <div class="pageTableContent">
                <el-button type="primary" class="addBanner" @click="addDict"><i class="el-icon-plus"></i>新增</el-button>
                <el-button type="danger" class="addBanner" @click="delBatchDict"><i class="el-icon-delete"></i>批量删除</el-button>
                <el-table :data="pageParams.data" border class="maintb"  v-loading="loading"
                          :stripe="tableCss.stripe" size="mini"
                          border
                          :cell-style=cellStyle
                          :header-cell-style=headerCellStyle
                          @sort-change="sortChange"
                          @selection-change="handleSelectionChange"
                          >
                    <el-table-column min-width="5%"
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column sortable="custom" prop="id" label="编号" min-width="10%">
                    </el-table-column>
                    <el-table-column sortable="custom" prop="code" label="编码" min-width="10%">
                    </el-table-column>
                    <el-table-column sortable="custom" prop="name" label="名称" min-width="10%">
                    </el-table-column>
                    <el-table-column sortable="custom" prop="createBy" label="创建人" min-width="8%">
                    </el-table-column>
                    <el-table-column sortable="custom" prop="createTime" label="创建时间" min-width="8%">
                        <template slot-scope="scope">
                            {{scope.row.createTime?scope.row.createTime:'--'|formatTime('yyyy-MM-dd hh:mm')}}
                        </template>
                    </el-table-column>
                    <el-table-column sortable="custom" prop="modifyBy" label="修改人" min-width="8%">
                    </el-table-column>
                    <el-table-column sortable="custom" prop="" label="修改时间" min-width="8%">
                        <template slot-scope="scope">
                            {{scope.row.modifyTime?scope.row.modifyTime:'--'|formatTime('yyyy-MM-dd hh:mm')}}
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" min-width="15%">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                            <el-button size="mini" type="success" icon="el-icon-view" @click="edit(scope.row)"></el-button>
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

    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {dictList,dictListChildren,dictListAll,dictSave,dictGet,dictDel} from '@/api/api'
    import $ from 'jquery'
    export default{
        data () {
            return {
                defaultPageSize:10,
                loading:false,
                pageParams:{
                    page:1,
                    pageSize:10,
                    totalRows:null,
                    totalPage:null,
                    orderBy:'seq',
                    direction:'asc',
                    filter:{
                        name:null,
                        code:null
                    },
                    data:[]
                },
                tableCss:{
                    stripe:true
                },
                cellStyle:{
                    padding:6
                },
                headerCellStyle:{
                  background:"#ededed",
                    fontSize:"18px",
                    fontWeight:"bolder",
                    border:'1px groove #dedede'
                },
                multipleSelection:[]

            }
        },
        methods:{
            /**
             * 初始化
             * @param page
             * @param pageSize
             */
            init(page,pageSize){
                var _this=this;
                _this.loading=true;
                _this.pageParams.page=page;
                _this.pageParams.pageSize=pageSize;
                console.log(_this.pageParams)
                dictList(_this.pageParams).then(res => {
                    console.log(res)
                    _this.pageParams=res
                    _this.loading=false;
                });
            },
            /**
             * 初始化
             */
            init(){
                var _this=this;
                _this.loading=true;
                dictList(_this.pageParams).then(res => {
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
            searchDict(){
                this.init(1,this.defaultPageSize)
            },
            /**
             * 新增
             */
            addDict(){
                alert("add")
            },
            /**
             * 编辑
             * @param item
             */
            edit(item){
                alert("edit")
                console.log(item)
            },
            /**
             * 删除
             * @param item
             */
            del(item){
                this.multipleSelection=[]
                this.multipleSelection.push(item.id)
                this.delBatchDict()
            },
            /**
             * pageSize更改
             *
             */
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
            /**
             * 批量删除
             */
            delBatchDict(){
                let _this=this
                this.$confirm('此操作将永久删除该字典项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    dictDel({ids:_this.multipleSelection}).then(p=>{
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
            /**
             * 重新排序
             * @param column
             */
            sortChange(column){
                let _this=this
                _this.pageParams.orderBy=column.prop
                _this.pageParams.direction=column.order=="descending"?"desc":"asc"
                _this.init();
            },

        },
        components: {

        },
        watch: {

        },
        created () {
            this.init(1,this.defaultPageSize);
        }
    }
</script>
<style lang="scss" scoped>
    .addBanner{
        margin-bottom: 6px;
    }
    .maintb{
        overflow-y: auto;
        max-height: 460px;
        width: 100%;
    }
</style>