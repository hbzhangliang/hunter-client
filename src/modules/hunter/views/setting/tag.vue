<template>
    <section>
        <div style="float: left;width: 35%;height: 97%;" v-loading="loading">
            <div style="margin:5px">
                <el-button type="primary" icon="el-icon-plus" @click="groupAdd">新增</el-button>
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


        <div style="float: left;width: 60%;height: 97%;background: lightblue">

        </div>

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
                filterText: '',
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
                }
            }
        },
        watch: {
            filterText(val) {
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
                alert(id)
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