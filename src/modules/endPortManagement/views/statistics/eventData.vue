<template>
  <section class="event-data" style="width: 80%;position: relative; overflow: auto;">
    <NavBar></NavBar>
    <div class="content" style=" height: 1200px;overflow: auto;">
        <div style="float: left;width: 100%;overflow: auto;">
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
      <p :id="columnId" :option="columnOption" v-loading="isBusy"></p>
      <div>
        <el-table
          :data="tableList" :border=true
          style="width: 99%;height: 500px;overflow-y: auto;overflow-x: auto">
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
  import { eventDataSts } from '@/api/api'
  import $ from 'jquery'

  export default {
    name: 'app',
    data() {
      return {
        columnId: 'columnChart',

        columnOption: {
          chart: {
            type: 'column'
          },
          xAxis: {
            categories: []//指定x轴分组
          },
          title: {
            text: "用户行为数据统计"//指定头部标题
          },
          subtitle: {
            text: ''
          },
          credits: {
            enabled: false     //不显示LOGO
          },
          yAxis: {
            min: 0,
            title: {
              text: '用户行为数据频次'
            },
            stackLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold'
              }
            }
          },
          tooltip: {
            formatter: function () {
              return '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '次<br/>' +
                '总量: ' + this.point.stackTotal+"次";
            }
          },
          plotOptions: {
            column: {
              stacking: 'normal'
            }
          },
          series: []
        },

        spList:[],
        selectValue:"",
        startTime:null,
        endTime:null,

        tableList:[],
        colsList:[],
        isBusy: false

      }
    },
    methods:{
      getEventData(){
        var _this=this;
        _this.isBusy=true;
        _this.columnOption.series=[];//置空数据
        _this.columnOption.xAxis.categories=[];
        var paras={
          spId:this.selectValue,
          startTime:this.startTime,
          endTime:this.endTime
        };
        console.log(paras);
        eventDataSts(paras).then(res => {
          if(null==res){
            this.$message('未查询到数据')
          }
          else {
            _this.columnOption.series=res.data;
            _this.columnOption.xAxis.categories=res.eventNames;

            _this.tableList=res.tableList;
            _this.colsList=res.colsList;
          }
          _this.isBusy=false;

          var selectCorpName="所有企业";
          $.each(_this.spList,function (index,item) {
              if(item.spId==_this.selectValue&&item.spId!=""){
                selectCorpName=item.spName;
              }
          });

          _this.columnOption.subtitle.text=selectCorpName+"数据统计";
          _this.spList=res.spList;
          HighCharts.chart(this.columnId,this.columnOption)
        });
      },
      search(){
        this.getEventData();
      }
    },
    created () {
    },
    mounted() {
      this.getEventData();
    },
    components: {
      NavBar
    }
  }



</script>

<style>
  #columnChart {
    /*width: 100%;*/
    height: 600px;
    margin: 5px;
  }
  .event-data{
    margin-left: 10px;
    margin-top: 10px;
  }

</style>
