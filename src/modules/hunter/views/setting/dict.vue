<template>
    <section>
        <div class="searchBar">
            <b>字典项编码:</b> <el-input class="search_input w-240" v-model="pageParams.filter.code" placeholder="请输入内容"></el-input>
            <b>字典项名称:</b> <el-input  class="search_input w-240" v-model="pageParams.filter.name" placeholder="请输入内容"></el-input>
            <el-button type="primary" icon="el-icon-search"  @click="searchDict">搜索</el-button>
        </div>

        <div class="tableBox">
            <div class="pageTableContent">
                <el-button type="primary" class="addBanner" @click="addDict"><i class="el-icon-plus"></i>新增字典项</el-button>
                <el-table :data="pageParams.data" border width="100%" v-loading="loading"
                          :stripe="tableCss.stripe" size="mini"
                          border
                          :cell-style=cellStyle
                          @sort-change="sortChange"
                          >
                    <el-table-column sortable="custom" prop="id" label="编号" min-width="10%">
                    </el-table-column>
                    <!--<el-table-column prop="parentId" label="parentId" min-width="10%">-->
                    <!--</el-table-column>-->
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
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="edit(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="block">
            <span class="demonstration"></span>
            <el-pagination v-if="pageParams.totalRows"
                           @current-change="handleCurrentChange"
                           :current-page.sync="pageParams.page"
                           :page-size="pageParams.pageSize"
                           layout="prev, pager, next, jumper"
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
                }

            }
        },
        methods:{
            init(page,pageSize){
                var _this=this;
                _this.loading=true;
                _this.pageParams.page=page;
                _this.pageParams.pageSize=pageSize;
                dictList(_this.pageParams).then(res => {
                    _this.pageParams=res
                    console.log(res)
                    // _this.dictData=res.data;
                    // _this.pageParams.totalRows=res.totalRows;
                    // _this.pageParams.totalPage=res.totalPage;
                    _this.loading=false;
                });
            },
            init(){
                var _this=this;
                _this.loading=true;
                dictList(_this.pageParams).then(res => {
                    _this.pageParams=res
                    _this.loading=false;
                });
            },
            handleCurrentChange(item){
                this.init(item,this.defaultPageSize)
            },
            searchDict(){
                this.init(1,this.defaultPageSize)
            },
            addDict(){
                alert("add")
            },
            edit(item){
                alert("edit")
                console.log(item)
            },
            sortChange(column){
                let _this=this
                _this.pageParams.orderBy=column.prop
                _this.pageParams.direction=column.order=="descending"?"desc":"asc"
                _this.init();
            }

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
    .table_row{
        line-height: 20px;
        height: 20px;
    }
</style>