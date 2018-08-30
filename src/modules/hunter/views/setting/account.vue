<template>
    <section v-loading="loading">
        <div class="searchBar">
            <el-form  size="small">
                <el-row>
                    <el-col :span="4"><div class="sh-grid-content sh-bg-left">
                        <label class="lb-left">编号：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="sh-grid-content sh-bg-right">
                        <el-input v-model="pageParams.params.eq_id" class="w-240" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="sh-grid-content sh-bg-left">
                        <label class="lb-left">创建时间：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="sh-grid-content sh-bg-right">

                        <el-date-picker
                                v-model="pageParams.params.bt_createTime1"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期起">
                        </el-date-picker>

                        <el-date-picker
                                v-model="pageParams.params.bt_createTime2"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期止">
                        </el-date-picker>

                        <!--<el-input v-model="pageParams.params.bt_createTime1" class="w-200" placeholder="请输入内容" size="medium"></el-input>-->
                        <!--<el-input v-model="pageParams.params.bt_createTime2" class="w-200" placeholder="请输入内容" size="medium"></el-input>-->
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="sh-grid-content sh-bg-left">
                        <label class="lb-left">账号：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="sh-grid-content sh-bg-right">
                        <el-input v-model="pageParams.params.lk_account" class="w-240" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
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
                          @selection-change="handleSelectionChange"
                >
                    <el-table-column width="60"
                                     fixed
                                     type="selection">
                    </el-table-column>

                    <el-table-column sortable="custom" prop="id" label="编号" align="center" width="100">
                    </el-table-column>
                    <el-table-column sortable="custom" prop="account" label="账号" align="center" width="100">
                    </el-table-column>
                    <el-table-column sortable="custom" prop="" label="名称" align="center" min-width="120">
                        <template scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable="custom" prop="" label="昵称" align="center" min-width="120">
                        <template scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.nickName"></el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.nickName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable="custom" prop="" label="英文名" align="center" min-width="120">
                        <template scope="scope">
                            <el-input v-show="scope.row.edit" size="small" v-model="scope.row.engName"></el-input>
                            <span v-show="!scope.row.edit">{{ scope.row.engName }}</span>
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
        <el-dialog title="账号项列展示选择" :visible.sync="colSettingVisible" size="tiny"
                   @close="closeColSettingDialog" width="550px">
            <template>
                <el-transfer v-model="chShows" :data="nchShows"></el-transfer>
            </template>
            <div style="text-align: center;margin-top: 25px">
                <el-button size="mini" @click="closeColSettingDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button size="mini" type="primary" @click="saveColSetting" icon="el-icon-success">确定</el-button>
            </div>
        </el-dialog>





        <el-dialog title="账号信息编辑" :visible.sync="visible" size="tiny"
                   @close="closeDialog">
            <el-row>
                <el-col :span="24"><div class="grid-content bg-header">
                    <label style="float:left;">账号信息</label>
                </div></el-col>
            </el-row>

            <el-form  size="small">
                <el-form-item label="编号" class="hidden">
                    <el-input v-model="bean.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">企业编号：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.corpId" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">企业名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.corpName" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">账号：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.account" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">密码：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.pwd" placeholder="请输入内容" size="medium"></el-input>
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
                        <label class="lb-left">昵称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.nickName" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">英文名：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.engName" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">email：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.email" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>



                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">职位编号：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.positionId" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">职位名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.positionName" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">团队编号：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.teamId" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">团队名称：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.teamName" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>


                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">手机：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.mobile" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">头像：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.photo" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>



                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">办公司电话：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.officePhone" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">生日：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.birthday" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">入职时间：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.hireDate" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">离职时间：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.departDate" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>

                <el-row>
                    <el-col :span="4"><div class="grid-content bg-left">
                        <label class="lb-left">状态：</label>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-right">
                        <el-input v-model="bean.status" placeholder="请输入内容" size="medium"></el-input>
                    </div></el-col>
                </el-row>
            </el-form>

            <div style="text-align: center;margin-top: 10px;margin-bottom: 10px;">
                <el-button size="mini" @click="closeDialog" icon="el-icon-circle-close-outline">取消</el-button>
                <el-button v-if="strOp!='view'" size="mini" type="primary" @click="save" icon="el-icon-success">确定</el-button>
            </div>

        </el-dialog>



    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {accountGet,accountList,accountListAll,accountDel,accountSave,
        vAccountGet,vAccountList,vAccountListAll
    } from '@/api/api'
    import $ from 'jquery'
    export default {
        data() {
            return {
                defaultPageSize: 10,
                loading: true,
                pageParams:{
                    page: 1,
                    pageSize: 10,
                    totalRows: null,
                    totalPage: null,
                    orderBy: 'id',
                    direction: 'desc',
                    params: {
                        eq_id:null,
                        lk_account: null,
                        lk_name: null,

                        bt_createTime1:null,
                        bt_createTime2:null
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
                    {key: 1, prop: 'corpId', label: '企业编号', sortable: 'custom', type: '', orgin: 'corpId', width: '80'},
                    {key: 2, prop: 'pwd', label: '密码', sortable: 'custom', type: '', orgin: 'pwd', width: '100'},
                    {key: 3, prop: 'email', label: 'email', sortable: 'custom', type: '', orgin: 'email', width: '120'},
                    {key: 4, prop: 'photo', label: '图片', sortable: 'custom', type: '', orgin: 'photo', width: '150'},
                    {key: 5, prop: 'positionId', label: '职位编号', sortable: 'custom', type: '', orgin: 'positionId', width: '80'},
                    {key: 6, prop: 'teamId', label: '团队编号', sortable: 'custom', type: '', orgin: 'teamId', width: '80'},
                    {key: 7, prop: 'mobile', label: '手机号', sortable: 'custom', type: '', orgin: 'mobile', width: '120'},
                    {key: 8, prop: 'officePhone', label: '办公电话', sortable: 'custom', type: '', orgin: 'officePhone', width: '120'},
                    {key: 9, prop: 'birthday', label: '生日', sortable: 'custom', type: 'date', orgin: 'birthday', width: '120'},
                    {key: 10, prop: 'hireDate', label: '入职日期', sortable: 'custom', type: 'date', orgin: 'hireDate', width: '120'},
                    {key: 11, prop: 'departDate', label: '离职日期', sortable: 'custom', type: 'date', orgin: 'departDate', width: '120'},
                    {key: 12, prop: 'corpName', label: '企业名称', sortable: 'custom', type: '', orgin: 'corpName', width: '120'},
                    {key: 13, prop: 'positionName', label: '职位名称', sortable: 'custom', type: '', orgin: 'positionName', width: '120'},
                    {key: 14, prop: 'teamName', label: '团队名称', sortable: 'custom', type: '', orgin: 'teamName', width: '120'},
                    {key: 15, prop: 'createTimeStr', label: '创建时间', sortable: 'custom', type: 'date', orgin: 'createTime', width: '120'},
                    {key: 16, prop: 'createBy', label: '创建人', sortable: 'custom', type: '', orgin: 'createBy', width: '120'},
                    {key: 17, prop: 'modifyTimeStr', label: '修改时间', sortable: 'custom', type: 'date', orgin: 'modifyTime', width: '120'},
                    {key: 18, prop: 'modifyBy', label: '修改人', sortable: 'custom', type: '', orgin: 'modifyBy', width: '120'}
                ],
                showsOrgin: [],
                chShows: [],
                nchShows: [],
                colSettingVisible: false,
                visible: false,
                bean: {
                    id: null,
                    corpId:null,
                    corpName:null,
                    account:null,
                    pwd:null,
                    name:null,
                    nickName:null,
                    email:null,
                    photo:null,
                    engName:null,
                    positionId:null,
                    positionName:null,
                    teamId:null,
                    teamName:null,
                    mobile:null,
                    officePhone:null,
                    birthday:null,
                    hireDate:null,
                    departDate:null,
                    status: null,
                    flag: null
                },
                strOp: null
            }
        },
        watch: {
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
                vAccountList(_this.pageParams).then(res => {
                    res.data.forEach(p => {
                        p.modifyTimeStr = end.getDate_YMDHM(p.modifyTime)
                        p.createTimeStr = end.getDate_YMDHM(p.createTime)
                        p.hireDateStr = end.getDate_YMDHM(p.hireDate)
                        p.birthdayStr = end.getDate_YMDHM(p.birthday)
                        p.departDateStr = end.getDate_YMDHM(p.departDate)
                        p.edit=false
                    })
                    _this.pageParams=res
                    _this.loading=false;
                });
            },
            init(){
                var _this=this;
                _this.loading=true;
                vAccountList(_this.pageParams).then(res => {
                    res.data.forEach(p => {
                        p.modifyTimeStr = end.getDate_YMDHM(p.modifyTime)
                        p.createTimeStr = end.getDate_YMDHM(p.createTime)
                        p.hireDateStr = end.getDate_YMDHM(p.hireDate)
                        p.birthdayStr = end.getDate_YMDHM(p.birthday)
                        p.departDateStr = end.getDate_YMDHM(p.departDate)
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
                    eq_id:null,
                    lk_account: null,
                    lk_name: null,
                    bt_createTime1:null,
                    bt_createTime2:null
                }
            },
            /**
             * 检索
             */
            search(){
                this.init(1,this.defaultPageSize)
            },
            /**
             * 新增
             */
            add(){
                this.bean= {
                        id: null,
                        corpId:null,
                        corpName:null,
                        account:null,
                        pwd:null,
                        name:null,
                        nickName:null,
                        email:null,
                        photo:null,
                        engName:null,
                        positionId:null,
                        positionName:null,
                        teamId:null,
                        teamName:null,
                        mobile:null,
                        officePhone:null,
                        birthday:null,
                        hireDate:null,
                        departDate:null,
                        status: null,
                        flag: null
                },
                this.visible=true
                this.strOp='add'
            },
            edit(item){
                let _this=this
                vAccountGet({id:item.id}).then(p=>{
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
                        message: '请先选择需要删除的账号',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    accountDel({ids:_this.multipleSelection}).then(p=>{
                        _this.$message({
                            message: '删除账号成功',
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
            closeDialog(){
                this.visible=false
            },
            save(){
                let _this=this
                accountSave(_this.bean).then(p=>{
                    _this.$message({
                        message: '保存账号数据成功',
                        type: 'success'
                    });
                    _this.visible=false
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
                accountSave(item).then(p=>{
                    _this.$message({
                        message: '保存账号数据成功',
                        type: 'success'
                    });
                    _this.init()
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            }
        },
        created () {
            this.init();
            this.init_chShows();
        },
        components: {

        }
    }

</script>
<style lang="scss" scoped>
</style>