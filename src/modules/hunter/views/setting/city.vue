<template>
    <section v-on:click="hideMenuCss">
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


            <div @contextmenu="showMenu" style="height: 200px;width: 300px;background: lightcyan">
                <VueContextMenu id="contextmenu" :contextMenuData="menuData" @refresh="refresh" @add="add" @del="del">
                </VueContextMenu>
            </div>


        </div>

    </section>
</template>
<script>
    import end from '@/common/js/utils.js'
    import {cityTree} from '@/api/api'
    // import VueContextMenu from './ContextMenu.vue'
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
                this.menuData.axios = {
                    x, y
                }
                this.showMenuCss()
            },
            add(){
                alert("add")
                this.hideMenuCss()
            },
            del(){
                alert("del")
                this.hideMenuCss()
            },
            refresh(){
                alert("refresh")
                this.hideMenuCss()
            },
            showMenuCss(){
                var _this=this
                $(".vue-contextmenuName-"+this.menuData.menuName).css({display:"block",left:_this.menuData.axios.x,top:_this.menuData.axios.y})
            },
            hideMenuCss(){
                $(".vue-contextmenuName-"+this.menuData.menuName).hide()
            }
        },
        created () {
            this.initCity()
        },
        components: {
            // VueContextMenu
        }
    }
</script>
<style lang="scss" scoped>

</style>