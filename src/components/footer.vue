<template>
  <div :class="filterHB ? 'footer' : 'footer fixbottom'">
    <div class="container b_line">
      <!--<span class="cominfo">
        上海帜讯信息技术股份有限公司
      </span>-->
      <span class="beianinfo"><i></i>软件企业编号：沪CR-2013-0914 | 高新技术企业编号：GR201331000080     Copyright © 2017 上海帜讯信息技术股份有限公司</span>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      filterHB: function () {
        return 'login|register'.indexOf(this.$route.name) === -1
      }
    },
    components: {}
  }
</script>
<style lang="scss">


  .footer{
    /*height: 70px;*/
    background-color: #2C2C2E;
    position: absolute;
    bottom: 0px;
    width: 100%;
    min-width: 1200px;
    z-index: 2;
    .b_line{
      /*border-top: 1px #fff solid;*/
    }
    .cominfo{
      font-size: 14px;
      color: #fff;
      line-height: 200%;
      margin-top: 20px;
      display: inline-block;
    }
    .beianinfo{
      line-height: 70px;
      font-size: 14px;
      color: #fff;
      // float: right;
      display: block;
      /*margin: 20px auto;*/

      text-align: center;
      i{
        width: 20px;
        height:20px;
        display: inline-block;
        margin-right: 2px;
        background: url('~@/assets/images/beian-ico.png') left no-repeat;
        vertical-align: middle;
      }
    }
    &.fixbottom {
      // position: fixed;
      bottom: 0;
      width: 100%;
      background-color: transparent;
      .b_line {
        border-top: none;
      }
    }
  }

</style>
