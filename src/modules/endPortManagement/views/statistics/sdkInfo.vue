<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content" style="height: 900px;">
      <p class="main">
      <div class="banner">
      </div>
      <p style="margin: 5px 2px">

        <template>
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
        </template>
      <p class="x-bar" >
      <p :id="lineId" :option="lineOption"
         v-loading="isBusy"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%;">
      </p>
      <div>
        <el-table
          :data="tableList" border="true"
          style="width: 95%;height: 660px;overflow-y: auto;">
          <el-table-column  :prop="item.prop"  :label="item.label" v-for="item in colsList" v-loading="isBusy" :key="item">
          </el-table-column>
        </el-table>
      </div>

    </div>
  </section>

</template>


<script>
  import HighCharts from 'highcharts'
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import { sdkInfoSts } from '@/api/api'
  import $ from 'jquery'

  export default {
    name: 'app',
    data() {
      return {
        lineId: 'lineChart',
        lineOption:{
          title: {
            text: 'SDK功能调用详情统计'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: [] //指定x轴分组
          },
          yAxis: {
            title: {
              text: 'SDK功能调用频次'
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
          series: [{
            name: '安装，实施人员',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          }, {
            name: '工人',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          }, {
            name: '销售',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
          }, {
            name: '项目开发',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
          }, {
            name: '其他',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
          }],
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
      getBizInfo(){
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
        sdkInfoSts(paras).then(res => {
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
        this.getBizInfo();
      }

    },
    created () {
//      this.getBizInfo();
    },
    mounted() {
      this.getBizInfo();
    },
    components: {
      NavBar
    }
  }



</script>

<style>
  #lineChart {
    height: 600px;
    margin: 5px;
  }
  .biz-data{
    margin-left: 20px;
    margin-top: 10px;
  }

</style>
