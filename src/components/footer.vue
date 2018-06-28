<template>
  <div class="footer">
      <span class="ft_info"><i></i>软件企业编号：沪CR-2000-2999 | 高新技术企业编号：GR2010101010101     Copyright © 2018 Cubic有限公司</span>
  </div>
</template>

<script>
  export default {
    computed: {
    }
  }
</script>
<style lang="scss">


  .footer{
    /*height: 70px;*/
    background-color: lightskyblue;
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
