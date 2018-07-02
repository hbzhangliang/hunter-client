<!-- Created by chunmingdeng on 2018/4/18 -->
<template>

  <div class="end-container" v-loading.fullscreen="loading">
    <div style="padding: 10px 0;">
      <!--<NavBar></NavBar>-->
      <!--<div><div class="fs-14"><a href="/">首页</a> &nbsp>&nbsp <a href="#" @click="routerReplace('/base/appManageList')">App管理列表</a> &nbsp>&nbsp 数据统计 </div></div>-->
    </div>
    <div class="bgc-fff">
      <el-tabs v-model="activeName">
        <el-tab-pane name="00" label="成员开通情况">
          <div class="content-panel">
            <div class="content-panel-item">
              <span class="fs-14">成员开通数：</span>
              <span class="fs-24 c-279eec">279</span>
            </div>
            <div class="content-panel-item">
              <span class="fs-14">登陆用户数：</span>
              <span class="fs-24 c-279eec">279</span>
            </div>
            <div class="content-panel-item">
              <span class="fs-14">未登陆用户数：</span>
              <span class="fs-24 c-279eec">279</span>
            </div>
            <el-button type="primary" size="small" class="send-message">发送提醒</el-button>
          </div>
          <el-table
            size="small"
            :data="dataListOne"
            border
            @selection-change="handleSelectChange"
            :header-cell-style="{background:'#f5f5f5'}"
            style="margin-top: 20px">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="未登陆成员" prop="name"></el-table-column>
            <el-table-column label="手机号码" prop="name"></el-table-column>
            <el-table-column label="部门" prop="name"></el-table-column>
            <el-table-column label="最近消息提醒" prop="name">
              <template slot-scope="scope">
                <p v-if="scope.row.time">{{scope.row.time}}</p>
                <el-button v-else size="small" type="text">发送消息</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="mart-20 pagination-content clearfix">
            <el-button type="primary" size="small" class="send-message">发送提醒</el-button>
            <el-pagination
              layout="total,sizes,prev,pager,next"
              :currentPage="pageInfo.currentPage"
              :total="pageInfo.total"
              :page-sizes="[10,20]">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane name="01" label="活跃用户">
          <div>
            <span>时间：</span>
            <el-date-picker
              v-model="timeRange"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="small"></el-date-picker>
            <el-button type="primary" size="mini"  icon="el-icon-search"  @click="searchActiveUse">查询</el-button>
          </div>
          <div id="main"></div>
          <div class="prev-line mart-15 marb-15"><span>用户请求事件详情</span></div>
          <el-table
            size="small"
            :data="pageInfoTwo.data"
            border
            :header-cell-style="{background:'#f5f5f5'}">
            <el-table-column prop="" label="时间">
              <template slot-scope="scope">
                {{scope.row.createTime?scope.row.createTime:'--'|formatTime('yyyy-MM-dd hh:mm')}}
              </template>
            </el-table-column>
            <el-table-column prop="memberId" label="成员编号"></el-table-column>
            <el-table-column prop="eventCode" label="事件编号"></el-table-column>
            <el-table-column prop="eventName" label="事件名称"></el-table-column>
          </el-table>
          <div class="mart-20 pagination-content clearfix">
            <el-pagination @current-change="handleCurrentChange2"
              layout="total,sizes,prev,pager,next"
              :currentPage="pageInfoTwo.page"
              :total="pageInfoTwo.tatalRows"
              :page-size="pageInfoTwo.pageSize">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane name="02" label="应用访问">
          <div class="prev-line marb-15"><span>应用访问热度TOP5</span></div>
          <div>
            <span>时间：</span>
            <el-date-picker
              v-model="applicationAccess.timeRange"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="small"></el-date-picker>
          </div>
          <div class="mart-15">
            <el-switch
              v-model="applicationAccess.switchVal"
              active-text="PV"
              active-value="PV"
              inactive-value="UV"
              inactive-text="UV"
              @change="pvUvChangeHandle">
            </el-switch>
          </div>
          <div id="applicationsAccessCanvas"></div>
          <div class="prev-line marb-15"><span>数据详情</span></div>
          <el-table
            border
            size="small"
            :header-cell-style="{background:'#f5f5f5'}"
            :data="applicationAccess.dataList">
            <el-table-column prop="name" label="访问热度排名"></el-table-column>
            <el-table-column prop="name" label="应用名称"></el-table-column>
            <el-table-column prop="name" label="PV"></el-table-column>
            <el-table-column prop="name" label="UV"></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane name="03" label="消息统计">
          <div>
            <span>时间：</span>
            <el-date-picker
              v-model="msgStatistics.timeRange"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="small"></el-date-picker>
          </div>
          <div id="msgCanvas"></div>
          <div class="prev-line marb-15"><span>业务消息推送数据详情</span></div>
          <el-table
            border
            size="small"
            :header-cell-style="{background:'#f5f5f5'}"
            :data="msgStatistics.dataList">
            <el-table-column prop="name" label="时间"></el-table-column>
            <el-table-column prop="name" label="消息数量"></el-table-column>
            <el-table-column prop="name" label="已读数量"></el-table-column>
            <el-table-column prop="name" label="读取率"></el-table-column>
          </el-table>
          <div class="mart-20 pagination-content clearfix">
            <el-pagination
              layout="total,sizes,prev,pager,next"
              :currentPage="msgStatistics.pageInfo.currentPage"
              :total="msgStatistics.pageInfo.total"
              :page-sizes="[10,20]">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane name="04" label="终端设备统计">
          <div>
            <span>年份：</span>
            <el-select v-model="terminalEquipmentStatic.selectedYear" size="small" @change="yearChangeHandler">
              <el-option value="all" label="全部"></el-option>
              <el-option v-for="item in terminalEquipmentStatic.selectYears"
                         :value='item' :key="item">{{item}}
              </el-option>
            </el-select>
          </div>
          <div id="line-content-one">
            <div id="canvas01"></div>
            <div id="canvas02"></div>
          </div>
          <div id="line-content-two">
            <div id="canvas03"></div>
            <div id="canvas04"></div>
          </div>
          <div class="prev-line mart-15 marb-15"><span>数据详情</span></div>
          <el-tabs v-model="activeNameChild">
            <el-tab-pane label="机型" name="000">
              <el-table
              size="small"
              border
              :data="terminalEquipmentStatic.dataList01">
                <el-table-column prop="name" label="机型数量"></el-table-column>
                <el-table-column prop="name" label="机型"></el-table-column>
                <el-table-column prop="name" label="数量"></el-table-column>
                <el-table-column prop="name" label="占比"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="分辨率" name="001">
              <el-table
                size="small"
                border
                :data="terminalEquipmentStatic.dataList02">
                <el-table-column prop="name" label="分辨率数量"></el-table-column>
                <el-table-column prop="name" label="分辨率"></el-table-column>
                <el-table-column prop="name" label="数量"></el-table-column>
                <el-table-column prop="name" label="占比"></el-table-column>
              </el-table>

            </el-tab-pane>
            <el-tab-pane label="操作系统" name="002">
              <el-table
                size="small"
                border
                :data="terminalEquipmentStatic.dataList03">
                <el-table-column prop="name" label="操作系统数量"></el-table-column>
                <el-table-column prop="name" label="操作系统"></el-table-column>
                <el-table-column prop="name" label="数量"></el-table-column>
                <el-table-column prop="name" label="占比"></el-table-column>
              </el-table>

            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
    import {getAppFootConfData,saveAppFootConfData,sortAppConf,fileUpload,
        appActiveUseSts,appActiveUseListSts

    } from '@/api/api'
    import {mapState} from 'vuex'
  export default {
    data: function () {
      return {
        loading: false,
        activeName: '00',
        activeNameChild: '000',
        dataListOne: [{name: 1}, {name: 12}],
        pageInfo: {currentPage: 1, total: 102},
        //活跃用户
        timeRange: [],
        pageInfoTwo: {
            page:1,
            pageSize:10,
            tatalRows:10,
            totalPage:1,
            data:[]
        },
        //应用访问
        applicationAccess: {
          timeRange: [],
          switchVal: '',
          dataList: [{name: 1}, {name: 12}],
        },
        //消息统计
        msgStatistics: {
          timeRange: [],
          dataList: [{name: 1}, {name: 12}],
          pageInfo: {currentPage: 1, total: 102},
        },
        //终端设备统计
        terminalEquipmentStatic: {
          selectYears: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
          selectedYear: new Date().getFullYear(),
          dataList01:[{name: 1}, {name: 12}],
          dataList02:[{name: 1}, {name: 12}],
          dataList03:[{name: 1}, {name: 12}],
        }

      }
    },
    computed:{
        ...mapState(["spId","appId"])
    },
    mounted: function () {
      this.setUserActivityCanvas([],[]);
      this.applicationsAccessCanvas({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2017/12', '2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06']
        },
        yAxis: {
          type: 'value'
        },
        legend: {data: ['第一季度', '第二季度'], x: 'right', y: 'top'},
        tooltip: {},
        series: [{
          name: '第一季度',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }, {
          name: '第二季度',
          data: [120, 232, 551, 345, 1233, 1345, 1678],
          type: 'line'
        }]
      });
      this.msgCanvas();
      this.phonePieCanvas();
      this.iphoneCanvas();
      this.opSysTop5();
      this.resolutionTop5();
    },
    methods: {
        routerReplace:function (e) {
            this.$router.replace(e)
        },
      //查询活跃用户
      searchActiveUse(){
          let _this=this
          if(_this.timeRange.length<2){
              _this.$message('请先选择起始时间')
          }
          var params={
              appId:_this.appId+'',
              spId:_this.spId,
              startDate:_this.timeRange[0],
              endDate:_this.timeRange[1]
          }
          appActiveUseSts(params).then(res=>{
              var x=[],y=[]
              if(res.length<1){
                  _this.$message('未查询到数据')
                  return;
              }
              res.forEach(p=>{
                 x.push(p.strDate)
                 y.push(p.count)
                  console.log(p.strDate)
              });
              _this.setUserActivityCanvas(x,y)
          })

          //列表信息
          this.userActivityList(1,10)

      },
        userActivityList(page,pageSize){
            var _this=this;
            var params={
                appId:_this.spId+'',
                spId:_this.spId,
                startDate:_this.timeRange[0],
                endDate:_this.timeRange[1]
            }
            _this.pageInfoTwo.data=[];
            appActiveUseListSts({"page":page,"pageSize":pageSize,params:params}).then(res => {
                _this.pageInfoTwo.page=res.page;
                _this.pageInfoTwo.pageSize=res.pageSize;
                _this.pageInfoTwo.tatalRows=res.tatalRows;
                _this.pageInfoTwo.totalPage=res.totalPage;
                _this.pageInfoTwo.data=res.data;
            });
        },
        handleCurrentChange2(item){
            this.userActivityList(item,10);
        },

      handleSelectChange: function (e) {
        console.log(e);
      },

        setUserActivityCanvas: function (x,y) {
            var myChart = this.echarts.init(document.getElementById('main'));
            var options = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: x
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {},
                series: [{
                    name: '活跃用户数',
                    data: y,
                    type: 'line'
                }]
            }
            myChart.setOption(options);
        },

      //=====================应用访问部分函数方法
      /**
       * 应用访问图表函数*/
      applicationsAccessCanvas: function (options) {
        var myChart = this.echarts.init(document.getElementById('applicationsAccessCanvas'));
        myChart.setOption(Object.assign({}, options), true);
      },
      /**
       * pv uv切换的时候数据源变化事件*/
      pvUvChangeHandle: function (val) {
        if (val == 'UV') {
          console.log(val)
          this.applicationsAccessCanvas({
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['2017/12', '2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06']
            },
            yAxis: {
              type: 'value'
            },
            legend: {data: ['第一季度', '第二季度'], x: 'right', y: 'top'},
            tooltip: {},
            series: [{
              name: '第一季度',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
            }
              , {
                name: '第二季度',
                data: [120, 232, 551, 345, 1233, 1345, 1678],
                type: 'line'
              }
            ]
          })
          return;
        }
        this.applicationsAccessCanvas({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2017/12', '2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06']
          },
          yAxis: {
            type: 'value'
          },
          legend: {data: ['第一季度', '第二季度', '第三季度'], x: 'right', y: 'top'},
          tooltip: {},
          series: [{
            name: '第一季度',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }, {
            name: '第二季度',
            data: [120, 232, 551, 345, 1233, 1345, 1678],
            type: 'line'
          }, {
            name: '第三季度',
            data: [1201, 1232, 1551, 1345, 1233, 1345, 1678],
            type: 'line'
          }]
        })
      },

      //======================消息统计部分函数方法
      /**
       * 应用访问图表函数*/
      msgCanvas: function () {
        var myChart = this.echarts.init(document.getElementById('msgCanvas'));
        var options = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2017/12', '2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06']
          },
          yAxis: {
            type: 'value'
          },
          legend: {data: ['第一季度', '第二季度'], x: 'right', y: 'top'},
          tooltip: {},
          series: [{
            name: '第一季度',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }, {
            name: '第二季度',
            data: [120, 232, 551, 345, 1233, 1345, 1678],
            type: 'line'
          }]
        }
        myChart.setOption(options, true);
      },

      //=====================终端设备统计函数方法
      /**
       * 选择年份发生变化*/
      yearChangeHandler: function (val) {
        console.log(val);
      },

      phonePieCanvas: function () {
        var myChart = this.echarts.init(document.getElementById('canvas01'));
        var options = {
          title: {text: '手机品牌|机型占比', x: 'left', y: 'top'},
          legend: {
            x: 'left',
            y: 'bottom',
            data: ['01', '02', '03', '04', '05', '06', '07'],
            orient: 'vertical'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [{
            name: '第一季度',
            radius: [50, 110],
            roseType: 'area',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true
                },
                labelLine: {
                  show: true
                }
              }
            },
//            center : ['25%', 200],
            data: [{name: '01', value: 820}, {name: '02', value: 932}, {name: '03', value: 901}, {
              name: '04',
              value: 934
            }
              , {name: '05', value: 1290}, {name: '06', value: '1330'}, {name: '07', value: 1320}],
            type: 'pie'
          }],
        }
        myChart.setOption(options, true);
      },
      iphoneCanvas: function () {
        var myChart = this.echarts.init(document.getElementById('canvas02'));
        var options = {
          title: {text: '苹果手机', x: 'center', y: 'top'},
          legend: {},
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['iphoneX', 'iphone 8', 'iphone 8Plus', 'iphone 7', 'iphone 7Plus', 'iphone 6', 'iphone 6Plus',
              'iphone SE', 'iphone 5', 'iphone 5s'],
            axisLabel:{interval:0}
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [{name: 'iphoneX', value: 820}, {name: 'iphone 8', value: 932}, {name: 'iphone 8Plus', value: 901},
              {name: 'iphone 7', value: 934}, {name: 'iphone 7Plus', value: 1290}, {name: 'iphone 6', value: '1330'},
              {name: 'iphone 6Plus', value: 1320},{name: 'iphone SE', value: 1290}, {name: 'iphone 5', value: '1330'},
              {name: 'iphone 5s', value: 1320}],
            type: 'bar',
            itemStyle:{color:'#20A0FF'},
            barCategoryGap:'50%',
          }],
        }
        myChart.setOption(options, true);
      },
      /**
       * operation sys top5*/
      opSysTop5: function () {
        var myChart = this.echarts.init(document.getElementById('canvas03'));
        var options = {
          title: {subtext: '操作系统TOP5', x: 'left', y: 'top'},
          legend: {},
          tooltip: {},
          yAxis: {
            type: 'category',
            data: ['10.1', '10.2', '10.3', '10.4', '10.5'],
            axisLabel:{interval:0}
          },
          xAxis: {
            type: 'value',
            axisLabel:{formatter:function (val) {
              return val+'%'
            }}
          },
          series: [{
            data: [{name: 'iphoneX', value: 820}, {name: 'iphone 8', value: 932}, {name: 'iphone 8Plus', value: 901},
              {name: 'iphone 7', value: 934}, {name: 'iphone 7Plus', value: 1290}],
            type: 'bar',
            itemStyle:{color:'#20A0FF'},
            barCategoryGap:'50%',
          }],
        }
        myChart.setOption(options, true);
      },
      /**
       * operation sys top5*/
      resolutionTop5: function () {
        var myChart = this.echarts.init(document.getElementById('canvas04'));
        var options = {
          title: {subtext: '分辨率TOP5', x: 'left', y: 'top'},
          legend: {},
          tooltip: {},
          grid: {
            x: '60px',
          },
          yAxis: {
            type: 'category',
            data: ['1024*213', '1024*213', '1024*213', '1024*213', '1024*213'],
            axisLabel:{interval:0},
            margin:-20,
          },
          xAxis: {
            type: 'value',
            axisLabel:{interval:0,
            formatter:function (val) {
              return val+'%'
            }}
          },
          series: [{
            data: [{name: 'iphoneX', value: 820}, {name: 'iphone 8', value: 932}, {name: 'iphone 8Plus', value: 901},
              {name: 'iphone 7', value: 934}, {name: 'iphone 7Plus', value: 1290}],
            type: 'bar',
            itemStyle:{color:'#20A0FF'},
            barCategoryGap:'50%',
          }],
        }
        myChart.setOption(options, true);
      },
    }
  }
