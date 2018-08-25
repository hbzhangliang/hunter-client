<template>
    <section>
        <div style="float: left;width: 35%;height: 97%;" v-loading="loading">

            <el-row>
                <el-col :span="24"><div class="grid-content bg-header">
                    <label style="float:left;">标签组</label>
                </div></el-col>
            </el-row>

            <div style="margin:5px">
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="groupAdd">新增</el-button>
            </div>

            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>

            <el-tree
                    class="filter-tree tag-tree"
                    :data="tagGroupList"
                    :props="defaultProps"
                    :filter-node-method="filterNode"
                    ref="tagGroup">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                            <span :id="generateId(data)">{{ data.name }}</span>
                            <span class="span_group_view" @click="groupView(data.id)"><i class="el-icon-view"></i></span>
                            <span class="span_group_edit" @click="groupEdit(data.id)"><i class="el-icon-edit"></i></span>
                            <span class="span_group_del" @click="groupDel(data.id)"><i class="el-icon-delete"></i></span>
                </div>
            </el-tree>

        </div>


        <el-dialog title="标签组信息维护" :visible.sync="groupVisible" size="tiny"
                   @close="closeGroupDialog">
            <el-form label-width="160px" size="small">
                <el-form-item label="id" class="hidden">
                    <el-input v-model="group.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="标签组编码">
                    <el-input v-model="group.code" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="标签组名称">
                    <el-input v-model="group.name" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="排序号">
                    <el-input v-model="group.seq" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center;margin-top: 25px">
                <el-button @click="closeGroupDialog">取消</el-button>
                <el-button type="primary" @click="saveGroup">确定</el-button>
            </div>
        </el-dialog>




        <div style="float: left;width: 60%;height: 97%;" v-loading="loading2" @click="hideMenuCss">

            <el-row>
                <el-col :span="24"><div class="grid-content bg-header">
                    <label style="float:left;">标签信息</label>
                </div></el-col>
            </el-row>


            <div style="margin:5px">
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="tagAdd">新增</el-button>
            </div>
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterTagText">
            </el-input>

            <div @contextmenu="showMenu" >
                <el-tree
                        class="filter-tree tag-tree"
                        :data="tagList"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        ref="tag">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span :id="generateTagId(data)">{{ data.name }}</span>
                    </span>
                </el-tree>
                <VueContextMenu id="contextmenu" :contextMenuData="menuData" @refresh="refresh" @edit="edit" @del="del"  @addRoot="addRoot" @add="add">
                </VueContextMenu>
            </div>
        </div>


        <el-dialog title="标签信息维护" :visible.sync="tagVisible" size="tiny"
                   @close="closeTagDialog">
            <el-form label-width="160px" size="small">
                <el-form-item label="id" class="hidden">
                    <el-input v-model="tag.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="所属分组">
                    <el-select :disabled="parentStatus" v-model="tag.groupId" placeholder="所属分组">
                        <el-option
                                v-for="item in tagGroupList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="tag.name" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="父节点">
                    <el-select :disabled="parentStatus" v-model="tag.parentId" placeholder="父节点">
                        <el-option
                                v-for="item in tagDataList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="排序号">
                    <el-input v-model="tag.seq" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center;margin-top: 25px">
                <el-button @click="closeTagDialog">取消</el-button>
                <el-button type="primary" @click="saveTag">确定</el-button>
            </div>
        </el-dialog>


    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {tagGroupTree,tagGroupGet,tagGroupList,tagGroupListAll,tagGroupDel,tagGroupSave,
        tagTree,tagGet,tagList,tagListAll,tagDel,tagSave
    } from '@/api/api'
    import $ from 'jquery'
    export default {
        data() {
            return {
                loading:false,
                loading2:false,
                filterText: '',
                filterTagText:'',
                tagGroupList: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                groupVisible:false,
                group:{
                    id:null,
                    code:null,
                    name:null,
                    seq:null
                },
                tagList:[],
                tagDataList:[],
                menuData:{
                    menuName:'tag',
                    axios:{x:null, y:null},
                    menulists:[
                        {fnHandler:'refresh',icoName:'el-icon-refresh',btnName:'刷新'},
                        {fnHandler:'edit',icoName:'el-icon-edit',btnName:'编辑'},
                        {fnHandler:'del',icoName:'el-icon-delete',btnName:'删除'},
                        {fnHandler:'addRoot',icoName:'el-icon-circle-plus-outline',btnName:'添加根节点'},
                        {fnHandler:'add',icoName:'el-icon-plus',btnName:'添加子项'}
                    ],
                },
                tagVisible:false,
                currentGroupId:null,
                currentTagId:null,
                parentStatus:true,
                tag:{
                    id:null,
                    groupId:null,
                    groupCode:null,
                    parentId:null,
                    name:null,
                    remark:null,
                    seq:null
                }

            }
        },
        watch: {
            filterText(val) {
                this.$refs.tagGroup.filter(val);
            },
            filterTagText(val){
                this.$refs.tagGroup.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            initTagGroup(){
                let _this=this
                _this.loading=true
                tagGroupTree().then(p=>{
                    _this.tagGroupList=p
                    _this.loading=false
                })
            },
            closeGroupDialog(){
               this.groupVisible=false
            },
            saveGroup(){
                let _this=this
                tagGroupSave(_this.group).then(p=>{
                    _this.groupVisible=false
                    _this.$message({
                        message: '保存标签组数据成功',
                        type: 'success'
                    });
                    _this.initTagGroup()
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
            },
            generateId(item){
                return "tagGroup_"+item.id
            },
            generateTagId(item){
                return "tag_"+item.id
            },
            groupAdd(){
                this.group={
                    id:null,
                    code:null,
                    name:null,
                    seq:null
                }
                this.groupVisible=true
            },
            groupView(id){
                this.currentGroupId=id
                let _this=this
                _this.loading2=true
                tagTree({groupId:id}).then(p=>{
                    _this.tagList=p
                    _this.loading2=false
                })
                tagListAll({groupId:id}).then(p=>{
                    _this.tagDataList=p
                })
            },
            groupEdit(id){
                let _this=this
                tagGroupGet({id:id}).then(p=>{
                    _this.group=p
                    _this.groupVisible=true
                })
            },
            groupDel(id){
                this.$confirm('此操作将永久删除该标签组，以及标签组下面的所有标签?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this=this
                    var ids=[]
                    ids.push(id)
                    tagGroupDel({ids:ids}).then(p=>{
                        _this.$message({
                            message: '删除数据成功',
                            type: 'success'
                        });
                        _this.initTagGroup()
                    }).catch(function (error) {
                        _this.$message.error('后端错误:'+error.message);
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            showMenu(parameter){
                parameter.preventDefault()
                var x = parameter.clientX
                var y = parameter.clientY
                this.menuData.axios = {
                    x, y
                }
                //捕获当前操作的groupId
                this.currentTagId=parseInt($(parameter.target).attr("id").substr(4))
                //如果没有alert，右键菜单无法显示
                // alert("对城市数据进行编辑")
                this.showMenuCss();
            },
            showMenuCss(){
                var _this=this
                $(".vue-contextmenuName-"+_this.menuData.menuName)
                    .css({display:"block",left:_this.menuData.axios.x,top:_this.menuData.axios.y})
            },
            hideMenuCss(){
                $(".vue-contextmenuName-"+this.menuData.menuName).css({display:"none"});
            },
            refresh(){
                let _this=this
                this.groupView(_this.currentGroupId)
                this.hideMenuCss()
            },
            edit(){
                let _this=this
                console.log(_this.currentTagId)
                tagGet({id:_this.currentTagId}).then(p=>{
                    _this.tag=p
                    _this.tagVisible=true
                }).catch(function (error) {
                    _this.$message.error('后端错误:'+error.message);
                })
                this.hideMenuCss()
            },
            del(){
                this.$confirm('此操作将永久删除该标签及其子城市, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this=this
                    var ids=[]
                    ids.push(this.currentTagId)
                    tagDel({ids:ids}).then(p=>{
                        _this.$message({
                            message: '删除城市数据成功',
                            type: 'success'
                        });
                         _this.refresh()
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
                let _this=this
                if(_this.currentGroupId==null){
                    _this.$message({
                        message: '请先选中编辑的标签组',
                        type: 'warning'
                    });
                    return
                }

                this.tag={
                    id:null,
                    groupId:_this.currentGroupId,
                    groupCode:null,
                    parentId:null,
                    name:null,
                    remark:null,
                    seq:null
                }
                this.tagVisible=true
            },
            add(){
                let _this=this
                tagGet({id:_this.currentTagId}).then(p=>{
                    _this.tag={
                        id:null,
                        groupId:_this.currentGroupId,
                        groupCode:null,
                        parentId:p.id,
                        name:null,
                        remark:null,
                        seq:null
                    }
                    _this.tagVisible=true
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
            },
            tagAdd(){
                this.addRoot()
            },
            saveTag(){
                let _this=this
                tagSave(_this.tag).then(p=>{
                    _this.tagVisible=false
                    _this.$message({
                        message: '保存标签数据成功',
                        type: 'success'
                    });
                    _this.refresh()
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
            },
            closeTagDialog(){
                this.tagVisible=false
            }
        },
        created () {
            this.initTagGroup()
        },
        components: {
        }
    }
</script>
<style lang="scss" scoped>
    .tag-tree{
        margin: 10px 2px;
        overflow-y: auto;
        max-height: 560px;
    }
    .span_group_view{
        padding: 2px 8px;
        margin-left: 50px;
    }
    .span_group_edit{
        padding: 2px 8px;
        margin-left: 8px;
    }
    .span_group_del{
        margin-left: 8px;
        padding: 2px 8px;
    }
    .span_group_view:hover,.span_group_edit:hover,.span_group_del:hover{
        background: lightskyblue;
        color: white;
    }
</style>