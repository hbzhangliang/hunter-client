<template>
    <section class="acl-container">
        <NavBar></NavBar>
        <div class="content">
            <div class="main">
                <div style="margin: 10px;">
                    <div style="float: left;width: 320px;margin-right: 5px;height: 400px;overflow-y: auto;border: 1px solid lightblue">
                        <div>
                            <h2>企业列表</h2>
                        </div>
                        <el-tree :data="authCorpData"
                                 show-checkbox
                                 node-key="id"
                                 ref="corpTree"
                                 @check-change="authCorpNodeChange">
                        </el-tree>
                        <div style="margin-top: 5px;border: 1px solid gray;overflow-x: scroll;overflow-y: auto; ">
                            <div id="app" style="margin: 5px 2px">
                                <el-row>
                                    <el-col :span="4">
                                        <b>企业名称:</b>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-input size="small" class="search_input" v-model="PageForm.search" placeholder="请输入内容"></el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button type="primary" size="mini"  icon="el-icon-search"  @click="searchApp">搜索</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="PageForm.page"
                                    :page-size="PageForm.pageSize"
                                    layout="prev, pager, next, jumper"
                                    :total="PageForm.totalRows">
                            </el-pagination>
                        </div>
                    </div>
                    <div style="float: left;width: 300px;margin-right: 5px;height: 400px;overflow: auto;border: 1px solid lightblue">
                        <div>
                            <h2>账号列表</h2>
                        </div>
                        <el-tree :data="authAccountData"
                                 node-key="id"
                                 show-checkbox
                                 :check-strictly=true
                                 :default-expand-all=true
                                 ref="accountTree"
                                 @check-change="authAccountNodeChange">
                        </el-tree>
                    </div>
                    <div style="float: left;width: 300px;height: 400px;overflow: auto;border: 1px solid lightblue">
                        <div>
                            <h2>权限项列表</h2>
                        </div>
                        <el-tree :data="authServerAcl"
                                 node-key="id"
                                 show-checkbox
                                 :default-expand-all=true
                                 :default-checked-keys="defaulAcls"
                                 ref="serverAclTree">
                        </el-tree>
                    </div>
                </div>
                <div>
                    <el-button type="primary"  icon="el-icon-save"  @click="saveAccountAcl">保存</el-button>
                </div>

            </div>
        </div>



    </section>
</template>
<style lang="scss" scoped>
    .main{
        height: 650px;
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
<script>
    import NavBar from '@/components/navBar'
    import end from '@/common/js/utils.js'
    import {authServerList,authServerGet,authServerSave,authServerDel,
        authAclList,authAclGet,authAclSave,authAclDel,
        authAccountList,authAccountGet,authAccountSave,authAccountDel,
        corpList,authAddAccountPrivileges,
        authServerAclList,
        authAclListByAccountId,authAclListByMemberId} from '@/api/api'
    import $ from 'jquery'
    export default{
        data () {
            return {
                accountVisible: false,
                authCorpData:[],
                authAccountData:[],
                authServerAcl:[],
                defaulAcls:[],
                account:{
                    id:null,
                    name:null,
                    accountNo:null,
                    accountType:null,
                    accountStatus:null,
                    isAllowCreateChild:null,
                    parentId:null,
                    spId:null,
                    spCode:null
                },
                PageForm:{
                    page:1,
                    pageSize:10,
                    totalRows:null,
                    totalPage:null,
                    search:null
                },
                defaultPageSize:10
            }
        },
        methods: {
            init(page,pageSize){
                var _this=this;
                _this.PageForm.page=page;
                _this.PageForm.pageSize=pageSize;
                _this.authCorpData=[];
                _this.authAccountData=[];
                corpList(_this.PageForm).then(res => {
                    $.each(res.data,function (index,item) {
                        var temp={
                            id:item.spId,
                            label:item.spName,
                            spCode:item.spCode
                        }
                        _this.authCorpData.push(temp);
                    });
                    _this.PageForm.totalRows=res.tatalRows;
                    _this.PageForm.totalPage=res.totalPage;
                });


                _this.authServerAcl=[]
                authServerAclList({}).then(res => {
                    _this.authServerAcl=res;
                });

                _this.defaulAcls=[];
            },
            handleCurrentChange(item){
                this.init(item,this.defaultPageSize);
            },
            searchApp(){
                this.init(1,this.defaultPageSize);
            },

            authCorpNodeChange(data,checked){
                var _this=this;
                _this.authAccountData=[];
                if(checked){
                    //成员列表展示
                    var spId=data.id;
                    authAccountList({spId:spId}).then(res=>{
                        _this.authAccountData=res;
                    });

                }
            },

            saveAccountAcl(){
                if(!this.checkAccountChooseSingle()){
                    return;
                }
                if(this.$refs.serverAclTree.getCheckedNodes()<1){
                    this.$message('必须选择一条权限项信息');
                    return false;
                }
                var _this=this;
                var accountId=null;
                var aclList=[];
                $.each(this.$refs.accountTree.getCheckedNodes(), function (index, item) {
                    accountId=item.id;
                });
                $.each(this.$refs.serverAclTree.getCheckedNodes(), function (index, item) {
                    aclList.push(item.id);
                });
                authAddAccountPrivileges({accountId:accountId,itemIds:aclList}).then(res=>{
                    this.init(1,this.defaultPageSize);
                });
            },
            checkAccountChooseSingle(){
                if(this.$refs.accountTree.getCheckedNodes().length>1){
                    this.$message('只能选择一条账号信息');
                    return false;
                }
                else if(this.$refs.accountTree.getCheckedNodes().length<1){
                    this.$message('必须选择一条账号信息');
                    return false;
                }
                else {
                    return true;
                }
            },
            authAccountNodeChange(data,checked){
                var _this=this;
                this.$refs.serverAclTree.setCheckedKeys([]);
                var accountId=null;
                if(checked){
                    if(!this.checkAccountChooseSingle()){
                        return;
                    }
                    this.defaulAcls = [];
                    $.each(this.$refs.accountTree.getCheckedNodes(), function (index, item) {
                        accountId=item.id;
                    });
                    authAclListByAccountId({id:accountId}).then(res=>{
                        $.each(res, function (index, item) {
                            _this.defaulAcls.push(item.id);
                        });
                        this.$refs.serverAclTree.setCheckedKeys(_this.defaulAcls);
                    });

                }
            }

        },
        created () {
        },
        mounted() {
            this.init(1,this.defaultPageSize);
        },
        components: {
            NavBar
        }
    }

</script>