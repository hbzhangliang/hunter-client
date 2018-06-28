<template>
    <section class="acl-container">
        <NavBar></NavBar>
        <div class="content">
            <div class="main">
                <div style="margin: 10px;">
                    <div style="float: left;width: 420px;margin-right: 5px;height: 400px;overflow-y: auto;border: 1px solid lightblue">
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
                            <h2>账号管理</h2>
                            <el-button size="mini" type="primary" icon="el-icon-plus" @click="addAccount">新增账号</el-button>
                        </div>
                        <el-tree :data="authAccountData"
                                 node-key="id"
                                 ref="accountTree">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ node.label }}</span>
                                <span>
                                     <el-button
                                             type="text"
                                             size="mini"
                                             @click="() => add(data)">
                                    新增
                                  </el-button>
                                  <el-button
                                          type="text"
                                          size="mini"
                                          @click="() => edit(data)">
                                    编辑
                                  </el-button>
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
            </div>
        </div>


        <el-dialog title="新增账号" :visible.sync="accountVisible" size="tiny"
                   @close="closeAccountDialog">
            <div class="modalContent">
                <div class="demo-input-suffix">
                    名称:<el-input v-model="account.name" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    accountNo:<el-input v-model="account.accountNo" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    accountType(1:主账号2子帐号):<el-input v-model="account.accountType" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    parentId(子帐号必填):<el-input v-model="account.parentId" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    accountStatus:<el-input v-model="account.accountStatus" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    isAllowCreateChild:<el-input v-model="account.isAllowCreateChild" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    spId:<el-input v-model="account.spId" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    spCode:<el-input v-model="account.spCode" placeholder="请输入内容" size="medium"></el-input>
                </div>
            </div>
            <div style="text-align: center;margin-top: 25px">
                <el-button @click="closeAccountDialog">取消</el-button>
                <el-button type="primary" @click="saveAccount">确定</el-button>
            </div>

        </el-dialog>

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
        authAclListByAccountId,authAclListByMemberId} from '@/api/api'
    import $ from 'jquery'
    export default{
        data () {
            return {
                accountVisible: false,
                authCorpData:[],
                authAccountData:[],
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
            addAccount(){
                if(!this.checkCorpChooseSingle()){
                    return;
                }
                var _this=this;
                $.each(this.$refs.corpTree.getCheckedNodes(), function (index, item) {
                    _this.account={
                        id:null,
                        name:null,
                        accountNo:null,
                        accountType:1,
                        accountStatus:1,
                        isAllowCreateChild:1,
                        parentId:null,
                        spId:item.id,
                        spCode:item.spCode
                    }
                });
                this.accountVisible=true;
            },
            checkCorpChooseSingle(){
                if(this.$refs.corpTree.getCheckedNodes().length>1){
                    this.$message('只能选择一条企业信息');
                    return false;
                }
                else if(this.$refs.corpTree.getCheckedNodes().length<1){
                    this.$message('必须选择一条企业信息');
                    return false;
                }
                else {
                    return true;
                }
            },
            closeAccountDialog(){
                this.accountVisible=false;
            },
            saveAccount(){
                var _this=this;
                authAccountSave(_this.account).then(res=>{
                    _this.init(1,this.defaultPageSize);
                    _this.accountVisible=false;
                });
            },
            edit(data){
                var _this=this;
                authAccountGet({id:data.id}).then(res=>{
                    _this.account={
                        id:res.id,
                        name:res.name,
                        accountNo:res.accountNo,
                        accountType:res.accountType,
                        accountStatus:res.accountStatus,
                        isAllowCreateChild:res.isAllowCreateChild,
                        parentId:res.parentId,
                        spId:res.spId,
                        spCode:res.spCode
                    }
                });
                this.accountVisible=true;
            },
            remove(node, data){
                if(data.children!=null&&data.children.length>0){
                    this.$message('请先删除子帐号');
                    return;
                }
                var _this=this;
                authAccountDel({id:data.id}).then(res=>{
                    _this.$message("删除账号成功");
                });
                this.init(1,this.defaultPageSize);
            },
            add(data){
                if(!this.checkCorpChooseSingle()){
                    return;
                }
                var _this=this;
                $.each(this.$refs.corpTree.getCheckedNodes(), function (index, item) {
                    _this.account={
                        id:null,
                        name:null,
                        accountNo:null,
                        accountType:2,
                        accountStatus:1,
                        isAllowCreateChild:1,
                        parentId:data.id,
                        spId:item.id,
                        spCode:item.spCode
                    }
                });
                this.accountVisible=true;
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