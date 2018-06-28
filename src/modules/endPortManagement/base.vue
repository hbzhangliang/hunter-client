<!-- Created by chunmingdeng on 2018/4/2 -->
<template>
  <div id="main-container" class="clearfix">
    <div class="sub-header bgc-fff clearfix">
      <menu-header :isShow="false"></menu-header><crumbs></crumbs>
      <div class="h-10 bgc-f7f7fb"></div>
    </div>
    <Slide class="slider"></Slide>
    <router-view class="right clearfix" style="border-left:0px solid #eaeaea">
    </router-view>
  </div>
</template>

<script>
  import menuHeader from '@/components/menu-header'
  import crumbs from '@/components/crumbs'
  import Slide from '@/components/slider'
  export default {
    name:'base',
    data: function () {
      return {}
    },
    components:{
      Slide,
      crumbs,
      menuHeader
    }
  }
</script>

<style lang="scss">
  #main-container{
    .sub-header{
      width: 100%;
      /*height: 86px;*/
      border-bottom: 1px solid #eaeaea;
      position: relative;
      z-index: 2;
    }
    .slider{
      position: relative;
      top:-10px;
      z-index: 3;
    }
  }
</style>
