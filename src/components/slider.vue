<template>
  <div>
    <el-menu
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
          <!--<template slot="title">&#45;&#45;&#45;&#45;&#45;&#45;</template>-->
          <el-menu-item index="1、-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-2">选项3</el-menu-item>
          <el-menu-item index="1-2">选项4</el-menu-item>
          <el-menu-item index="1-2">选项5</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
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
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-2">选项3</el-menu-item>
          <el-menu-item index="1-2">选项4</el-menu-item>
          <el-menu-item index="1-2">选项5</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项6</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
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
        }

    },
    components: {},
    computed: {
        ...mapState(["leftMenuCollapse"])
    },
    watch: {
        func(){
            let _this=this
            console.log("watch")
            _this.isCollapse=_this.leftMenuCollapse
        }
    },
    created () {
        this.initMenuCollapse()
    }
  }
</script>

<style lang="scss">

</style>
