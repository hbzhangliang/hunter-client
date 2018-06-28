<template>
    <section class="acl-container">
        <NavBar></NavBar>
        <div class="content">
            <div class="main">
                <div style="margin: 10px;">
                    <div style="float: left;width: 300px;margin-right: 10px;height: 400px;overflow-y: auto;">
                        <div>
                            <h2>服务名称</h2>
                            <el-button type="primary" icon="el-icon-plus" @click="addServer"></el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="editServer"></el-button>
                            <el-button type="primary" icon="el-icon-delete" @click="delServer"></el-button>
                        </div>
                        <el-tree :data="authServerData"
                                 node-key="id"
                                 show-checkbox
                                 ref="serverTree"
                                 @check-change="authServerNodeChange">
                        </el-tree>

                    </div>
                    <div style="float: left;width: 600px;height: 400px;overflow-y: auto;">
                        <div>
                            <h2>权限项名称</h2>
                            <el-button type="primary" icon="el-icon-plus" @click="addAcl"></el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="editAcl"></el-button>
                            <el-button type="primary" icon="el-icon-delete" @click="delAcl"></el-button>
                        </div>
                        <el-tree :data="authAclData"
                                 show-checkbox
                                 node-key="id"
                                 ref="aclTree"></el-tree>
                    </div>
                </div>
            </div>
        </div>


        <!--弹出框-->
        <el-dialog title="新增服务" :visible.sync="serverVisible" size="tiny"
                   @close="closeServerDialog">
            <div class="modalContent">
                <div class="demo-input-suffix">
                    服务编号:<el-input v-model="server.serverId" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    服务名称:<el-input v-model="server.serverName" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    服务备注:<el-input v-model="server.remark" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    服务排序号:<el-input v-model="server.seq" placeholder="请输入内容" size="medium"></el-input>
                </div>
            </div>
            <div style="text-align: center;margin-top: 25px">
                <el-button @click="closeServerDialog">取消</el-button>
                <el-button type="primary" @click="saveServer">确定</el-button>
            </div>

        </el-dialog>



        <el-dialog title="新增权限项" :visible.sync="aclVisible" size="tiny"
                   @close="closeAclDialog">
            <div class="modalContent">
                <div class="demo-input-suffix">
                    权限项英文名:<el-input v-model="acl.englishName" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    权限项显示名称:<el-input v-model="acl.displayName" placeholder="请输入内容" size="medium"></el-input>
                </div>
                <div class="demo-input-suffix">
                    权限项所属服务编号:<el-input v-model="acl.consumerId" placeholder="请输入内容" size="medium"></el-input>
                </div>
            </div>
            <div style="text-align: center;margin-top: 25px">
                <el-button @click="closeAclDialog">取消</el-button>
                <el-button type="primary" @click="saveAcl">确定</el-button>
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
        authAclList,authAclGet,authAclSave,authAclDel} from '@/api/api'
    import $ from 'jquery'
    export default{
        data () {
            return {
                authServerData:[],
                authAclData:[],
                serverVisible:false,
                aclVisible:false,
                server:{
                    id:null,
                    serverId:null,
                    serverName:null,
                    remark:null,
                    seq:null
                },
                acl:{
                    id:null,
                    englishName:null,
                    displayName:null,
                    consumerId:null
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
                _this.authAclData=[];
            },
            addServer(){
                this.server={
                    id:null,
                    serverId:null,
                        serverName:null,
                        remark:null,
                        seq:null
                };
                this.serverVisible=true;
            },
            closeServerDialog(){
                this.serverVisible=false;
            },
            saveServer(){
                var _this=this;
                authServerSave(_this.server).then(res=>{
                    _this.getInitData();
                    _this.serverVisible=false;
                });
            },
            authServerNodeChange(data,checked){
                if(checked) {
                     var serverId=data.id;
                     var _this=this;
                    _this.authAclData=[];
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
            delServer(){
                var _this=this;
                var delId=[];
                $.each(this.$refs.serverTree.getCheckedNodes(),function (index,item) {
                    delId.push(item.id);
                });
                authServerDel({ids:delId}).then(res=>{
                    _this.getInitData();
                });
            },
            editServer(){
                var _this=this;
                var editId=null;
                if(!this.checkChooseSingle()){
                    return;
                }
                $.each(this.$refs.serverTree.getCheckedNodes(), function (index, item) {
                    editId = item.id;
                });
                //获取值
                authServerGet({serverId:editId}).then(res=>{
                    _this.server={
                        id:res.id,
                        serverId:res.serverId,
                        serverName:res.serverName,
                        remark:res.remark,
                        seq:res.seq
                    }
                    this.serverVisible=true;
                });
            },


            addAcl(){
                if(!this.checkChooseSingle()){
                    return;
                }
                var serverId=null;
                $.each(this.$refs.serverTree.getCheckedNodes(), function (index, item) {
                    serverId = item.id;
                });
                this.acl={
                    id:null,
                        englishName:null,
                        displayName:null,
                        consumerId:serverId
                }
                this.aclVisible=true;
            },
            closeAclDialog(){
                this.aclVisible=false;
            },
            saveAcl(){
                var _this=this;
                authAclSave(_this.acl).then(res=>{
                    _this.getInitData();
                    _this.aclVisible=false;
                });
            },
            delAcl(){
                var _this=this;
                var delId=[];
                $.each(this.$refs.aclTree.getCheckedNodes(),function (index,item) {
                    delId.push(item.id);
                });
                authAclDel({ids:delId}).then(res=>{
                    _this.getInitData();
                });
            },
            editAcl(){
                var _this=this;
                var editId=null;

                if(!this.checkAclChooseSingle()){
                    return;
                }
                $.each(this.$refs.aclTree.getCheckedNodes(), function (index, item) {
                    editId = item.id;
                });
                //获取值
                authAclGet({id:editId}).then(res=>{
                    _this.acl={
                        id:res.id,
                        englishName:res.englishName,
                        displayName:res.displayName,
                        consumerId:res.consumerId
                    }
                    this.aclVisible=true;
                });
            },

            checkChooseSingle(){
                if(this.$refs.serverTree.getCheckedNodes().length>1){
                    this.$message('只能选择一条进行编辑');
                    return false;
                }
                else if(this.$refs.serverTree.getCheckedNodes().length<1){
                    this.$message('必须选择一条进行编辑');
                    return false;
                }
                else {
                    return true;
                }
            },
            checkAclChooseSingle(){
                if(this.$refs.aclTree.getCheckedNodes().length>1){
                    this.$message('只能选择一条进行编辑');
                    return false;
                }
                else if(this.$refs.aclTree.getCheckedNodes().length<1){
                    this.$message('必须选择一条进行编辑');
                    return false;
                }
                else {
                    return true;
                }
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