<template>
    <section class="acl-container">
        <NavBar></NavBar>
        <div class="content">
            <div class="main">
                <div style="margin: 10px;">

                    <div style="float: left;width: 240px;margin-right: 5px;height: 400px;overflow-y: auto;border: 1px solid lightblue">
                        <div>
                            <h2>企业列表</h2>
                        </div>
                        <el-tree :data="authCorpData"
                                 show-checkbox
                                 node-key="id"
                                 ref="corpTree"
                                 @check-change="authCorpNodeChange"></el-tree>
                    </div>
                    <div style="float: left;width: 240px;margin-right: 5px;height: 400px;overflow-y: auto;border: 1px solid lightblue">
                        <div>
                            <h2>账号管理</h2>
                            <el-button type="primary" icon="el-icon-plus" @click="addAccount"></el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="editAccount"></el-button>
                            <el-button type="primary" icon="el-icon-delete" @click="delAccount"></el-button>
                        </div>
                        <el-tree :data="authAccountData"
                                 show-checkbox
                                 node-key="id"
                                 ref="accountTree"></el-tree>
                    </div>
                    <div style="float: left;width: 220px;margin-right: 5px;height: 400px;overflow-y: auto;border: 1px solid lightblue">
                        <div>
                            <h2>服务列表</h2>
                        </div>
                        <el-tree :data="authServerData"
                                 node-key="id"
                                 show-checkbox
                                 ref="serverTree"
                                 @check-change="authServerNodeChange">
                        </el-tree>

                    </div>
                    <div style="float: left;width: 240px;margin-right: 5px;height: 400px;overflow-y: auto;border: 1px solid lightblue">
                        <div>
                            <h2>权限列表</h2>
                        </div>
                        <el-tree :data="authAclData"
                                 show-checkbox
                                 node-key="id"
                                 ref="aclTree"></el-tree>
                    </div>
                </div>
                <div style="float: left;margin-left: 400px;margin-top: 20px;">
                    <el-button type="primary" plain  @click="saveAccountAcls">保存</el-button>
                    <el-button type="primary" plain  @click="checkAcls">测试</el-button>
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
                accountVisible:false,
                authServerData: [],
                authCorpData:[],
                authAccountData:[],
                authAclData:[],
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
                }
            }
        },
        methods:{
            getInitData(){
                var _this=this;
                _this.authServerData=[];
                authServerList({}).then(res => {
                    $.each(res,function (index,item) {
                        var temp={
                            id:item.serverId,
                            label:item.serverName
                        }
                        _this.authServerData.push(temp);
                    });
                });
                _this.authCorpData=[];
                corpList({page:1,pageSize:10}).then(res => {
                    $.each(res.data,function (index,item) {
                        var temp={
                            id:item.spId,
                            label:item.spName,
                            spCode:item.spCode
                        }
                        _this.authCorpData.push(temp);
                    });
                });
            },

            authServerNodeChange(data,checked){
                var _this=this;
                _this.authAclData=[];
                if(checked) {
                    var serverId=data.id;
                    authAclList({serverId:serverId}).then(res=>{
                        $.each(res,function (index,item) {
                            var temp={
                                id:item.id,
                                label:item.displayName
                            }
                            _this.authAclData.push(temp);
                        });
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
            editAccount(){
                if(!this.checkAccountChooseSingle()){
                    return;
                }
                var _this=this;
                var accountId=null;
                $.each(this.$refs.accountTree.getCheckedNodes(), function (index, item) {
                    accountId=item.id;
                });
                authAccountGet({id:accountId}).then(res=>{
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
            closeAccountDialog(){
                this.accountVisible=false;
            },
            saveAccount(){
                var _this=this;
                authAccountSave(_this.account).then(res=>{
                    _this.getInitData();
                    _this.accountVisible=false;
                });
            },
            delAccount(){
                if(!this.checkAccountChooseSingle()){
                    return;
                }
                var _this=this;
                $.each(this.$refs.accountTree.getCheckedNodes(), function (index, item) {
                    authAccountDel({id:item.id}).then(res=>{
                        _this.$message(res.message);
                    });
                    this.getInitData();
                });
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
            checkServerChooseSingle(){
                if(this.$refs.serverTree.getCheckedNodes().length>1){
                    this.$message('只能选择一种应用服务');
                    return false;
                }
                else if(this.$refs.serverTree.getCheckedNodes().length<1){
                    this.$message('必须选择一种应用服务');
                    return false;
                }
                else {
                    return true;
                }
            },
            authCorpNodeChange(data,checked){
                var _this=this;
                _this.authAccountData=[];
                if(checked){
                    //成员列表展示
                    var spId=data.id;
                    authAccountList({spId:spId}).then(res=>{
                        $.each(res,function (index,item) {
                            var temp={
                                id:item.id,
                                label:item.name
                            }
                            _this.authAccountData.push(temp);
                        });
                    });

                }
            },

            /**
             * 保存账号的权限
             * 只能选择一个账号，只能选择一个服务
             */
            saveAccountAcls(){
                if(this.checkAccountChooseSingle()&&this.checkServerChooseSingle()){
                    var accountId=null;
                    var privilegeItemIdList=[];
                    var _this=this;
                    $.each(this.$refs.accountTree.getCheckedNodes(), function (index, item) {
                         accountId=item.id;
                    });
                    $.each(this.$refs.aclTree.getCheckedNodes(), function (index, item) {
                        privilegeItemIdList.push(item.id);
                    });
                    if(privilegeItemIdList.size<1){
                        this.$message('最少选择一种权限');
                        return;
                    }
                    authAddAccountPrivileges({accountId:accountId,itemIds:privilegeItemIdList}).then(res=>{
                        _this.$message(res.message);
                    });
                }
            },
            checkAcls(){
                authAclListByAccountId({id:"18030617573720003197"}).then(res=>{
                    $.each(res, function (index, item) {
                        alert(item.id)
                    });
                });
            }
        },
        created () {
        },
        mounted() {
            this.getInitData();
        },
        components: {
            NavBar
        }
    }


</script>