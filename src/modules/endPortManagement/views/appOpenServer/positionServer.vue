<template>
  <section class="end-container">
    <h3 class="end-system-title"> 终端运营管理基础能力</h3>
    <endSearch class="search" v-model="searchData"></endSearch>
    <div class="position">
      <h6 class="end-blueTitle">定位服务说明</h6>
      <hr class="end-h6hr"/>
      <p>1、js、sdk调用。</p>
      <p>2、需将标准经纬度与第三方地图经纬度进行换算。</p>
      <p>3、可设置上报位置频率：设置定位的时间周期如5分钟。</p>
      <h6 class="end-blueTitle">定位服务适配说明</h6>
      <hr class="end-h6hr"/>
      <p>手机定位服务应用于汽车救援手机定位服务应用于汽车救援服务，给汽车救援服务商和车主带来了方便。过去车主的车出现故障，通过打电话的方式说明自己的具体位置，甚至为了说清自己的具体位置要花费上百元的话费，也说不清自己所在位置，使用手机定位只需要打一个电话，回复一条短信就可以定位车主的具体位置，前后花费不到一分钟，不需要在汽车和手机上安装任何东西，相当方便，深受汽车救援行业的喜爱。手机定位服务应用于医疗急救手机定位服务应用于医疗急救，给医疗行业和病人带来了方便。手机定位服务应用于医疗急救采取拨号定位方式，不需要回复短信，病人只需向医院打一个电话就可以被医院方定位，获得病人的具体位置，迅速前往救援，深受病人的喜爱。</p>
      <h6 class="end-blueTitle">定位服务接口</h6>
      <hr class="end-h6hr"/>
      <p>调用接口并不是无限制的。为了防止公众号的程序错误而引发服务器负载异常，默认情况下，每个号调用接口都不能超过一定限制，当超过一定限制时，调用对应接口会收到如下错误返回码：
        {"errcode":45009,"errmsg":"api freq out of limit"}</p>
      <p>开发者可以登录平台，在帐号后台开发者中心接口权限模板查看帐号各接口当前的日调用上限和实时调用量，对于认证帐号可以对实时调用量清零，说明如下：</p>
      <p>1、由于指标计算方法或统计时间差异，实时调用量数据可能会出现误差，一般在1%以内。</p>
      <p>2、每个帐号每月共10次清零操作机会，清零生效一次即用掉一次机会（10次包括了平台上的清零和调用接口API的清零）。</p>
      <p>3、第三方帮助公众号调用时，实际上是在消耗公众号自身的quota。</p>
      <p>4、每个有接口调用限额的接口都可以进行清零操作。</p>
    </div>
  </section>
</template>
<script>
  import endSearch from '../../components/search.vue'
  export default{
    data () {
      return {
        searchData: ''
      }
    },
    components: {
      endSearch
    },
    watch: {
      searchData (value) {
        console.log(value)
      }
    }
  }
</script>
<style lang="scss" scoped>
.position{
  background: white;
  min-height: 100%;
  padding: 30px;
}
.position>h6{
  margin-top: 40px;
}
.position>p{
  color: #626262;
  margin:15px 0;
}
.end-system-title{
  display: inline-block;
  margin-bottom: 15px;
}
.search{
  float: right;
  margin-right: 30px;
}
</style>
