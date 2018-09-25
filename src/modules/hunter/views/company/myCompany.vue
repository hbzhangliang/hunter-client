<template>
    <section>
        <div class="searchBar">
            <el-form  size="small">
                <el-row>
                    <el-col :span="4"><div class="sh-grid-content sh-bg-left">
                        <label class="lb-left">名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="sh-grid-content sh-bg-right">
                        <el-input v-model="pageParams.params.lk_name" class="w-240" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>
            </el-form>

            <el-button type="primary" icon="el-icon-search"  @click="search" size="small">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh"  @click="reset" size="small">重置</el-button>
        </div>

        <div class="tableBox">
            <div class="pageTableContent">
                <el-button type="primary" size="mini" class="addBanner" @click="add"><i class="el-icon-plus"></i>新增</el-button>
                <el-button type="danger" size="mini" class="addBanner" @click="delBatch"><i class="el-icon-delete"></i>批量删除</el-button>
                <el-button type="warning" size="mini" @click="colSetting"><i class="el-icon-setting"></i>配置列</el-button>
                <el-table :data="pageParams.data" border v-loading="loading"
                          :stripe="tableCss.stripe" size="mini"
                          border
                          :cell-style=cellStyle
                          :row-style=rowStyle
                          :header-cell-style=headerCellStyle
                          height="500"
                          max-height="520"
                          @sort-change="sortChange"
                          @selection-change="handleSelectionChange">
                    <el-table-column width="50"
                                     fixed
                                     type="selection">
                    </el-table-column>

                    <el-table-column sortable="custom" prop="type" label="类型" align="center" min-width="120">
                        <template scope="scope">
                            <span v-for="item in dictMap.CorpType" v-if="item.code==scope.row.type">{{item.name}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column sortable="custom" prop="mtype" label="类别" align="center" min-width="120">
                        <template scope="scope">
                            <span v-for="item in dictMap.CorpMtype" v-if="item.code==scope.row.mtype">{{item.name}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column sortable="custom" prop="finance" label="融资情况" align="center" min-width="120">
                        <template scope="scope">
                            <span v-for="item in dictMap.CorpFinace" v-if="item.code==scope.row.finance">{{item.name}}</span>
                        </template>
                    </el-table-column>


                    <el-table-column v-for="item in showsOrgin" :sortable="item.sortable" :prop="item.prop" :label="item.label" :width="item.width">
                    </el-table-column>
                    <el-table-column  label="操作" width="228" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit-outline" @click="edit(scope.row)"></el-button>
                            <el-button size="mini" type="success" icon="el-icon-view" @click="view(scope.row)"></el-button>
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row)"></el-button>
                            <!--<el-dropdown @command="setting">-->
                                <!--<el-button size="mini" type="warning" icon="el-icon-setting">-->
                                <!--</el-button>-->
                                <!--<el-dropdown-menu slot="dropdown">-->
                                    <!--<el-dropdown-item :command="generateComd('shareDoc',scope.row)">分享到文件夹</el-dropdown-item>-->
                                    <!--<el-dropdown-item>狮子头</el-dropdown-item>-->
                                    <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                                    <!--<el-dropdown-item>双皮奶</el-dropdown-item>-->
                                    <!--<el-dropdown-item>蚵仔煎</el-dropdown-item>-->
                                <!--</el-dropdown-menu>-->
                            <!--</el-dropdown>-->
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
        <el-dialog title="公司项列展示选择" :visible.sync="colSettingVisible" size="tiny"
                   @close="closeColSettingDialog" width="550px">
            <template>
                <el-transfer v-model="chShows" :data="nchShows"></el-transfer>
            </template>
            <div style="text-align: center;margin-top: 25px">
                <el-button size="mini" @click="closeColSettingDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button size="mini" type="primary" @click="saveColSetting" icon="el-icon-success">确定</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
    import {companyGetVo,companyGet,companyList,companyListPage,companyListAll,companyDel,tcompanyAdminDel,companySave,
        dictListChildrenByCodes,utilTree} from '@/api/api'
    import $ from 'jquery'
    import end from '@/common/js/utils.js'
    export default {
        data:function () {
            return{
                loading: false,
                defaultPageSize: 10,
                pageParams:{
                    page: 1,
                    pageSize: 10,
                    totalRows: null,
                    totalPage: null,
                    orderBy: 'id',
                    direction: 'desc',
                    params: {
                        eq_delStatus:"Normal",
                        lk_name: null
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
                    {key: 1, prop: 'name', label: '名称', sortable: 'custom', type: '', orgin: 'type', width: '100'},
                    {key: 2, prop: 'shortName', label: '简称', sortable: 'custom', type: '', orgin: 'avatar', width: '120'},
                    {key: 3, prop: 'business', label: '行业', sortable: 'custom', type: '', orgin: 'engName', width: '120'},
                    {key: 4, prop: 'city', label: '城市', sortable: 'custom', type: '', orgin: 'name', width: '120'},
                    {key: 5, prop: 'introduce', label: '介绍', sortable: 'custom', type: '', orgin: 'city', width: '120'},
                    {key: 6, prop: 'status', label: '状态', sortable: 'custom', type: '', orgin: 'status', width: '120'},
                    {key: 7, prop: 'flag', label: '状态位', sortable: 'custom', type: '', orgin: 'flag', width: '120'},
                    {key: 8, prop: 'createTimeStr', label: '创建时间', sortable: 'custom', type: 'date', orgin: 'createTime', width: '120'},
                    {key: 9, prop: 'createBy', label: '创建人', sortable: 'custom', type: '', orgin: 'createBy', width: '120'},
                    {key: 10, prop: 'modifyTimeStr', label: '修改时间', sortable: 'custom', type: 'date', orgin: 'modifyTime', width: '120'},
                    {key: 11, prop: 'modifyBy', label: '修改人', sortable: 'custom', type: '', orgin: 'modifyBy', width: '120'}
                ],
                showsOrgin: [
                    {key: 1, prop: 'name', label: '名称', sortable: 'custom', type: '', orgin: 'type', width: '100'},
                    {key: 2, prop: 'shortName', label: '简称', sortable: 'custom', type: '', orgin: 'avatar', width: '120'},
                    {key: 3, prop: 'business', label: '行业', sortable: 'custom', type: '', orgin: 'engName', width: '120'},
                ],
                chShows: [],
                nchShows: [],
                colSettingVisible: false,

                bean:{

                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dictMap:{
                    CorpType:[],
                    CorpMtype:[],
                    CorpFinace:[]
                },
                treeMap:{
                    BusinessTree:[],
                    CityTree:[],
                    ShareTree:[]
                },


            }
        },
        methods:{
            initDictMap(){
                let _this=this
                var d=["CorpType","CorpMtype","CorpFinace"]
                dictListChildrenByCodes({"codes":d}).then(p=>{
                    _this.dictMap=p
                    console.log(p)
                })
            },
            initTreeMap(){
                let _this=this
                var d=["BusinessTree","CityTree","ShareTree"]
                utilTree({"codes":d}).then(p=>{
                    _this.treeMap=p
                })
            },
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
                companyList(_this.pageParams).then(res => {
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
                companyList(_this.pageParams).then(res => {
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
             *
             * 重置
             * */
            reset(){
                this.pageParams.params={
                    lk_name: null
                }
            },
            /**
             * 检索
             */
            search(){
                this.init(1,this.defaultPageSize)
            },
        },
        components: {},
        computed: {},
        created() {
            this.init()
            this.init_chShows()
            this.initDictMap()
            this.initTreeMap()
        }
    }
</script>
<style lang="scss" scoped>

</style>
