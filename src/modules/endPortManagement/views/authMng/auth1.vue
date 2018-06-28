<template>
    <section class="acl-container">
        <NavBar></NavBar>
        <div class="content">
            <div class="main">
                <div style="margin: 10px;">
                    <div style="float: left;width: 300px;margin-right: 10px;height: 400px;overflow: auto;border: 1px solid lightblue">
                        <div>
                            <h2>服务管理</h2>
                            <el-button  type="primary" size="mini" icon="el-icon-plus" @click="addServer">新增服务</el-button>
                        </div>
                        <el-tree :data="authServerData"
                                 node-key="id"
                                 show-checkbox
                                 ref="serverTree"
                                 @check-change="authServerNodeChange">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ node.label }}</span>
                                <span>
                                  <el-button
                                          type="text"
                                          size="mini"
                                          @click="() => edit(data,'server')">
                                    编辑
                                  </el-button>
                                  <el-button
                                          type="text"
                                          size="mini"
                                          @click="() => remove(node, data,'server')">
                                    删除
                                  </el-button>
                                </span>
                              </span>
                        </el-tree>

                    </div>

                    <div style="float: left;width: 300px;margin-right: 10px;height: 400px;overflow: auto;border: 1px solid lightblue">
                        <div>
                            <h2>权限项管理</h2>
                            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addAcl">新增权限项</el-button>
                        </div>
                        <el-tree :data="authAclData"
                                 node-key="id"
                                 ref="aclTree">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ node.label }}</span>
                                <span>
                                     <!--<el-button-->
                                             <!--type="text"-->
                                             <!--size="mini"-->
                                             <!--@click="() => add(data,'acl')">-->
                                    <!--新增-->
                                  <!--</el-button>-->
                                  <el-button
                                          type="text"
                                          size="mini"
                                          @click="() => edit(data,'acl')">
                                    编辑
                                  </el-button>
                                  <el-button
                                          type="text"
                                          size="mini"
                                          @click="() => remove(node, data,'acl')">
                                    删除
                                  </el-button>
                                </span>
                              </span>
                        </el-tree>
                    </div>


                    <div style="float: left;width: 300px;height: 400px;overflow: auto;border: 1px solid lightblue">
                        <div>
                            <h2>服务权限项查询</h2>
                        </div>
                        <el-tree :data="authServerAcl"
                                 node-key="id"
                                 ref="serverAclTree">
                        </el-tree>
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
        authAclList,authAclGet,authAclSave,authAclDel,authServerAclList} from '@/api/api'
    import $ from 'jquery'
    export default{
        data () {
            return {
                serverVisible:false,
                aclVisible:false,
                authServerData:[],
                authAclData:[],
                authServerAcl:[],
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
        methods: {
            getInitData(){
                var _this=this;
                _this.authServerData=[];
                _this.authServerAcl=[];
                authServerList({}).then(res => {
                    $.each(res,function (index,item) {
                        var temp={
                            id:item.serverId,
                            label:item.serverName
                        }
                        _this.authServerData.push(temp);
                    });
                });
                authServerAclList({}).then(res => {
                    _this.authServerAcl=res;
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
            edit(data,type){
                if("server"==type){
                    var _this=this;
                    //获取值
                    authServerGet({serverId:data.id}).then(res=>{
                        _this.server={
                            id:res.id,
                            serverId:res.serverId,
                            serverName:res.serverName,
                            remark:res.remark,
                            seq:res.seq
                        }
                        this.serverVisible=true;
                    });
                }else if("acl"==type){
                    var _this=this;
                    //获取值
                    authAclGet({id:data.id}).then(res=>{
                        _this.acl={
                            id:res.id,
                            englishName:res.englishName,
                            displayName:res.displayName,
                            consumerId:res.consumerId
                        }
                        this.aclVisible=true;
                    });
                }
            },
            remove(node, data,type){
                if("server"==type){
                    var _this=this;
                    var ids=[];
                    ids.push(data.id);
                    authServerDel({ids:ids}).then(res=>{
                        _this.getInitData();
                    });
                }
                else if("acl"==type){
                    var _this=this;
                    var ids=[];
                    ids.push(data.id);
                    if(data.children!=null&&data.children.length>0){
                        this.$message('请先删除子项');
                        return;
                    }
                    authAclDel({ids:ids}).then(res=>{
                        _this.getInitData();
                    });
                }
            },
            authServerNodeChange(data,checked){
                var _this=this;
                _this.authAclData=[];
                if(checked){
                    var serverId=data.id;
                    authAclList({serverId:serverId}).then(res=>{
                        _this.authAclData=res;
                    });
                }
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
            checkChooseSingle(){
                if(this.$refs.serverTree.getCheckedNodes().length>1){
                    this.$message('只能选择一个服务编辑其权限项');
                    return false;
                }
                else if(this.$refs.serverTree.getCheckedNodes().length<1){
                    this.$message('必须选择一个服务编辑其权限项');
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