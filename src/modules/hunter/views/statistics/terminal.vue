<template>
  <section class="end-container">
  <NavBar></NavBar>
  <div class="content">
    <div class="main">
      <div class="banner">
      </div>
      <div id="app" style="margin: 5px 2px">

        <template>
          <el-select v-model="selectValue" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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

        <div id="chartArea" style="width: 90%;min-width: 960px;position: relative;overflow-x: auto;">
            <div style="float: left;">
                 <p :id="lineId" :option="lineOption"></p>
           </div>
            <div style="float:left;">
                 <p :id="columnId" :option="columnOption"></p>
            </div>
            <div style="float:left;">
                 <p :id="pieId" :option="pieOption"></p>
            </div>
            <div style="float:left;">
              <div class="dataSts">
                <el-table
                  :data="tableData"
                  >
                  <el-table-column
                    prop="seq"
                    label="排序号">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="count"
                    label="总数">
                  </el-table-column>
                </el-table>
              </div>
            </div>
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
  import { terminalSts } from '@/api/api'
  import $ from 'jquery'


  export default {
    name: 'app',
    data() {
      return {
        lineId: 'lineChart',
        lineOption:{
          chart: {
            type:'line'//指定图表的类型，默认是折线图（line）
          },
          xAxis: {
            categories: [] //指定x轴分组
          },
          title: {
            text: ""//指定头部标题
          },
          credits: {
            enabled: false     //不显示LOGO
          },
          yAxis: {
            title: {
              text: '', //指定y轴的标题
            },
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
              }
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}"></span>占总数 <b>{point.y:.2f}%</b><br/>'
          },
          series: []
        },

        columnId:'columnChart',
        columnOption:{
          chart: {
            type:'column'//指定图表的类型，默认是折线图（line）
          },
          xAxis: {
            categories: [] //指定x轴分组
          },
          title: {
            text: ""//指定头部标题
          },
          credits: {
            enabled: false     //不显示LOGO
          },
          yAxis: {
            title: {
              text: '', //指定y轴的标题
            },
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
              }
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>占总量{point.y:.2f}%</b><br/>'
          },
          series: []
        },

        pieId:'pieChart',
        pieOption:{
          chart: {
            type:'pie',//指定图表的类型，默认是折线图（line）
            options3d: {
              enabled: true,
              alpha: 45
            }
          },
          xAxis: {
            categories: [] //指定x轴分组
          },
          title: {
            text: ""//指定头部标题
          },
          credits: {
            enabled: false     //不显示LOGO
          },
          yAxis: {
            title: {
              text: '', //指定y轴的标题
            },
          },
          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>占总量{point.y:.2f}%</b><br/>'
          },
          plotOptions: {
            pie: {
              innerSize: 1,
              depth: 45,
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true
              },
              showInLegend: true
            }
          },
          series: []
        },


        typeOptions:[
          {
            value: 'type',
            label: '机型'
          },
          {
            value: 'pixel',
            label: '分辨率'
          },
          {
            value: 'os',
            label: '操作系统'
          },
          {
            value: 'netType',
            label: '网络运营商'
          },
          {
            value: 'version',
            label: '版本统计'
          },
          {
            value: 'provinces',
            label: '省份统计'
          },
          {
            value: 'city',
            label: '城市统计'
          }
        ],
        selectValue:"type",
        startTime:null,
        endTime:null,

        tableData:[]
      }
    },
    methods:{
      getMobileType(){
        var _this=this;
        _this.lineOption.series=[];//置空数据
        _this.lineOption.xAxis.categories=[];

        _this.columnOption.series=[];//置空数据
        _this.columnOption.xAxis.categories=[];

        _this.pieOption.series=[];//置空数据
        _this.pieOption.xAxis.categories=[];

        _this.tableData=[];
        var paras={
          type:this.selectValue,
          startTime:this.startTime,
          endTime:this.endTime
        };
        terminalSts(paras).then(res => {
          if(res.data!="") {
              var lineData={
                  name:"终端机型统计",
                  data:[]
              }
              var otherCount=res.sumCount;
            res.data.forEach(function (item, index) {
              _this.lineOption.xAxis.categories.push(item.name);
              _this.columnOption.xAxis.categories.push(item.name);
              lineData.data.push(item.y);
              lineData.data.name=item.name;

              if (index<5) {//最多5条记录
                //统计数据 table使用
                var tmp = {
                  seq: index + 1,
                  name: item.name,
                  count: item.count
                }
                otherCount-=item.count;
                _this.tableData.push(tmp);
              }
            });

            var tmp = {
              seq: "6",
              name: "其他",
              count: otherCount
            }
            _this.tableData.push(tmp);
            tmp = {
              seq: "",
              name: "总计",
              count: res.sumCount
            }
            _this.tableData.push(tmp);


            _this.tableName=res.name;

            _this.lineOption.series.push(lineData);
            _this.lineOption.title.text = res.name+"(总样本:"+res.sumCount+")";
            _this.lineOption.yAxis.title.text = "所占百分比";

            _this.columnOption.series.push(res);
            _this.columnOption.title.text = res.name+"(总样本:"+res.sumCount+")";
            _this.columnOption.yAxis.title.text = "所占百分比";

            _this.pieOption.series.push(res);
            _this.pieOption.title.text = res.name+"(总样本:"+res.sumCount+")";
            _this.pieOption.yAxis.title.text = "所占百分比";

          }
          HighCharts.chart(_this.lineId, _this.lineOption)//加载刷新
          HighCharts.chart(_this.columnId, _this.columnOption)//加载刷新
          HighCharts.chart(_this.pieId, _this.pieOption)//加载刷新
        });
      },
      search(){
          this.getMobileType();
      },
      initPage(){
          var width=$(window).width()/2;
          var elementWidth=width/2-20;
          $("#chartArea").css({"width":width,"min-width":width});
          $("#lineChart,#columnChart,#pieChart").css({"width":elementWidth,"min-width":elementWidth});
        $(".dataSts").css({"width":elementWidth,"min-width":elementWidth});
      }
    },
    created () {
      this.getMobileType();
    },
    mounted() {
      //init page size
      // this.initPage();

      HighCharts.chart(this.lineId,this.lineOption)
      HighCharts.chart(this.columnId,this.columnOption)
      HighCharts.chart(this.pieId,this.pieOption)
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  #lineChart {
     height: 400px;
     margin: 5px;
   }
  #columnChart {
    height: 400px;
    margin: 5px;
  }
  #pieChart {
    height: 400px;
    margin: 5px;
  }
  .dataSts {
    width: 600px;
    position: relative;
    height: 400px;
    min-height: 400px;
    margin: 5px;
    background: white;
  }
</style>
