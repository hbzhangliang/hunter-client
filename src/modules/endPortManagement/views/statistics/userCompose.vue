<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content" style="height: 720px;">
      <div class="main">
        <div class="banner">
        </div>
          <div class="total_info">
            <div class="elment">
              <span>用户总数</span><br/>
              <b>3276531</b>
            </div>
            <div class="elment">
              <span>本月新增用户</span><br/>
              <b>6531</b>
              <span style="position: absolute;right: 30px;bottom: 12px;">23%</span>
            </div>
            <div class="elment">
              <span>DAU／MAU</span><br/>
              <b>0.07</b>
            </div>
            <div class="elment">
              <span>静默用户占比</span><br/>
              <b>67%</b>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
  import HighCharts from 'highcharts'
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
//  import { terminalSts } from '@/api/api'
//  import $ from 'jquery'

  export default {
    name: 'app',
    data() {
      return {

      }
    },
    methods:{

    },
    created () {

    },
    mounted() {

    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .total_info{
    width: 95%;
    height: 150px;
    background: #efefef;
    padding: 20px;
    min-width: 960px;
  }

  .elment{
    width: 20%;
    height: 100px;
    background: white;
    border: 1px solid #dfdfdf;
    font-size: 20px;
    float: left;
    margin: 5px 20px;
    padding: 5px;
    position: relative;
  }
  .elment span{
    padding-left: 20px;
    padding-top: 30px;
  }
  .elment b{
    font-size: 25px;
    float: right;
    padding-right: 20px;
  }
</style>
