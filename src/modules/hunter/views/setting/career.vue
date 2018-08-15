<template>
    <section v-loading="loading" v-on:click="hideMenuCss">
        <div style="height: 92%;overflow: hidden">
            <div style="margin:5px">
                <el-button type="primary" @click="importCitys">导入数据</el-button>
            </div>
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>

            <div @contextmenu="showMenu" >
                <el-tree
                        class="filter-tree career-tree"
                        :data="data"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        ref="tree2">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span :id="generateId(data)">{{ data.name }}</span>
                    </span>
                </el-tree>
                <VueContextMenu id="contextmenu" :contextMenuData="menuData" @refresh="refresh" @edit="edit" @del="del"  @addRoot="addRoot" @add="add">
                </VueContextMenu>
            </div>
        </div>




        <el-dialog title="城市信息维护" :visible.sync="careerVisible" size="tiny"
                   @close="closeCityDialog">
            <el-form label-width="160px" size="small">
                <el-form-item label="id" class="hidden">
                    <el-input v-model="career.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="career.name" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="父节点">
                    <!--<el-input :disabled="isCreateRoot" v-model="career.parentId" placeholder="请输入内容" size="medium"></el-input>-->

                    <el-select :disabled="isCreateRoot" v-model="career.parentId" placeholder="根节点">
                        <el-option
                                v-for="item in careerDataList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="排序号">
                    <el-input v-model="career.seq" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center;margin-top: 25px">
                <el-button @click="closeCityDialog">取消</el-button>
                <el-button type="primary" @click="saveCity">确定</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {careerTree,careerGet,careerList,careerDel,careerSave,careerListAll,careerImport} from '@/api/api'
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
                        {fnHandler:'addRoot',icoName:'el-icon-circle-plus-outline',btnName:'添加省份'},
                        {fnHandler:'add',icoName:'el-icon-plus',btnName:'添加子项'}
                    ],
                },
                currentCityId:null,
                careerVisible:false,
                career:{
                    id:null,
                    name:null,
                    parentId:null,
                    seq:null,
                    flag:1
                },
                isCreateRoot:true,
                careerDataList:[]
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            initCity(){
                let _this=this
                _this.loading=true
                careerTree().then(p=>{
                    _this.data=p
                    _this.loading=false
                })
                careerListAll().then(p=>{
                    _this.careerDataList=p
                })
            },
            showMenu:function (parameter) {
                parameter.preventDefault()
                var x = parameter.clientX
                var y = parameter.clientY
                this.menuData.axios = {
                    x, y
                }
                //捕获当前操作的career id
                this.currentCityId=parseInt($(parameter.target).attr("id").substr(5))
                //如果没有alert，右键菜单无法显示
                // alert("对城市数据进行编辑")
                this.showMenuCss();
            },

            refresh(){
                this.initCity()
                this.hideMenuCss()
            },
            edit(){
                let _this=this
                careerGet({id:_this.currentCityId}).then(p=>{
                    _this.career=p
                    _this.careerVisible=true
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
                this.hideMenuCss()
            },
            del(){

                this.$confirm('此操作将永久删除该职能及其子职能, 是否继续?', '提示', {
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
                    careerDel({ids:ids}).then(p=>{
                        _this.$message({
                            message: '删除职能数据成功',
                            type: 'success'
                        });
                        _this.initCity()
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
                this.career={
                    id:null,
                    name:null,
                    parentId:null,
                    seq:null,
                    flag:1
                }
                this.careerVisible=true
            },
            add(){
                let _this=this
                careerGet({id:_this.currentCityId}).then(p=>{
                    _this.career={
                        id:null,
                        name:null,
                        parentId:p.id,
                        seq:null,
                        flag:1
                    }
                    _this.careerVisible=true
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
            },
            generateId(item){
                return "tree_"+item.id
            },
            closeCityDialog(){
                this.careerVisible=false
            },
            saveCity(){
                let _this=this
                careerSave(_this.career).then(p=>{
                    _this.careerVisible=false
                    _this.$message({
                        message: '保存职能数据成功',
                        type: 'success'
                    });
                    _this.initCity()
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
            },
            importCitys(){
                let _this=this
                careerImport().then(p=>{
                    _this.$message({
                        message: '导入职能数据成功',
                        type: 'success'
                    });
                    _this.initCity()
                }).catch(function (error) {
                    _this.$message.error('数据导入出错');
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
            this.initCity()
        },
        components: {
        }
    }
</script>
<style lang="scss" scoped>
    .career-tree{
        overflow-y: scroll;
        max-height: 560px;
        height: 70%;
        margin: 10px 5px;

    }
</style>