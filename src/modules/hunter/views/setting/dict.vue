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
                    <el-table-column v-for="item in showsOrgin" :sortable="item.sortable" :prop="item.prop" :label="item.label" :width="item.width">
                    </el-table-column>
                    <el-table-column  label="操作" width="210" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
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
                <el-button @click="closeColSettingDialog">取消</el-button>
                <el-button type="primary" @click="saveColSetting">确定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="字典项编辑" :visible.sync="dicVisible" size="tiny"
                   @close="closedicDialog">
            <el-row>
                <el-col :span="24"><div class="grid-content bg-header">
                    <label style="float:left;">字典项信息</label>
                </div></el-col>
            </el-row>

            <el-form  size="small">
                <el-form-item label="编号" class="hidden">
                    <el-input v-model="dictBean.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">编码：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="dictBean.code" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="dictBean.name" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">父节点：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input disabled v-model="dictBean.parentId" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">排序号：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="dictBean.seq" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">状态：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="dictBean.status" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>
            </el-form>

            <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                <el-button @click="closedicDialog">取消</el-button>
                <el-button type="primary" @click="saveDic">确定</el-button>
            </div>


            <el-row>
                <el-col :span="24"><div class="grid-content bg-header">
                    <label style="float:left;">子项信息</label>
                </div></el-col>
            </el-row>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="addChild"></el-button>
            <el-table :data="childrenData" border
                      :stripe="tableCss.stripe" size="mini"
                      border
                      :cell-style=cellStyle
                      :row-style=rowStyle
                      :header-cell-style=childheaderCellStyle
                      max-height="480" >
                <el-table-column prop="id" label="编号" align="center" min-width="20%">

                </el-table-column>
                <el-table-column prop="code" label="编码" align="center" min-width="20%">
                    <template scope="scope">
                        <el-input v-show="scope.row.edit" size="small" v-model="scope.row.code"></el-input>
                        <span v-show="!scope.row.edit">{{ scope.row.code }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" align="center" min-width="20%">
                    <template scope="scope">
                        <el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
                        <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="seq" label="排序号" align="center" min-width="20%">
                    <template scope="scope">
                        <el-input v-show="scope.row.edit" size="small" v-model="scope.row.seq"></el-input>
                        <span v-show="!scope.row.edit">{{ scope.row.seq }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center" min-width="20%">
                    <template scope="scope">
                        <el-input v-show="scope.row.edit" size="small" v-model="scope.row.status"></el-input>
                        <span v-show="!scope.row.edit">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>

                <el-table-column  label="操作" width="210" fixed="right">
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.edit" size="mini" type="primary" icon="el-icon-edit" @click="editChild(scope.row)"></el-button>
                        <el-button v-if="scope.row.edit" size="mini" type="success" icon="el-icon-check" @click="saveChild(scope.row)"></el-button>
                        <el-button v-if="scope.row.edit" size="mini" type="info" icon="el-icon-close" @click="cancelChild(scope.row)"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delChild(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

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
                    padding:6
                },
                rowStyle:{

                },
                headerCellStyle:{
                  background:"#ededed",
                    fontSize:"18px",
                    fontWeight:"bolder",
                    border:'1px groove #dedede'
                },
                childheaderCellStyle:{
                    background:"#c9E5FF",
                    fontSize:"18px",
                    fontWeight:"bolder",
                    border:'1px groove #dedede'
                },
                multipleSelection:[],
                shows:[
                    {key:1,prop:'id',label:'编号',sortable:'custom',type:'',orgin:'id',width:'120'},
                    {key:2,prop:'code',label:'编码',sortable:'custom',type:'',orgin:'code',width:'180'},
                    {key:3,prop:'name',label:'名称',sortable:'custom',type:'',orgin:'name',width:'250'},
                    {key:4,prop:'createTimeStr',label:'创建时间',sortable:'custom',type:'date',orgin:'createTime',width:'180'},
                    {key:5,prop:'createBy',label:'创建人',sortable:'custom',type:'',orgin:'createBy',width:'120'},
                    {key:6,prop:'modifyTimeStr',label:'修改时间',sortable:'custom',type:'date',orgin:'modifyTime',width:'180'},
                    {key:7,prop:'modifyBy',label:'修改人',sortable:'custom',type:'',orgin:'modifyBy',width:'120'}
                ],
                showsOrgin:[
                    {key:1,prop:'id',label:'编号',sortable:'custom',type:'',orgin:'id',width:'120'},
                    {key:2,prop:'code',label:'编码',sortable:'custom',type:'',orgin:'code',width:'180'},
                    {key:3,prop:'name',label:'名称',sortable:'custom',type:'',orgin:'name',width:'250'},
                    {key:4,prop:'createTimeStr',label:'创建时间',sortable:'custom',type:'date',orgin:'createTime',width:'180'},
                    {key:5,prop:'createBy',label:'创建人',sortable:'custom',type:'',orgin:'createBy',width:'120'},
                    {key:6,prop:'modifyTimeStr',label:'修改时间',sortable:'custom',type:'date',orgin:'modifyTime',width:'180'},
                    {key:7,prop:'modifyBy',label:'修改人',sortable:'custom',type:'',orgin:'modifyBy',width:'120'}
                ],
                chShows:[],
                nchShows:[],
                colSettingVisible:false,
                dicVisible:false,
                dictBean:{
                    id:null,
                    code:null,
                    name:null,
                    parentId:null,
                    seq:null,
                    status:null,
                    flag:null
                },
                childrenData:[]
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
                this.dictBean={
                    id:null,
                    code:null,
                    name:null,
                    parentId:null,
                    seq:null,
                    status:null,
                    flag:null
                }
                this.childrenData=[]
                this.dicVisible=true
            },
            /**
             * 编辑
             * @param item
             */
            edit(item){
                let _this=this
                dictListChildren({pId:item.id+''}).then(p=>{
                    p.forEach(v=>{
                        v.edit=false
                    })
                    _this.childrenData=p
                })
                dictGet({id:item.id}).then(p=>{
                    _this.dictBean=p
                })
                this.dicVisible=true
            },
            view(item){
                alert('view')
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
            },
            closedicDialog(){
                this.dicVisible=false
            },
            saveDic(){
                let _this=this
                dictSave(_this.dictBean).then(p=>{
                    _this.$message({
                        message: '保存字典数据成功',
                        type: 'success'
                    });
                    _this.dicVisible=false
                    _this.init()
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            editChild(item){
                this.childrenData.forEach(p=>{
                    if(p.id==item.id){
                        p.edit=true
                    }
                })
            },
            saveChild(item){
                let _this=this
                dictSave(item).then(p=>{
                    _this.$message({
                        message: '保存字典数据成功',
                        type: 'success'
                    });
                    //再取一遍数据
                    dictListChildren({pId:item.parentId+''}).then(p=>{
                        p.forEach(v=>{
                            v.edit=false
                        })
                        _this.childrenData=p
                    })
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            cancelChild(item){
                this.childrenData.forEach(p=>{
                    if(p.id==item.id){
                        p.edit=false
                    }
                })
            },
            delChild(item){
                let _this=this
                _this.multipleSelection=[]
                _this.multipleSelection.push(item.id)
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

                        var d=[]
                        _this.childrenData.forEach(p=>{
                            if(p.id!=item.id){
                                d.push(p)
                            }
                        })
                        _this.childrenData=d
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
            addChild(){
                let _this=this
                var d=[]
                d.push({
                    id:null,
                    code:null,
                    name:null,
                    parentId:_this.dictBean.id,
                    seq:null,
                    status:null,
                    flag:null,
                    edit:true
                })
                _this.childrenData.forEach(p=>{
                    d.push(p)
                })
                _this.childrenData=d
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
</style>