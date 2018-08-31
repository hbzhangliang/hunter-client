<template>
    <section v-loading="loading" v-on:click="hideMenuCss">
        <div style="height: 92%;overflow: hidden">

            文件夹类型<br/>
            <template>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="changeAll">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedTypes" @change="change">
                    <el-checkbox v-for="item in docTypeOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                </el-checkbox-group>
            </template>

            <div @contextmenu="showMenu" >
                <el-tree
                        class="filter-tree doc-tree"
                        :data="data"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        ref="docTree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span :id="generateId(data)">{{ data.name }}</span>
                    </span>
                </el-tree>
                <VueContextMenu id="contextmenu" :contextMenuData="menuData" @refresh="refresh" @edit="edit" @del="del"  @addRoot="addRoot">
                </VueContextMenu>
            </div>
        </div>


        <el-dialog title="文档信息维护" :visible.sync="visible" size="tiny"
                   @close="closeDialog">
            <el-form label-width="160px" size="small">
                <el-form-item label="id" class="hidden">
                    <el-input v-model="doc.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="doc.name" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>

                <el-form-item label="类型">
                    <el-select v-model="doc.type" placeholder="请选择">
                        <el-option
                                v-for="item in docTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="doc.remark" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center;margin-top: 25px">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {docTree,docGet,docList,docDel,docSave,docListAll} from '@/api/api'
    import $ from 'jquery'
    export default {
        data() {
            return {
                checkAll:false,
                isIndeterminate:false,
                checkedTypes:[],
                loading:false,
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
                        {fnHandler:'addRoot',icoName:'el-icon-circle-plus-outline',btnName:'添加文档'}
                    ],
                },
                currentDocId:null,
                visible:false,
                doc:{
                    id:null,
                    name:null,
                    type:null,
                    remark:null
                },
                docTypeOptions:[{value:"talent",label:"人才"},{value:"company",label:"公司"},{value:"project",label:"项目"},{value:"other",label:"其他"}],
            }
        },
        watch: {

        },
        methods: {
            changeAll(val) {
                if(val){
                   var d=[]
                   this.docTypeOptions.forEach(p=>{
                       d.push(p.value)
                   })
                    this.checkedTypes=d
                }
                else {
                    this.checkedTypes=[]
                }
                this.isIndeterminate = false;
                this.initDoc()
            },
            change(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.docTypeOptions.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.docTypeOptions.length;
                this.initDoc()
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            initDoc(){
                let _this=this
                _this.loading=true
                docTree({types:_this.checkedTypes}).then(p=>{
                    _this.data=p
                    _this.loading=false
                })
            },
            showMenu:function (parameter) {
                parameter.preventDefault()
                var x = parameter.clientX
                var y = parameter.clientY
                this.menuData.axios = {
                    x, y
                }
                //捕获当前操作的city id
                this.currentDocId=parseInt($(parameter.target).attr("id").substr(5))
                //如果没有alert，右键菜单无法显示
                // alert("对文件夹数据进行编辑")
                this.showMenuCss();
            },

            refresh(){
                this.initDoc()
                this.hideMenuCss()
            },
            edit(){
                let _this=this
                docGet({id:_this.currentDocId}).then(p=>{
                    _this.doc=p
                    _this.visible=true
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
                this.hideMenuCss()
            },
            del(){

                this.$confirm('此操作将永久删除该文档, 是否继续?', '提示', {
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
                    ids.push(this.currentDocId)
                    docDel({ids:ids}).then(p=>{
                        _this.$message({
                            message: '删除文档数据成功',
                            type: 'success'
                        });
                        _this.initDoc()
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
                this.doc={
                    id:null,
                    name:null,
                    type:null,
                    remark:null
                }
                this.visible=true
            },
            generateId(item){
                return "tree_"+item.id
            },
            closeDialog(){
                this.visible=false
            },
            save(){
                let _this=this
                docSave(_this.doc).then(p=>{
                    _this.visible=false
                    _this.$message({
                        message: '保存文件夹数据成功',
                        type: 'success'
                    });
                    _this.initDoc()
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
            this.initDoc()
        },
        components: {
        }
    }
</script>
<style lang="scss" scoped>
    .doc-tree{
        overflow-y: scroll;
        max-height: 560px;
        height: 70%;
        margin: 10px 5px;

    }
</style>