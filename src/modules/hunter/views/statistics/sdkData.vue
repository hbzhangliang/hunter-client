<template>
  <section class="end-container">
    <NavBar></NavBar>
    <div class="content" style="height: 1080px;">
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
      <p :id="columnId" :option="columnOption" v-loading="isBusy" style="width: 100%;"></p>
      <div>
        <el-table
          :data="tableList" :border="true"
          style="width: 95%;height: 400px;overflow-y: auto;">
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
  import { sdkDataSts } from '@/api/api'
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
            categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']//指定x轴分组
          },
          title: {
            text: "SDK功能调用统计"//指定头部标题
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
              text: 'SDK功能调用总次数'
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
          series: [
            {
              name: '小张',
              data: [5, 3, 4, 7, 2]
            }, {
              name: '小彭',
              data: [2, 2, 3, 2, 1]
            }, {
              name: '小潘',
              data: [3, 4, 4, 2, 5]
            }
          ]


        },

        spList:[
          {
            value: '0',
            label: '第0个企业'
          },
          {
            value: '1',
            label: '第1个企业'
          },
          {
            value: '2',
            label: '第2个企业'
          },
          {
            value: '3',
            label: '第3个企业'
          },
          {
            value: '4',
            label: '第4个企业'
          }
        ],
        selectValue:"",
        startTime:null,
        endTime:null,
        tableList:[],
        colsList:[],
        isBusy: false

      }
    },
    methods:{
      getSdkData(){
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
        sdkDataSts(paras).then(res => {
          if(null==res){
            this.$message('未查询到数据')
          }
          else {
            _this.columnOption.series=res.data;
            _this.columnOption.xAxis.categories=res.actNames;

            _this.tableList=res.tableList;
            _this.colsList=res.colsList;
          }

          _this.isBusy=false;
          _this.spList=res.spList;

          var selectCorpName="所有企业";
          $.each(_this.spList,function (index,item) {
            if(item.spId==_this.selectValue&&item.spId!=""){
              selectCorpName=item.spName;
            }
          });

          _this.columnOption.subtitle.text=selectCorpName+"数据统计";


          HighCharts.chart(this.columnId,this.columnOption)
        });
      },
      search(){
        this.getSdkData();
      }
    },
    created () {
//      this.getSdkData();
    },
    mounted() {
        this.getSdkData();
//      HighCharts.chart(this.columnId,this.columnOption)
    },
    components: {
      NavBar
    }
  }



</script>

<style>
  #columnChart {
    height: 600px;
    margin: 5px;
  }
  .biz-data{
    margin-left: 20px;
    margin-top: 10px;
  }

</style>
