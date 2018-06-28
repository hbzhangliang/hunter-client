<template>
    <div class="pagination" v-if="total>0">
        <el-pagination
                layout="total,sizes,prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :page-sizes="pageSizes"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
        >
        </el-pagination>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Pagination } from 'element-ui'

    Vue.use(Pagination)
    export default {
        data () {
            return {}
        },
        props: {
            total: { //记录总数
                type: Number
            },
            pageSize: { //每页显示几条
                type: Number
            },
            pageSizes: { //pageSize选项列表
                type: Array,
                default () {
                    return [5, 10, 20, 30, 50]
                }
            },
            currentPage: Number, //当前第几页
            reloadFunc: Function, //重新加载列表的方法
        },
        methods: {
            handleCurrentChange (val) {
                this.$emit('update:currentPage', val)
                this.$emit('currentChange', (val - 1) * this.pageSize) //返回当前页差值
                this.$emit('current-change', val) //返回当前页
                this.reloadIf()
            },
            handleSizeChange (val) {
                this.$emit('update:pageSize', val)
                this.$emit('sizeChange', val)
                this.reloadIf()
            },
            reloadIf () {
                if (this.reloadFunc) {
                    this.reloadFunc()
                }
            }
        },

    }
</script>

<style>
    .pagination {
        margin-top: .22rem;
        text-align: right;
    }
</style>