</script>

<style scoped>
  .el-tabs__item{
    font-weight: 400!important;
  }
  .content-panel {
    background: #f5f5f5;
    padding: 24px 20px;
    position: relative;
  }

  .content-panel-item, .content-panel {
    display: flex;
    align-items: center;
  }

  .content-panel-item {
    padding: 0px 30px 0px 0px
  }

  .content-panel .send-message {
    position: absolute;
    right: 20px;
    top: 24px;
  }

  .pagination-content button {
    float: left;
  }

  .pagination-content div {
    float: right;
  }

  #main, #applicationsAccessCanvas, #msgCanvas {
    height: 300px;
    width: 950px;
  }

  .prev-line {
    border-left: 2px solid #20A0FF;
    padding-left: 10px;
  }

  #line-content-one {
    margin-top: 15px;
    display: flex;
    justify-content: flex-start;
    height: 220px;
    border:1px solid #eee;
    border-radius: 4px;
    padding:5px;
    box-sizing: border-box;
  }

  #canvas01 {
    /*height: 210px;*/
    /*width: 400px;*/
    height: 270px;
    width: 400px;
    transform: scale(.7);
    transform-origin: 0 0;
  }

  #canvas02 {
    height: 300px;
    width: 950px;
    transform: scale(.7);
    transform-origin: -300px 0;
  }
  #line-content-two{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  #canvas03 {
    height: 300px;
    width: 450px;
    border:1px solid #eee;
    border-radius: 4px;
    padding:5px;
    box-sizing: border-box;
  }
  #canvas04 {
    height: 300px;
    width: 450px;
    border:1px solid #eee;
    border-radius: 4px;
    padding:5px;
    box-sizing: border-box;
  }
  .fs-14{
    font-size: 14px;
    font-weight: 500;
  }
</style>