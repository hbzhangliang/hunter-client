<template xmlns:e-html="http://www.w3.org/1999/xhtml">
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content">
      <div class="main">
        <div class="banner">
          <div v-html="htmlData"></div>
        </div>
      </div>
    </div>
  </section>


</template>
<style scoped>

  .banner table{ }
  /*.banner table tr td{background: #f6f6f6; border: 1px solid blue;}*/

  .banner table tr td p{font-size: small}


</style>

<script>
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import { getOpenContent } from '@/api/api'
  import $ from 'jquery'
  export default{
    data () {
      return{
          htmlData:null
      }
    },
    methods:{
        init(){
          var _this=this;
          var code=this.$route.name
          console.log(code+"jjjjjjj");
          getOpenContent({"code":code}).then(res => {
            _this.htmlData=res.content;
          });
        }
    },
    created () {
        console.log("create")
        this.init();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "init"
    },
    components: {
      NavBar
    }
  }


</script>
