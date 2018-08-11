<template>
    <section>
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
                        class="filter-tree city-tree"
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




        <el-dialog title="城市信息维护" :visible.sync="cityVisible" size="tiny"
                   @close="closeCityDialog">
            <el-form label-width="160px" size="small">
                <el-form-item label="id" class="hidden">
                    <el-input v-model="city.id" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="city.name" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="父节点">
                    <!--<el-input :disabled="isCreateRoot" v-model="city.parentId" placeholder="请输入内容" size="medium"></el-input>-->

                    <el-select :disabled="isCreateRoot" v-model="city.parentId" placeholder="根节点">
                        <el-option
                                v-for="item in cityDataList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="排序号">
                    <el-input v-model="city.seq" placeholder="请输入内容" size="medium"></el-input>
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
    import {cityTree,cityGet,cityList,cityDel,citySave,cityListAll,cityImport} from '@/api/api'
    import $ from 'jquery'
    export default {
        data() {
            return {
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
                cityVisible:false,
                city:{
                    id:null,
                    name:null,
                    parentId:null,
                    seq:null,
                    flag:1
                },
                isCreateRoot:true,
                cityDataList:[]
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
                cityTree().then(p=>{
                    _this.data=p
                })
                cityListAll().then(p=>{
                    console.log(p)
                    _this.cityDataList=p
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
                this.currentCityId=parseInt($(parameter.target).attr("id").substr(5))
                //如果没有alert，右键菜单无法显示
                alert("对城市数据进行编辑")
            },

            refresh(){
                this.initCity()
            },
            edit(){
                let _this=this
                cityGet({id:_this.currentCityId}).then(p=>{
                    _this.city=p
                    _this.cityVisible=true
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })

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
                    cityDel({ids:ids}).then(p=>{
                        _this.$message({
                            message: '删除城市数据成功',
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

            },
            addRoot(){
                this.city={
                    id:null,
                        name:null,
                        parentId:null,
                        seq:null,
                        flag:1
                }
                this.cityVisible=true
            },
            add(){
                let _this=this
                cityGet({id:_this.currentCityId}).then(p=>{
                    _this.city={
                        id:null,
                        name:null,
                        parentId:p.id,
                        seq:null,
                        flag:1
                    }
                    _this.cityVisible=true
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
            },
            generateId(item){
                return "tree_"+item.id
            },
            closeCityDialog(){
                this.cityVisible=false
            },
            saveCity(){
                let _this=this
                citySave(_this.city).then(p=>{
                    _this.cityVisible=false
                    _this.$message({
                        message: '保存城市数据成功',
                        type: 'success'
                    });
                    _this.initCity()
                }).catch(function (error) {
                    this.$message.error('后端错误:'+error.message);
                })
            },
            importCitys(){
                let _this=this
                cityImport().then(p=>{
                    _this.$message({
                        message: '导入城市数据成功',
                        type: 'success'
                    });
                    _this.initCity()
                }).catch(function (error) {
                    _this.$message.error('数据导入出错');
                })
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
    .city-tree{
        overflow-y: scroll;
        max-height: 560px;
        height: 70%;
        margin: 10px 5px;

    }
</style>