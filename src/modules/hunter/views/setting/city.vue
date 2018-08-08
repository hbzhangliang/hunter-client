<template>
    <section>
        <div>
            <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>

            <el-tree
                    class="filter-tree"
                    :data="data"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree2">
            </el-tree>


            <div @contextmenu="showMenu" style="height: 200px;width: 300px;background: green">
                <VueContextMenu :contextMenuData="menuData" @refresh="refresh" @add="add" @del="del">
                </VueContextMenu>
            </div>


        </div>

    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {cityTree} from '@/api/api'
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
                    menuName:'name1',
                    axios:{x:null, y:null},
                    menulists:[
                        {fnHandler:'refresh',icoName:'el-icon-setting',btnName:'刷新'},
                        {fnHandler:'add',icoName:'el-icon-more',btnName:'添加'},
                        {fnHandler:'del',icoName:'el-icon-delete',btnName:'删除'},
                    ],
                }
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
            },
            showMenu:function (parameter) {
                parameter.preventDefault()
                var x = parameter.clientX
                var y = parameter.clientY
                this.entityTreeContextMenu.axios = {
                    x, y
                }
            },
            add(){

            },
            del(){

            },
            refresh(){

            }
        },
        created () {
            this.initCity()
        }
    }
</script>
<style lang="scss" scoped>

</style>