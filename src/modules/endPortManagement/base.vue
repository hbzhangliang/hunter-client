<!-- Created by chunmingdeng on 2018/4/2 -->
<template>
  <div id="main-container" class="clearfix">
    <Slide class="slider"></Slide>
    <router-view class="right clearfix">
    </router-view>
  </div>
</template>

<script>
  import Slide from '@/components/slider'
  export default {
    name:'base',
    data: function () {
      return {}
    },
    components:{
      Slide
    }
  }
</script>

<style lang="scss">

</style>
