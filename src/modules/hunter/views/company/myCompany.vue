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

                    <el-table-column sortable="custom" prop="type" label="类型" align="center" min-width="80">
                        <template scope="scope">
                            <span v-for="item in dictMap.CorpType" v-if="item.code==scope.row.type">{{item.name}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column sortable="custom" prop="mtype" label="类别" align="center" min-width="80">
                        <template scope="scope">
                            <span v-for="item in dictMap.CorpMtype" v-if="item.code==scope.row.mtype">{{item.name}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column sortable="custom" prop="finance" label="融资情况" align="center" min-width="80">
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
                            <el-dropdown @command="setting">
                                <el-button size="mini" type="warning" icon="el-icon-setting">
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="generateComd('shareDoc',scope.row)">分享到文件夹</el-dropdown-item>
                                    <el-dropdown-item>狮子头</el-dropdown-item>
                                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item>双皮奶</el-dropdown-item>
                                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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


        <el-dialog title="公司信息编辑" :visible.sync="visible" size="tiny"
                   @close="closeDialog">
            <el-dialog
                    size="tiny"
                    width="30%"
                    title="城市选择"
                    :visible.sync="innerVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree city-tree"
                        :data="treeMap.CityTree"
                        :props="defaultProps"
                        show-checkbox
                        node-key="id"
                        ref="tree2">
                </el-tree>
                <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                    <el-button size="mini" @click="closeInnerDialog" icon="el-icon-circle-close-outline">取消</el-button>
                    <el-button size="mini" type="primary" @click="chooseInnerCity" icon="el-icon-success">确定</el-button>
                </div>
            </el-dialog>


            <el-dialog
                    size="tiny"
                    width="30%"
                    title="行业选择"
                    :visible.sync="innerBusinessVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree city-tree"
                        :data="treeMap.BusinessTree"
                        :props="defaultProps"
                        node-key="id"
                        show-checkbox
                        ref="businessTree">
                </el-tree>
                <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                    <el-button size="mini" @click="closeInnerBusinessDialog" icon="el-icon-circle-close-outline">取消</el-button>
                    <el-button size="mini" type="primary" @click="chooseInnerBusiness" icon="el-icon-success">确定</el-button>
                </div>
            </el-dialog>


            <el-dialog
                    size="tiny"
                    width="30%"
                    title="共享选择"
                    :visible.sync="innerShareVisible"
                    append-to-body>
                <el-tree
                        class="filter-tree tag-tree"
                        :data="treeMap.ShareTree"
                        node-key="value"
                        show-checkbox
                        :default-checked-keys="defaultShareKeys"
                        ref="shareList">
                </el-tree>
                <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                    <el-button size="mini" @click="closeInnerShareDialog" icon="el-icon-circle-close-outline">取消</el-button>
                    <el-button size="mini" type="primary" @click="chooseInnerShare" icon="el-icon-success">确定</el-button>
                </div>
            </el-dialog>


            <el-form  size="small">

                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">类型</label>
                    </div></el-col>
                </el-row>

                <el-form-item label="编号" class="hidden">
                    <el-input v-model="bean.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">公司类型：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-radio-group v-model="bean.type">
                            <el-radio v-for="item in dictMap.CorpType" :label="item.code">{{item.name}}</el-radio>
                        </el-radio-group>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">子母公司：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-radio-group v-model="bean.mtype">
                            <el-radio v-for="item in dictMap.CorpMtype" :label="item.code">{{item.name}}</el-radio>
                        </el-radio-group>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">基本信息</label>
                    </div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.name" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">简称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.shortName" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">行业：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpBusinessName" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                        <el-button size="mini" type="primary" @click="businessChoose" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">城市：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.tmpCityName" placeholder="请输入内容" size="medium" readonly="true"></el-input>
                        <el-button size="mini" type="primary" @click="cityChoose" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">融资情况：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-radio-group v-model="bean.finance">
                            <el-radio v-for="item in dictMap.CorpFinace" :label="item.code">{{item.name}}</el-radio>
                        </el-radio-group>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">共享方式：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-button size="mini" type="primary" @click="shareChoose" icon="el-icon-setting">选择</el-button>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="24"><div class="grid-content bg-header">
                        <label style="float:left;">公司介绍</label>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">公司简介：</label>
                    </div></el-col>
                    <el-col :span="20"><div class="grid-content bg-right">
                        <el-input v-model="bean.introduce" placeholder="请输入内容" size="medium" ></el-input>
                    </div></el-col>
                </el-row>
            </el-form>
            <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                <el-button size="mini" @click="closeDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button v-if="strOp!='view'" size="mini" type="primary" @click="save" icon="el-icon-success">确定</el-button>
            </div>

        </el-dialog>


        <!--doc文档数据-->
        <el-dialog
                size="tiny"
                width="30%"
                title="选择分享到的文件夹"
                :visible.sync="shareDocVisible">
            <el-tree
                    class="filter-tree city-tree"
                    :data="shareDocList"
                    :props="defaultProps"
                    show-checkbox
                    node-key="id"
                    ref="shareDoc">
            </el-tree>
            <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                <el-button size="mini" @click="closeShareDocDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button size="mini" type="primary" @click="chooseShareDocDialog" icon="el-icon-success">确定</el-button>
            </div>
        </el-dialog>



    </section>
</template>
<script>
    import {companyGetVo,companyGet,companyList,companyListPage,companyListAll,companyDel,companyAdminDel,companySave,
        dictListChildrenByCodes,utilTree,
        docListOwnerFront,
        companyDocAddShare,companyDocsByCompanyId} from '@/api/api'
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
                    id:null,
                    type:null,
                    mtype:null,
                    parentId:null,
                    name:null,
                    owner:null,
                    shortName:null,
                    tmpBusinessId:null,
                    tmpBusinessName:null,
                    business:null,
                    tmpCityId:null,
                    tmpCityName:null,
                    city:null,
                    finance:null,
                    introduce:null,
                    delStatus:null,
                    flag:null,
                    status:null,
                },
                innerBusinessVisible:false,
                innerShareVisible:false,
                innerVisible:false,
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
                visible: false,
                strOp: null,

                shareDocVisible:false,
                shareDocList:[],
                editCompany:null,
                defaultShareDocIds:[]
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
            add() {
                this.bean = {
                    id:null,
                    type:null,
                    mtype:null,
                    parentId:null,
                    name:null,
                    owner:null,
                    shortName:null,
                    tmpBusinessId:null,
                    tmpBusinessName:null,
                    business:null,
                    tmpCityId:null,
                    tmpCityName:null,
                    city:null,
                    finance:null,
                    introduce:null,
                    delStatus:null,
                    flag:null,
                    status:null,
                }
                this.visible=true
                this.strOp='add'
            },
            edit(item){
                let _this=this
                companyGetVo({id:item.id}).then(p=>{
                    _this.bean=p
                })
                this.visible=true
                this.strOp='edit'
            },
            view(item){
                this.edit(item)
                this.strOp='view'
            },
            del(item){
                this.multipleSelection=[]
                this.multipleSelection.push(item.id)
                this.delBatch()
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
            delBatch(){
                let _this=this
                if(_this.multipleSelection==null||_this.multipleSelection.length<1){
                    _this.$message({
                        message: '请先选择需要删除的人才数据',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('此操作将永久删除该公司数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    companyDel({ids:_this.multipleSelection}).then(p=>{
                        _this.$message({
                            message: '删除人才数据成功',
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
            closeDialog(){
                this.visible=false
            },
            save(){
                let _this=this
                companySave(_this.bean).then(p=>{
                    _this.$message({
                        message: '保存公司数据成功',
                        type: 'success'
                    });
                    _this.visible=false
                    _this.init()
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            cityChoose(){
                let _this=this
                _this.innerVisible=true
                var d = []
                _this.$nextTick(() => {
                    if(null!=_this.bean.tmpCityId) {
                        d=_this.bean.tmpCityId
                    }
                    _this.$refs.tree2.setCheckedKeys(d)

                });
            },
            closeInnerDialog(){
                this.innerVisible=false
            },
            chooseInnerCity(){
                let _this=this
                var length=0
                this.$refs.tree2.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        length++
                    }
                })
                if(length<1){
                    _this.$message({
                        message: '必须最少选择一个城市',
                        type: 'warning'
                    });
                    return;
                }
                _this.bean.city=""
                _this.bean.tmpCityId=[]
                _this.bean.tmpCityName=""
                this.$refs.tree2.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        _this.bean.city+=p.id+","
                        _this.bean.tmpCityId.push(p.id)
                        _this.bean.tmpCityName+=p.name+","
                    }
                })
                this.innerVisible=false
            },
            chooseInnerBusiness(){
                let _this=this
                this.innerBusinessVisible=false
                var lenth=this.$refs.businessTree.getCheckedNodes().length
                if(lenth<1){
                    _this.$message({
                        message: '必须并且只能选择一个行业',
                        type: 'warning'
                    });
                    return;
                }

                _this.bean.tmpBusinessId=[]
                _this.bean.tmpBusinessName=""
                _this.bean.business=""
                this.$refs.businessTree.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        _this.bean.tmpBusinessId.push(p.id)
                        _this.bean.tmpBusinessName+=p.name+","
                        _this.bean.business+=p.id+","
                    }
                })
            },
            businessChoose(){
                let _this=this
                _this.innerBusinessVisible=true
                var d=[]
                _this.$nextTick(() => {
                    if(!(_this.bean.tmpBusinessId==null||_this.bean.tmpBusinessId.length<1)){
                        d=_this.bean.tmpBusinessId
                    }
                    _this.$refs.businessTree.setCheckedKeys(d)
                });
            },
            closeInnerBusinessDialog(){
                this.innerBusinessVisible=false
            },
            shareChoose(){
                let _this=this
                this.innerShareVisible=true
                var d=[]
                _this.$nextTick(() => {
                    if(!(_this.bean.shareCompanyList==null||_this.bean.shareCompanyList.length<1)){
                        _this.bean.shareCompanyList.forEach(p=>{
                            d.push(p.shareType+p.shareValue)
                        })
                    }
                    _this.$refs.shareList.setCheckedKeys(d)
                });
            },
            closeInnerShareDialog(){
                this.innerShareVisible=false
            },
            chooseInnerShare(){
                let _this=this

                var lenth=this.$refs.shareList.getCheckedNodes().length
                if(lenth<1){
                    _this.$message({
                        message: '必须并且只能选择一种共享方式',
                        type: 'warning'
                    });
                    return;
                }
                this.innerShareVisible=false
                this.bean.shareCompanyList=[]
                this.$refs.shareList.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        var tmp={
                            shareType:_this.checkShareType(p.value),
                            shareValue:_this.checkShareValue(p.value),
                            shareLabel:p.label
                        }
                        _this.bean.shareCompanyList.push(tmp)
                    }
                })
            },
            checkShareType(str){
                var types=["account","position","team","all"]
                var result=""
                types.forEach(p=>{
                    if(str.indexOf(p)>-1){
                        result=p
                    }
                })
                return result;
            },
            checkShareValue(str){
                if(str.indexOf("all")>-1){
                    return null
                }
                else {
                    return this.getNumberV(str)
                }
            },
            getNumberV(str){
                return parseInt(str.replace(/[^0-9]/ig,""))
            },



            /**
             * 生成drop的comand
             * @param comd
             * @param item
             * @returns {{key: *, value: *}}
             */
            generateComd(comd,item){
                var obj={
                    key:comd,
                    value:item
                }
                return obj
            },
            //分享到文件夹
            setting(item){
                let _this=this
                switch (item.key){
                    case "shareDoc":{
                        _this.shareDocVisible=true
                        _this.editCompany=item.value
                        _this.initShareDocList()
                    }break;
                }
            },
            initShareDocList(){
                let _this=this
                if(_this.shareDocList==null||_this.shareDocList.length<1) {
                    docListOwnerFront({type:"company"}).then(p => {
                        console.log(p)
                        _this.shareDocList = p

                        companyDocsByCompanyId({id:_this.editCompany.id}).then(q=>{
                            console.log(q)
                            _this.$nextTick(() => {
                                _this.$refs.shareDoc.setCheckedKeys(q)
                            });
                        })
                    })
                }
                else {
                    companyDocsByCompanyId({id:_this.editCompany.id}).then(q=>{
                        console.log(q)
                        _this.$nextTick(() => {
                            _this.$refs.shareDoc.setCheckedKeys(q)
                        });
                    })
                }
            },
            closeShareDocDialog(){
                this.shareDocVisible=false
            },
            chooseShareDocDialog(){
                let _this=this
                var d=[]
                var lenth=this.$refs.shareDoc.getCheckedNodes().length
                if(lenth<1){
                    _this.$message({
                        message: '必须至少选择一个文件夹',
                        type: 'warning'
                    });
                    return;
                }
                this.$refs.shareDoc.getCheckedNodes().forEach(p=>{
                    if(p.leaf){
                        d.push(p.id)
                    }
                })
                companyDocAddShare({companyId:_this.editCompany.id,docIds:d}).then(p=>{
                    _this.$message({
                        message: '共享公司数据到文件夹成功',
                        type: 'success'
                    });
                    _this.shareDocVisible=false
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            }
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
