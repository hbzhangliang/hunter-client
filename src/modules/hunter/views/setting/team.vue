<template>
    <section v-loading="loading" v-on:click="hideMenuCss">
        <div style="height: 92%;overflow: hidden">
            <div style="margin:5px">
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="addRoot">新增</el-button>
            </div>
            <el-input
                    class="search_input w-240"
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>

            <div @contextmenu="showMenu" >
                <el-tree
                        class="filter-tree team-tree"
                        :data="data"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        ref="teamTree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span :id="generateId(data)">{{ data.name }}</span>
                    </span>
                </el-tree>
                <VueContextMenu id="contextmenu" :contextMenuData="menuData" @refresh="refresh" @edit="edit" @del="del"  @addRoot="addRoot" @add="add">
                </VueContextMenu>
            </div>
        </div>




        <el-dialog title="团队信息维护" :visible.sync="teamVisible" size="tiny"
                   @close="closeTeamDialog">
            <el-form label-width="160px" size="small">
                <el-form-item label="id" class="hidden">
                    <el-input v-model="team.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="team.name" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="team.remark" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="父节点">
                    <!--<el-input :disabled="isCreateRoot" v-model="team.parentId" placeholder="请输入内容" size="medium"></el-input>-->

                    <el-select :disabled="isCreateRoot" v-model="team.parentId" placeholder="根节点">
                        <el-option
                                v-for="item in teamDataList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="排序号">
                    <el-input v-model="team.seq" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center;margin-top: 25px">
                <el-button @click="closeTeamDialog">取消</el-button>
                <el-button type="primary" @click="saveTeam">确定</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {teamTree,teamGet,teamList,teamDel,teamSave,teamListAll} from '@/api/api'
    import $ from 'jquery'
    export default {
        data() {
            return {
                loading:false,
                filterText: '',
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                menuData:{
                    menuName:'abc',
                    axios:{x:null, y:null},
                    menulists:[
                        {fnHandler:'refresh',icoName:'el-icon-refresh',btnName:'刷新'},
                        {fnHandler:'edit',icoName:'el-icon-edit',btnName:'编辑'},
                        {fnHandler:'del',icoName:'el-icon-delete',btnName:'删除'},
                        {fnHandler:'addRoot',icoName:'el-icon-circle-plus-outline',btnName:'添加团队'},
                        {fnHandler:'add',icoName:'el-icon-plus',btnName:'添加子团队'}
                    ],
                },
                currentCityId:null,
                teamVisible:false,
                team:{
                    id:null,
                    name:null,
                    parentId:null,
                    seq:null,
                    remark:null,
                    flag:1
                },
                isCreateRoot:true,
                teamDataList:[]
            }
        },
        watch: {
            filterText(val) {
                this.$refs.teamTree.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            initTeam(){
                let _this=this
                _this.loading=true
                teamTree().then(p=>{
                    _this.data=p
                    _this.loading=false
                })
                teamListAll().then(p=>{
                    console.log(p)
                    _this.teamDataList=p
                })
            },
            showMenu:function (parameter) {
                parameter.preventDefault()
                var x = parameter.clientX
                var y = parameter.clientY
                this.menuData.axios = {
                    x, y
                }
                //捕获当前操作的team id
                this.currentCityId=parseInt($(parameter.target).attr("id").substr(5))
                //如果没有alert，右键菜单无法显示
                // alert("对城市数据进行编辑")
                this.showMenuCss();
            },

            refresh(){
                this.initTeam()
                this.hideMenuCss()
            },
            edit(){
                let _this=this
                teamGet({id:_this.currentCityId}).then(p=>{
                    _this.team=p
                    _this.teamVisible=true
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
                this.hideMenuCss()
            },
            del(){

                this.$confirm('此操作将永久删除该城市及其子城市, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                    let _this=this
                    var ids=[]
                    ids.push(this.currentCityId)
                    teamDel({ids:ids}).then(p=>{
                        _this.$message({
                            message: '删除城市数据成功',
                            type: 'success'
                        });
                        _this.initTeam()
                    }).catch(function (error) {
                        _this.$message.error('后端错误:'+error.message);
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                this.hideMenuCss()

            },
            addRoot(){
                this.team={
                    id:null,
                    name:null,
                    parentId:null,
                    seq:null,
                    remark:null,
                    flag:1
                }
                this.teamVisible=true
            },
            add(){
                let _this=this
                teamGet({id:_this.currentCityId}).then(p=>{
                    _this.team={
                        id:null,
                        name:null,
                        parentId:p.id,
                        seq:null,
                        remark:null,
                        flag:1
                    }
                    _this.teamVisible=true
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
            },
            generateId(item){
                return "tree_"+item.id
            },
            closeTeamDialog(){
                this.teamVisible=false
            },
            saveTeam(){
                let _this=this
                teamSave(_this.team).then(p=>{
                    _this.teamVisible=false
                    _this.$message({
                        message: '保存城市数据成功',
                        type: 'success'
                    });
                    _this.initTeam()
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
            },
            showMenuCss(){
                var _this=this
                $(".vue-contextmenuName-"+_this.menuData.menuName)
                    .css({display:"block",left:_this.menuData.axios.x,top:_this.menuData.axios.y})
            },
            hideMenuCss(){
                $(".vue-contextmenuName-"+this.menuData.menuName).css({display:"none"});
            }
        },
        created () {
            this.initTeam()
        },
        components: {
        }
    }
</script>
<style lang="scss" scoped>
    .team-tree{
        overflow-y: scroll;
        max-height: 560px;
        height: 70%;
        margin: 10px 5px;
        width: 460px;
        max-width: 600px;
    }
</style>