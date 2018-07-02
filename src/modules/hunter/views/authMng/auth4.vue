<template>
    <section class="acl-container">
        <NavBar></NavBar>
        <div class="content">
            <div class="main">
                <div style="margin: 2px;">
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
                                                <el-input size="small" class="search_input" v-model="PageForm.corp.search" placeholder="请输入内容"></el-input>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-button type="primary" size="mini"  icon="el-icon-search"  @click="searchCorp">搜索</el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <el-pagination
                                            @current-change="corphandleCurrentChange"
                                            :current-page.sync="PageForm.corp.page"
                                            :page-size="PageForm.corp.pageSize"
                                            layout="prev, pager, next, jumper"
                                            :total="PageForm.corp.totalRows">
                                    </el-pagination>
                                </div>
                            </div>

                            <div style="float: left;width: 300px;margin-right: 5px;height: 400px;overflow: auto;border: 1px solid lightblue">
                                <div>
                                    <h2>账号列表</h2>
                                </div>
                                <div style="float: left;width: 170px;height:370px;border-right: 1px solid lightblue;">
                                <el-tree :data="authAccountData"
                                         node-key="id"
                                         show-checkbox
                                         :check-strictly=true
                                         :default-expand-all=true
                                         ref="accountTree"
                                         @check-change="authAccountNodeChange">
                                </el-tree>
                                </div>
                                <div style="float: left;background: yellow;width: 80px;">
                                    <el-tree :data="authChooseAccountData"
                                             node-key="id"
                                             ref="accountChooseTree">
                                        <span class="custom-tree-node" slot-scope="{ node, data }">
                                            <span>{{ node.label }}</span>
                                                <span>
                                                  <el-button
                                                          type="text"
                                                          size="mini"
                                                          @click="() => remove(node, data)">
                                                    删除
                                                  </el-button>
                                                </span>
                                        </span>
                                    </el-tree>
                                </div>
                            </div>

                            <div style="float: left;width: 300px;margin-right: 5px;height: 400px;overflow: auto;border: 1px solid lightblue">
                                <div>
                                    <h2>选择成员</h2>
                                </div>
                                <el-tree :data="authMemberData"
                                         node-key="id"
                                         show-checkbox
                                         ref="memberTree"
                                         @check-change="authMemberNodeChange">
                                </el-tree>
                                <div style="margin-top: 5px;border: 1px solid gray;overflow-x: scroll;overflow-y: auto; ">
                                    <div  style="margin: 5px 2px">
                                        <el-row>
                                            <el-col :span="4">
                                                <b>成员名称:</b>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-input size="small" class="search_input" v-model="PageForm.member.search" placeholder="请输入内容"></el-input>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-button type="primary" size="mini"  icon="el-icon-search"  @click="searchMember">搜索</el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <el-pagination
                                            @current-change="memberhandleCurrentChange"
                                            :current-page.sync="PageForm.member.page"
                                            :page-size="PageForm.member.pageSize"
                                            layout="prev, pager, next, jumper"
                                            :total="PageForm.member.totalRows">
                                    </el-pagination>
                                </div>
                            </div>

                            <div>
                                <el-button type="primary"  icon="el-icon-save"  @click="saveAccountMember">保存</el-button>
                            </div>
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
        authAclListByAccountId,authAclListByMemberId,
        authAddAcountMembers,
        authMemberListBySpId} from '@/api/api'
    import $ from 'jquery'
    export default{
        data () {
            return {
                defaultPageSize:10,
                authCorpData:[],
                authAccountData:[],
                authMemberData:[],
                authChooseAccountData:[],
                PageForm:{
                    corp:{
                        page:1,
                        pageSize:10,
                        totalRows:null,
                        totalPage:null,
                        search:null
                    },
                    member:{
                        page:1,
                        pageSize:10,
                        totalRows:null,
                        totalPage:null,
                        search:null,
                        params:{
                            spId:null
                        }
                    }
                },
                spId:null
            }
        },
        methods: {
            init(page,pageSize){
                var _this=this;
                _this.PageForm.corp.page=page;
                _this.PageForm.corp.pageSize=pageSize;
                _this.authCorpData=[];
                _this.authAccountData=[];
                corpList(_this.PageForm.corp).then(res => {
                    $.each(res.data,function (index,item) {
                        var temp={
                            id:item.spId,
                            label:item.spName,
                            spCode:item.spCode
                        }
                        _this.authCorpData.push(temp);
                    });
                    _this.PageForm.corp.totalRows=res.tatalRows;
                    _this.PageForm.corp.totalPage=res.totalPage;
                });
            },
            initMember(spId,page,pageSize){
                var _this=this;
                _this.PageForm.member.params.spId=spId;
                _this.PageForm.member.page=page;
                _this.PageForm.member.pageSize=pageSize;
                _this.authMemberData=[];
                authMemberListBySpId(_this.PageForm.member).then(res => {
                    $.each(res.data,function (index,item) {
                        var temp={
                            id:item.id,
                            label:item.name
                        }
                        _this.authMemberData.push(temp);
                    });
                    _this.PageForm.member.totalRows=res.tatalRows;
                    _this.PageForm.member.totalPage=res.totalPage;
                });
            },

            corphandleCurrentChange(item){
                this.init(item,this.defaultPageSize);
            },
            searchCorp(){
                this.init(1,this.defaultPageSize);
            },
            searchMember(){
                this.initMember(this.spId,1,this.defaultPageSize)
            },
            authCorpNodeChange(data,checked){
                var _this=this;
                _this.authAccountData=[];
                _this.authMemberData=[];
                if(checked){
                    //成员列表展示
                    var spId=data.id;
                    _this.spId=data.id;
                    authAccountList({spId:spId}).then(res=>{
                        _this.authAccountData=res;
                    });


                    this.initMember(spId,1,this.defaultPageSize)

                }
            },
            authMemberNodeChange(data,checked){
                var _this=this;
                if(checked){
                    var tmp={
                        id:data.id,
                        label:data.label
                    }
                    var choose=false;
                    $.each(_this.authChooseAccountData,function (index,item) {
                        if(item.id==data.id){
                            choose=true;
                        }
                    });
                    if(!choose)
                      _this.authChooseAccountData.push(tmp);
                }
            },
            remove(node,data){
                var _this=this;
                $.each(_this.authChooseAccountData,function (index,item) {
                    if(item.id==data.id){
                        _this.authChooseAccountData.splice(index,1);
                    }
                });
            },
            memberhandleCurrentChange(item){
                this.initMember(this.spId,item,this.defaultPageSize)
            },
            saveAccountMember(){
                if(!this.checkAccountChooseSingle()){
                    return;
                }
                var accountId=null;
                var memberIds=[];
                var _this=this;
                $.each(this.$refs.accountTree.getCheckedNodes(), function (index, item) {
                    accountId=item.id;
                });
                $.each(this.authChooseAccountData, function (index, item) {
                    memberIds.push(item.id+"");
                });

                authAddAcountMembers({accountId:accountId,memberIds:memberIds}).then(res=>{
                    _this.$message('保存数据成功');
                    _this.authChooseAccountData=[];
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