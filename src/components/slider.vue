<template>
  <div>
    <el-menu
            :router="true"
            :default-active="activeIndex"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-menu-item index="1-4">选项4</el-menu-item>
          <el-menu-item index="1-5">选项5</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-6">选项6</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-7">
          <template slot="title">选项4</template>
          <el-menu-item index="1-7-1">选项7</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航三</span>
        </template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航五</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">选项1</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
          <el-menu-item index="5-3">选项3</el-menu-item>
          <el-menu-item index="5-4">选项4</el-menu-item>
          <el-menu-item index="5-5">选项5</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="5-6">
          <template slot="title">选项6</template>
          <el-menu-item index="5-6-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import end from '@/common/js/utils.js'
  import {} from '@/api/api'
  import {mapState} from 'vuex'
  import $ from 'jquery'
  export default {
    data () {
      return {
          isCollapse:false
      }
    },
    methods: {
        initMenuCollapse(){
            this.isCollapse=this.leftMenuCollapse
            // let _this=this
            // setInterval(function () {
            //     _this.isCollapse=_this.leftMenuCollapse
            // },2000);
        },

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        activeIndex: function () {
            let activeIndex = this.$route.name
            console.log(activeIndex)
            return activeIndex
        }

    },
    components: {},
    computed: {
        ...mapState(["leftMenuCollapse"])

    },
    watch: {
        leftMenuCollapse(){
            this.isCollapse=this.leftMenuCollapse
        }
    },
    created () {
        this.initMenuCollapse()
    }
  }
</script>

<style lang="scss">

</style>
