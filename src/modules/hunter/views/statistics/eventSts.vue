<template>
  <section class="event_sts" style="width: 80%;overflow: auto;">
    <NavBar></NavBar>
    <div class="content" style="height: 720px;width: 100%;overflow: auto;">
      <div style="width: 100%;overflow: auto;height: 700px;">
        <el-select v-model="selectCorp" placeholder="请选择企业">
          <el-option
            v-for="item in spList"
            :key="item.spId"
            :label="item.spName"
            :value="item.spId">
          </el-option>
        </el-select>

        <el-date-picker style="margin-left: 20px;"
                        v-model="startTime"
                        type="date"
                        placeholder="选择统计开始日期">
        </el-date-picker>

        <el-select v-model="chooseValue" placeholder="请选择统计时间类型">
          <el-option
            v-for="item in chooseSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>


        <el-select v-show="chooseValue=='day'" v-model="selectValue" placeholder="请选择统计时长">
          <el-option
            v-for="item in daySelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-select v-show="chooseValue=='month'" v-model="selectValue" placeholder="请选择统计时长">
          <el-option
            v-for="item in monthSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>


        <el-button type="primary" style="margin-left: 30px;" @click="search">查询</el-button>
          <p class="x-bar">
          <p :id="columnId" :option="columnOption" v-loading="loading"></p>
      </div>
    </div>
  </section>
</template>

<script>

  import HighCharts from 'highcharts'
  import NavBar from '@/components/navBar'
  import end from '@/common/js/utils.js'
  import { eventStsSts } from '@/api/api'
  import $ from 'jquery'

  export default {
    name: 'app',
    data() {
      return {
        columnId:"columnChart",
        columnOption:{
          chart: {
            type: 'column'
          },
          title: {
            text: '用户行为统计'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: [],
            crosshair: true
          },
          credits: {
            enabled: false     //不显示LOGO
          },
          yAxis: {
            min: 0,
            title: {
              text: '用户行为频次'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:f} 次</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            name: '东京',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          }, {
            name: '纽约',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
          }, {
            name: '伦敦',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
          }, {
            name: '柏林',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
          }]
        },

        selectCorp:"",
        spList:[],
        selectValue:"",
        startTime:null,

        chooseSelect:[
          {
            value: 'day',
            label: '按日统计'
          },
          {
            value: 'month',
            label: '按月统计'
          }
        ],
        chooseValue:"",

        daySelect:[
          {
            value: '5',
            label: '5天'
          },
          {
            value: '15',
            label: '15天'
          },
          {
            value: '30',
            label: '30天'
          },
          {
            value: '50',
            label: '50天'
          }
        ],

        monthSelect:[
          {
            value: '3',
            label: '3个月'
          },
          {
            value: '5',
            label: '5个月'
          },
          {
            value: '12',
            label: '12个月'
          },
          {
            value: '24',
            label: '24个月'
          },
          {
            value: '36',
            label: '36个月'
          }
        ],
        loading: false
      }
    },
    methods:{
        getEventSts(){
          var _this=this;
          _this.loading=true;
          _this.columnOption.series=[];//置空数据
          _this.columnOption.xAxis.categories=[];

          var paras={
            spId:this.selectCorp,
            startTime:this.startTime,
            strType:this.chooseValue,
            strLength:this.selectValue
          };
          if(paras.startTime==null||paras.strType==null||paras.strLength==null){
            this.$message({
              message: '参数:开始时间，类型，及时长 不能为空',
              type: 'warning'
            });
            _this.loading=false;
            console.log(_this.loading)
            return;
          }
          console.log(paras);
          eventStsSts(paras).then(res => {
            if(null==res){
              this.$message('未查询到数据')
            }
            else {
              _this.columnOption.series=res.data;
              _this.columnOption.xAxis.categories=res.xNames;
            }

            _this.spList=res.spList;

            var selectCorpName="所有企业";
            $.each(_this.spList,function (index,item) {
              if(item.spId==_this.selectCorp&&item.spId!=""){
                selectCorpName=item.spName;
              }
            });

            _this.columnOption.subtitle.text=selectCorpName+"数据统计";

            _this.loading=false;
            HighCharts.chart(this.columnId,this.columnOption)
          });

        },

      search(){
          this.getEventSts();
      }
    },
    created () {
    },
    mounted() {
      this.getEventSts();
    },
    components: {
      NavBar
    }
  }


</script>


<style>
  #columnChart {
    /*width: 1220px;*/
    height: 620px;
    margin: 5px;
  }
  .event_sts{
    margin-left: 10px;
    margin-top: 10px;
  }

</style>
