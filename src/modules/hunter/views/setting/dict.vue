<template>
    <section>
        <div>
            <p style="margin: 5px 2px">
                <b>字典项编码:</b> <el-input class="search_input w-240" v-model="pageParams.filter.code" placeholder="请输入内容"></el-input>
                <b>字典项名称:</b> <el-input  class="search_input w-240" v-model="pageParams.filter.name" placeholder="请输入内容"></el-input>
                <el-button type="primary" icon="el-icon-search"  @click="searchDict">搜索</el-button>
            </p>
        </div>

        <div class="tableBox">
            <div class="pageTableContent">
                <el-button type="primary" class="addBanner" @click="addDict"><i class="el-icon-plus"></i>新增字典项</el-button>
                <el-table :data="pageParams.data" border width="100%" v-loading="loading">
                    <el-table-column prop="id" label="编号" width="180px">
                    </el-table-column>
                    <el-table-column prop="parentId" label="parentId" width="200px">
                    </el-table-column>
                    <el-table-column prop="name" label="name" width="160px">
                    </el-table-column>
                    <el-table-column prop="code" label="code" width="200px">
                    </el-table-column>
                    <el-table-column prop="createBy" label="createBy" width="200px">
                    </el-table-column>
                    <el-table-column prop="createTime" label="createTime" width="100px">
                    </el-table-column>
                    <el-table-column prop="modifyBy" label="modifyBy" width="200px">
                    </el-table-column>
                    <el-table-column prop="modifyTime" label="modifyTime" width="100px">
                    </el-table-column>
                    <el-table-column  label="操作" width="220px">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.row)">修改</el-button>
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
            handleCurrentChange(item){
                this.init(item,this.defaultPageSize);
            },
            searchDict(){
                alert("search")
            },
            addDict(){
                alert("add")
            },
            edit(item){
                alert("edit")
                console.log(item)
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

</style>