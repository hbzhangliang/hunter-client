<template>
  <section class="biz-data" style="width: 80%;position: relative; overflow: auto;">
    <NavBar></NavBar>
    <div class="content" style="height: 1000px;width: 100%;overflow: auto;">

        <div style="width:100%;overflow: auto;">
          <el-select v-model="selectValue" placeholder="请选择">
            <el-option
              v-for="item in spList"
              :key="item.spId"
              :label="item.spName"
              :value="item.spId">
            </el-option>
          </el-select>

          <el-date-picker style="margin-left: 30px;"
                          v-model="startTime"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
          <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>

          <el-button type="primary" style="margin-left: 30px;" @click="search">查询</el-button>

      <p class="x-bar" >
      <p :id="lineId" :option="lineOption"
         v-loading="isBusy"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      </p>


      <div>
        <el-table
          :data="tableList" border="true"
          style="width: 95%;height: 240px;overflow-y: auto;">
          <el-table-column  :prop="item.prop"  :label="item.label" v-for="item in colsList" v-loading="isBusy" :key="item">
          </el-table-column>

        </el-table>

      </div>
      </div>
    </div>
  </section>

</template>


<script>
  import HighCharts from 'highcharts'
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import { eventInfoSts } from '@/api/api'
  import $ from 'jquery'

  export default {
    name: 'app',
    data() {
      return {
        lineId: 'lineChart',
        lineOption:{
          title: {
            text: '用户行为详情统计'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: [] //指定x轴分组
          },
          yAxis: {
            title: {
              text: '用户行为频次'
            }
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },
          credits: {
            enabled: false     //不显示LOGO
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              }
            }
          },
          series: [],
          responsive: {
            rules: [{
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }
        },

        spList:[],
        selectValue:"",
        startTime:null,
        endTime:null,

        isBusy: false,

        tableList:[],
        colsList:[]

      }

    },
    methods:{
      getEventInfo(){
        var _this=this;
        _this.isBusy=true;
        _this.lineOption.series=[];//置空数据
        _this.lineOption.xAxis.categories=[];
        var paras={
          spId:this.selectValue,
          startTime:this.startTime,
          endTime:this.endTime
        };
        console.log(paras);
        eventInfoSts(paras).then(res => {
          if (null == res) {
            this.$message('未查询到数据')
          }
          else {
            _this.lineOption.series=res.data;
            _this.lineOption.xAxis.categories=res.xNames;
          _this.tableList=res.tableList;
          _this.colsList=res.colsList;
          }
          _this.spList=res.spList;

          var selectCorpName="所有企业";
          $.each(_this.spList,function (index,item) {
            if(item.spId==_this.selectValue&&item.spId!=""){
              selectCorpName=item.spName;
            }
          });

          _this.lineOption.subtitle.text=selectCorpName+"数据统计";


          HighCharts.chart(this.lineId,this.lineOption)
          _this.isBusy=false;
        })
      },
      search(){
        this.getEventInfo();
      }

    },
    created () {
    },
    mounted() {
      this.getEventInfo();
    },
    components: {
      NavBar
    }
  }



</script>

<style>
  #lineChart {
    /*width: 1220px;*/
    height: 600px;
    margin: 5px;
  }
  .biz-data{
    margin-left: 10px;
    margin-top: 10px;
  }

</style>
