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
                <el-button type="warning" @click="colSetting"><i class="el-icon-setting"></i>配置列</el-button>
                <el-table :data="pageParams.data" border class="maintb"  v-loading="loading"
                          :stripe="tableCss.stripe" size="mini"
                          border
                          :cell-style=cellStyle
                          :header-cell-style=headerCellStyle
                          @sort-change="sortChange"
                          @selection-change="handleSelectionChange"
                          >
                    <el-table-column min-width="5%"
                            type="selection">
                    </el-table-column>
                    <el-table-column v-for="item in showsOrgin" :sortable="item.sortable" :prop="item.prop" :label="item.label" :min-width="item.width">
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


        <!--配置 列数据的显示与否-->
        <el-dialog title="字典项列展示选择" :visible.sync="colSettingVisible" size="tiny"
                   @close="closeColSettingDialog" width="550px">
            <template>
                <el-transfer v-model="chShows" :data="nchShows"></el-transfer>
            </template>
            <div style="text-align: center;margin-top: 25px">
                <el-button @click="closeColSettingDialog">取消</el-button>
                <el-button type="primary" @click="saveColSetting">确定</el-button>
            </div>
        </el-dialog>


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
                    padding:6,
                },
                headerCellStyle:{
                  background:"#ededed",
                    fontSize:"18px",
                    fontWeight:"bolder",
                    border:'1px groove #dedede'
                },
                multipleSelection:[],
                shows:[
                    {key:1,prop:'id',label:'编号',sortable:'custom',type:'',orgin:'id',width:'10%'},
                    {key:2,prop:'code',label:'编码',sortable:'custom',type:'',orgin:'code',width:'10%'},
                    {key:3,prop:'name',label:'名称',sortable:'custom',type:'',orgin:'name',width:'10%'},
                    {key:4,prop:'createTimeStr',label:'创建时间',sortable:'custom',type:'date',orgin:'createTime',width:'10%'},
                    {key:5,prop:'createBy',label:'创建人',sortable:'custom',type:'',orgin:'createBy',width:'10%'},
                    {key:6,prop:'modifyTimeStr',label:'修改时间',sortable:'custom',type:'date',orgin:'modifyTime',width:'10%'},
                    {key:7,prop:'modifyBy',label:'修改人',sortable:'custom',type:'',orgin:'modifyBy',width:'10%'}
                ],
                showsOrgin:[
                    {key:1,prop:'id',label:'编号',sortable:'custom',type:'',orgin:'id',width:'10%'}
                ],
                chShows:[],
                nchShows:[],
                colSettingVisible:false,
            }
        },
        methods:{
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
                dictList(_this.pageParams).then(res => {
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
                    res.data.forEach(p => {
                        p.modifyTimeStr = end.getDate_YMDHM(p.modifyTime)
                        p.createTimeStr = end.getDate_YMDHM(p.createTime)
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
            }

        },
        components: {

        },
        watch: {

        },
        created () {
            this.init(1,this.defaultPageSize);
            this.init_chShows();
        }
    }
</script>
<style lang="scss" scoped>
    .addBanner{
        margin-bottom: 6px;
    }
    .maintb{
        overflow-x: auto;
        overflow-y: auto;
        max-height: 460px;
        width: 100%;
    }
</style>